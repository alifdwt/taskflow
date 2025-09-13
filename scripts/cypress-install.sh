#!/bin/bash

# Cypress Linux Installation Fix
# Solusi untuk error "Cypress executable not found"

echo "🔧 Fixing Cypress installation on Linux..."

# Step 1: Clear Cypress cache
echo "🧹 Clearing Cypress cache..."
rm -rf ~/.cache/Cypress
pnpm cypress cache clear

# Step 2: Install system dependencies for Ubuntu/Debian
echo "📦 Installing system dependencies..."
sudo apt-get update
sudo apt-get install -y \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3-dev \
    libxss1 \
    libasound2-dev \
    libxtst6 \
    xauth \
    xvfb \
    libgbm1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcairo-gobject2 \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0

# Step 3: Reinstall Cypress dependencies
echo "🔄 Reinstalling Cypress..."
pnpm remove cypress
pnpm add -D cypress@latest

# Step 4: Install Cypress binary
echo "⬇️ Installing Cypress binary..."
pnpm cypress install

# Step 5: Verify installation
echo "✅ Verifying Cypress installation..."
pnpm cypress verify

# Step 6: Check version
echo "📋 Checking Cypress version..."
pnpm cypress version

echo ""
echo "🎉 Cypress installation should now be fixed!"
echo ""
echo "Try running:"
echo "  pnpm cypress open"
echo "  or"
echo "  pnpm run cy:open"