/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
interface DiffRendererProps {
    diffContent: string;
    filename?: string;
    tabWidth?: number;
    availableTerminalHeight?: number;
    terminalWidth: number;
}
export declare const DiffRenderer: React.FC<DiffRendererProps>;
export {};
