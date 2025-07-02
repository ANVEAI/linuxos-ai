#!/bin/bash

# LinuxOS-AI Installation Script
# The first step towards AI-native Operating System

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Banner
echo -e "${CYAN}"
cat << "EOF"
╭─────────────────────────────────────────────────────────────────╮
│                  🤖 LinuxOS-AI Installer v0.1.0                │
│                                                                 │
│     Installing the Future of System Administration             │
│                                                                 │
│     Phase 1: AI System Administrator                           │
│     Next: AI Desktop Environment → AI Kernel → Full AI OS     │
╰─────────────────────────────────────────────────────────────────╯
EOF
echo -e "${NC}"

echo -e "${BLUE}🚀 Welcome to the AI Operating System revolution!${NC}"
echo

# Check prerequisites
echo -e "${YELLOW}📋 Checking Prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo -e "${CYAN}Please install Node.js 18+ from: https://nodejs.org/${NC}"
    exit 1
else
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}❌ Node.js version too old (found v$NODE_VERSION, need v18+)${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Node.js $(node --version) found${NC}"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
else
    echo -e "${GREEN}✅ npm $(npm --version) found${NC}"
fi

# Check Git
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠️  Git not found (optional for installation)${NC}"
else
    echo -e "${GREEN}✅ Git $(git --version | cut -d' ' -f3) found${NC}"
fi

echo

# API Key setup
echo -e "${YELLOW}🔑 Gemini API Key Setup${NC}"

if [ -z "$GEMINI_API_KEY" ]; then
    echo -e "${CYAN}LinuxOS-AI requires a Gemini API key for AI features.${NC}"
    echo -e "${BLUE}1. Visit: https://aistudio.google.com/apikey${NC}"
    echo -e "${BLUE}2. Generate a new API key${NC}"
    echo -e "${BLUE}3. Copy the key${NC}"
    echo
    read -p "Enter your Gemini API key: " API_KEY
    
    if [ -z "$API_KEY" ]; then
        echo -e "${YELLOW}⚠️  Installation will continue, but AI features will be limited${NC}"
        echo -e "${CYAN}You can set the API key later with: export GEMINI_API_KEY=\"your-key\"${NC}"
    else
        export GEMINI_API_KEY="$API_KEY"
        echo -e "${GREEN}✅ API key configured for this session${NC}"
        
        # Add to shell config
        SHELL_CONFIG=""
        if [ -f "$HOME/.bashrc" ]; then
            SHELL_CONFIG="$HOME/.bashrc"
        elif [ -f "$HOME/.zshrc" ]; then
            SHELL_CONFIG="$HOME/.zshrc"
        fi
        
        if [ -n "$SHELL_CONFIG" ]; then
            read -p "Add API key to $SHELL_CONFIG permanently? (y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                echo "export GEMINI_API_KEY=\"$API_KEY\"" >> "$SHELL_CONFIG"
                echo -e "${GREEN}✅ API key added to $SHELL_CONFIG${NC}"
            fi
        fi
    fi
else
    echo -e "${GREEN}✅ GEMINI_API_KEY already configured${NC}"
fi

echo

# Installation
echo -e "${YELLOW}📦 Installing LinuxOS-AI...${NC}"

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install --production

# Build the project
echo -e "${BLUE}Building LinuxOS-AI...${NC}"
npm run build 2>/dev/null || echo -e "${YELLOW}⚠️  Build step skipped (optional for basic functionality)${NC}"

# Make executable
chmod +x aios

echo

# Test installation
echo -e "${YELLOW}🧪 Testing Installation...${NC}"

if ./aios --version >/dev/null 2>&1; then
    echo -e "${GREEN}✅ LinuxOS-AI installed successfully!${NC}"
else
    echo -e "${YELLOW}⚠️  Installation completed with warnings${NC}"
fi

echo

# Success message
echo -e "${GREEN}🎉 Installation Complete!${NC}"
echo
echo -e "${CYAN}╭─────────────────────────────────────────────────────────────────╮"
echo -e "│                     🤖 LinuxOS-AI Ready!                       │"
echo -e "│                                                                 │"
echo -e "│  You've just installed the first step towards an AI-native     │"
echo -e "│  operating system. Welcome to the future of computing!         │"
echo -e "╰─────────────────────────────────────────────────────────────────╯${NC}"

echo
echo -e "${YELLOW}🚀 Quick Start:${NC}"
echo -e "${BLUE}  ./aios                    ${NC}# Start interactive AI mode"
echo -e "${BLUE}  ./aios status             ${NC}# Show system status"
echo -e "${BLUE}  ./aios help               ${NC}# Show all commands"
echo

echo -e "${YELLOW}💬 Try These Natural Language Commands:${NC}"
echo -e "${GREEN}  \"install nginx\"${NC}"
echo -e "${GREEN}  \"setup oracle database with 8GB memory\"${NC}"
echo -e "${GREEN}  \"make my server more secure\"${NC}"
echo -e "${GREEN}  \"why is my system slow?\"${NC}"
echo -e "${GREEN}  \"clean up my downloads folder\"${NC}"

echo
echo -e "${PURPLE}🔮 What's Next:${NC}"
echo -e "${CYAN}  Phase 2: AI Desktop Environment (Q2 2024)${NC}"
echo -e "${CYAN}  Phase 3: AI Kernel Integration (Q4 2024)${NC}"
echo -e "${CYAN}  Phase 4: Full AI Operating System (2025)${NC}"

echo
echo -e "${BLUE}📚 Learn More:${NC}"
echo -e "${CYAN}  GitHub: https://github.com/yourusername/linuxos-ai${NC}"
echo -e "${CYAN}  Documentation: ./README.md${NC}"
echo -e "${CYAN}  Contributing: ./CONTRIBUTING.md${NC}"

echo
echo -e "${GREEN}Ready to experience the future? Run: ${YELLOW}./aios${NC}" 