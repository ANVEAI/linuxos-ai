/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { LoadedSettings, SettingScope } from '../../config/settings.js';
import { EditorType } from '@google/gemini-cli-core';
interface EditorDialogProps {
    onSelect: (editorType: EditorType | undefined, scope: SettingScope) => void;
    settings: LoadedSettings;
    onExit: () => void;
}
export declare function EditorSettingsDialog({ onSelect, settings, onExit, }: EditorDialogProps): React.JSX.Element;
export {};
