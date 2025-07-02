interface SystemCommand {
    intent: string;
    tools: string[];
    params: any;
    confirmationRequired: boolean;
    description: string;
}
export declare class EnhancedChatInterface {
    private router;
    private safety;
    private isRunning;
    constructor();
    start(): Promise<void>;
    private displayWelcomeBanner;
    displaySystemStatus(): Promise<void>;
    private showSuggestions;
    private chatLoop;
    handleSystemCommand(input: string): Promise<void>;
    private displayCommandPreview;
    askConfirmation(command: SystemCommand): Promise<boolean>;
    private executeSystemCommand;
    private displayCommandResult;
    private showHelp;
    private getSystemHealth;
    private getCpuDescription;
    private getSecurityDescription;
}
export {};
