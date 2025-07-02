/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export function isFunctionResponse(content) {
    return (content.role === 'user' &&
        !!content.parts &&
        content.parts.every((part) => !!part.functionResponse));
}
//# sourceMappingURL=messageInspectors.js.map