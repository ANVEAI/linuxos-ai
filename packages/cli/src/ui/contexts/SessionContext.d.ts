/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { SessionMetrics, ModelMetrics } from '@google/gemini-cli-core';
export type { SessionMetrics, ModelMetrics };
interface SessionStatsState {
    sessionStartTime: Date;
    metrics: SessionMetrics;
    lastPromptTokenCount: number;
}
export interface ComputedSessionStats {
    totalApiTime: number;
    totalToolTime: number;
    agentActiveTime: number;
    apiTimePercent: number;
    toolTimePercent: number;
    cacheEfficiency: number;
    totalDecisions: number;
    successRate: number;
    agreementRate: number;
    totalCachedTokens: number;
    totalPromptTokens: number;
}
interface SessionStatsContextValue {
    stats: SessionStatsState;
}
export declare const SessionStatsProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useSessionStats: () => SessionStatsContextValue;
