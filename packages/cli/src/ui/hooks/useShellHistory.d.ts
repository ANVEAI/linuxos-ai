/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare function useShellHistory(projectRoot: string): {
    addCommandToHistory: (command: string) => void;
    getPreviousCommand: () => string | null;
    getNextCommand: () => string | null;
    resetHistoryPosition: () => void;
};
