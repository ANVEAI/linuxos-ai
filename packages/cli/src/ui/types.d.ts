/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ToolCallConfirmationDetails, ToolResultDisplay } from '@google/gemini-cli-core';
export declare enum StreamingState {
    Idle = "idle",
    Responding = "responding",
    WaitingForConfirmation = "waiting_for_confirmation"
}
export declare enum GeminiEventType {
    Content = "content",
    ToolCallRequest = "tool_call_request"
}
export declare enum ToolCallStatus {
    Pending = "Pending",
    Canceled = "Canceled",
    Confirming = "Confirming",
    Executing = "Executing",
    Success = "Success",
    Error = "Error"
}
export interface ToolCallEvent {
    type: 'tool_call';
    status: ToolCallStatus;
    callId: string;
    name: string;
    args: Record<string, never>;
    resultDisplay: ToolResultDisplay | undefined;
    confirmationDetails: ToolCallConfirmationDetails | undefined;
}
export interface IndividualToolCallDisplay {
    callId: string;
    name: string;
    description: string;
    resultDisplay: ToolResultDisplay | undefined;
    status: ToolCallStatus;
    confirmationDetails: ToolCallConfirmationDetails | undefined;
    renderOutputAsMarkdown?: boolean;
}
export interface CompressionProps {
    isPending: boolean;
    originalTokenCount: number | null;
    newTokenCount: number | null;
}
export interface HistoryItemBase {
    text?: string;
}
export type HistoryItemUser = HistoryItemBase & {
    type: 'user';
    text: string;
};
export type HistoryItemGemini = HistoryItemBase & {
    type: 'gemini';
    text: string;
};
export type HistoryItemGeminiContent = HistoryItemBase & {
    type: 'gemini_content';
    text: string;
};
export type HistoryItemInfo = HistoryItemBase & {
    type: 'info';
    text: string;
};
export type HistoryItemError = HistoryItemBase & {
    type: 'error';
    text: string;
};
export type HistoryItemAbout = HistoryItemBase & {
    type: 'about';
    cliVersion: string;
    osVersion: string;
    sandboxEnv: string;
    modelVersion: string;
    selectedAuthType: string;
    gcpProject: string;
};
export type HistoryItemStats = HistoryItemBase & {
    type: 'stats';
    duration: string;
};
export type HistoryItemModelStats = HistoryItemBase & {
    type: 'model_stats';
};
export type HistoryItemToolStats = HistoryItemBase & {
    type: 'tool_stats';
};
export type HistoryItemQuit = HistoryItemBase & {
    type: 'quit';
    duration: string;
};
export type HistoryItemToolGroup = HistoryItemBase & {
    type: 'tool_group';
    tools: IndividualToolCallDisplay[];
};
export type HistoryItemUserShell = HistoryItemBase & {
    type: 'user_shell';
    text: string;
};
export type HistoryItemCompression = HistoryItemBase & {
    type: 'compression';
    compression: CompressionProps;
};
export type HistoryItemWithoutId = HistoryItemUser | HistoryItemUserShell | HistoryItemGemini | HistoryItemGeminiContent | HistoryItemInfo | HistoryItemError | HistoryItemAbout | HistoryItemToolGroup | HistoryItemStats | HistoryItemModelStats | HistoryItemToolStats | HistoryItemQuit | HistoryItemCompression;
export type HistoryItem = HistoryItemWithoutId & {
    id: number;
};
export declare enum MessageType {
    INFO = "info",
    ERROR = "error",
    USER = "user",
    ABOUT = "about",
    STATS = "stats",
    MODEL_STATS = "model_stats",
    TOOL_STATS = "tool_stats",
    QUIT = "quit",
    GEMINI = "gemini",
    COMPRESSION = "compression"
}
export type Message = {
    type: MessageType.INFO | MessageType.ERROR | MessageType.USER;
    content: string;
    timestamp: Date;
} | {
    type: MessageType.ABOUT;
    timestamp: Date;
    cliVersion: string;
    osVersion: string;
    sandboxEnv: string;
    modelVersion: string;
    selectedAuthType: string;
    gcpProject: string;
    content?: string;
} | {
    type: MessageType.STATS;
    timestamp: Date;
    duration: string;
    content?: string;
} | {
    type: MessageType.MODEL_STATS;
    timestamp: Date;
    content?: string;
} | {
    type: MessageType.TOOL_STATS;
    timestamp: Date;
    content?: string;
} | {
    type: MessageType.QUIT;
    timestamp: Date;
    duration: string;
    content?: string;
} | {
    type: MessageType.COMPRESSION;
    compression: CompressionProps;
    timestamp: Date;
};
export interface ConsoleMessageItem {
    type: 'log' | 'warn' | 'error' | 'debug';
    content: string;
    count: number;
}
