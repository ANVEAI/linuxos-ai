/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Config, FileDiscoveryService } from '@google/gemini-cli-core';
import { Settings } from './settings.js';
import { Extension } from './extension.js';
export declare function loadHierarchicalGeminiMemory(currentWorkingDirectory: string, debugMode: boolean, fileService: FileDiscoveryService, extensionContextFilePaths?: string[]): Promise<{
    memoryContent: string;
    fileCount: number;
}>;
export declare function loadCliConfig(settings: Settings, extensions: Extension[], sessionId: string): Promise<Config>;
export declare function loadEnvironment(): void;
