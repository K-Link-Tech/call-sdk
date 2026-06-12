# Basic example — K-Link Call SDK

A single-page, framework-free test harness for `@klink.cloud/call-sdk`: connect with
an API token, dial out, answer/reject incoming calls, mute/hold/DTMF, and watch
every SDK event in a live log.

## Run

The example installs `@klink.cloud/call-sdk` from npm — no local build needed:

```bash
pnpm install
pnpm dev          # → http://localhost:5173
```

## Use

1. Enter the **API base URL** (default `https://apigw.klinkcx.com`; point it at
   your local public-api during development).
2. Enter the **extension email** of a K-Link member with a telephony extension.
3. Paste a **K-Link API token** (`kpt_…`, from Settings → API Tokens).
4. Press **Connect** — watch for `registeredChange { registered: true }` in
   the log, then dial.

The browser will ask for microphone permission on the first call.

## Notes

- **Audio**: one line — `sdk.attachAudio(audioElement)` — and the SDK pipes
  remote call audio into the element and releases streams when calls end.
  (For custom playback, listen to the `remoteStream` event instead.)
- **Cleanup**: `beforeunload` calls `sdk.destroy()` so the PBX session is
  logged out when the tab closes.
