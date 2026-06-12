/** Options accepted by {@link KlinkCallSdk.init}. */
export interface KlinkCallSdkConfig {
  /** Email of the K-Link member whose telephony extension should be used. */
  userEmail: string;
  /**
   * K-Link API token (`kpt_...`) issued from Settings → API Tokens.
   * Used once to resolve PBX credentials; it is NOT stored by the SDK.
   */
  accessToken: string;
  /**
   * Base URL of the K-Link public API.
   * @default 'https://apigw.klinkcx.com'
   */
  apiBaseUrl?: string;
  /**
   * Abort credential fetching after this many milliseconds.
   * @default 15000
   */
  requestTimeoutMs?: number;
}
/** PBX credentials returned by the K-Link public API. */
export interface CallSdkCredentials {
  extensionNumber: string;
  sipUserName: string;
  webphoneLoginUser: string;
  sipServerUrl: string;
  telephonySignature: string;
}
/** Status snapshot of one call leg. */
export interface CallInfo {
  callId: string;
  /** Remote party number. */
  number: string;
  /** Remote party display name reported by the PBX (queue prefix included). */
  name?: string;
  communicationType: "inbound" | "outbound" | "internal" | string;
  isHold: boolean;
  isMute: boolean;
  callStatus: string;
}
export type KlinkCallSdkEventMap = {
  /** A new inbound call is ringing. */
  incoming: {
    call: CallInfo;
  };
  /** A call session was established (outbound dialing or answered inbound). */
  sessionStarted: {
    call: CallInfo;
  };
  /** A call session ended. `cause` comes from the underlying SIP stack. */
  sessionEnded: {
    callId: string;
    cause: string;
  };
  /**
   * Remote audio is available for a call. Attach it to an `<audio>` element
   * (or call `attachAudio()` once and the SDK does it for you).
   */
  remoteStream: {
    callId: string;
    stream: MediaStream;
  };
  /** Transport to the PBX websocket is up. */
  connected: void;
  /** Transport to the PBX websocket is down. */
  disconnected: void;
  /** SIP registration state changed. */
  registeredChange: {
    registered: boolean;
  };
  /** SIP registration failed permanently (bad signature, extension offline…). */
  registrationFailed: {
    code: string;
    message: string;
  };
  /** Non-fatal runtime error reported by the telephony engine. */
  error: {
    scope: "engine" | "init";
    detail: unknown;
  };
  /** SDK is fully initialized and ready for calls. */
  ready: void;
  /** SDK has been destroyed. */
  destroyed: void;
};
export type KlinkCallSdkEvent = keyof KlinkCallSdkEventMap;
export type Listener<E extends KlinkCallSdkEvent> = (
  payload: KlinkCallSdkEventMap[E],
) => void;
/** Error thrown for all SDK-level failures. */
export declare class KlinkCallSdkError extends Error {
  readonly code:
    | "invalid_config"
    | "auth_failed"
    | "extension_not_found"
    | "extension_not_provisioned"
    | "network_error"
    | "init_failed"
    | "not_initialized";
  constructor(code: KlinkCallSdkError["code"], message: string);
}
