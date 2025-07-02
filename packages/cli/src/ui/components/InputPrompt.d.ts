/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { TextBuffer } from './shared/text-buffer.js';
import { SlashCommand } from '../hooks/slashCommandProcessor.js';
import { Config } from '@google/gemini-cli-core';
export interface InputPromptProps {
    buffer: TextBuffer;
    onSubmit: (value: string) => void;
    userMessages: readonly string[];
    onClearScreen: () => void;
    config: Config;
    slashCommands: SlashCommand[];
    placeholder?: string;
    focus?: boolean;
    inputWidth: number;
    suggestionsWidth: number;
    shellModeActive: boolean;
    setShellModeActive: (value: boolean) => void;
}
export declare const InputPrompt: React.FC<InputPromptProps>;
