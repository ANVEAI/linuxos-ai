/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { OAuth2Client } from 'google-auth-library';
/**
 * An Authentication URL for updating the credentials of a Oauth2Client
 * as well as a promise that will resolve when the credentials have
 * been refreshed (or which throws error when refreshing credentials failed).
 */
export interface OauthWebLogin {
    authUrl: string;
    loginCompletePromise: Promise<void>;
}
export declare function getOauthClient(): Promise<OAuth2Client>;
export declare function getAvailablePort(): Promise<number>;
export declare function getCachedGoogleAccountId(): string | null;
export declare function clearCachedCredentialFile(): Promise<void>;
/**
 * Retrieves the authenticated user's Google Account ID from Google's UserInfo API.
 * @param client - The authenticated OAuth2Client
 * @returns The user's Google Account ID or null if not available
 */
export declare function getGoogleAccountId(client: OAuth2Client): Promise<string | null>;
