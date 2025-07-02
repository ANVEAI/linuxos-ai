/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Box } from 'ink';
import { MarkdownDisplay } from '../../utils/MarkdownDisplay.js';
/*
 * Gemini message content is a semi-hacked component. The intention is to represent a partial
 * of GeminiMessage and is only used when a response gets too long. In that instance messages
 * are split into multiple GeminiMessageContent's to enable the root <Static> component in
 * App.tsx to be as performant as humanly possible.
 */
export const GeminiMessageContent = ({ text, isPending, availableTerminalHeight, terminalWidth, }) => {
    const originalPrefix = '✦ ';
    const prefixWidth = originalPrefix.length;
    return (<Box flexDirection="column" paddingLeft={prefixWidth}>
      <MarkdownDisplay text={text} isPending={isPending} availableTerminalHeight={availableTerminalHeight} terminalWidth={terminalWidth}/>
    </Box>);
};
//# sourceMappingURL=GeminiMessageContent.js.map