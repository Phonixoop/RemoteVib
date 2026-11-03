# RemoteVib

Connect two phones over WebSockets. The host drags an intensity handle (0–100) and picks a vibration mode; the client phone vibrates in sync.

## Stack (this branch: `railway-deploy`)

- Node.js HTTP server + `ws` WebSockets
- In-memory rooms (host + client per room code)
- Static UI from `public/`

Cloudflare Workers + Durable Objects remain on `main` (`npm run cf:dev` / `npm run cf:deploy`). This branch is for Railway and other plain Node hosts, which are more reachable from Iran and Russia than Cloudflare/`*.workers.dev`.

## Develop

```bash
npm install
npm run dev
```

Open `http://localhost:3000` on two devices (or two browser tabs). Host a room on one, join with the code on the other.

## Deploy on Railway

1. Push this branch and create a Railway project from the GitHub repo (select branch `railway-deploy`).
2. Railway builds via the included `Dockerfile` (`railway.toml`).
3. Set the service **region to Europe** (EU) — best default for Iran ↔ Russia routes.
4. Deploy. Open the public HTTPS URL on both phones (no Cloudflare proxy in front).

Local equivalent:

```bash
npm start
```

Health check: `GET /health` → `{ "ok": true }`.

## Iran ↔ Russia notes

Both phones must reach the same host over HTTPS and WSS. If either side cannot open the page or WebSocket, try another EU host with the same Node app (Fly.io Amsterdam/Frankfurt, Hetzner, etc.). Avoid putting Cloudflare orange-cloud in front for this use case.

## Notes

- The Vibration API works on most Android browsers. iOS Safari generally does not expose it; the client still shows a live visual pulse.
- Keep the client tab in the foreground for reliable vibration.
