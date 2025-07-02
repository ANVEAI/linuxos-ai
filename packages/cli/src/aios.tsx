#!/usr/bin/env node

/**
 * LinuxOS-AI - Interactive AI System Administrator
 * Built on Gemini CLI with Enhanced System Management
 */

import React from 'react';
import { render } from 'ink';
import { GeminiApp } from '../ui/App.js';
import { EnhancedChatInterface } from '../../ui/src/enhanced-chat.js';

interface AIOSProps {
  mode?: 'enhanced' | 'standard';
  args?: string[];
}

const AIOSApp: React.FC<AIOSProps> = ({ mode = 'enhanced', args = [] }) => {
  // If enhanced mode is requested and we're in a terminal, use enhanced chat
  if (mode === 'enhanced' && process.stdout.isTTY) {
    React.useEffect(() => {
      const startEnhancedChat = async () => {
        const chat = new EnhancedChatInterface();
        await chat.start();
      };
      
      startEnhancedChat().catch(console.error);
    }, []);
    
    return null; // Enhanced chat runs in terminal directly
  }
  
  // Fall back to standard Gemini CLI interface
  return <GeminiApp />;
};

// Main CLI entry point
async function main() {
  const args = process.argv.slice(2);
  
  // Check for enhanced mode flags
  const enhancedMode = args.includes('--enhanced') || 
                      args.includes('--interactive') ||
                      args.includes('--chat') ||
                      !args.length; // Default to enhanced for interactive use
  
  // Check for specific commands that should use standard mode
  const standardMode = args.includes('--standard') ||
                      args.includes('--batch') ||
                      args.some(arg => arg.startsWith('--'));

  if (enhancedMode && !standardMode && process.stdout.isTTY) {
    // Start enhanced interactive mode
    try {
      const chat = new EnhancedChatInterface();
      await chat.start();
    } catch (error) {
      console.error('Failed to start enhanced mode:', error);
      console.log('Falling back to standard mode...');
      render(<AIOSApp mode="standard" args={args} />);
    }
  } else {
    // Use standard Gemini CLI mode
    render(<AIOSApp mode="standard" args={args} />);
  }
}

// Handle process signals
process.on('SIGINT', () => {
  console.log('\n👋 LinuxOS-AI shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 LinuxOS-AI terminated...');
  process.exit(0);
});

// Export for module use
export { AIOSApp };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
} 