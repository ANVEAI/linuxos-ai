/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { MCPServerConfig, BugCommandSettings, TelemetrySettings, AuthType } from '@google/gemini-cli-core';
export declare const SETTINGS_DIRECTORY_NAME = ".gemini";
export declare const USER_SETTINGS_DIR: string;
export declare const USER_SETTINGS_PATH: string;
export declare enum SettingScope {
    User = "User",
    Workspace = "Workspace"
}
export interface CheckpointingSettings {
    enabled?: boolean;
}
export interface AccessibilitySettings {
    disableLoadingPhrases?: boolean;
}
export interface Settings {
    theme?: string;
    selectedAuthType?: AuthType;
    sandbox?: boolean | string;
    coreTools?: string[];
    excludeTools?: string[];
    toolDiscoveryCommand?: string;
    toolCallCommand?: string;
    mcpServerCommand?: string;
    mcpServers?: Record<string, MCPServerConfig>;
    showMemoryUsage?: boolean;
    contextFileName?: string | string[];
    accessibility?: AccessibilitySettings;
    telemetry?: TelemetrySettings;
    usageStatisticsEnabled?: boolean;
    preferredEditor?: string;
    bugCommand?: BugCommandSettings;
    checkpointing?: CheckpointingSettings;
    autoConfigureMaxOldSpaceSize?: boolean;
    fileFiltering?: {
        respectGitIgnore?: boolean;
        enableRecursiveFileSearch?: boolean;
    };
    hideWindowTitle?: boolean;
    hideTips?: boolean;
}
export interface SettingsError {
    message: string;
    path: string;
}
export interface SettingsFile {
    settings: Settings;
    path: string;
}
export declare class LoadedSettings {
    constructor(user: SettingsFile, workspace: SettingsFile, errors: SettingsError[]);
    readonly user: SettingsFile;
    readonly workspace: SettingsFile;
    readonly errors: SettingsError[];
    private _merged;
    get merged(): Settings;
    private computeMergedSettings;
    forScope(scope: SettingScope): SettingsFile;
    setValue(scope: SettingScope, key: keyof Settings, value: string | Record<string, MCPServerConfig> | undefined): void;
}
/**
 * Loads settings from user and workspace directories.
 * Project settings override user settings.
 */
export declare function loadSettings(workspaceDir: string): LoadedSettings;
export declare function saveSettings(settingsFile: SettingsFile): void;
