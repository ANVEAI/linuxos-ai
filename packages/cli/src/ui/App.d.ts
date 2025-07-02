/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { LoadedSettings } from '../config/settings.js';
import { type Config } from '@google/gemini-cli-core';
interface AppProps {
    config: Config;
    settings: LoadedSettings;
    startupWarnings?: string[];
}
export declare const AppWrapper: (props: AppProps) => import("react").JSX.Element;
export {};
