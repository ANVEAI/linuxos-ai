/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { SlashCommand } from '../hooks/slashCommandProcessor.js';
interface Help {
    commands: SlashCommand[];
}
export declare const Help: React.FC<Help>;
export {};
