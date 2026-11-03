import { randomUUID } from "node:crypto";

/** @typedef {"host" | "client"} Role */
/** @typedef {"continuous" | "pulse" | "wave" | "heartbeat" | "staccato"} VibeMode */

/**
 * @typedef {{ intensity: number, mode: VibeMode, active: boolean }} ControlState
 */

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

const BUILTIN_REACTION_EMOJI = {
  love: "❤️",
  hot: "🔥",
  wow: "😮",
  lol: "😂",
  wait: "✋",
  ok: "✅",
  more: "😈",
  soft: "💤",
};

const DEFAULT_STATE = {
  intensity: 0,
  mode: "continuous",
  active: false,
};

const MODES = ["continuous", "pulse", "wave", "heartbeat", "staccato"];

export class Room {
  /** @param {string} code */
  constructor(code) {
    this.code = code;
    /** @type {ControlState} */
    this.state = { ...DEFAULT_STATE };
    /** @type {Map<Role, import("ws").WebSocket>} */
    this.sockets = new Map();
  }

  peerStatus() {
    return {
      host: this.sockets.has("host"),
      client: this.sockets.has("client"),
    };
  }

  /**
   * @param {import("ws").WebSocket} ws
   * @param {Role} role
   * @returns {{ ok: true } | { ok: false, status: number, message: string }}
   */
  attach(ws, role) {
    if (this.sockets.has(role)) {
      return { ok: false, status: 409, message: `${role} already connected` };
    }

    /** @type {{ role: Role, id: string }} */
    const attachment = { role, id: randomUUID() };
    ws.remoteVib = attachment;
    this.sockets.set(role, ws);

    this.send(ws, {
      type: "welcome",
      role,
      room: this.code,
      state: this.state,
      peers: this.peerStatus(),
    });

    this.broadcast({ type: "peer", peers: this.peerStatus() }, ws);
    return { ok: true };
  }

  /** @param {import("ws").WebSocket} ws */
  detach(ws) {
    const attachment = ws.remoteVib;
    if (!attachment) return;
    const current = this.sockets.get(attachment.role);
    if (current === ws) {
      this.sockets.delete(attachment.role);
    }
    this.broadcast({ type: "peer", peers: this.peerStatus() });
  }

  /**
   * @param {import("ws").WebSocket} ws
   * @param {string} raw
   */
  handleMessage(ws, raw) {
    if (raw === "ping") {
      try {
        ws.send("pong");
      } catch {
        // socket gone
      }
      return;
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      this.send(ws, { type: "error", message: "Invalid JSON" });
      return;
    }

    if (!data || typeof data !== "object") return;
    const attachment = ws.remoteVib;
    if (!attachment) return;

    if (data.type === "control") {
      if (attachment.role !== "host") {
        this.send(ws, { type: "error", message: "Only the host can control" });
        return;
      }
      this.state = this.normalizeControl(data);
      this.broadcast({ type: "control", state: this.state });
      return;
    }

    if (data.type === "stop") {
      if (attachment.role !== "host") {
        this.send(ws, { type: "error", message: "Only the host can stop" });
        return;
      }
      this.state = { ...this.state, intensity: 0, active: false };
      this.broadcast({ type: "control", state: this.state });
      return;
    }

    if (data.type === "reaction") {
      const reaction = this.normalizeReaction(data);
      if (!reaction) {
        this.send(ws, { type: "error", message: "Invalid reaction" });
        return;
      }
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

    if (data.type === "webrtc") {
      const signal = this.normalizeWebrtc(data);
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

  /** @param {Record<string, unknown>} msg */
  normalizeWebrtc(msg) {
    const kind = typeof msg.kind === "string" ? msg.kind : "";
    if (
      kind !== "offer" &&
      kind !== "answer" &&
      kind !== "ice" &&
      kind !== "hangup"
    ) {
      return null;
    }

    /** @type {Record<string, unknown>} */
    const out = { kind };

    if (kind === "offer" || kind === "answer") {
      const sdp = msg.sdp;
      if (!sdp || typeof sdp !== "object") return null;
      const type = typeof sdp.type === "string" ? sdp.type : "";
      const sdpText = typeof sdp.sdp === "string" ? sdp.sdp : "";
      if ((type !== "offer" && type !== "answer") || !sdpText) return null;
      if (sdpText.length > 64_000) return null;
      out.sdp = { type, sdp: sdpText };
      return out;
    }

    if (kind === "ice") {
      const candidate = msg.candidate;
      if (candidate == null) {
        out.candidate = null;
        return out;
      }
      if (typeof candidate !== "object") return null;
      const cand = typeof candidate.candidate === "string" ? candidate.candidate : "";
      if (cand.length > 2048) return null;
      out.candidate = {
        candidate: cand,
        sdpMid:
          typeof candidate.sdpMid === "string" || candidate.sdpMid == null
            ? candidate.sdpMid
            : String(candidate.sdpMid),
        sdpMLineIndex:
          typeof candidate.sdpMLineIndex === "number"
            ? candidate.sdpMLineIndex
            : null,
        usernameFragment:
          typeof candidate.usernameFragment === "string"
            ? candidate.usernameFragment
            : undefined,
      };
      return out;
    }

    return out;
  }

  /** @param {Record<string, unknown>} msg */
  normalizeReaction(msg) {
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
    if (!text) return null;
    return { emoji: emoji || "💬", text };
  }

  /** @param {Record<string, unknown>} msg */
  normalizeControl(msg) {
    const intensityRaw = Number(msg.intensity);
    const intensity = Number.isFinite(intensityRaw)
      ? Math.max(0, Math.min(100, Math.round(intensityRaw)))
      : this.state.intensity;

    const mode =
      typeof msg.mode === "string" && MODES.includes(msg.mode)
        ? msg.mode
        : this.state.mode;

    const active =
      typeof msg.active === "boolean" ? msg.active : intensity > 0;

    return { intensity, mode, active: active && intensity > 0 };
  }

  /**
   * @param {import("ws").WebSocket} ws
   * @param {object} message
   */
  send(ws, message) {
    try {
      ws.send(JSON.stringify(message));
    } catch {
      // socket gone
    }
  }

  /**
   * @param {object} message
   * @param {import("ws").WebSocket} [except]
   */
  broadcast(message, except) {
    const payload = JSON.stringify(message);
    for (const socket of this.sockets.values()) {
      if (except && socket === except) continue;
      try {
        socket.send(payload);
      } catch {
        // skip broken sockets
      }
    }
  }

  isEmpty() {
    return this.sockets.size === 0;
  }
}
