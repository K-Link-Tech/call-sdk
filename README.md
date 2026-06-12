# @klink.cloud/call-sdk

Headless JavaScript phone-call SDK for the K-Link Customer Support Platform.

It lets your application place and receive calls through your K-Link telephony
extension **without** exposing PBX credentials to the browser user. The SDK
authenticates against the K-Link public API with an API token, resolves the
extension's webphone credentials server-side, and then drives the WebRTC call
engine locally. No UI is included — you bring your own.

## Install

```bash
npm install @klink.cloud/call-sdk
```

Zero runtime dependencies — the telephony engine is bundled inside the
package and loaded lazily on `init()`.

## Prerequisites

1. A K-Link **API token** — create one under **Settings → API Tokens**
   (`kpt_...`). Treat it like a password; on the web it should be delivered
   to the page by your backend, not hard-coded.
2. The member you connect as must have a **telephony extension** assigned in
   K-Link (Settings → Phone Extension).
3. Microphone permission in the browser.

## Quick start

```ts
import { KlinkCallSdk } from '@klink.cloud/call-sdk'

const sdk = await KlinkCallSdk.init({
	userEmail: 'agent@yourcompany.com',
	accessToken: 'kpt_xxxxxxxxxxxxxxxx',
	// apiBaseUrl: 'https://apigw.klinkcx.com',  // default
})

// ── events ──────────────────────────────────────────────
sdk.on('registeredChange', ({ registered }) => {
	console.log('extension registered:', registered)
})

sdk.on('incoming', ({ call }) => {
	console.log('ringing from', call.number)
	// auto answer:
	sdk.answer(call.callId)
})

sdk.on('sessionStarted', ({ call }) => console.log('call started', call))
sdk.on('sessionEnded', ({ callId, cause }) => console.log('ended', cause))
sdk.on('error', ({ scope, detail }) => console.error(scope, detail))

// ── controls ────────────────────────────────────────────
await sdk.call('+6591234567')

const [active] = sdk.getCalls()
if (active) {
	sdk.mute(active.callId)
	sdk.unmute(active.callId)
	sdk.hold(active.callId)
	sdk.unhold(active.callId)
	sdk.dtmf(active.callId, '1')
	sdk.hangup(active.callId)
}

// ── teardown ────────────────────────────────────────────
await sdk.destroy()
```

## API

### `KlinkCallSdk.init(config)`

| Option | Type | Default | Description |
|---|---|---|---|
| `userEmail` | `string` | — (required) | K-Link member email whose extension to use |
| `accessToken` | `string` | — (required) | K-Link API token (`kpt_...`) |
| `apiBaseUrl` | `string` | `https://apigw.klinkcx.com` | Public API origin |
| `requestTimeoutMs` | `number` | `15000` | Credential-fetch timeout |

Returns `Promise<KlinkCallSdk>`. Throws `KlinkCallSdkError` with `code`:
`invalid_config` · `auth_failed` · `extension_not_found` ·
`extension_not_provisioned` · `network_error` · `init_failed`.

### Events

| Event | Payload | When |
|---|---|---|
| `ready` | — | Engine started, registration in progress |
| `incoming` | `{ call }` | Inbound call ringing |
| `sessionStarted` | `{ call }` | Call established / dialing |
| `sessionEnded` | `{ callId, cause }` | Call ended |
| `remoteStream` | `{ callId, stream }` | Remote call audio available |
| `connected` / `disconnected` | — | PBX socket transport state |
| `registeredChange` | `{ registered }` | SIP registration state |
| `registrationFailed` | `{ code, message }` | Registration rejected |
| `error` | `{ scope, detail }` | Runtime errors |
| `destroyed` | — | After `destroy()` |

`on(event, fn)` returns an unsubscribe function. `once` and `off` are also
available.

### Call controls

`call(number)` · `answer(callId)` · `reject(callId)` · `hangup(callId)` ·
`hold/unhold(callId)` · `mute/unmute(callId)` · `dtmf(callId, tones)` ·
`attachAudio(element)` · `getCalls()` · `isRegistered` · `destroy()`

## Audio (required)

The SDK renders no UI, but it can manage call audio for you — pass it an
`<audio>` element once and remote streams are piped in and released
automatically:

```ts
sdk.attachAudio(document.querySelector('audio')!)
```

Prefer to control playback yourself? Listen for the `remoteStream` event:

```ts
sdk.on('remoteStream', ({ callId, stream }) => {
	myAudioElement.srcObject = stream
})
```

Without one of these, calls connect but stay silent. See
[`examples/basic`](examples/basic) for a complete working app.

## Example app

A minimal framework-free test UI lives in [`examples/basic`](examples/basic)
(it installs the published `@klink.cloud/call-sdk` from npm):

```bash
cd examples/basic
pnpm install && pnpm dev            # → http://localhost:5173
```

## Build from source

```bash
cd call-sdk
pnpm install
pnpm build       # dist/index.js (ESM) + dist/index.cjs (CJS) + d.ts
```

## Security notes

- Rotate or revoke API tokens from **Settings → API Tokens** at any time;
  in-flight SDK instances keep working until the PBX signature expires, but
  new `init` calls with a revoked token fail with `auth_failed`.
- Issue one API token per integration so a leak is independently revocable.
- The SDK only ever reads extensions belonging to the token's own tenant.
