/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Checks if a query string potentially represents an '@' command.
 * It triggers if the query starts with '@' or contains '@' preceded by whitespace
 * and followed by a non-whitespace character.
 *
 * @param query The input query string.
 * @returns True if the query looks like an '@' command, false otherwise.
 */
export declare const isAtCommand: (query: string) => boolean;
/**
 * Checks if a query string potentially represents an '/' command.
 * It triggers if the query starts with '/'
 *
 * @param query The input query string.
 * @returns True if the query looks like an '/' command, false otherwise.
 */
export declare const isSlashCommand: (query: string) => boolean;
