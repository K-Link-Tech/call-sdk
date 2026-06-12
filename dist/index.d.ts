import { type CallInfo, type KlinkCallSdkConfig, type KlinkCallSdkEvent, type Listener } from './types';
export * from './types';
/**
 * Headless phone-call SDK for the K-Link platform.
 *
 * ```ts
 * const sdk = await KlinkCallSdk.init({
 *   userEmail: 'agent@yourcompany.com',
 *   accessToken: 'kpt_xxxxxxxx',
 * })
 *
 * sdk.attachAudio(document.querySelector('audio')!)
 * sdk.on('incoming', ({ call }) => sdk.answer(call.callId))
 * await sdk.call('+6591234567')
 * ```
 *
 * No UI is rendered — wire the emitted events into your own interface.
 */
export declare class KlinkCallSdk {
    private handles;
    private listeners;
    private removeEngineListeners;
    private sessionCleanups;
    private audioElement;
    private destroyed;
    private constructor();
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
    static init(config: KlinkCallSdkConfig): Promise<KlinkCallSdk>;
    on<E extends KlinkCallSdkEvent>(event: E, listener: Listener<E>): () => void;
    off<E extends KlinkCallSdkEvent>(event: E, listener: Listener<E>): void;
    once<E extends KlinkCallSdkEvent>(event: E, listener: Listener<E>): () => void;
    private emit;
    /**
     * Let the SDK manage call audio: remote streams are piped into the given
     * `<audio>` element and released when calls end. Returns a detach
     * function. Alternatively, listen for the `remoteStream` event and manage
     * playback yourself.
     */
    attachAudio(element: HTMLAudioElement): () => void;
    private playStream;
    private releaseAudio;
    /** Start an outbound call. */
    call(number: string): Promise<void>;
    /** Answer a ringing inbound call. */
    answer(callId: string): Promise<void>;
    /** Reject a ringing inbound call. */
    reject(callId: string): boolean;
    /** Hang up an established call. */
    hangup(callId: string): boolean;
    hold(callId: string): boolean;
    unhold(callId: string): boolean;
    mute(callId: string): boolean;
    unmute(callId: string): boolean;
    /** Send DTMF tones on an established call. */
    dtmf(callId: string, tones: string): boolean;
    /** Snapshot of all current call sessions. */
    getCalls(): CallInfo[];
    /** Whether the extension is currently registered on the PBX. */
    get isRegistered(): boolean;
    /** Whether the SDK instance has been destroyed. */
    get isDestroyed(): boolean;
    /**
     * Log out from the PBX and release all engine resources.
     * The instance is unusable afterwards — create a new one with `init`.
     */
    destroy(): Promise<void>;
    private requireHandles;
    /**
     * Subscribe to a session's media stream and re-emit it as our own
     * `remoteStream` event (and pipe into the attached audio element).
     */
    private watchSessionMedia;
    private attachEngineListeners;
}
