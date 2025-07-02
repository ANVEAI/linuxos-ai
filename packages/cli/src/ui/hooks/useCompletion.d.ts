/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Config } from '@google/gemini-cli-core';
import { Suggestion } from '../components/SuggestionsDisplay.js';
import { SlashCommand } from './slashCommandProcessor.js';
export interface UseCompletionReturn {
    suggestions: Suggestion[];
    activeSuggestionIndex: number;
    visibleStartIndex: number;
    showSuggestions: boolean;
    isLoadingSuggestions: boolean;
    setActiveSuggestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
    resetCompletionState: () => void;
    navigateUp: () => void;
    navigateDown: () => void;
}
export declare function useCompletion(query: string, cwd: string, isActive: boolean, slashCommands: SlashCommand[], config?: Config): UseCompletionReturn;
