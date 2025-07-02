/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FunctionDeclaration } from '@google/genai';
import { Tool, ToolResult, BaseTool } from './tools.js';
import { Config } from '../config/config.js';
type ToolParams = Record<string, unknown>;
export declare class DiscoveredTool extends BaseTool<ToolParams, ToolResult> {
    private readonly config;
    readonly name: string;
    readonly description: string;
    readonly parameterSchema: Record<string, unknown>;
    constructor(config: Config, name: string, description: string, parameterSchema: Record<string, unknown>);
    execute(params: ToolParams): Promise<ToolResult>;
}
export declare class ToolRegistry {
    private tools;
    private discovery;
    private config;
    constructor(config: Config);
    /**
     * Registers a tool definition.
     * @param tool - The tool object containing schema and execution logic.
     */
    registerTool(tool: Tool): void;
    /**
     * Discovers tools from project (if available and configured).
     * Can be called multiple times to update discovered tools.
     */
    discoverTools(): Promise<void>;
    /**
     * Retrieves the list of tool schemas (FunctionDeclaration array).
     * Extracts the declarations from the ToolListUnion structure.
     * Includes discovered (vs registered) tools if configured.
     * @returns An array of FunctionDeclarations.
     */
    getFunctionDeclarations(): FunctionDeclaration[];
    /**
     * Returns an array of all registered and discovered tool instances.
     */
    getAllTools(): Tool[];
    /**
     * Returns an array of tools registered from a specific MCP server.
     */
    getToolsByServer(serverName: string): Tool[];
    /**
     * Get the definition of a specific tool.
     */
    getTool(name: string): Tool | undefined;
}
export {};
