/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { describe, it, expect, vi } from 'vitest';
import { createContentGenerator, AuthType } from './contentGenerator.js';
import { createCodeAssistContentGenerator } from '../code_assist/codeAssist.js';
import { GoogleGenAI } from '@google/genai';
vi.mock('../code_assist/codeAssist.js');
vi.mock('@google/genai');
describe('contentGenerator', () => {
    it('should create a CodeAssistContentGenerator', async () => {
        const mockGenerator = {};
        vi.mocked(createCodeAssistContentGenerator).mockResolvedValue(mockGenerator);
        const generator = await createContentGenerator({
            model: 'test-model',
            authType: AuthType.LOGIN_WITH_GOOGLE,
        });
        expect(createCodeAssistContentGenerator).toHaveBeenCalled();
        expect(generator).toBe(mockGenerator);
    });
    it('should create a GoogleGenAI content generator', async () => {
        const mockGenerator = {
            models: {},
        };
        vi.mocked(GoogleGenAI).mockImplementation(() => mockGenerator);
        const generator = await createContentGenerator({
            model: 'test-model',
            apiKey: 'test-api-key',
            authType: AuthType.USE_GEMINI,
        });
        expect(GoogleGenAI).toHaveBeenCalledWith({
            apiKey: 'test-api-key',
            vertexai: undefined,
            httpOptions: {
                headers: {
                    'User-Agent': expect.any(String),
                },
            },
        });
        expect(generator).toBe(mockGenerator.models);
    });
});
//# sourceMappingURL=contentGenerator.test.js.map