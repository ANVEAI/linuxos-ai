/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Theme, ThemeType } from './theme.js';
export interface ThemeDisplay {
    name: string;
    type: ThemeType;
}
export declare const DEFAULT_THEME: Theme;
declare class ThemeManager {
    private readonly availableThemes;
    private activeTheme;
    constructor();
    /**
     * Returns a list of available theme names.
     */
    getAvailableThemes(): ThemeDisplay[];
    /**
     * Sets the active theme.
     * @param themeName The name of the theme to activate.
     * @returns True if the theme was successfully set, false otherwise.
     */
    setActiveTheme(themeName: string | undefined): boolean;
    findThemeByName(themeName: string | undefined): Theme | undefined;
    /**
     * Returns the currently active theme object.
     */
    getActiveTheme(): Theme;
}
export declare const themeManager: ThemeManager;
export {};
