/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ConsoleMessageItem } from '../types.js';
interface UseConsolePatcherParams {
    onNewMessage: (message: Omit<ConsoleMessageItem, 'id'>) => void;
    debugMode: boolean;
}
export declare const useConsolePatcher: ({ onNewMessage, debugMode, }: UseConsolePatcherParams) => void;
export {};
