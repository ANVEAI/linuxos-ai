/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { allowEditorTypeInSandbox, checkHasEditorType, } from '@google/gemini-cli-core';
export const EDITOR_DISPLAY_NAMES = {
    zed: 'Zed',
    vscode: 'VS Code',
    vscodium: 'VSCodium',
    windsurf: 'Windsurf',
    cursor: 'Cursor',
    vim: 'Vim',
    neovim: 'Neovim',
};
class EditorSettingsManager {
    availableEditors;
    constructor() {
        const editorTypes = [
            'zed',
            'vscode',
            'vscodium',
            'windsurf',
            'cursor',
            'vim',
            'neovim',
        ];
        this.availableEditors = [
            {
                name: 'None',
                type: 'not_set',
                disabled: false,
            },
            ...editorTypes.map((type) => {
                const hasEditor = checkHasEditorType(type);
                const isAllowedInSandbox = allowEditorTypeInSandbox(type);
                let labelSuffix = !isAllowedInSandbox
                    ? ' (Not available in sandbox)'
                    : '';
                labelSuffix = !hasEditor ? ' (Not installed)' : labelSuffix;
                return {
                    name: EDITOR_DISPLAY_NAMES[type] + labelSuffix,
                    type,
                    disabled: !hasEditor || !isAllowedInSandbox,
                };
            }),
        ];
    }
    getAvailableEditorDisplays() {
        return this.availableEditors;
    }
}
export const editorSettingsManager = new EditorSettingsManager();
//# sourceMappingURL=editorSettingsManager.js.map