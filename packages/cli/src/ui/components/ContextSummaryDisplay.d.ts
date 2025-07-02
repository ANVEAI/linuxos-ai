/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { type MCPServerConfig } from '@google/gemini-cli-core';
interface ContextSummaryDisplayProps {
    geminiMdFileCount: number;
    contextFileNames: string[];
    mcpServers?: Record<string, MCPServerConfig>;
    showToolDescriptions?: boolean;
}
export declare const ContextSummaryDisplay: React.FC<ContextSummaryDisplayProps>;
export {};
