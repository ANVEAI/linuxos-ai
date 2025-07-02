/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import type { HistoryItem } from '../types.js';
import { Config } from '@google/gemini-cli-core';
interface HistoryItemDisplayProps {
    item: HistoryItem;
    availableTerminalHeight?: number;
    terminalWidth: number;
    isPending: boolean;
    config?: Config;
    isFocused?: boolean;
}
export declare const HistoryItemDisplay: React.FC<HistoryItemDisplayProps>;
export {};
