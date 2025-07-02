/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GenerateContentConfig, SchemaUnion, PartListUnion, Content, GenerateContentResponse } from '@google/genai';
import { Turn, ServerGeminiStreamEvent, ChatCompressionInfo } from './turn.js';
import { Config } from '../config/config.js';
import { GeminiChat } from './geminiChat.js';
import { ContentGenerator, ContentGeneratorConfig } from './contentGenerator.js';
export declare class GeminiClient {
    private config;
    private chat?;
    private contentGenerator?;
    private model;
    private embeddingModel;
    private generateContentConfig;
    private readonly MAX_TURNS;
    private readonly TOKEN_THRESHOLD_FOR_SUMMARIZATION;
    constructor(config: Config);
    initialize(contentGeneratorConfig: ContentGeneratorConfig): Promise<void>;
    getContentGenerator(): ContentGenerator;
    addHistory(content: Content): Promise<void>;
    getChat(): GeminiChat;
    getHistory(): Promise<Content[]>;
    setHistory(history: Content[]): Promise<void>;
    resetChat(): Promise<void>;
    private getEnvironment;
    private startChat;
    sendMessageStream(request: PartListUnion, signal: AbortSignal, turns?: number): AsyncGenerator<ServerGeminiStreamEvent, Turn>;
    generateJson(contents: Content[], schema: SchemaUnion, abortSignal: AbortSignal, model?: string, config?: GenerateContentConfig): Promise<Record<string, unknown>>;
    generateContent(contents: Content[], generationConfig: GenerateContentConfig, abortSignal: AbortSignal): Promise<GenerateContentResponse>;
    generateEmbedding(texts: string[]): Promise<number[][]>;
    tryCompressChat(force?: boolean): Promise<ChatCompressionInfo | null>;
    /**
     * Handles fallback to Flash model when persistent 429 errors occur for OAuth users.
     * Uses a fallback handler if provided by the config, otherwise returns null.
     */
    private handleFlashFallback;
}
