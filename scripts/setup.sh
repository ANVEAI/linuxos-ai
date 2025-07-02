#!/bin/bash

# LinuxOS-AI Setup Script
# Quick setup for the Interactive AI System Administrator

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Banner
show_banner() {
    echo -e "${CYAN}"
    cat << "EOF"
╭─────────────────────────────────────────────────────────────────╮
│                        🤖 LinuxOS-AI                           │
│                                                                 │
│    Interactive AI System Administrator Setup                   │
│    Built on Gemini CLI with Enhanced System Management         │
╰─────────────────────────────────────────────────────────────────╯
EOF
    echo -e "${NC}"
}

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "${PURPLE}🔧 $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_step "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        log_error "Node.js version 18 or higher is required. Current version: $(node --version)"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        log_warning "Git is not installed. Some features may not work properly"
    fi
    
    log_success "Prerequisites check passed"
    log_info "Node.js: $(node --version)"
    log_info "npm: $(npm --version)"
}

# Install dependencies
install_dependencies() {
    log_step "Installing dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    log_success "Dependencies installed successfully"
}

# Build the project
build_project() {
    log_step "Building LinuxOS-AI..."
    
    # Build individual packages
    if [ -d "packages/mcp-servers/installation" ]; then
        log_info "Building installation MCP server..."
        cd packages/mcp-servers/installation
        if [ -f "package.json" ]; then
            npm install || true
            if [ -f "tsconfig.json" ]; then
                npx tsc || log_warning "TypeScript compilation failed for installation server"
            fi
        fi
        cd ../../..
    fi
    
    if [ -d "packages/ui" ]; then
        log_info "Building UI package..."
        cd packages/ui
        if [ -f "package.json" ]; then
            npm install || true
            if [ -f "tsconfig.json" ]; then
                npx tsc || log_warning "TypeScript compilation failed for UI package"
            fi
        fi
        cd ../..
    fi
    
    # Build main project
    if npm run build &> /dev/null; then
        log_success "Project built successfully"
    else
        log_warning "Main build script failed, but installation can continue"
    fi
}

# Setup configuration
setup_configuration() {
    log_step "Setting up configuration..."
    
    # Create .gemini directory if it doesn't exist
    mkdir -p .gemini
    
    # Create basic MCP server configuration
    if [ ! -f ".gemini/config.json" ]; then
        cat > .gemini/config.json << 'EOF'
{
  "mcpServers": {
    "installation": {
      "command": "node",
      "args": ["packages/mcp-servers/installation/dist/index.js"],
      "env": {}
    }
  }
}
EOF
        log_success "Created MCP server configuration"
    else
        log_info "Configuration file already exists"
    fi
}

# Check for API key
check_api_key() {
    log_step "Checking API key configuration..."
    
    if [ -z "$GEMINI_API_KEY" ]; then
        log_warning "GEMINI_API_KEY environment variable not set"
        echo
        echo -e "${YELLOW}To use LinuxOS-AI, you need a Gemini API key:${NC}"
        echo -e "${CYAN}1. Visit: https://aistudio.google.com/apikey${NC}"
        echo -e "${CYAN}2. Generate a new API key${NC}"
        echo -e "${CYAN}3. Set it as an environment variable:${NC}"
        echo -e "${GREEN}   export GEMINI_API_KEY=\"your-api-key-here\"${NC}"
        echo -e "${CYAN}4. Add to your shell config (~/.bashrc, ~/.zshrc):${NC}"
        echo -e "${GREEN}   echo 'export GEMINI_API_KEY=\"your-api-key-here\"' >> ~/.bashrc${NC}"
        echo
    else
        log_success "GEMINI_API_KEY is configured"
    fi
}

# Create startup script
create_startup_script() {
    log_step "Creating startup script..."
    
    cat > aios << 'EOF'
#!/bin/bash

# LinuxOS-AI Startup Script

# Check if we're in the project directory
if [ ! -f "package.json" ] || ! grep -q "linuxos-ai" package.json; then
    echo "❌ Please run this script from the LinuxOS-AI project directory"
    exit 1
fi

# Check API key
if [ -z "$GEMINI_API_KEY" ]; then
    echo "⚠️  GEMINI_API_KEY environment variable not set"
    echo "   Please set your Gemini API key to use LinuxOS-AI"
    exit 1
fi

# Run LinuxOS-AI
echo "🚀 Starting LinuxOS-AI..."

# Check if enhanced mode is available
if [ -f "packages/ui/dist/enhanced-chat.js" ]; then
    echo "🎯 Starting enhanced interactive mode..."
    node packages/ui/dist/enhanced-chat.js "$@"
else
    echo "🔄 Enhanced mode not available, using standard Gemini CLI..."
    npx @google/gemini-cli "$@"
fi
EOF
    
    chmod +x aios
    log_success "Created startup script: ./aios"
}

# Display completion message
show_completion() {
    echo
    echo -e "${GREEN}🎉 LinuxOS-AI setup completed successfully!${NC}"
    echo
    echo -e "${CYAN}📋 Next Steps:${NC}"
    echo -e "${YELLOW}1.${NC} Set up your Gemini API key (if not already done):"
    echo -e "   ${GREEN}export GEMINI_API_KEY=\"your-api-key-here\"${NC}"
    echo
    echo -e "${YELLOW}2.${NC} Start LinuxOS-AI:"
    echo -e "   ${GREEN}./aios${NC}                    # Interactive mode"
    echo -e "   ${GREEN}./aios --help${NC}             # Show help"
    echo -e "   ${GREEN}./aios --standard${NC}         # Standard Gemini CLI mode"
    echo
    echo -e "${YELLOW}3.${NC} Try some commands:"
    echo -e "   ${CYAN}\"install nginx\"${NC}"
    echo -e "   ${CYAN}\"check system performance\"${NC}"
    echo -e "   ${CYAN}\"secure my server\"${NC}"
    echo -e "   ${CYAN}\"help\"${NC}"
    echo
    echo -e "${PURPLE}📚 Documentation: README.md${NC}"
    echo -e "${PURPLE}🐛 Issues: https://github.com/yourusername/linuxos-ai/issues${NC}"
    echo
    echo -e "${GREEN}Happy system administrating! 🤖${NC}"
}

# Main setup process
main() {
    show_banner
    
    log_info "Starting LinuxOS-AI setup process..."
    echo
    
    check_prerequisites
    echo
    
    install_dependencies
    echo
    
    build_project
    echo
    
    setup_configuration
    echo
    
    check_api_key
    echo
    
    create_startup_script
    echo
    
    show_completion
}

# Run main function
main "$@" 