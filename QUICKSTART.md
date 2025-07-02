# 🚀 LinuxOS-AI Quick Start Guide

## ✅ You're Ready to Go!

Your **LinuxOS-AI Interactive System Administrator** is now fully configured and ready to use!

## 🎯 Getting Started

### 1. **Start LinuxOS-AI**
```bash
# Interactive enhanced mode (recommended)
./aios

# Show system status
./aios status

# Get help
./aios help

# Standard Gemini CLI mode
./aios --standard
```

### 2. **API Key is Configured** ✅
- Your Gemini API key is set: `AIzaSyCR1FJ7KN26986a...`
- Added to `~/.zshrc` for persistence
- Ready for use across sessions

## 💬 What You Can Do

### **Natural Language System Administration**

Just chat naturally with your AI system administrator:

```bash
# Examples to try:
./aios
> "install nginx on my system"
> "my server is running slow, help me diagnose"
> "set up a web server with SSL certificate"
> "clean up temporary files and optimize storage"
> "secure my system and check for vulnerabilities"
> "organize my downloads folder"
> "install Oracle database with 8GB memory"
```

### **System Status & Monitoring**
```bash
# Real-time system status
./aios status

# Shows:
# 💾 Memory usage and statistics
# 💽 Disk usage across drives  
# 🔒 Security status
# 🌐 Network connectivity
```

### **Built-in Safety Features**
- **Dry-run previews** before executing commands
- **Interactive confirmations** for dangerous operations
- **Step-by-step explanations** of what will be done
- **Rollback guidance** when things go wrong

## 🔧 Command Reference

### **LinuxOS-AI Commands**
| Command | Description |
|---------|-------------|
| `./aios` | Start interactive enhanced mode |
| `./aios status` | Show system status dashboard |
| `./aios help` | Show command help |
| `./aios --standard` | Use standard Gemini CLI |
| `./aios --version` | Show version information |

### **Advanced Options**
| Option | Description |
|--------|-------------|
| `--model <model>` | Specify AI model to use |
| `--sandbox` | Run in sandbox mode |
| `--yolo` | Auto-accept all actions (use carefully!) |

## 🎯 Example Session

```bash
$ ./aios
╭─────────────────────────────────────────────────────────────────╮
│                        🤖 LinuxOS-AI v0.1.0                    │
│                                                                 │
│    Your Intelligent Linux System Administrator                 │
│    Built on Gemini CLI with Enhanced System Management         │
│                                                                 │
│    Type 'help' for commands or just chat naturally!            │
╰─────────────────────────────────────────────────────────────────╯

📊 System Status:
💾 Memory Status:
   Pages free: 5007
   Pages active: 221737
💽 Disk Usage:
   /dev/disk3s1s1: 15Gi/460Gi (89% used)
🔒 Security: Protected
🌐 Network: Online

🚀 Starting enhanced interactive mode...

> install nginx web server

I'll help you install nginx web server. Let me first check your system 
and then provide the appropriate installation commands...

[AI provides step-by-step installation guide]

> my system seems slow lately

Let me analyze your system performance. I'll check CPU usage, memory 
consumption, running processes, and disk I/O...

[AI provides performance analysis and optimization suggestions]
```

## 🛠️ Troubleshooting

### **API Key Issues**
```bash
# Check if API key is set
echo $GEMINI_API_KEY

# Set API key if missing
export GEMINI_API_KEY="your-api-key-here"
```

### **Permission Issues**
```bash
# Make sure script is executable
chmod +x aios

# Check if you're in the right directory
pwd  # Should show: /path/to/linuxos-ai
```

### **Network Issues**
```bash
# Test basic connectivity
ping google.com

# Test Gemini API access
./aios --standard --prompt "hello"
```

## 🔥 Pro Tips

1. **Start with Simple Queries**: Try basic questions first like "what's my system status?"

2. **Be Specific**: Instead of "fix my computer", try "my web server is returning 500 errors"

3. **Ask for Explanations**: Request step-by-step guides: "explain how to set up nginx with SSL"

4. **Use Safety Features**: Always review commands before executing them

5. **Combine Tasks**: "install docker, set up a wordpress container, and configure SSL"

## 📚 What's Next?

- **Explore System Commands**: Try different administration tasks
- **Customize Prompts**: Modify the system prompt for your specific needs
- **Add MCP Servers**: Extend functionality with custom tools
- **Share Feedback**: Help improve LinuxOS-AI

## 🎉 You're All Set!

Your **LinuxOS-AI Interactive System Administrator** is ready to help you manage your Linux system with the power of AI. Start chatting and see what it can do!

```bash
# Ready to start? Run this:
./aios
```

---

**Need Help?** 
- Run `./aios help` for commands
- Check `README.md` for detailed documentation
- Review the GitHub repository for updates

**Happy System Administrating! 🤖** 