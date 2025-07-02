/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Message } from '../types.js';
import { Config } from '@google/gemini-cli-core';
import { LoadedSettings } from '../../config/settings.js';
export declare function createShowMemoryAction(config: Config | null, settings: LoadedSettings, addMessage: (message: Message) => void): () => Promise<void>;
