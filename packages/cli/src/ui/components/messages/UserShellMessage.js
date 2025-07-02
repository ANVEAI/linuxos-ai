/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../../colors.js';
export const UserShellMessage = ({ text }) => {
    // Remove leading '!' if present, as App.tsx adds it for the processor.
    const commandToDisplay = text.startsWith('!') ? text.substring(1) : text;
    return (<Box>
      <Text color={Colors.AccentCyan}>$ </Text>
      <Text>{commandToDisplay}</Text>
    </Box>);
};
//# sourceMappingURL=UserShellMessage.js.map