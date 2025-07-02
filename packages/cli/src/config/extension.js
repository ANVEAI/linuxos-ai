/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
export const EXTENSIONS_DIRECTORY_NAME = path.join('.gemini', 'extensions');
export const EXTENSIONS_CONFIG_FILENAME = 'gemini-extension.json';
export function loadExtensions(workspaceDir) {
    const allExtensions = [
        ...loadExtensionsFromDir(workspaceDir),
        ...loadExtensionsFromDir(os.homedir()),
    ];
    const uniqueExtensions = [];
    const seenNames = new Set();
    for (const extension of allExtensions) {
        if (!seenNames.has(extension.config.name)) {
            console.log(`Loading extension: ${extension.config.name} (version: ${extension.config.version})`);
            uniqueExtensions.push(extension);
            seenNames.add(extension.config.name);
        }
    }
    return uniqueExtensions;
}
function loadExtensionsFromDir(dir) {
    const extensionsDir = path.join(dir, EXTENSIONS_DIRECTORY_NAME);
    if (!fs.existsSync(extensionsDir)) {
        return [];
    }
    const extensions = [];
    for (const subdir of fs.readdirSync(extensionsDir)) {
        const extensionDir = path.join(extensionsDir, subdir);
        const extension = loadExtension(extensionDir);
        if (extension != null) {
            extensions.push(extension);
        }
    }
    return extensions;
}
function loadExtension(extensionDir) {
    if (!fs.statSync(extensionDir).isDirectory()) {
        console.error(`Warning: unexpected file ${extensionDir} in extensions directory.`);
        return null;
    }
    const configFilePath = path.join(extensionDir, EXTENSIONS_CONFIG_FILENAME);
    if (!fs.existsSync(configFilePath)) {
        console.error(`Warning: extension directory ${extensionDir} does not contain a config file ${configFilePath}.`);
        return null;
    }
    try {
        const configContent = fs.readFileSync(configFilePath, 'utf-8');
        const config = JSON.parse(configContent);
        if (!config.name || !config.version) {
            console.error(`Invalid extension config in ${configFilePath}: missing name or version.`);
            return null;
        }
        const contextFiles = getContextFileNames(config)
            .map((contextFileName) => path.join(extensionDir, contextFileName))
            .filter((contextFilePath) => fs.existsSync(contextFilePath));
        return {
            config,
            contextFiles,
        };
    }
    catch (e) {
        console.error(`Warning: error parsing extension config in ${configFilePath}: ${e}`);
        return null;
    }
}
function getContextFileNames(config) {
    if (!config.contextFileName) {
        return ['GEMINI.md'];
    }
    else if (!Array.isArray(config.contextFileName)) {
        return [config.contextFileName];
    }
    return config.contextFileName;
}
//# sourceMappingURL=extension.js.map