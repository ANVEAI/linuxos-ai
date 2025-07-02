import chalk from 'chalk';
import inquirer from 'inquirer';
import Table from 'cli-table3';
import ora from 'ora';
import boxen from 'boxen';
import gradient from 'gradient-string';
import { SystemAdminRouter } from './system-admin-router.js';
import { SafetyManager } from './safety-manager.js';
export class EnhancedChatInterface {
    router;
    safety;
    isRunning = false;
    constructor() {
        this.router = new SystemAdminRouter();
        this.safety = new SafetyManager();
    }
    async start() {
        this.isRunning = true;
        // Display welcome banner
        this.displayWelcomeBanner();
        // Show system status
        await this.displaySystemStatus();
        // Start interactive chat loop
        await this.chatLoop();
    }
    displayWelcomeBanner() {
        const banner = gradient.rainbow(`
╭─────────────────────────────────────────────────────────────────╮
│                        🤖 LinuxOS-AI v0.1.0                    │
│                                                                 │
│    Your Intelligent Linux System Administrator                 │
│    Built on Gemini CLI with Enhanced System Management         │
│                                                                 │
│    Type 'help' for commands or just chat naturally!            │
╰─────────────────────────────────────────────────────────────────╯
    `);
        console.log(boxen(banner, {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'cyan'
        }));
    }
    async displaySystemStatus() {
        const spinner = ora('Gathering system information...').start();
        try {
            const health = await this.getSystemHealth();
            spinner.stop();
            const statusTable = new Table({
                head: [
                    chalk.cyan('System Component'),
                    chalk.cyan('Status'),
                    chalk.cyan('Details')
                ],
                style: {
                    head: [],
                    border: []
                }
            });
            // CPU Status
            const cpuColor = health.cpu > 80 ? 'red' : health.cpu > 60 ? 'yellow' : 'green';
            statusTable.push([
                '🖥️  CPU Usage',
                chalk[cpuColor](`${health.cpu}%`),
                this.getCpuDescription(health.cpu)
            ]);
            // Memory Status
            const memoryPercent = Math.round((health.memory.used / health.memory.total) * 100);
            const memoryColor = memoryPercent > 80 ? 'red' : memoryPercent > 60 ? 'yellow' : 'green';
            statusTable.push([
                '💾 Memory',
                chalk[memoryColor](`${health.memory.used}GB/${health.memory.total}GB`),
                chalk[memoryColor](`${memoryPercent}% used`)
            ]);
            // Disk Status  
            const diskPercent = Math.round((health.disk.used / health.disk.total) * 100);
            const diskColor = diskPercent > 80 ? 'red' : diskPercent > 60 ? 'yellow' : 'green';
            statusTable.push([
                '💽 Disk Space',
                chalk[diskColor](`${health.disk.used}GB/${health.disk.total}GB`),
                chalk[diskColor](`${diskPercent}% used`)
            ]);
            // Network Status
            statusTable.push([
                '🌐 Network',
                chalk.green('Online'),
                'All connections active'
            ]);
            // Security Status
            const securityColor = health.security === 'protected' ? 'green' :
                health.security === 'warning' ? 'yellow' : 'red';
            statusTable.push([
                '🔒 Security',
                chalk[securityColor](health.security.charAt(0).toUpperCase() + health.security.slice(1)),
                this.getSecurityDescription(health.security)
            ]);
            // Services Status
            const servicesColor = health.services.running === health.services.total ? 'green' : 'yellow';
            statusTable.push([
                '🔄 Services',
                chalk[servicesColor](`${health.services.running}/${health.services.total} running`),
                'System services status'
            ]);
            // Last Optimized
            const timeSinceOptimized = Math.round((Date.now() - health.lastOptimized.getTime()) / (1000 * 60 * 60));
            statusTable.push([
                '📊 Last Optimized',
                chalk.blue(`${timeSinceOptimized} hours ago`),
                'System performance optimization'
            ]);
            console.log('\n' + statusTable.toString() + '\n');
            // Show suggestions if any issues detected
            await this.showSuggestions(health);
        }
        catch (error) {
            spinner.fail('Failed to gather system information');
            console.log(chalk.red(`Error: ${error}`));
        }
    }
    async showSuggestions(health) {
        const suggestions = [];
        if (health.cpu > 80) {
            suggestions.push('🔥 High CPU usage detected. Try: "aios analyze performance"');
        }
        if (health.memory.used / health.memory.total > 0.8) {
            suggestions.push('💾 Memory usage is high. Try: "aios clean memory"');
        }
        if (health.disk.used / health.disk.total > 0.8) {
            suggestions.push('💽 Disk space is low. Try: "aios clean system"');
        }
        if (health.security !== 'protected') {
            suggestions.push('🔒 Security issues detected. Try: "aios secure system"');
        }
        if (suggestions.length > 0) {
            console.log(chalk.yellow('💡 Intelligent Suggestions:'));
            suggestions.forEach(suggestion => {
                console.log('   ' + suggestion);
            });
            console.log('');
        }
    }
    async chatLoop() {
        while (this.isRunning) {
            try {
                const { input } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'input',
                        message: chalk.cyan('LinuxOS-AI ➤'),
                        prefix: ''
                    }
                ]);
                if (!input.trim())
                    continue;
                // Handle special commands
                if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
                    this.isRunning = false;
                    console.log(chalk.green('👋 Goodbye! Stay secure!'));
                    break;
                }
                if (input.toLowerCase() === 'help') {
                    this.showHelp();
                    continue;
                }
                if (input.toLowerCase() === 'status') {
                    await this.displaySystemStatus();
                    continue;
                }
                if (input.toLowerCase() === 'clear') {
                    console.clear();
                    this.displayWelcomeBanner();
                    continue;
                }
                // Process system administration command
                await this.handleSystemCommand(input);
            }
            catch (error) {
                console.log(chalk.red(`Error: ${error}`));
            }
        }
    }
    async handleSystemCommand(input) {
        const spinner = ora('Analyzing your request...').start();
        try {
            // Parse command intent
            const command = await this.router.routeCommand(input);
            spinner.stop();
            // Display what will be done
            this.displayCommandPreview(command);
            // Ask for confirmation if required
            if (command.confirmationRequired) {
                const confirmed = await this.askConfirmation(command);
                if (!confirmed) {
                    console.log(chalk.yellow('⏹️  Operation cancelled by user.'));
                    return;
                }
            }
            // Execute command safely
            const result = await this.executeSystemCommand(command);
            this.displayCommandResult(result);
        }
        catch (error) {
            spinner.fail('Failed to process command');
            console.log(chalk.red(`Error: ${error}`));
        }
    }
    displayCommandPreview(command) {
        console.log('\n' + chalk.blue('📋 Command Analysis:'));
        console.log(chalk.white(`Intent: ${command.intent}`));
        console.log(chalk.white(`Tools: ${command.tools.join(', ')}`));
        if (command.description) {
            console.log(chalk.white(`Description: ${command.description}`));
        }
    }
    async askConfirmation(command) {
        console.log('\n' + boxen(chalk.yellow('⚠️  CONFIRMATION REQUIRED\n\n') +
            chalk.white(`This operation will: ${command.description}\n`) +
            chalk.white(`🔧 Tools: ${command.tools.join(', ')}\n\n`) +
            chalk.gray('This action may modify your system configuration.'), {
            padding: 1,
            margin: 1,
            borderStyle: 'double',
            borderColor: 'yellow'
        }));
        const { confirmed } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirmed',
                message: 'Continue with this operation?',
                default: false
            }
        ]);
        return confirmed;
    }
    async executeSystemCommand(command) {
        const spinner = ora('Executing command safely...').start();
        try {
            // Always use safety manager for system operations
            const result = await this.safety.executeSafeCommand(command);
            spinner.succeed('Command executed successfully');
            return result;
        }
        catch (error) {
            spinner.fail('Command execution failed');
            throw error;
        }
    }
    displayCommandResult(result) {
        console.log('\n' + chalk.green('✅ Operation completed:'));
        console.log(result.output || result);
    }
    showHelp() {
        const helpTable = new Table({
            head: [chalk.cyan('Command'), chalk.cyan('Description'), chalk.cyan('Example')],
            style: { head: [], border: [] }
        });
        helpTable.push(['install <package>', 'Install software packages', 'install nginx'], ['install oracle', 'Install Oracle Database', 'install oracle with 8GB memory'], ['setup webserver', 'Setup web server stack', 'setup nginx with SSL'], ['clean system', 'Clean temporary files', 'clean system aggressively'], ['secure system', 'Run security audit', 'secure my server'], ['analyze performance', 'Check system performance', 'why is my system slow?'], ['organize files', 'Organize file structure', 'organize my downloads folder'], ['status', 'Show system status', 'status'], ['help', 'Show this help', 'help'], ['clear', 'Clear screen', 'clear'], ['exit/quit', 'Exit LinuxOS-AI', 'exit']);
        console.log('\n' + chalk.blue('🔧 Available Commands:'));
        console.log(helpTable.toString());
        console.log('\n' + chalk.gray('💡 You can also chat naturally: "My system is slow, what\'s wrong?"'));
    }
    // Helper methods for system health
    async getSystemHealth() {
        // Mock implementation - in real app this would gather actual system data
        return {
            cpu: Math.floor(Math.random() * 60) + 20, // 20-80%
            memory: { used: 8.2, total: 16 },
            disk: { used: 234, total: 500 },
            services: { running: 12, total: 15 },
            uptime: 48,
            security: 'protected',
            lastOptimized: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        };
    }
    getCpuDescription(cpu) {
        if (cpu > 80)
            return 'High usage - check processes';
        if (cpu > 60)
            return 'Moderate usage';
        return 'Normal operation';
    }
    getSecurityDescription(security) {
        switch (security) {
            case 'protected': return 'All security measures active';
            case 'warning': return 'Some recommendations available';
            case 'vulnerable': return 'Immediate attention required';
            default: return 'Unknown status';
        }
    }
}
//# sourceMappingURL=enhanced-chat.js.map