/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as readline from 'readline';
import { fromCountTokenResponse, fromGenerateContentResponse, toCountTokenRequest, toGenerateContentRequest, } from './converter.js';
// TODO: Use production endpoint once it supports our methods.
export const CODE_ASSIST_ENDPOINT = 'https://cloudcode-pa.googleapis.com';
export const CODE_ASSIST_API_VERSION = 'v1internal';
export class CodeAssistServer {
    client;
    projectId;
    httpOptions;
    sessionId;
    constructor(client, projectId, httpOptions = {}, sessionId) {
        this.client = client;
        this.projectId = projectId;
        this.httpOptions = httpOptions;
        this.sessionId = sessionId;
    }
    async generateContentStream(req) {
        const resps = await this.requestStreamingPost('streamGenerateContent', toGenerateContentRequest(req, this.projectId, this.sessionId), req.config?.abortSignal);
        return (async function* () {
            for await (const resp of resps) {
                yield fromGenerateContentResponse(resp);
            }
        })();
    }
    async generateContent(req) {
        const resp = await this.requestPost('generateContent', toGenerateContentRequest(req, this.projectId, this.sessionId), req.config?.abortSignal);
        return fromGenerateContentResponse(resp);
    }
    async onboardUser(req) {
        return await this.requestPost('onboardUser', req);
    }
    async loadCodeAssist(req) {
        return await this.requestPost('loadCodeAssist', req);
    }
    async getCodeAssistGlobalUserSetting() {
        return await this.requestGet('getCodeAssistGlobalUserSetting');
    }
    async setCodeAssistGlobalUserSetting(req) {
        return await this.requestPost('setCodeAssistGlobalUserSetting', req);
    }
    async countTokens(req) {
        const resp = await this.requestPost('countTokens', toCountTokenRequest(req));
        return fromCountTokenResponse(resp);
    }
    async embedContent(_req) {
        throw Error();
    }
    async requestPost(method, req, signal) {
        const res = await this.client.request({
            url: this.getMethodUrl(method),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.httpOptions.headers,
            },
            responseType: 'json',
            body: JSON.stringify(req),
            signal,
        });
        return res.data;
    }
    async requestGet(method, signal) {
        const res = await this.client.request({
            url: this.getMethodUrl(method),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...this.httpOptions.headers,
            },
            responseType: 'json',
            signal,
        });
        return res.data;
    }
    async requestStreamingPost(method, req, signal) {
        const res = await this.client.request({
            url: this.getMethodUrl(method),
            method: 'POST',
            params: {
                alt: 'sse',
            },
            headers: {
                'Content-Type': 'application/json',
                ...this.httpOptions.headers,
            },
            responseType: 'stream',
            body: JSON.stringify(req),
            signal,
        });
        return (async function* () {
            const rl = readline.createInterface({
                input: res.data,
                crlfDelay: Infinity, // Recognizes '\r\n' and '\n' as line breaks
            });
            let bufferedLines = [];
            for await (const line of rl) {
                // blank lines are used to separate JSON objects in the stream
                if (line === '') {
                    if (bufferedLines.length === 0) {
                        continue; // no data to yield
                    }
                    yield JSON.parse(bufferedLines.join('\n'));
                    bufferedLines = []; // Reset the buffer after yielding
                }
                else if (line.startsWith('data: ')) {
                    bufferedLines.push(line.slice(6).trim());
                }
                else {
                    throw new Error(`Unexpected line format in response: ${line}`);
                }
            }
        })();
    }
    getMethodUrl(method) {
        const endpoint = process.env.CODE_ASSIST_ENDPOINT ?? CODE_ASSIST_ENDPOINT;
        return `${endpoint}/${CODE_ASSIST_API_VERSION}:${method}`;
    }
}
//# sourceMappingURL=server.js.map