import { VibeRoom } from "./room";

export { VibeRoom };

const ROOM_RE = /^[A-Z0-9]{4,8}$/;

function roomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/create-room" && request.method === "POST") {
      return Response.json({ room: roomCode() });
    }

    if (url.pathname === "/ws") {
      if (request.headers.get("Upgrade") !== "websocket") {
        return new Response("Expected WebSocket", { status: 426 });
      }

      const room = (url.searchParams.get("room") ?? "").toUpperCase();
      const role = url.searchParams.get("role");

      if (!ROOM_RE.test(room)) {
        return new Response("Invalid room code", { status: 400 });
      }
      if (role !== "host" && role !== "client") {
        return new Response("role must be host or client", { status: 400 });
      }

      const stub = env.ROOM.getByName(room);
      return stub.fetch(request);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
