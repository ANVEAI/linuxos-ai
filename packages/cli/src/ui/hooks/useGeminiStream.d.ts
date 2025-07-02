/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Config, GeminiClient, EditorType, ThoughtSummary } from '@google/gemini-cli-core';
import { type PartListUnion } from '@google/genai';
import { StreamingState, HistoryItem, HistoryItemWithoutId } from '../types.js';
import { UseHistoryManagerReturn } from './useHistoryManager.js';
export declare function mergePartListUnions(list: PartListUnion[]): PartListUnion;
/**
 * Manages the Gemini stream, including user input, command processing,
 * API interaction, and tool call lifecycle.
 */
export declare const useGeminiStream: (geminiClient: GeminiClient, history: HistoryItem[], addItem: UseHistoryManagerReturn["addItem"], setShowHelp: React.Dispatch<React.SetStateAction<boolean>>, config: Config, onDebugMessage: (message: string) => void, handleSlashCommand: (cmd: PartListUnion) => Promise<import("./slashCommandProcessor.js").SlashCommandActionReturn | boolean>, shellModeActive: boolean, getPreferredEditor: () => EditorType | undefined, onAuthError: () => void, performMemoryRefresh: () => Promise<void>) => {
    streamingState: StreamingState;
    submitQuery: (query: PartListUnion, options?: {
        isContinuation: boolean;
    }) => Promise<void>;
    initError: string | null;
    pendingHistoryItems: HistoryItemWithoutId[];
    thought: ThoughtSummary | null;
};
