/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
/**
 * Represents a single option for the RadioButtonSelect.
 * Requires a label for display and a value to be returned on selection.
 */
export interface RadioSelectItem<T> {
    label: string;
    value: T;
    disabled?: boolean;
}
/**
 * Props for the RadioButtonSelect component.
 * @template T The type of the value associated with each radio item.
 */
export interface RadioButtonSelectProps<T> {
    /** An array of items to display as radio options. */
    items: Array<RadioSelectItem<T> & {
        themeNameDisplay?: string;
        themeTypeDisplay?: string;
    }>;
    /** The initial index selected */
    initialIndex?: number;
    /** Function called when an item is selected. Receives the `value` of the selected item. */
    onSelect: (value: T) => void;
    /** Function called when an item is highlighted. Receives the `value` of the selected item. */
    onHighlight?: (value: T) => void;
    /** Whether this select input is currently focused and should respond to input. */
    isFocused?: boolean;
}
/**
 * A specialized SelectInput component styled to look like radio buttons.
 * It uses '◉' for selected and '○' for unselected items.
 *
 * @template T The type of the value associated with each radio item.
 */
export declare function RadioButtonSelect<T>({ items, initialIndex, onSelect, onHighlight, isFocused, }: RadioButtonSelectProps<T>): React.JSX.Element;
