import { DurableObject } from "cloudflare:workers";

export type Role = "host" | "client";

export type VibeMode =
  | "continuous"
  | "pulse"
  | "wave"
  | "heartbeat"
  | "staccato";

export type ControlState = {
  intensity: number;
  mode: VibeMode;
  active: boolean;
};

type Attachment = {
  role: Role;
  id: string;
};

type ReactionMessage = {
  type: "reaction";
  from: Role;
  id?: string;
  emoji: string;
  text?: string;
};

const BUILTIN_REACTION_IDS = new Set([
  "love",
  "hot",
  "wow",
  "lol",
  "wait",
  "ok",
  "more",
  "soft",
]);

const BUILTIN_REACTION_EMOJI: Record<string, string> = {
  love: "❤️",
  hot: "🔥",
  wow: "😮",
  lol: "😂",
  wait: "✋",
  ok: "✅",
  more: "😈",
  soft: "💤",
};

type WebrtcKind = "offer" | "answer" | "ice" | "hangup";

type WebrtcMessage = {
  type: "webrtc";
  from: Role;
  kind: WebrtcKind;
  sdp?: { type: string; sdp: string };
  candidate?: {
    candidate: string;
    sdpMid: string | null;
    sdpMLineIndex: number | null;
    usernameFragment?: string;
  } | null;
};

type ServerMessage =
  | { type: "welcome"; role: Role; room: string; state: ControlState; peers: PeerStatus }
  | { type: "peer"; peers: PeerStatus }
  | { type: "control"; state: ControlState }
  | ReactionMessage
  | WebrtcMessage
  | { type: "error"; message: string };

type PeerStatus = {
  host: boolean;
  client: boolean;
};

const DEFAULT_STATE: ControlState = {
  intensity: 0,
  mode: "continuous",
  active: false,
};

