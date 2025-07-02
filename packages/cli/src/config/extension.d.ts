/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { MCPServerConfig } from '@google/gemini-cli-core';
export declare const EXTENSIONS_DIRECTORY_NAME: string;
export declare const EXTENSIONS_CONFIG_FILENAME = "gemini-extension.json";
export interface Extension {
    config: ExtensionConfig;
    contextFiles: string[];
}
export interface ExtensionConfig {
    name: string;
    version: string;
    mcpServers?: Record<string, MCPServerConfig>;
    contextFileName?: string | string[];
    excludeTools?: string[];
}
export declare function loadExtensions(workspaceDir: string): Extension[];
