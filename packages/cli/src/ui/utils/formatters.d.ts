/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare const formatMemoryUsage: (bytes: number) => string;
/**
 * Formats a duration in milliseconds into a concise, human-readable string (e.g., "1h 5s").
 * It omits any time units that are zero.
 * @param milliseconds The duration in milliseconds.
 * @returns A formatted string representing the duration.
 */
export declare const formatDuration: (milliseconds: number) => string;
