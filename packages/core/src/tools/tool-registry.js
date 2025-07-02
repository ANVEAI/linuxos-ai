/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BaseTool } from './tools.js';
import { spawn, execSync } from 'node:child_process';
import { discoverMcpTools } from './mcp-client.js';
import { DiscoveredMCPTool } from './mcp-tool.js';
export class DiscoveredTool extends BaseTool {
    config;
    name;
    description;
    parameterSchema;
    constructor(config, name, description, parameterSchema) {
        const discoveryCmd = config.getToolDiscoveryCommand();
        const callCommand = config.getToolCallCommand();
        description += `

This tool was discovered from the project by executing the command \`${discoveryCmd}\` on project root.
When called, this tool will execute the command \`${callCommand} ${name}\` on project root.
Tool discovery and call commands can be configured in project or user settings.

When called, the tool call command is executed as a subprocess.
On success, tool output is returned as a json string.
Otherwise, the following information is returned:

Stdout: Output on stdout stream. Can be \`(empty)\` or partial.
Stderr: Output on stderr stream. Can be \`(empty)\` or partial.
Error: Error or \`(none)\` if no error was reported for the subprocess.
Exit Code: Exit code or \`(none)\` if terminated by signal.
Signal: Signal number or \`(none)\` if no signal was received.
`;
        super(name, name, description, parameterSchema, false, // isOutputMarkdown
        false);
        this.config = config;
        this.name = name;
        this.description = description;
        this.parameterSchema = parameterSchema;
    }
    async execute(params) {
        const callCommand = this.config.getToolCallCommand();
        const child = spawn(callCommand, [this.name]);
        child.stdin.write(JSON.stringify(params));
        child.stdin.end();
        let stdout = '';
        let stderr = '';
        let error = null;
        let code = null;
        let signal = null;
        await new Promise((resolve) => {
            const onStdout = (data) => {
                stdout += data?.toString();
            };
            const onStderr = (data) => {
                stderr += data?.toString();
            };
            const onError = (err) => {
                error = err;
            };
            const onClose = (_code, _signal) => {
                code = _code;
                signal = _signal;
                cleanup();
                resolve();
            };
            const cleanup = () => {
                child.stdout.removeListener('data', onStdout);
                child.stderr.removeListener('data', onStderr);
                child.removeListener('error', onError);
                child.removeListener('close', onClose);
                if (child.connected) {
                    child.disconnect();
                }
            };
            child.stdout.on('data', onStdout);
            child.stderr.on('data', onStderr);
            child.on('error', onError);
            child.on('close', onClose);
        });
        // if there is any error, non-zero exit code, signal, or stderr, return error details instead of stdout
        if (error || code !== 0 || signal || stderr) {
            const llmContent = [
                `Stdout: ${stdout || '(empty)'}`,
                `Stderr: ${stderr || '(empty)'}`,
                `Error: ${error ?? '(none)'}`,
                `Exit Code: ${code ?? '(none)'}`,
                `Signal: ${signal ?? '(none)'}`,
            ].join('\n');
            return {
                llmContent,
                returnDisplay: llmContent,
            };
        }
        return {
            llmContent: stdout,
            returnDisplay: stdout,
        };
    }
}
export class ToolRegistry {
    tools = new Map();
    discovery = null;
    config;
    constructor(config) {
        this.config = config;
    }
    /**
     * Registers a tool definition.
     * @param tool - The tool object containing schema and execution logic.
     */
    registerTool(tool) {
        if (this.tools.has(tool.name)) {
            // Decide on behavior: throw error, log warning, or allow overwrite
            console.warn(`Tool with name "${tool.name}" is already registered. Overwriting.`);
        }
        this.tools.set(tool.name, tool);
    }
    /**
     * Discovers tools from project (if available and configured).
     * Can be called multiple times to update discovered tools.
     */
    async discoverTools() {
        // remove any previously discovered tools
        for (const tool of this.tools.values()) {
            if (tool instanceof DiscoveredTool || tool instanceof DiscoveredMCPTool) {
                this.tools.delete(tool.name);
            }
            else {
                // Keep manually registered tools
            }
        }
        // discover tools using discovery command, if configured
        const discoveryCmd = this.config.getToolDiscoveryCommand();
        if (discoveryCmd) {
            // execute discovery command and extract function declarations (w/ or w/o "tool" wrappers)
            const functions = [];
            for (const tool of JSON.parse(execSync(discoveryCmd).toString().trim())) {
                if (tool['function_declarations']) {
                    functions.push(...tool['function_declarations']);
                }
                else if (tool['functionDeclarations']) {
                    functions.push(...tool['functionDeclarations']);
                }
                else if (tool['name']) {
                    functions.push(tool);
                }
            }
            // register each function as a tool
            for (const func of functions) {
                this.registerTool(new DiscoveredTool(this.config, func.name, func.description, func.parameters));
            }
        }
        // discover tools using MCP servers, if configured
        await discoverMcpTools(this.config.getMcpServers() ?? {}, this.config.getMcpServerCommand(), this);
    }
    /**
     * Retrieves the list of tool schemas (FunctionDeclaration array).
     * Extracts the declarations from the ToolListUnion structure.
     * Includes discovered (vs registered) tools if configured.
     * @returns An array of FunctionDeclarations.
     */
    getFunctionDeclarations() {
        const declarations = [];
        this.tools.forEach((tool) => {
            declarations.push(tool.schema);
        });
        return declarations;
    }
    /**
     * Returns an array of all registered and discovered tool instances.
     */
    getAllTools() {
        return Array.from(this.tools.values());
    }
    /**
     * Returns an array of tools registered from a specific MCP server.
     */
    getToolsByServer(serverName) {
        const serverTools = [];
        for (const tool of this.tools.values()) {
            if (tool?.serverName === serverName) {
                serverTools.push(tool);
            }
        }
        return serverTools;
    }
    /**
     * Get the definition of a specific tool.
     */
    getTool(name) {
        return this.tools.get(name);
    }
}
//# sourceMappingURL=tool-registry.js.map