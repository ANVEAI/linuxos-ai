/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { PartListUnion } from '@google/genai';
import { Config } from '@google/gemini-cli-core';
import { UseHistoryManagerReturn } from './useHistoryManager.js';
interface HandleAtCommandParams {
    query: string;
    config: Config;
    addItem: UseHistoryManagerReturn['addItem'];
    onDebugMessage: (message: string) => void;
    messageId: number;
    signal: AbortSignal;
}
interface HandleAtCommandResult {
    processedQuery: PartListUnion | null;
    shouldProceed: boolean;
}
/**
 * Processes user input potentially containing one or more '@<path>' commands.
 * If found, it attempts to read the specified files/directories using the
 * 'read_many_files' tool. The user query is modified to include resolved paths,
 * and the content of the files is appended in a structured block.
 *
 * @returns An object indicating whether the main hook should proceed with an
 *          LLM call and the processed query parts (including file content).
 */
export declare function handleAtCommand({ query, config, addItem, onDebugMessage, messageId: userMessageTimestamp, signal, }: HandleAtCommandParams): Promise<HandleAtCommandResult>;
export {};
