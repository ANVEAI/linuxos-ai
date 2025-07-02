/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type PartListUnion } from '@google/genai';
import { UseHistoryManagerReturn } from './useHistoryManager.js';
import { Config } from '@google/gemini-cli-core';
import { HistoryItemWithoutId, HistoryItem } from '../types.js';
import { LoadedSettings } from '../../config/settings.js';
export interface SlashCommandActionReturn {
    shouldScheduleTool?: boolean;
    toolName?: string;
    toolArgs?: Record<string, unknown>;
    message?: string;
}
export interface SlashCommand {
    name: string;
    altName?: string;
    description?: string;
    completion?: () => Promise<string[]>;
    action: (mainCommand: string, subCommand?: string, args?: string) => void | SlashCommandActionReturn | Promise<void | SlashCommandActionReturn>;
}
/**
 * Hook to define and process slash commands (e.g., /help, /clear).
 */
export declare const useSlashCommandProcessor: (config: Config | null, settings: LoadedSettings, history: HistoryItem[], addItem: UseHistoryManagerReturn["addItem"], clearItems: UseHistoryManagerReturn["clearItems"], loadHistory: UseHistoryManagerReturn["loadHistory"], refreshStatic: () => void, setShowHelp: React.Dispatch<React.SetStateAction<boolean>>, onDebugMessage: (message: string) => void, openThemeDialog: () => void, openAuthDialog: () => void, openEditorDialog: () => void, performMemoryRefresh: () => Promise<void>, toggleCorgiMode: () => void, showToolDescriptions: boolean | undefined, setQuittingMessages: (message: HistoryItem[]) => void, openPrivacyNotice: () => void) => {
    handleSlashCommand: (rawQuery: PartListUnion) => Promise<SlashCommandActionReturn | boolean>;
    slashCommands: SlashCommand[];
    pendingHistoryItems: HistoryItemWithoutId[];
};
