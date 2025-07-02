/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Simple utility to validate objects against JSON Schemas
 */
export declare class SchemaValidator {
    /**
     * Validates data against a JSON schema
     * @param schema JSON Schema to validate against
     * @param data Data to validate
     * @returns True if valid, false otherwise
     */
    static validate(schema: Record<string, unknown>, data: unknown): boolean;
}
