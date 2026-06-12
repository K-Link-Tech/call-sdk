import { type CallSdkCredentials, type KlinkCallSdkConfig } from "./types";
/**
 * Exchange a K-Link API token + extension email for PBX/webphone credentials.
 *
 * This is the auth layer in front of the Linkus SDK: the raw PBX secret is
 * only obtainable with a valid, unrevoked K-Link API token, and only for
 * extensions inside that token's tenant.
 */
export declare function fetchCallSdkCredentials(config: KlinkCallSdkConfig): Promise<CallSdkCredentials>;
