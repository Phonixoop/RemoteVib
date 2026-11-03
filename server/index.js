import http from "node:http";
import { randomBytes } from "node:crypto";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";
import { Room } from "./room.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public");
const PORT = Number(process.env.PORT) || 3000;

/** @param {string | undefined} value */
export function envFlag(value) {
  if (!value) return false;
  const v = value.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes" || v === "on";
}

const ENABLE_VIDEO = envFlag(process.env.ENABLE_VIDEO);

const ROOM_RE = /^[A-Z0-9]{4,8}$/;
const PERSIAN_COUNTRIES = new Set(["IR", "AF", "TJ"]);
const RUSSIAN_COUNTRIES = new Set(["RU", "BY", "KZ", "KG", "UA"]);

/** @type {Map<string, Room>} */
const rooms = new Map();

function roomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

function getOrCreateRoom(code) {
  let room = rooms.get(code);
  if (!room) {
    room = new Room(code);
    rooms.set(code, room);
  }
  return room;
}

function maybeDeleteRoom(code) {
  const room = rooms.get(code);
  if (room && room.isEmpty()) {
    rooms.delete(code);
  }
}

/** @param {string | null} country */
function languageFromCountry(country) {
  if (!country) return null;
  const code = country.toUpperCase();
  if (PERSIAN_COUNTRIES.has(code)) return "fa";
  if (RUSSIAN_COUNTRIES.has(code)) return "ru";
  return null;
}

/** @param {string | null} header */
function languageFromAcceptLanguage(header) {
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

/** @param {http.IncomingMessage} req */
function resolveLocale(req) {
  const countryHeader =
    req.headers["cf-ipcountry"] ||
    req.headers["x-vercel-ip-country"] ||
    req.headers["x-country-code"] ||
    null;
  const country =
    typeof countryHeader === "string" ? countryHeader.toUpperCase() : null;

  const fromCountry = languageFromCountry(country);
  if (fromCountry) return { language: fromCountry, country };

  const accept = req.headers["accept-language"];
  const fromHeader = languageFromAcceptLanguage(
    typeof accept === "string" ? accept : null,
  );
  return { language: fromHeader ?? "en", country };
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

/**
 * @param {string} urlPath
 * @returns {string | null}
 */
function resolvePublicFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relative = decoded === "/" ? "/index.html" : decoded;
  const filePath = path.normalize(path.join(PUBLIC_DIR, relative));
  if (!filePath.startsWith(PUBLIC_DIR)) return null;
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    // SPA fallback
    const index = path.join(PUBLIC_DIR, "index.html");
    return existsSync(index) ? index : null;
  }
  return filePath;
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function handleHttp(req, res) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);

  if (url.pathname === "/api/locale" && req.method === "GET") {
    sendJson(res, 200, resolveLocale(req));
    return;
  }

  if (url.pathname === "/api/create-room" && req.method === "POST") {
    sendJson(res, 200, { room: roomCode() });
    return;
  }

  if (url.pathname === "/api/config" && req.method === "GET") {
    sendJson(res, 200, { video: ENABLE_VIDEO });
    return;
  }

  if (url.pathname === "/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (url.pathname === "/ws") {
    res.writeHead(426, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Expected WebSocket");
    return;
  }

  const filePath = resolvePublicFile(url.pathname);
  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": MIME[ext] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(res);
}

const server = http.createServer(handleHttp);
const wss = new WebSocketServer({ noServer: true });

server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  if (url.pathname !== "/ws") {
    socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    socket.destroy();
    return;
  }

  const room = (url.searchParams.get("room") ?? "").toUpperCase();
  const role = url.searchParams.get("role");

  if (!ROOM_RE.test(room)) {
    socket.write("HTTP/1.1 400 Bad Request\r\n\r\nInvalid room code");
    socket.destroy();
    return;
  }
  if (role !== "host" && role !== "client") {
    socket.write("HTTP/1.1 400 Bad Request\r\n\r\nrole must be host or client");
    socket.destroy();
    return;
  }

  const vibeRoom = getOrCreateRoom(room);
  if (vibeRoom.sockets.has(role)) {
    socket.write(`HTTP/1.1 409 Conflict\r\n\r\n${role} already connected`);
    socket.destroy();
    return;
  }

  wss.handleUpgrade(req, socket, head, (ws) => {
    const result = vibeRoom.attach(ws, role);
    if (!result.ok) {
      ws.close(1008, result.message);
      maybeDeleteRoom(room);
      return;
    }

    ws.on("message", (data, isBinary) => {
      if (isBinary) return;
      vibeRoom.handleMessage(ws, data.toString());
    });

    const cleanup = () => {
      vibeRoom.detach(ws);
      maybeDeleteRoom(room);
    };

    ws.on("close", cleanup);
    ws.on("error", cleanup);
  });
});

server.listen(PORT, () => {
  console.log(`RemoteVib listening on http://0.0.0.0:${PORT}`);
});
