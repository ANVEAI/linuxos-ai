/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export interface Suggestion {
    label: string;
    value: string;
    description?: string;
}
interface SuggestionsDisplayProps {
    suggestions: Suggestion[];
    activeIndex: number;
    isLoading: boolean;
    width: number;
    scrollOffset: number;
    userInput: string;
}
export declare const MAX_SUGGESTIONS_TO_SHOW = 8;
export declare function SuggestionsDisplay({ suggestions, activeIndex, isLoading, width, scrollOffset, userInput, }: SuggestionsDisplayProps): import("react").JSX.Element | null;
export {};
