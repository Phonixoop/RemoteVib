import { envFlag } from "./flags";
import { VibeRoom } from "./room";

export { VibeRoom };

const ROOM_RE = /^[A-Z0-9]{4,8}$/;

type Lang = "en" | "fa" | "ru";

const PERSIAN_COUNTRIES = new Set(["IR", "AF", "TJ"]);
const RUSSIAN_COUNTRIES = new Set(["RU", "BY", "KZ", "KG", "UA"]);

function roomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

function languageFromCountry(country: string | null): Lang | null {
  if (!country) return null;
  const code = country.toUpperCase();
  if (PERSIAN_COUNTRIES.has(code)) return "fa";
  if (RUSSIAN_COUNTRIES.has(code)) return "ru";
  return null;
}

function languageFromAcceptLanguage(header: string | null): Lang | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {
        tag: rawTag.trim().toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const primary = tag.split("-")[0];
    if (primary === "fa" || primary === "per") return "fa";
    if (primary === "ru") return "ru";
    if (primary === "en") return "en";
  }

  return null;
}

function resolveLocale(request: Request): { language: Lang; country: string | null } {
  const country =
    typeof request.cf?.country === "string" ? request.cf.country.toUpperCase() : null;
  const fromCountry = languageFromCountry(country);
  if (fromCountry) return { language: fromCountry, country };

  const fromHeader = languageFromAcceptLanguage(
    request.headers.get("Accept-Language"),
  );
  return { language: fromHeader ?? "en", country };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/locale" && request.method === "GET") {
      return Response.json(resolveLocale(request));
    }

    if (url.pathname === "/api/create-room" && request.method === "POST") {
      return Response.json({ room: roomCode() });
    }

    if (url.pathname === "/api/config" && request.method === "GET") {
      return Response.json({ video: envFlag(env.ENABLE_VIDEO) });
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
