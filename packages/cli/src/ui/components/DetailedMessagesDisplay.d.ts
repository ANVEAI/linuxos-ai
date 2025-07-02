/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { ConsoleMessageItem } from '../types.js';
interface DetailedMessagesDisplayProps {
    messages: ConsoleMessageItem[];
    maxHeight: number | undefined;
    width: number;
}
export declare const DetailedMessagesDisplay: React.FC<DetailedMessagesDisplayProps>;
export {};
