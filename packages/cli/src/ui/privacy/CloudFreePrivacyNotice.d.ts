/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Config } from '@google/gemini-cli-core';
interface CloudFreePrivacyNoticeProps {
    config: Config;
    onExit: () => void;
}
export declare const CloudFreePrivacyNotice: ({ config, onExit, }: CloudFreePrivacyNoticeProps) => import("react").JSX.Element;
export {};
