
#!/bin/bash

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        ${GREEN}Launching Mystic India${BLUE}             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install npm first.${NC}"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}Installing dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to install dependencies.${NC}"
        exit 1
    fi
fi

# Start the development server
echo -e "${GREEN}Starting Mystic India application...${NC}"
npm run dev

exit 0
