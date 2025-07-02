/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useCallback, useEffect } from 'react';
import { clearCachedCredentialFile, getErrorMessage, } from '@google/gemini-cli-core';
export const useAuthCommand = (settings, setAuthError, config) => {
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(settings.merged.selectedAuthType === undefined);
    const openAuthDialog = useCallback(() => {
        setIsAuthDialogOpen(true);
    }, []);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    useEffect(() => {
        const authFlow = async () => {
            const authType = settings.merged.selectedAuthType;
            if (isAuthDialogOpen || !authType) {
                return;
            }
            try {
                setIsAuthenticating(true);
                await config.refreshAuth(authType);
                console.log(`Authenticated via "${authType}".`);
            }
            catch (e) {
                setAuthError(`Failed to login. Message: ${getErrorMessage(e)}`);
                openAuthDialog();
            }
            finally {
                setIsAuthenticating(false);
            }
        };
        void authFlow();
    }, [isAuthDialogOpen, settings, config, setAuthError, openAuthDialog]);
    const handleAuthSelect = useCallback(async (authType, scope) => {
        if (authType) {
            await clearCachedCredentialFile();
            settings.setValue(scope, 'selectedAuthType', authType);
        }
        setIsAuthDialogOpen(false);
        setAuthError(null);
    }, [settings, setAuthError]);
    const cancelAuthentication = useCallback(() => {
        setIsAuthenticating(false);
    }, []);
    return {
        isAuthDialogOpen,
        openAuthDialog,
        handleAuthSelect,
        isAuthenticating,
        cancelAuthentication,
    };
};
//# sourceMappingURL=useAuthCommand.js.map