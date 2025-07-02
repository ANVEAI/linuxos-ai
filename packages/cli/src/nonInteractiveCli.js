/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { executeToolCall, shutdownTelemetry, isTelemetrySdkInitialized, } from '@google/gemini-cli-core';
import { parseAndFormatApiError } from './ui/utils/errorParsing.js';
function getResponseText(response) {
    if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content &&
            candidate.content.parts &&
            candidate.content.parts.length > 0) {
            // We are running in headless mode so we don't need to return thoughts to STDOUT.
            const thoughtPart = candidate.content.parts[0];
            if (thoughtPart?.thought) {
                return null;
            }
            return candidate.content.parts
                .filter((part) => part.text)
                .map((part) => part.text)
                .join('');
        }
    }
    return null;
}
export async function runNonInteractive(config, input) {
    // Handle EPIPE errors when the output is piped to a command that closes early.
    process.stdout.on('error', (err) => {
        if (err.code === 'EPIPE') {
            // Exit gracefully if the pipe is closed.
            process.exit(0);
        }
    });
    const geminiClient = config.getGeminiClient();
    const toolRegistry = await config.getToolRegistry();
    const chat = await geminiClient.getChat();
    const abortController = new AbortController();
    let currentMessages = [{ role: 'user', parts: [{ text: input }] }];
    try {
        while (true) {
            const functionCalls = [];
            const responseStream = await chat.sendMessageStream({
                message: currentMessages[0]?.parts || [], // Ensure parts are always provided
                config: {
                    abortSignal: abortController.signal,
                    tools: [
                        { functionDeclarations: toolRegistry.getFunctionDeclarations() },
                    ],
                },
            });
            for await (const resp of responseStream) {
                if (abortController.signal.aborted) {
                    console.error('Operation cancelled.');
                    return;
                }
                const textPart = getResponseText(resp);
                if (textPart) {
                    process.stdout.write(textPart);
                }
                if (resp.functionCalls) {
                    functionCalls.push(...resp.functionCalls);
                }
            }
            if (functionCalls.length > 0) {
                const toolResponseParts = [];
                for (const fc of functionCalls) {
                    const callId = fc.id ?? `${fc.name}-${Date.now()}`;
                    const requestInfo = {
                        callId,
                        name: fc.name,
                        args: (fc.args ?? {}),
                        isClientInitiated: false,
                    };
                    const toolResponse = await executeToolCall(config, requestInfo, toolRegistry, abortController.signal);
                    if (toolResponse.error) {
                        const isToolNotFound = toolResponse.error.message.includes('not found in registry');
                        console.error(`Error executing tool ${fc.name}: ${toolResponse.resultDisplay || toolResponse.error.message}`);
                        if (!isToolNotFound) {
                            process.exit(1);
                        }
                    }
                    if (toolResponse.responseParts) {
                        const parts = Array.isArray(toolResponse.responseParts)
                            ? toolResponse.responseParts
                            : [toolResponse.responseParts];
                        for (const part of parts) {
                            if (typeof part === 'string') {
                                toolResponseParts.push({ text: part });
                            }
                            else if (part) {
                                toolResponseParts.push(part);
                            }
                        }
                    }
                }
                currentMessages = [{ role: 'user', parts: toolResponseParts }];
            }
            else {
                process.stdout.write('\n'); // Ensure a final newline
                return;
            }
        }
    }
    catch (error) {
        console.error(parseAndFormatApiError(error, config.getContentGeneratorConfig().authType));
        process.exit(1);
    }
    finally {
        if (isTelemetrySdkInitialized()) {
            await shutdownTelemetry();
        }
    }
}
//# sourceMappingURL=nonInteractiveCli.js.map