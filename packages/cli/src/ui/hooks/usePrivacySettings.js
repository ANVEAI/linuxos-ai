/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GaxiosError } from 'gaxios';
import { useState, useEffect, useCallback } from 'react';
import { CodeAssistServer, UserTierId } from '@google/gemini-cli-core';
export const usePrivacySettings = (config) => {
    const [privacyState, setPrivacyState] = useState({
        isLoading: true,
    });
    useEffect(() => {
        const fetchInitialState = async () => {
            setPrivacyState({
                isLoading: true,
            });
            try {
                const server = getCodeAssistServer(config);
                const tier = await getTier(server);
                if (tier !== UserTierId.FREE) {
                    // We don't need to fetch opt-out info since non-free tier
                    // data gathering is already worked out some other way.
                    setPrivacyState({
                        isLoading: false,
                        isFreeTier: false,
                    });
                    return;
                }
                const optIn = await getRemoteDataCollectionOptIn(server);
                setPrivacyState({
                    isLoading: false,
                    isFreeTier: true,
                    dataCollectionOptIn: optIn,
                });
            }
            catch (e) {
                setPrivacyState({
                    isLoading: false,
                    error: e instanceof Error ? e.message : String(e),
                });
            }
        };
        fetchInitialState();
    }, [config]);
    const updateDataCollectionOptIn = useCallback(async (optIn) => {
        try {
            const server = getCodeAssistServer(config);
            const updatedOptIn = await setRemoteDataCollectionOptIn(server, optIn);
            setPrivacyState({
                isLoading: false,
                isFreeTier: true,
                dataCollectionOptIn: updatedOptIn,
            });
        }
        catch (e) {
            setPrivacyState({
                isLoading: false,
                error: e instanceof Error ? e.message : String(e),
            });
        }
    }, [config]);
    return {
        privacyState,
        updateDataCollectionOptIn,
    };
};
function getCodeAssistServer(config) {
    const server = config.getGeminiClient().getContentGenerator();
    // Neither of these cases should ever happen.
    if (!(server instanceof CodeAssistServer)) {
        throw new Error('Oauth not being used');
    }
    else if (!server.projectId) {
        throw new Error('Oauth not being used');
    }
    return server;
}
async function getTier(server) {
    const loadRes = await server.loadCodeAssist({
        cloudaicompanionProject: server.projectId,
        metadata: {
            ideType: 'IDE_UNSPECIFIED',
            platform: 'PLATFORM_UNSPECIFIED',
            pluginType: 'GEMINI',
            duetProject: server.projectId,
        },
    });
    if (!loadRes.currentTier) {
        throw new Error('User does not have a current tier');
    }
    return loadRes.currentTier.id;
}
async function getRemoteDataCollectionOptIn(server) {
    try {
        const resp = await server.getCodeAssistGlobalUserSetting();
        return resp.freeTierDataCollectionOptin;
    }
    catch (e) {
        if (e instanceof GaxiosError) {
            if (e.response?.status === 404) {
                return true;
            }
        }
        throw e;
    }
}
async function setRemoteDataCollectionOptIn(server, optIn) {
    const resp = await server.setCodeAssistGlobalUserSetting({
        cloudaicompanionProject: server.projectId,
        freeTierDataCollectionOptin: optIn,
    });
    return resp.freeTierDataCollectionOptin;
}
//# sourceMappingURL=usePrivacySettings.js.map