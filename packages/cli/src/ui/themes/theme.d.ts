/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { CSSProperties } from 'react';
export type ThemeType = 'light' | 'dark' | 'ansi';
export interface ColorsTheme {
    type: ThemeType;
    Background: string;
    Foreground: string;
    LightBlue: string;
    AccentBlue: string;
    AccentPurple: string;
    AccentCyan: string;
    AccentGreen: string;
    AccentYellow: string;
    AccentRed: string;
    Comment: string;
    Gray: string;
    GradientColors?: string[];
}
export declare const lightTheme: ColorsTheme;
export declare const darkTheme: ColorsTheme;
export declare const ansiTheme: ColorsTheme;
export declare class Theme {
    readonly name: string;
    readonly type: ThemeType;
    readonly colors: ColorsTheme;
    /**
     * The default foreground color for text when no specific highlight rule applies.
     * This is an Ink-compatible color string (hex or name).
     */
    readonly defaultColor: string;
    /**
     * Stores the mapping from highlight.js class names (e.g., 'hljs-keyword')
     * to Ink-compatible color strings (hex or name).
     */
    protected readonly _colorMap: Readonly<Record<string, string>>;
    private static readonly cssNameToHexMap;
    private static readonly inkSupportedNames;
    /**
     * Creates a new Theme instance.
     * @param name The name of the theme.
     * @param rawMappings The raw CSSProperties mappings from a react-syntax-highlighter theme object.
     */
    constructor(name: string, type: ThemeType, rawMappings: Record<string, CSSProperties>, colors: ColorsTheme);
    /**
     * Gets the Ink-compatible color string for a given highlight.js class name.
     * @param hljsClass The highlight.js class name (e.g., 'hljs-keyword', 'hljs-string').
     * @returns The corresponding Ink color string (hex or name) if it exists.
     */
    getInkColor(hljsClass: string): string | undefined;
    /**
     * Resolves a CSS color value (name or hex) into an Ink-compatible color string.
     * @param colorValue The raw color string (e.g., 'blue', '#ff0000', 'darkkhaki').
     * @returns An Ink-compatible color string (hex or name), or undefined if not resolvable.
     */
    private static _resolveColor;
    /**
     * Builds the internal map from highlight.js class names to Ink-compatible color strings.
     * This method is protected and primarily intended for use by the constructor.
     * @param hljsTheme The raw CSSProperties mappings from a react-syntax-highlighter theme object.
     * @returns An Ink-compatible theme map (Record<string, string>).
     */
    protected _buildColorMap(hljsTheme: Record<string, CSSProperties>): Record<string, string>;
}
