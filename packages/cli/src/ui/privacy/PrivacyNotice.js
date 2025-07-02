/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box } from 'ink';
import { AuthType } from '@google/gemini-cli-core';
import { GeminiPrivacyNotice } from './GeminiPrivacyNotice.js';
import { CloudPaidPrivacyNotice } from './CloudPaidPrivacyNotice.js';
import { CloudFreePrivacyNotice } from './CloudFreePrivacyNotice.js';
const PrivacyNoticeText = ({ config, onExit, }) => {
    const authType = config.getContentGeneratorConfig()?.authType;
    switch (authType) {
        case AuthType.USE_GEMINI:
            return <GeminiPrivacyNotice onExit={onExit}/>;
        case AuthType.USE_VERTEX_AI:
            return <CloudPaidPrivacyNotice onExit={onExit}/>;
        case AuthType.LOGIN_WITH_GOOGLE:
        default:
            return <CloudFreePrivacyNotice config={config} onExit={onExit}/>;
    }
};
export const PrivacyNotice = ({ onExit, config }) => (<Box borderStyle="round" padding={1} flexDirection="column">
    <PrivacyNoticeText config={config} onExit={onExit}/>
  </Box>);
//# sourceMappingURL=PrivacyNotice.js.map