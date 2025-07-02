/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { IndividualToolCallDisplay } from '../../types.js';
import { Config } from '@google/gemini-cli-core';
interface ToolGroupMessageProps {
    groupId: number;
    toolCalls: IndividualToolCallDisplay[];
    availableTerminalHeight?: number;
    terminalWidth: number;
    config?: Config;
    isFocused?: boolean;
}
export declare const ToolGroupMessage: React.FC<ToolGroupMessageProps>;
export {};
