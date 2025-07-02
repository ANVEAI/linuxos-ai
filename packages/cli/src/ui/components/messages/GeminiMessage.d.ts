/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
interface GeminiMessageProps {
    text: string;
    isPending: boolean;
    availableTerminalHeight?: number;
    terminalWidth: number;
}
export declare const GeminiMessage: React.FC<GeminiMessageProps>;
export {};
