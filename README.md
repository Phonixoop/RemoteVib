# RemoteVib

Connect two phones over WebSockets. The host drags an intensity handle (0–100) and picks a vibration mode; the client phone vibrates in sync.

## Stack

- Cloudflare Workers + Static Assets
- Durable Objects (hibernating WebSockets) for each room

## Develop

```bash
npm install
npm run dev
```

Open the local URL on two devices (or two browser tabs). Host a room on one, join with the code on the other.

## Deploy

```bash
npm run deploy
```

Production URL: https://remotevib.ali-hassanzadeh78.workers.dev

GitHub: https://github.com/Phonixoop/RemoteVib

Pushes to `main` auto-deploy via Cloudflare Workers Builds.

## Notes

- The Vibration API works on most Android browsers. iOS Safari generally does not expose it; the client still shows a live visual pulse.
- Keep the client tab in the foreground for reliable vibration.
