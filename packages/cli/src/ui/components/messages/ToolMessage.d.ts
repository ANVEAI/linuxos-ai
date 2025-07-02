/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { IndividualToolCallDisplay } from '../../types.js';
export type TextEmphasis = 'high' | 'medium' | 'low';
export interface ToolMessageProps extends IndividualToolCallDisplay {
    availableTerminalHeight?: number;
    terminalWidth: number;
    emphasis?: TextEmphasis;
    renderOutputAsMarkdown?: boolean;
}
export declare const ToolMessage: React.FC<ToolMessageProps>;
