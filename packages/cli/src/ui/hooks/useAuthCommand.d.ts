/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LoadedSettings, SettingScope } from '../../config/settings.js';
import { AuthType, Config } from '@google/gemini-cli-core';
export declare const useAuthCommand: (settings: LoadedSettings, setAuthError: (error: string | null) => void, config: Config) => {
    isAuthDialogOpen: boolean;
    openAuthDialog: () => void;
    handleAuthSelect: (authType: AuthType | undefined, scope: SettingScope) => Promise<void>;
    isAuthenticating: boolean;
    cancelAuthentication: () => void;
};
