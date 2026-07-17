#!/bin/bash

# Learn Compact - Environment Setup Script
# This script helps set up the development environment

set -e

echo "🌙 Learn Compact - Environment Setup"
echo "======================================"
echo ""

# Check for required tools
check_command() {
    if command -v "$1" &> /dev/null; then
        echo "✅ $1 found: $(command -v $1)"
        return 0
    else
        echo "❌ $1 not found"
        return 1
    fi
}

echo "Checking required tools..."
echo ""

# Check Node.js
if check_command node; then
    echo "   Version: $(node --version)"
fi
echo ""

# Check npm
if check_command npm; then
    echo "   Version: $(npm --version)"
fi
echo ""

# Check Docker
if check_command docker; then
    echo "   Version: $(docker --version)"
fi
echo ""

# Check Compact compiler
if check_command compact; then
    echo "   Version: $(compact --version 2>/dev/null || echo 'unknown')"
else
    echo ""
    echo "To install the Compact compiler, run:"
    echo "  curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh"
fi
echo ""

# Check mdBook (optional, for building the book)
if check_command mdbook; then
    echo "   Version: $(mdbook --version)"
else
    echo "   (Optional: Install with 'cargo install mdbook' to build the book locally)"
fi
echo ""

echo "======================================"
echo ""

# Summary
echo "Setup checklist:"
echo "  [ ] Compact compiler installed"
echo "  [ ] Lace Wallet browser extension installed"
echo "  [ ] tNIGHT from faucet (wallet generates tDUST from it)"
echo "  [ ] Docker running (for proof server)"
echo "  [ ] VS Code with Compact extension (optional)"
echo ""
echo "Ready to learn Compact! Start with the book:"
echo "  cd book && mdbook serve"
echo ""
echo "Or jump into exercises:"
echo "  cd exercises/01_basics/01_hello_compact"
echo ""
