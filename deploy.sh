#!/bin/bash
set -e

echo "Starting deployment for Next.js app..."

# Automatically navigate to the directory where this script is located
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

# Pull the latest changes from the main branch
echo "Pulling latest code from GitHub..."
git pull origin main

# Load Node Version Manager (if nvm is used on the server)
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node dependencies
echo "Installing dependencies..."
npm install

# Run database migrations and generate Prisma client (if you use Prisma)
echo "Running database migrations..."
npx prisma generate
# npx prisma migrate deploy

# Build the Next.js application
echo "Building the application..."
npm run build

# Restart the application (using PM2 in CloudPanel)
echo "Restarting application..."
pm2 restart all

echo "Deployment finished successfully!"
