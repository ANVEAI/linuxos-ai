/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Config } from '../config/config.js';
import { BaseTool, ToolResult, ToolCallConfirmationDetails } from './tools.js';
export interface ShellToolParams {
    command: string;
    description?: string;
    directory?: string;
}
export declare class ShellTool extends BaseTool<ShellToolParams, ToolResult> {
    private readonly config;
    static Name: string;
    private whitelist;
    constructor(config: Config);
    getDescription(params: ShellToolParams): string;
    getCommandRoot(command: string): string | undefined;
    isCommandAllowed(command: string): boolean;
    validateToolParams(params: ShellToolParams): string | null;
    shouldConfirmExecute(params: ShellToolParams, _abortSignal: AbortSignal): Promise<ToolCallConfirmationDetails | false>;
    execute(params: ShellToolParams, abortSignal: AbortSignal, updateOutput?: (chunk: string) => void): Promise<ToolResult>;
}
