/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import { useStreamingContext } from '../contexts/StreamingContext.js';
import { StreamingState } from '../types.js';
export const GeminiRespondingSpinner = ({ nonRespondingDisplay, spinnerType = 'dots' }) => {
    const streamingState = useStreamingContext();
    if (streamingState === StreamingState.Responding) {
        return <Spinner type={spinnerType}/>;
    }
    else if (nonRespondingDisplay) {
        return <Text>{nonRespondingDisplay}</Text>;
    }
    return null;
};
//# sourceMappingURL=GeminiRespondingSpinner.js.map