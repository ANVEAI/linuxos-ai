/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { HistoryItemWithoutId } from '../types.js';
import { Config, GeminiClient } from '@google/gemini-cli-core';
import { type PartListUnion } from '@google/genai';
import { UseHistoryManagerReturn } from './useHistoryManager.js';
/**
 * Hook to process shell commands.
 * Orchestrates command execution and updates history and agent context.
 */
export declare const useShellCommandProcessor: (addItemToHistory: UseHistoryManagerReturn["addItem"], setPendingHistoryItem: React.Dispatch<React.SetStateAction<HistoryItemWithoutId | null>>, onExec: (command: Promise<void>) => void, onDebugMessage: (message: string) => void, config: Config, geminiClient: GeminiClient) => {
    handleShellCommand: (rawQuery: PartListUnion, abortSignal: AbortSignal) => boolean;
};
