/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect } from 'react';
import util from 'util';
export const useConsolePatcher = ({ onNewMessage, debugMode, }) => {
    useEffect(() => {
        const originalConsoleLog = console.log;
        const originalConsoleWarn = console.warn;
        const originalConsoleError = console.error;
        const originalConsoleDebug = console.debug;
        const formatArgs = (args) => util.format(...args);
        const patchConsoleMethod = (type, originalMethod) => (...args) => {
            if (debugMode) {
                originalMethod.apply(console, args);
            }
            // Then, if it's not a debug message or debugMode is on, pass to onNewMessage
            if (type !== 'debug' || debugMode) {
                onNewMessage({
                    type,
                    content: formatArgs(args),
                    count: 1,
                });
            }
        };
        console.log = patchConsoleMethod('log', originalConsoleLog);
        console.warn = patchConsoleMethod('warn', originalConsoleWarn);
        console.error = patchConsoleMethod('error', originalConsoleError);
        console.debug = patchConsoleMethod('debug', originalConsoleDebug);
        return () => {
            console.log = originalConsoleLog;
            console.warn = originalConsoleWarn;
            console.error = originalConsoleError;
            console.debug = originalConsoleDebug;
        };
    }, [onNewMessage, debugMode]);
};
//# sourceMappingURL=ConsolePatcher.js.map