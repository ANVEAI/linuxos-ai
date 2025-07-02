/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'fs';
import * as path from 'path';
import { homedir } from 'os';
import { getErrorMessage, } from '@google/gemini-cli-core';
import stripJsonComments from 'strip-json-comments';
import { DefaultLight } from '../ui/themes/default-light.js';
import { DefaultDark } from '../ui/themes/default.js';
export const SETTINGS_DIRECTORY_NAME = '.gemini';
export const USER_SETTINGS_DIR = path.join(homedir(), SETTINGS_DIRECTORY_NAME);
export const USER_SETTINGS_PATH = path.join(USER_SETTINGS_DIR, 'settings.json');
export var SettingScope;
(function (SettingScope) {
    SettingScope["User"] = "User";
    SettingScope["Workspace"] = "Workspace";
})(SettingScope || (SettingScope = {}));
export class LoadedSettings {
    constructor(user, workspace, errors) {
        this.user = user;
        this.workspace = workspace;
        this.errors = errors;
        this._merged = this.computeMergedSettings();
    }
    user;
    workspace;
    errors;
    _merged;
    get merged() {
        return this._merged;
    }
    computeMergedSettings() {
        return {
            ...this.user.settings,
            ...this.workspace.settings,
        };
    }
    forScope(scope) {
        switch (scope) {
            case SettingScope.User:
                return this.user;
            case SettingScope.Workspace:
                return this.workspace;
            default:
                throw new Error(`Invalid scope: ${scope}`);
        }
    }
    setValue(scope, key, value) {
        const settingsFile = this.forScope(scope);
        // @ts-expect-error - value can be string | Record<string, MCPServerConfig>
        settingsFile.settings[key] = value;
        this._merged = this.computeMergedSettings();
        saveSettings(settingsFile);
    }
}
function resolveEnvVarsInString(value) {
    const envVarRegex = /\$(?:(\w+)|{([^}]+)})/g; // Find $VAR_NAME or ${VAR_NAME}
    return value.replace(envVarRegex, (match, varName1, varName2) => {
        const varName = varName1 || varName2;
        if (process && process.env && typeof process.env[varName] === 'string') {
            return process.env[varName];
        }
        return match;
    });
}
function resolveEnvVarsInObject(obj) {
    if (obj === null ||
        obj === undefined ||
        typeof obj === 'boolean' ||
        typeof obj === 'number') {
        return obj;
    }
    if (typeof obj === 'string') {
        return resolveEnvVarsInString(obj);
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => resolveEnvVarsInObject(item));
    }
    if (typeof obj === 'object') {
        const newObj = { ...obj };
        for (const key in newObj) {
            if (Object.prototype.hasOwnProperty.call(newObj, key)) {
                newObj[key] = resolveEnvVarsInObject(newObj[key]);
            }
        }
        return newObj;
    }
    return obj;
}
/**
 * Loads settings from user and workspace directories.
 * Project settings override user settings.
 */
export function loadSettings(workspaceDir) {
    let userSettings = {};
    let workspaceSettings = {};
    const settingsErrors = [];
    // Load user settings
    try {
        if (fs.existsSync(USER_SETTINGS_PATH)) {
            const userContent = fs.readFileSync(USER_SETTINGS_PATH, 'utf-8');
            const parsedUserSettings = JSON.parse(stripJsonComments(userContent));
            userSettings = resolveEnvVarsInObject(parsedUserSettings);
            // Support legacy theme names
            if (userSettings.theme && userSettings.theme === 'VS') {
                userSettings.theme = DefaultLight.name;
            }
            else if (userSettings.theme && userSettings.theme === 'VS2015') {
                userSettings.theme = DefaultDark.name;
            }
        }
    }
    catch (error) {
        settingsErrors.push({
            message: getErrorMessage(error),
            path: USER_SETTINGS_PATH,
        });
    }
    const workspaceSettingsPath = path.join(workspaceDir, SETTINGS_DIRECTORY_NAME, 'settings.json');
    // Load workspace settings
    try {
        if (fs.existsSync(workspaceSettingsPath)) {
            const projectContent = fs.readFileSync(workspaceSettingsPath, 'utf-8');
            const parsedWorkspaceSettings = JSON.parse(stripJsonComments(projectContent));
            workspaceSettings = resolveEnvVarsInObject(parsedWorkspaceSettings);
            if (workspaceSettings.theme && workspaceSettings.theme === 'VS') {
                workspaceSettings.theme = DefaultLight.name;
            }
            else if (workspaceSettings.theme &&
                workspaceSettings.theme === 'VS2015') {
                workspaceSettings.theme = DefaultDark.name;
            }
        }
    }
    catch (error) {
        settingsErrors.push({
            message: getErrorMessage(error),
            path: workspaceSettingsPath,
        });
    }
    return new LoadedSettings({
        path: USER_SETTINGS_PATH,
        settings: userSettings,
    }, {
        path: workspaceSettingsPath,
        settings: workspaceSettings,
    }, settingsErrors);
}
export function saveSettings(settingsFile) {
    try {
        // Ensure the directory exists
        const dirPath = path.dirname(settingsFile.path);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(settingsFile.path, JSON.stringify(settingsFile.settings, null, 2), 'utf-8');
    }
    catch (error) {
        console.error('Error saving user settings file:', error);
    }
}
//# sourceMappingURL=settings.js.map