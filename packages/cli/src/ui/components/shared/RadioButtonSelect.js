/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { Colors } from '../../colors.js';
/**
 * A specialized SelectInput component styled to look like radio buttons.
 * It uses '◉' for selected and '○' for unselected items.
 *
 * @template T The type of the value associated with each radio item.
 */
export function RadioButtonSelect({ items, initialIndex, onSelect, onHighlight, isFocused, // This prop indicates if the current RadioButtonSelect group is focused
 }) {
    const handleSelect = (item) => {
        onSelect(item.value);
    };
    const handleHighlight = (item) => {
        if (onHighlight) {
            onHighlight(item.value);
        }
    };
    /**
     * Custom indicator component displaying radio button style (◉/○).
     * Color changes based on whether the item is selected and if its group is focused.
     */
    function DynamicRadioIndicator({ isSelected = false, }) {
        return (<Box minWidth={2} flexShrink={0}>
        <Text color={isSelected ? Colors.AccentGreen : Colors.Foreground}>
          {isSelected ? '●' : '○'}
        </Text>
      </Box>);
    }
    /**
     * Custom item component for displaying the label.
     * Color changes based on whether the item is selected and if its group is focused.
     * Now also handles displaying theme type with custom color.
     */
    function CustomThemeItemComponent(props) {
        const { isSelected = false, label } = props;
        const itemWithThemeProps = props;
        let textColor = Colors.Foreground;
        if (isSelected) {
            textColor = Colors.AccentGreen;
        }
        else if (itemWithThemeProps.disabled === true) {
            textColor = Colors.Gray;
        }
        if (itemWithThemeProps.themeNameDisplay &&
            itemWithThemeProps.themeTypeDisplay) {
            return (<Text color={textColor} wrap="truncate">
          {itemWithThemeProps.themeNameDisplay}{' '}
          <Text color={Colors.Gray}>{itemWithThemeProps.themeTypeDisplay}</Text>
        </Text>);
        }
        return (<Text color={textColor} wrap="truncate">
        {label}
      </Text>);
    }
    initialIndex = initialIndex ?? 0;
    return (<SelectInput indicatorComponent={DynamicRadioIndicator} itemComponent={CustomThemeItemComponent} items={items} initialIndex={initialIndex} onSelect={handleSelect} onHighlight={handleHighlight} isFocused={isFocused}/>);
}
//# sourceMappingURL=RadioButtonSelect.js.map