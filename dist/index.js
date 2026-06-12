class a extends Error {
  constructor(e, t) {
    super(t), this.name = "KlinkCallSdkError", this.code = e;
  }
}
const w = "https://apigw.klinkcx.com", f = "/api/v1/call-sdk/credentials";
async function y(l) {
  const e = (l.apiBaseUrl ?? w).replace(
    /\/+$/,
    ""
  ), t = new URL(e + f);
  t.searchParams.set("extensionEmail", l.userEmail);
  const s = new AbortController(), i = setTimeout(
    () => s.abort(),
    l.requestTimeoutMs ?? 15e3
  );
  let r;
  try {
    r = await fetch(t.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${l.accessToken}`,
        "Content-Type": "application/json"
      },
      signal: s.signal
    });
  } catch (o) {
    throw new a(
      "network_error",
      `Could not reach the K-Link API at ${e}: ${o instanceof Error ? o.message : String(o)}`
    );
  } finally {
    clearTimeout(i);
  }
  if (r.status === 401)
    throw new a(
      "auth_failed",
      "The provided accessToken was rejected. Check that the API token is valid, not expired, and not revoked."
    );
  if (r.status === 404)
    throw new a(
      "extension_not_found",
      `No telephony extension found for ${l.userEmail} in this workspace.`
    );
  if (r.status === 422)
    throw new a(
      "extension_not_provisioned",
      `The extension for ${l.userEmail} exists but is not provisioned for webphone login.`
    );
  if (!r.ok)
    throw new a(
      "network_error",
      `Unexpected response from the K-Link API: HTTP ${r.status}`
    );
  const h = (await r.json())?.data;
  if (!h?.sipServerUrl || !h?.telephonySignature)
    throw new a(
      "extension_not_provisioned",
      "The K-Link API returned incomplete PBX credentials."
    );
  return h;
}
function p(l) {
  const e = l.status;
  return {
    callId: e.callId,
    number: e.number,
    name: e.name,
    communicationType: e.communicationType,
    isHold: e.isHold,
    isMute: e.isMute,
    callStatus: e.callStatus
  };
}
class g {
  constructor() {
    this.handles = null, this.listeners = /* @__PURE__ */ new Map(), this.removeEngineListeners = null, this.sessionCleanups = /* @__PURE__ */ new Map(), this.audioElement = null, this.destroyed = !1;
  }
  /**
   * Create and start an SDK instance.
   *
   * 1. Resolves PBX credentials from the K-Link public API using the
   *    provided API token (the auth layer).
   * 2. Boots the bundled telephony engine and registers the extension.
   *
   * Resolves once registration has started; listen for `ready` /
   * `registeredChange` for registration state.
   */
  static async init(e) {
    if (!e?.userEmail)
      throw new a("invalid_config", "userEmail is required");
    if (!e?.accessToken)
      throw new a("invalid_config", "accessToken is required");
    const t = new g(), s = await y(e), i = s.webphoneLoginUser !== "" ? s.webphoneLoginUser : s.sipUserName, { init: r } = await import("./index-DmxU4-b1.js");
    return await new Promise((d, h) => {
      r({
        pbxURL: s.sipServerUrl,
        username: i,
        secret: s.telephonySignature,
        disableCallWaiting: !0
      }).then((o) => {
        const { phone: c, pbx: u, destroy: n } = o;
        t.handles = { phone: c, pbx: u, destroy: n }, t.attachEngineListeners(), c.start(), t.emit("ready", void 0), d();
      }).catch((o) => {
        h(
          new a(
            "init_failed",
            `Telephony engine failed to start: ${o instanceof Error ? o.message : String(o)}`
          )
        );
      });
    }), t;
  }
  // ───────────────────────── events ─────────────────────────
  on(e, t) {
    const s = this.listeners.get(e) ?? /* @__PURE__ */ new Set();
    return s.add(t), this.listeners.set(e, s), () => this.off(e, t);
  }
  off(e, t) {
    this.listeners.get(e)?.delete(t);
  }
  once(e, t) {
    const s = this.on(e, (i) => {
      s(), t(i);
    });
    return s;
  }
  emit(e, t) {
    this.listeners.get(e)?.forEach((s) => {
      try {
        s(t);
      } catch (i) {
        console.error(`[klink-call-sdk] listener for "${e}" threw`, i);
      }
    });
  }
  // ───────────────────────── audio ─────────────────────────
  /**
   * Let the SDK manage call audio: remote streams are piped into the given
   * `<audio>` element and released when calls end. Returns a detach
   * function. Alternatively, listen for the `remoteStream` event and manage
   * playback yourself.
   */
  attachAudio(e) {
    return this.audioElement = e, e.autoplay = !0, () => {
      this.audioElement === e && (this.releaseAudio(), this.audioElement = null);
    };
  }
  playStream(e) {
    this.audioElement && (this.audioElement.srcObject = e);
  }
  releaseAudio() {
    const e = this.audioElement;
    if (!e) return;
    const t = e.srcObject;
    e.srcObject = null, t instanceof MediaStream && t.getTracks().forEach((s) => s.stop());
  }
  // ─────────────────────── call controls ───────────────────────
  /** Start an outbound call. */
  async call(e) {
    const { phone: t } = this.requireHandles(), s = e.replace(/[^\d+*#]/g, "");
    if (s.length === 0)
      throw new a(
        "invalid_config",
        "call(): number must contain digits"
      );
    await t.call(s);
  }
  /** Answer a ringing inbound call. */
  async answer(e) {
    const { phone: t } = this.requireHandles();
    await t.answer(e);
  }
  /** Reject a ringing inbound call. */
  reject(e) {
    return this.requireHandles().phone.reject(e);
  }
  /** Hang up an established call. */
  hangup(e) {
    return this.requireHandles().phone.terminate(e, "hangup");
  }
  hold(e) {
    return this.requireHandles().phone.hold(e);
  }
  unhold(e) {
    return this.requireHandles().phone.unhold(e);
  }
  mute(e) {
    return this.requireHandles().phone.mute(e);
  }
  unmute(e) {
    return this.requireHandles().phone.unmute(e);
  }
  /** Send DTMF tones on an established call. */
  dtmf(e, t) {
    return this.requireHandles().phone.dtmf(e, t);
  }
  // ───────────────────────── state ─────────────────────────
  /** Snapshot of all current call sessions. */
  getCalls() {
    return this.handles ? Array.from(this.handles.phone.sessions.values()).map(p) : [];
  }
  /** Whether the extension is currently registered on the PBX. */
  get isRegistered() {
    return this.handles?.phone.isRegistered ?? !1;
  }
  /** Whether the SDK instance has been destroyed. */
  get isDestroyed() {
    return this.destroyed;
  }
  // ───────────────────────── teardown ─────────────────────────
  /**
   * Log out from the PBX and release all engine resources.
   * The instance is unusable afterwards — create a new one with `init`.
   */
  async destroy() {
    if (this.destroyed) return;
    this.destroyed = !0;
    const e = this.handles;
    if (this.handles = null, this.removeEngineListeners?.(), this.removeEngineListeners = null, this.sessionCleanups.forEach((t) => t()), this.sessionCleanups.clear(), this.releaseAudio(), e)
      try {
        e.pbx.isInited && await e.pbx.logout().catch(() => {
        });
      } finally {
        try {
          e.destroy();
        } catch {
        }
      }
    this.emit("destroyed", void 0), this.listeners.clear();
  }
  // ───────────────────────── internals ─────────────────────────
  requireHandles() {
    if (!this.handles || this.destroyed)
      throw new a(
        "not_initialized",
        "The SDK is not initialized (or already destroyed). Call KlinkCallSdk.init() first."
      );
    return this.handles;
  }
  /**
   * Subscribe to a session's media stream and re-emit it as our own
   * `remoteStream` event (and pipe into the attached audio element).
   */
  watchSessionMedia(e) {
    const t = e.status.callId;
    if (this.sessionCleanups.has(t)) return;
    const s = ({
      remoteStream: i
    }) => {
      i?.getTracks?.().length && (this.playStream(i), this.emit("remoteStream", { callId: t, stream: i }));
    };
    e.on("updateRemoteStream", s), this.sessionCleanups.set(t, () => {
      e.removeListener("updateRemoteStream", s);
    });
  }
  attachEngineListeners() {
    const { phone: e, pbx: t } = this.requireHandles(), s = ({ session: n }) => {
      this.watchSessionMedia(n), this.emit("sessionStarted", { call: p(n) });
    }, i = ({
      callId: n,
      cause: m
    }) => {
      this.sessionCleanups.get(n)?.(), this.sessionCleanups.delete(n), this.handles && this.handles.phone.sessions.size === 0 && this.releaseAudio(), this.emit("sessionEnded", { callId: n, cause: m });
    }, r = ({ session: n }) => {
      this.watchSessionMedia(n), this.emit("incoming", { call: p(n) });
    }, d = () => this.emit("connected", void 0), h = () => this.emit("disconnected", void 0), o = ({
      code: n,
      msg: m
    }) => {
      this.emit("registrationFailed", { code: n, message: m });
    }, c = (n) => {
      this.emit("registeredChange", { registered: n });
    }, u = (n) => {
      this.emit("error", { scope: "engine", detail: n });
    };
    e.on("startSession", s), e.on("deleteSession", i), e.on("incoming", r), e.on("connected", d), e.on("disconnected", h), e.on("registrationFailed", o), e.on("isRegisteredChange", c), t.on("runtimeError", u), this.removeEngineListeners = () => {
      e.removeListener("startSession", s), e.removeListener("deleteSession", i), e.removeListener("incoming", r), e.removeListener("connected", d), e.removeListener("disconnected", h), e.removeListener("registrationFailed", o), e.removeListener("isRegisteredChange", c), t.removeListener("runtimeError", u);
    };
  }
}
export {
  g as KlinkCallSdk,
  a as KlinkCallSdkError
};
