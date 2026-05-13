#!/bin/bash

# Nomos UI - Install All Components Script
# Usage: ./install-all-components.sh
#
# Prerequisites:
# 1. Add this to your components.json:
#    "registries": {
#      "@nomos": "https://raw.githubusercontent.com/ddingyull/style-guide-test/main/public/r/{name}.json"
#    }
# 2. Run this script in your project root

set -e

echo "🚀 Nomos UI Component Installer"
echo "================================"
echo ""

# Detect package manager
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm dlx"
elif command -v npx &> /dev/null; then
    PKG_MANAGER="npx --yes"
else
    echo "❌ Error: Neither pnpm nor npm/npx is installed"
    echo "Please install Node.js and npm first"
    exit 1
fi

echo "📦 Using package manager: ${PKG_MANAGER}"
echo ""

# Check if components.json exists
if [ ! -f "components.json" ]; then
    echo "❌ Error: components.json not found"
    echo "Please run 'pnpm dlx shadcn@latest init' first"
    exit 1
fi

# Check if @nomos registry is configured
if ! grep -q "@nomos" components.json; then
    echo "⚠️  Warning: @nomos registry not found in components.json"
    echo ""
    echo "Please add this to your components.json:"
    echo '  "registries": {'
    echo '    "@nomos": "https://raw.githubusercontent.com/ddingyull/style-guide-test/main/public/r/{name}.json"'
    echo '  }'
    echo ""
    read -p "Do you want to continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Component list (based on public/r/registry.json)
declare -a COMPONENTS=(
    "utils"
    "button"
    "card"
    "input"
    "label"
    "calendar"
    "dialog"
    "dropdown-menu"
    "select"
    "sheet"
    "skeleton"
    "sonner"
    "table"
    "use-toast"
    "theme-patent"
    "login-form"
)

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "📦 Installing ${#COMPONENTS[@]} components..."
echo ""

SUCCESS_COUNT=0
FAIL_COUNT=0
declare -a FAILED_COMPONENTS=()

# Install each component using registry alias
for component in "${COMPONENTS[@]}"; do
    echo -e "${BLUE}➤${NC} Installing: ${component}"

    if ${PKG_MANAGER} shadcn@latest add "@nomos/${component}" --yes --overwrite 2>&1; then
        echo -e "${GREEN}✓${NC} ${component} installed successfully"
        ((SUCCESS_COUNT++))
    else
        echo -e "${RED}✗${NC} Failed to install ${component}"
        ((FAIL_COUNT++))
        FAILED_COMPONENTS+=("$component")
    fi
    echo ""
done

# Summary
echo "================================"
echo "Installation Summary"
echo "================================"
echo -e "${GREEN}✓ Success: ${SUCCESS_COUNT}${NC}"
if [ $FAIL_COUNT -gt 0 ]; then
    echo -e "${RED}✗ Failed: ${FAIL_COUNT}${NC}"
    echo ""
    echo "Failed components:"
    for failed in "${FAILED_COMPONENTS[@]}"; do
        echo "  - $failed"
    done
fi
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo "🎉 All components installed successfully!"
else
    echo "⚠️  Some components failed to install. Please check the errors above."
    exit 1
fi
