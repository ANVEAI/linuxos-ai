/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
/**
 * Renders syntax-highlighted code for Ink applications using a selected theme.
 *
 * @param code The code string to highlight.
 * @param language The language identifier (e.g., 'javascript', 'css', 'html')
 * @returns A React.ReactNode containing Ink <Text> elements for the highlighted code.
 */
export declare function colorizeCode(code: string, language: string | null, availableHeight?: number, maxWidth?: number): React.ReactNode;
