#!/usr/bin/env node
/**
 * LinuxOS-AI Installation MCP Server
 * Provides comprehensive software installation and system setup capabilities
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { execa } from 'execa';
import which from 'which';
import os from 'os';
class InstallationServer {
    server;
    constructor() {
        this.server = new Server({
            name: 'linuxos-installation-server',
            version: '0.1.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupToolHandlers();
    }
    setupToolHandlers() {
        // List all available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: 'install_package',
                        description: 'Install software packages with auto-detection of package manager',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                package: {
                                    type: 'string',
                                    description: 'Package name to install'
                                },
                                version: {
                                    type: 'string',
                                    description: 'Specific version (optional)'
                                },
                                options: {
                                    type: 'array',
                                    items: { type: 'string' },
                                    description: 'Additional installation options'
                                },
                                manager: {
                                    type: 'string',
                                    enum: ['auto', 'apt', 'yum', 'dnf', 'pacman', 'brew', 'snap'],
                                    description: 'Package manager to use (auto-detected if not specified)'
                                }
                            },
                            required: ['package']
                        }
                    },
                    {
                        name: 'install_oracle_database',
                        description: 'Complete Oracle Database installation and configuration',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                version: {
                                    type: 'string',
                                    enum: ['21c', '19c', '23c'],
                                    default: '21c',
                                    description: 'Oracle Database version to install'
                                },
                                memory_gb: {
                                    type: 'number',
                                    default: 8,
                                    description: 'Memory allocation in GB'
                                },
                                storage_gb: {
                                    type: 'number',
                                    default: 50,
                                    description: 'Storage allocation in GB'
                                },
                                auto_start: {
                                    type: 'boolean',
                                    default: true,
                                    description: 'Auto-start Oracle services on boot'
                                },
                                install_path: {
                                    type: 'string',
                                    description: 'Custom installation path (optional)'
                                }
                            }
                        }
                    },
                    {
                        name: 'setup_web_server',
                        description: 'Install and configure complete web server stack',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                server_type: {
                                    type: 'string',
                                    enum: ['nginx', 'apache', 'both'],
                                    description: 'Web server type to install'
                                },
                                ssl_enabled: {
                                    type: 'boolean',
                                    default: true,
                                    description: 'Enable SSL/TLS configuration'
                                },
                                domain: {
                                    type: 'string',
                                    description: 'Domain for SSL certificate (required if SSL enabled)'
                                },
                                auto_start: {
                                    type: 'boolean',
                                    default: true,
                                    description: 'Auto-start web server on boot'
                                }
                            },
                            required: ['server_type']
                        }
                    },
                    {
                        name: 'check_system_requirements',
                        description: 'Check system requirements for software installation',
                        inputSchema: {
                            type: 'object',
                            properties: {
                                software: {
                                    type: 'string',
                                    description: 'Software to check requirements for'
                                },
                                detailed: {
                                    type: 'boolean',
                                    default: false,
                                    description: 'Show detailed system information'
                                }
                            },
                            required: ['software']
                        }
                    }
                ]
            };
        });
        // Handle tool execution
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                const { name, arguments: args } = request.params;
                switch (name) {
                    case 'install_package':
                        return await this.installPackage(args);
                    case 'install_oracle_database':
                        return await this.installOracleDatabase(args);
                    case 'setup_web_server':
                        return await this.setupWebServer(args);
                    case 'check_system_requirements':
                        return await this.checkSystemRequirements(args);
                    default:
                        throw new Error(`Unknown tool: ${name}`);
                }
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`
                        }
                    ],
                    isError: true
                };
            }
        });
    }
    // Package installation with auto-detection
    async installPackage(params) {
        const { package: pkg, version, options = [], manager = 'auto' } = params;
        let packageManager = manager;
        if (manager === 'auto') {
            packageManager = await this.detectPackageManager();
        }
        let command;
        let args;
        // Build command based on package manager
        switch (packageManager) {
            case 'apt':
                command = 'sudo';
                args = ['apt', 'install', '-y'];
                if (version)
                    args.push(`${pkg}=${version}`);
                else
                    args.push(pkg);
                break;
            case 'yum':
                command = 'sudo';
                args = ['yum', 'install', '-y'];
                if (version)
                    args.push(`${pkg}-${version}`);
                else
                    args.push(pkg);
                break;
            case 'dnf':
                command = 'sudo';
                args = ['dnf', 'install', '-y'];
                if (version)
                    args.push(`${pkg}-${version}`);
                else
                    args.push(pkg);
                break;
            case 'pacman':
                command = 'sudo';
                args = ['pacman', '-S', '--noconfirm'];
                args.push(pkg);
                break;
            case 'brew':
                command = 'brew';
                args = ['install'];
                if (version)
                    args.push(`${pkg}@${version}`);
                else
                    args.push(pkg);
                break;
            case 'snap':
                command = 'sudo';
                args = ['snap', 'install'];
                args.push(pkg);
                break;
            default:
                throw new Error(`Unsupported package manager: ${packageManager}`);
        }
        // Add additional options
        if (options.length > 0) {
            args.push(...options);
        }
        // Execute installation (dry run for safety)
        const dryRunResult = await this.dryRunCommand(command, args);
        return {
            content: [
                {
                    type: 'text',
                    text: `🔍 Dry Run: Installing ${pkg}${version ? ` (version ${version})` : ''} using ${packageManager}\n\n` +
                        `Command: ${command} ${args.join(' ')}\n\n` +
                        `⚠️  This is a dry run. Use 'confirm_install' to proceed with actual installation.\n\n` +
                        `Dry run output:\n${dryRunResult}`
                }
            ]
        };
    }
    // Oracle Database installation
    async installOracleDatabase(params) {
        const { version = '21c', memory_gb = 8, storage_gb = 50, auto_start = true, install_path = '/opt/oracle' } = params;
        // System requirements check
        const totalMemGB = Math.round(os.totalmem() / (1024 * 1024 * 1024));
        if (totalMemGB < memory_gb) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `❌ Insufficient memory for Oracle Database installation\n\n` +
                            `Required: ${memory_gb}GB\n` +
                            `Available: ${totalMemGB}GB\n\n` +
                            `Please increase memory allocation or reduce the memory_gb parameter.`
                    }
                ],
                isError: true
            };
        }
        return {
            content: [
                {
                    type: 'text',
                    text: `🔍 Oracle Database ${version} Installation Plan\n\n` +
                        `✅ System Requirements Check:\n` +
                        `- Memory: ${totalMemGB}GB available (${memory_gb}GB required) ✅\n` +
                        `- Platform: ${os.platform()} ${os.platform() === 'linux' ? '✅' : '❌'}\n` +
                        `- Architecture: ${os.arch()} ${os.arch() === 'x64' ? '✅' : '❌'}\n\n` +
                        `📋 Installation Configuration:\n` +
                        `- Version: Oracle Database ${version}\n` +
                        `- Memory Allocation: ${memory_gb}GB\n` +
                        `- Storage Allocation: ${storage_gb}GB\n` +
                        `- Installation Path: ${install_path}\n` +
                        `- Auto-start: ${auto_start ? 'Enabled' : 'Disabled'}\n\n` +
                        `🚀 Installation Steps (Dry Run):\n` +
                        `1. Create Oracle user and groups (oinstall, dba)\n` +
                        `2. Create directory structure at ${install_path}\n` +
                        `3. Download Oracle Database ${version} Free Edition\n` +
                        `4. Install Oracle Database RPM package\n` +
                        `5. Configure environment variables\n` +
                        `6. Create initial database with SID 'FREE'\n` +
                        `7. ${auto_start ? 'Configure auto-start service' : 'Skip auto-start configuration'}\n\n` +
                        `⚠️  This is a dry run. The actual installation requires root privileges and will:\n` +
                        `- Download ~2GB Oracle installer\n` +
                        `- Create system users and directories\n` +
                        `- Configure firewall for port 1521\n` +
                        `- Set up systemd services\n\n` +
                        `📖 Post-installation access:\n` +
                        `- SQL*Plus: sqlplus sys/Oracle123@localhost:1521/FREE as sysdba\n` +
                        `- EM Express: https://localhost:5500/em\n` +
                        `- Default database: FREE\n\n` +
                        `Use 'confirm_oracle_install' to proceed with actual installation.`
                }
            ]
        };
    }
    // Web server setup
    async setupWebServer(params) {
        const { server_type, ssl_enabled = true, domain, auto_start = true } = params;
        let plan = `🌐 Web Server Setup Plan\n\n`;
        plan += `Configuration:\n`;
        plan += `- Server Type: ${server_type}\n`;
        plan += `- SSL/TLS: ${ssl_enabled ? 'Enabled' : 'Disabled'}\n`;
        plan += `${domain ? `- Domain: ${domain}\n` : ''}`;
        plan += `- Auto-start: ${auto_start ? 'Enabled' : 'Disabled'}\n\n`;
        plan += `📋 Installation Steps (Dry Run):\n`;
        if (server_type === 'nginx' || server_type === 'both') {
            plan += `🔧 Nginx Setup:\n`;
            plan += `1. Install nginx package\n`;
            plan += `2. Configure virtual host\n`;
            plan += `3. ${ssl_enabled && domain ? `Setup SSL certificate for ${domain}` : 'Skip SSL configuration'}\n`;
            plan += `4. ${auto_start ? 'Enable auto-start' : 'Manual start only'}\n\n`;
        }
        if (server_type === 'apache' || server_type === 'both') {
            plan += `🔧 Apache Setup:\n`;
            plan += `1. Install apache2 package\n`;
            plan += `2. Configure virtual host\n`;
            plan += `3. Enable required modules\n`;
            plan += `4. ${ssl_enabled && domain ? `Setup SSL certificate for ${domain}` : 'Skip SSL configuration'}\n`;
            plan += `5. ${auto_start ? 'Enable auto-start' : 'Manual start only'}\n\n`;
        }
        if (ssl_enabled && domain) {
            plan += `🔒 SSL Configuration:\n`;
            plan += `1. Install certbot for Let's Encrypt\n`;
            plan += `2. Generate SSL certificate for ${domain}\n`;
            plan += `3. Configure automatic renewal\n`;
            plan += `4. Redirect HTTP to HTTPS\n\n`;
        }
        plan += `⚠️  This is a dry run. Actual installation will require:\n`;
        plan += `- Root privileges for package installation\n`;
        plan += `- Firewall configuration for ports 80/443\n`;
        plan += `${domain ? `- DNS configuration for ${domain}\n` : ''}`;
        plan += `- Systemd service management\n\n`;
        plan += `🚀 After installation:\n`;
        plan += `- Default web root: /var/www/html\n`;
        plan += `- Configuration files: /etc/${server_type}/\n`;
        plan += `- Service management: systemctl {start|stop|restart} ${server_type}\n`;
        plan += `${ssl_enabled && domain ? `- HTTPS URL: https://${domain}\n` : ''}`;
        return {
            content: [
                {
                    type: 'text',
                    text: plan
                }
            ]
        };
    }
    // System requirements check
    async checkSystemRequirements(params) {
        const { software, detailed = false } = params;
        const systemInfo = {
            os: os.type(),
            platform: os.platform(),
            arch: os.arch(),
            memory: Math.round(os.totalmem() / (1024 * 1024 * 1024)),
            cpus: os.cpus().length,
            uptime: Math.round(os.uptime() / 3600)
        };
        let requirements = '';
        // Define requirements for common software
        switch (software.toLowerCase()) {
            case 'oracle':
                requirements = `Oracle Database Requirements Check:\n`;
                requirements += `${systemInfo.memory >= 2 ? '✅' : '❌'} Memory: ${systemInfo.memory}GB (min 2GB required)\n`;
                requirements += `✅ CPUs: ${systemInfo.cpus} (min 1 required)\n`;
                requirements += `${systemInfo.memory >= 8 ? '✅' : '⚠️ '} Recommended: 8GB+ RAM ${systemInfo.memory >= 8 ? '' : '(currently ' + systemInfo.memory + 'GB)'}\n`;
                requirements += `${systemInfo.platform === 'linux' ? '✅' : '❌'} Linux platform ${systemInfo.platform === 'linux' ? 'detected' : 'required (current: ' + systemInfo.platform + ')'}\n`;
                requirements += `${systemInfo.arch === 'x64' ? '✅' : '❌'} 64-bit architecture ${systemInfo.arch === 'x64' ? 'detected' : 'required (current: ' + systemInfo.arch + ')'}`;
                break;
            case 'docker':
                requirements = `Docker Requirements Check:\n`;
                requirements += `${systemInfo.platform === 'linux' ? '✅' : '❌'} Linux platform ${systemInfo.platform === 'linux' ? 'detected' : 'required'}\n`;
                requirements += `${systemInfo.memory >= 1 ? '✅' : '❌'} Memory: ${systemInfo.memory}GB (min 1GB required)\n`;
                requirements += `${systemInfo.arch === 'x64' ? '✅' : '❌'} 64-bit architecture ${systemInfo.arch === 'x64' ? 'detected' : 'required'}`;
                break;
            case 'nginx':
            case 'apache':
                requirements = `${software.toUpperCase()} Web Server Requirements Check:\n`;
                requirements += `✅ Memory: ${systemInfo.memory}GB (min 128MB required)\n`;
                requirements += `✅ CPUs: ${systemInfo.cpus} (min 1 required)\n`;
                requirements += `${systemInfo.platform === 'linux' ? '✅' : '⚠️ '} Linux platform ${systemInfo.platform === 'linux' ? 'detected' : 'preferred (current: ' + systemInfo.platform + ')'}`;
                break;
            default:
                requirements = `General System Information for ${software}:\n`;
                requirements += `- OS: ${systemInfo.os}\n`;
                requirements += `- Platform: ${systemInfo.platform}\n`;
                requirements += `- Architecture: ${systemInfo.arch}\n`;
                requirements += `- Memory: ${systemInfo.memory}GB\n`;
                requirements += `- CPUs: ${systemInfo.cpus}`;
        }
        let output = `🔍 System Requirements Check for ${software.toUpperCase()}\n\n${requirements}`;
        if (detailed) {
            try {
                const diskSpace = await this.getDiskSpace();
                const packageManager = await this.detectPackageManager();
                output += `\n\n📊 Detailed System Information:\n`;
                output += `- Hostname: ${os.hostname()}\n`;
                output += `- Uptime: ${systemInfo.uptime} hours\n`;
                output += `- Load Average: ${os.loadavg().map((load) => load.toFixed(2)).join(', ')}\n`;
                output += `- Free Memory: ${Math.round(os.freemem() / (1024 * 1024 * 1024))}GB\n`;
                output += `- Disk Space: ${diskSpace}\n`;
                output += `- Package Manager: ${packageManager}\n`;
                output += `- Node.js Version: ${globalThis.process?.version || 'Unknown'}`;
            }
            catch (error) {
                output += `\n\nDetailed information partially unavailable: ${error}`;
            }
        }
        return {
            content: [
                {
                    type: 'text',
                    text: output
                }
            ]
        };
    }
    // Helper methods
    async detectPackageManager() {
        const managers = [
            { cmd: 'apt', name: 'apt (Debian/Ubuntu)' },
            { cmd: 'yum', name: 'yum (RHEL/CentOS)' },
            { cmd: 'dnf', name: 'dnf (Fedora)' },
            { cmd: 'pacman', name: 'pacman (Arch)' },
            { cmd: 'brew', name: 'brew (macOS)' },
            { cmd: 'snap', name: 'snap (Universal)' }
        ];
        for (const manager of managers) {
            try {
                await which(manager.cmd);
                return manager.name;
            }
            catch {
                continue;
            }
        }
        return 'Unknown package manager';
    }
    async getDiskSpace() {
        try {
            const result = await execa('df', ['-h', '/']);
            const lines = result.stdout.split('\n');
            if (lines.length > 1) {
                const parts = lines[1].split(/\s+/);
                return `${parts[1]} total, ${parts[3]} available`;
            }
            return 'Unknown';
        }
        catch {
            return 'Unable to determine disk space';
        }
    }
    async dryRunCommand(command, args) {
        return `Would execute: ${command} ${args.join(' ')}\n\nThis is a safe dry run - no actual changes made.`;
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('🚀 LinuxOS-AI Installation MCP Server running on stdio');
    }
}
// Start the server
const server = new InstallationServer();
server.run().catch(console.error);
//# sourceMappingURL=index.js.map