export class VibeRoom extends DurableObject<Env> {
  private state: ControlState = { ...DEFAULT_STATE };

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.ctx.setWebSocketAutoResponse(
      new WebSocketRequestResponsePair("ping", "pong"),
    );
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/ws") {
      return new Response("Not found", { status: 404 });
    }

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 426 });
    }

    const roleParam = url.searchParams.get("role");
    if (roleParam !== "host" && roleParam !== "client") {
      return new Response("role must be host or client", { status: 400 });
    }
    const role: Role = roleParam;

    const existing = this.ctx.getWebSockets(role);
    if (existing.length > 0) {
      return new Response(`${role} already connected`, { status: 409 });
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    this.ctx.acceptWebSocket(server, [role]);
    const attachment: Attachment = {
      role,
      id: crypto.randomUUID(),
    };
    server.serializeAttachment(attachment);

    const room = url.searchParams.get("room") ?? "unknown";
    this.send(server, {
      type: "welcome",
      role,
      room,
      state: this.state,
      peers: this.peerStatus(),
    });

    this.broadcast(
      {
        type: "peer",
        peers: this.peerStatus(),
      },
      server,
    );

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
    if (typeof message !== "string") return;

    let data: unknown;
    try {
      data = JSON.parse(message);
    } catch {
      this.send(ws, { type: "error", message: "Invalid JSON" });
      return;
    }

    if (!data || typeof data !== "object") return;
    const msg = data as Record<string, unknown>;
    const attachment = ws.deserializeAttachment() as Attachment | null;
    if (!attachment) return;

    if (msg.type === "control") {
      if (attachment.role !== "host") {
        this.send(ws, { type: "error", message: "Only the host can control" });
        return;
      }

      const next = this.normalizeControl(msg);
      this.state = next;
      this.broadcast({ type: "control", state: next });
      return;
    }

    if (msg.type === "stop") {
      if (attachment.role !== "host") {
        this.send(ws, { type: "error", message: "Only the host can stop" });
        return;
      }
      this.state = { ...this.state, intensity: 0, active: false };
      this.broadcast({ type: "control", state: this.state });
      return;
    }

    if (msg.type === "reaction") {
      const reaction = this.normalizeReaction(msg);
      if (!reaction) {
        this.send(ws, { type: "error", message: "Invalid reaction" });
        return;
      }
      // Forward only — never store reactions or custom presets.
      this.broadcast(
        {
          type: "reaction",
          from: attachment.role,
          ...reaction,
        },
        ws,
      );
      return;
    }

    if (msg.type === "webrtc") {
      const signal = this.normalizeWebrtc(msg);
      if (!signal) {
        this.send(ws, { type: "error", message: "Invalid webrtc signal" });
        return;
      }
      this.broadcast(
        {
          type: "webrtc",
          from: attachment.role,
          ...signal,
        },
        ws,
      );
    }
  }

  async webSocketClose(ws: WebSocket) {
    try {
      ws.close(1000, "closed");
    } catch {
      // already closed
    }
    this.broadcast({
      type: "peer",
      peers: this.peerStatus(),
    });
  }

  async webSocketError(ws: WebSocket) {
    try {
      ws.close(1011, "error");
    } catch {
      // ignore
    }
    this.broadcast({
      type: "peer",
      peers: this.peerStatus(),
    });
  }

  private peerStatus(): PeerStatus {
    return {
      host: this.ctx.getWebSockets("host").length > 0,
      client: this.ctx.getWebSockets("client").length > 0,
    };
  }

  private normalizeWebrtc(
    msg: Record<string, unknown>,
  ): Omit<WebrtcMessage, "type" | "from"> | null {
    const kind = typeof msg.kind === "string" ? msg.kind : "";
    if (
      kind !== "offer" &&
      kind !== "answer" &&
      kind !== "ice" &&
      kind !== "hangup"
    ) {
      return null;
    }

    if (kind === "offer" || kind === "answer") {
      const sdp = msg.sdp;
      if (!sdp || typeof sdp !== "object") return null;
      const sdpObj = sdp as Record<string, unknown>;
      const type = typeof sdpObj.type === "string" ? sdpObj.type : "";
      const sdpText = typeof sdpObj.sdp === "string" ? sdpObj.sdp : "";
      if ((type !== "offer" && type !== "answer") || !sdpText) return null;
      if (sdpText.length > 64_000) return null;
      return { kind, sdp: { type, sdp: sdpText } };
    }

    if (kind === "ice") {
      const candidate = msg.candidate;
      if (candidate == null) return { kind, candidate: null };
      if (typeof candidate !== "object") return null;
      const c = candidate as Record<string, unknown>;
      const cand = typeof c.candidate === "string" ? c.candidate : "";
      if (cand.length > 2048) return null;
      return {
        kind,
        candidate: {
          candidate: cand,
          sdpMid:
            typeof c.sdpMid === "string" || c.sdpMid == null
              ? (c.sdpMid as string | null)
              : String(c.sdpMid),
          sdpMLineIndex:
            typeof c.sdpMLineIndex === "number" ? c.sdpMLineIndex : null,
          usernameFragment:
            typeof c.usernameFragment === "string"
              ? c.usernameFragment
              : undefined,
        },
      };
    }

    return { kind };
  }

  private normalizeReaction(
    msg: Record<string, unknown>,
  ): { id: string; emoji: string } | { emoji: string; text: string } | null {
    const id = typeof msg.id === "string" ? msg.id.trim().slice(0, 24) : "";
    if (id && BUILTIN_REACTION_IDS.has(id)) {
      return {
        id,
        emoji: BUILTIN_REACTION_EMOJI[id] ?? "💬",
      };
    }

    const emoji =
      typeof msg.emoji === "string" ? msg.emoji.trim().slice(0, 8) : "";
    const text =
      typeof msg.text === "string" ? msg.text.trim().slice(0, 40) : "";
    // Custom reactions are literal text only (no id / no translation).
    if (!text) return null;
    return { emoji: emoji || "💬", text };
  }

  private normalizeControl(msg: Record<string, unknown>): ControlState {
    const intensityRaw = Number(msg.intensity);
    const intensity = Number.isFinite(intensityRaw)
      ? Math.max(0, Math.min(100, Math.round(intensityRaw)))
      : this.state.intensity;

    const modes: VibeMode[] = [
      "continuous",
      "pulse",
      "wave",
      "heartbeat",
      "staccato",
    ];
    const mode =
      typeof msg.mode === "string" && modes.includes(msg.mode as VibeMode)
        ? (msg.mode as VibeMode)
        : this.state.mode;

    const active =
      typeof msg.active === "boolean" ? msg.active : intensity > 0;

    return { intensity, mode, active: active && intensity > 0 };
  }

  private send(ws: WebSocket, message: ServerMessage) {
    try {
      ws.send(JSON.stringify(message));
    } catch {
      // socket gone
    }
  }

  private broadcast(message: ServerMessage, except?: WebSocket) {
    const payload = JSON.stringify(message);
    for (const socket of this.ctx.getWebSockets()) {
      if (except && socket === except) continue;
      try {
        socket.send(payload);
      } catch {
        // skip broken sockets
      }
    }
  }
}
