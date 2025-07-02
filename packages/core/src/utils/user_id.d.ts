/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Retrieves the installation ID from a file, creating it if it doesn't exist.
 * This ID is used for unique user installation tracking.
 * @returns A UUID string for the user.
 */
export declare function getInstallationId(): string;
/**
 * Retrieves the obfuscated Google Account ID for the currently authenticated user.
 * When OAuth is available, returns the user's cached Google Account ID. Otherwise, returns the installation ID.
 * @returns A string ID for the user (Google Account ID if available, otherwise installation ID).
 */
export declare function getObfuscatedGoogleAccountId(): string;
