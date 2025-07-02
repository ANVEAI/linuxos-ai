/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Calculates the maximum width of a multi-line ASCII art string.
 * @param asciiArt The ASCII art string.
 * @returns The length of the longest line in the ASCII art.
 */
export declare const getAsciiArtWidth: (asciiArt: string) => number;
/**
 * Checks if a Buffer is likely binary by testing for the presence of a NULL byte.
 * The presence of a NULL byte is a strong indicator that the data is not plain text.
 * @param data The Buffer to check.
 * @param sampleSize The number of bytes from the start of the buffer to test.
 * @returns True if a NULL byte is found, false otherwise.
 */
export declare function isBinary(data: Buffer | null | undefined, sampleSize?: number): boolean;
export declare function toCodePoints(str: string): string[];
export declare function cpLen(str: string): number;
export declare function cpSlice(str: string, start: number, end?: number): string;
