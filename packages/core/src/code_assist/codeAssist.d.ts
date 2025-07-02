/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthType, ContentGenerator } from '../core/contentGenerator.js';
import { HttpOptions } from './server.js';
export declare function createCodeAssistContentGenerator(httpOptions: HttpOptions, authType: AuthType, sessionId?: string): Promise<ContentGenerator>;
