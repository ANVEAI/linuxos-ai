/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
interface FooterProps {
    model: string;
    targetDir: string;
    branchName?: string;
    debugMode: boolean;
    debugMessage: string;
    corgiMode: boolean;
    errorCount: number;
    showErrorDetails: boolean;
    showMemoryUsage?: boolean;
    promptTokenCount: number;
}
export declare const Footer: React.FC<FooterProps>;
export {};
