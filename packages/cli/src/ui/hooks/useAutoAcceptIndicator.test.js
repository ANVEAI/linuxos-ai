/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { describe, it, expect, vi, beforeEach, } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAutoAcceptIndicator } from './useAutoAcceptIndicator.js';
import { Config, ApprovalMode, } from '@google/gemini-cli-core';
import { useInput } from 'ink';
vi.mock('ink');
vi.mock('@google/gemini-cli-core', async () => {
    const actualServerModule = (await vi.importActual('@google/gemini-cli-core'));
    return {
        ...actualServerModule,
        Config: vi.fn(),
    };
});
describe('useAutoAcceptIndicator', () => {
    let mockConfigInstance;
    let capturedUseInputHandler;
    let mockedInkUseInput;
    beforeEach(() => {
        vi.resetAllMocks();
        Config.mockImplementation(() => {
            const instanceGetApprovalModeMock = vi.fn();
            const instanceSetApprovalModeMock = vi.fn();
            const instance = {
                getApprovalMode: instanceGetApprovalModeMock,
                setApprovalMode: instanceSetApprovalModeMock,
                getCoreTools: vi.fn().mockReturnValue([]),
                getToolDiscoveryCommand: vi.fn().mockReturnValue(undefined),
                getTargetDir: vi.fn().mockReturnValue('.'),
                getApiKey: vi.fn().mockReturnValue('test-api-key'),
                getModel: vi.fn().mockReturnValue('test-model'),
                getSandbox: vi.fn().mockReturnValue(false),
                getDebugMode: vi.fn().mockReturnValue(false),
                getQuestion: vi.fn().mockReturnValue(undefined),
                getFullContext: vi.fn().mockReturnValue(false),
                getUserAgent: vi.fn().mockReturnValue('test-user-agent'),
                getUserMemory: vi.fn().mockReturnValue(''),
                getGeminiMdFileCount: vi.fn().mockReturnValue(0),
                getToolRegistry: vi
                    .fn()
                    .mockReturnValue({ discoverTools: vi.fn() }),
            };
            instanceSetApprovalModeMock.mockImplementation((value) => {
                instanceGetApprovalModeMock.mockReturnValue(value);
            });
            return instance;
        });
        mockedInkUseInput = useInput;
        mockedInkUseInput.mockImplementation((handler) => {
            capturedUseInputHandler = handler;
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mockConfigInstance = new Config();
    });
    it('should initialize with ApprovalMode.AUTO_EDIT if config.getApprovalMode returns ApprovalMode.AUTO_EDIT', () => {
        mockConfigInstance.getApprovalMode.mockReturnValue(ApprovalMode.AUTO_EDIT);
        const { result } = renderHook(() => useAutoAcceptIndicator({
            config: mockConfigInstance,
        }));
        expect(result.current).toBe(ApprovalMode.AUTO_EDIT);
        expect(mockConfigInstance.getApprovalMode).toHaveBeenCalledTimes(1);
    });
    it('should initialize with ApprovalMode.DEFAULT if config.getApprovalMode returns ApprovalMode.DEFAULT', () => {
        mockConfigInstance.getApprovalMode.mockReturnValue(ApprovalMode.DEFAULT);
        const { result } = renderHook(() => useAutoAcceptIndicator({
            config: mockConfigInstance,
        }));
        expect(result.current).toBe(ApprovalMode.DEFAULT);
        expect(mockConfigInstance.getApprovalMode).toHaveBeenCalledTimes(1);
    });
    it('should initialize with ApprovalMode.YOLO if config.getApprovalMode returns ApprovalMode.YOLO', () => {
        mockConfigInstance.getApprovalMode.mockReturnValue(ApprovalMode.YOLO);
        const { result } = renderHook(() => useAutoAcceptIndicator({
            config: mockConfigInstance,
        }));
        expect(result.current).toBe(ApprovalMode.YOLO);
        expect(mockConfigInstance.getApprovalMode).toHaveBeenCalledTimes(1);
    });
    it('should toggle the indicator and update config when Shift+Tab or Ctrl+Y is pressed', () => {
        mockConfigInstance.getApprovalMode.mockReturnValue(ApprovalMode.DEFAULT);
        const { result } = renderHook(() => useAutoAcceptIndicator({
            config: mockConfigInstance,
        }));
        expect(result.current).toBe(ApprovalMode.DEFAULT);
        act(() => {
            capturedUseInputHandler('', { tab: true, shift: true });
        });
        expect(mockConfigInstance.setApprovalMode).toHaveBeenCalledWith(ApprovalMode.AUTO_EDIT);
        expect(result.current).toBe(ApprovalMode.AUTO_EDIT);
        act(() => {
            capturedUseInputHandler('y', { ctrl: true });
        });
        expect(mockConfigInstance.setApprovalMode).toHaveBeenCalledWith(ApprovalMode.YOLO);
        expect(result.current).toBe(ApprovalMode.YOLO);
        act(() => {
            capturedUseInputHandler('y', { ctrl: true });
        });
        expect(mockConfigInstance.setApprovalMode).toHaveBeenCalledWith(ApprovalMode.DEFAULT);
        expect(result.current).toBe(ApprovalMode.DEFAULT);
        act(() => {
            capturedUseInputHandler('y', { ctrl: true });
        });
        expect(mockConfigInstance.setApprovalMode).toHaveBeenCalledWith(ApprovalMode.YOLO);
        expect(result.current).toBe(ApprovalMode.YOLO);
        act(() => {
            capturedUseInputHandler('', { tab: true, shift: true });
        });
        expect(mockConfigInstance.setApprovalMode).toHaveBeenCalledWith(ApprovalMode.AUTO_EDIT);
        expect(result.current).toBe(ApprovalMode.AUTO_EDIT);
        act(() => {
            capturedUseInputHandler('', { tab: true, shift: true });
        });
        expect(mockConfigInstance.setApprovalMode).toHaveBeenCalledWith(ApprovalMode.DEFAULT);
        expect(result.current).toBe(ApprovalMode.DEFAULT);
    });
    it('should not toggle if only one key or other keys combinations are pressed', () => {
        mockConfigInstance.getApprovalMode.mockReturnValue(ApprovalMode.DEFAULT);
        renderHook(() => useAutoAcceptIndicator({
            config: mockConfigInstance,
        }));
        act(() => {
            capturedUseInputHandler('', { tab: true, shift: false });
        });
        expect(mockConfigInstance.setApprovalMode).not.toHaveBeenCalled();
        act(() => {
            capturedUseInputHandler('', { tab: false, shift: true });
        });
        expect(mockConfigInstance.setApprovalMode).not.toHaveBeenCalled();
        act(() => {
            capturedUseInputHandler('a', { tab: false, shift: false });
        });
        expect(mockConfigInstance.setApprovalMode).not.toHaveBeenCalled();
        act(() => {
            capturedUseInputHandler('y', { tab: true });
        });
        expect(mockConfigInstance.setApprovalMode).not.toHaveBeenCalled();
        act(() => {
            capturedUseInputHandler('a', { ctrl: true });
        });
        expect(mockConfigInstance.setApprovalMode).not.toHaveBeenCalled();
        act(() => {
            capturedUseInputHandler('y', { shift: true });
        });
        expect(mockConfigInstance.setApprovalMode).not.toHaveBeenCalled();
        act(() => {
            capturedUseInputHandler('a', { ctrl: true, shift: true });
        });
        expect(mockConfigInstance.setApprovalMode).not.toHaveBeenCalled();
    });
    it('should update indicator when config value changes externally (useEffect dependency)', () => {
        mockConfigInstance.getApprovalMode.mockReturnValue(ApprovalMode.DEFAULT);
        const { result, rerender } = renderHook((props) => useAutoAcceptIndicator(props), {
            initialProps: {
                config: mockConfigInstance,
            },
        });
        expect(result.current).toBe(ApprovalMode.DEFAULT);
        mockConfigInstance.getApprovalMode.mockReturnValue(ApprovalMode.AUTO_EDIT);
        rerender({ config: mockConfigInstance });
        expect(result.current).toBe(ApprovalMode.AUTO_EDIT);
        expect(mockConfigInstance.getApprovalMode).toHaveBeenCalledTimes(3);
    });
});
//# sourceMappingURL=useAutoAcceptIndicator.test.js.map