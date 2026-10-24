#!/bin/bash
set -e

echo "Starting deployment for Next.js app..."

# PM2 process name of the site (as shown by `pm2 status`)
APP_NAME="wakeel-app"
# Port used only if PM2 has no saved definition of the app; must match the App Port in CloudPanel
APP_PORT="${APP_PORT:-3000}"

# Automatically navigate to the directory where this script is located
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

# Load Node Version Manager (non-interactive SSH shells don't load it on their own)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Pull the latest changes from the main branch
echo "Pulling latest code from GitHub..."
git pull origin main

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

# ---------------------------------------------------------------------------
# TEMPORARY RECOVERY (remove after the site is back online)
# The PM2 daemon was killed on 2026-10-17 and nothing restarted it, so the site
# has been returning 502. Restore the process list PM2 saved when it was killed.
if ! pm2 describe "$APP_NAME" > /dev/null 2>&1; then
    echo "PM2 does not know $APP_NAME, restoring the saved process list..."
    pm2 resurrect || true
fi
# ---------------------------------------------------------------------------

# Restart only this app (start it if PM2 still doesn't know it)
echo "Restarting application..."
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
    pm2 restart "$APP_NAME" --update-env
else
    PORT="$APP_PORT" pm2 start npm --name "$APP_NAME" -- start
fi

# Save the process list so PM2 can restore it after a server reboot
pm2 save

# ---------------------------------------------------------------------------
# TEMPORARY SETUP (remove once `crontab -l` on the server shows the line)
# Bring PM2 and the site back automatically when the server reboots.
if ! crontab -l 2>/dev/null | grep -Fq "pm2 resurrect"; then
    echo "Adding @reboot crontab entry for PM2..."
    # cron doesn't load nvm, so give it the absolute folder that holds node and pm2
    NODE_BIN_DIR="$(dirname "$(command -v pm2)")"
    # `|| true`: with set -e, a missing crontab would otherwise abort the subshell before the echo
    (crontab -l 2>/dev/null || true; echo "@reboot PATH=$NODE_BIN_DIR:/usr/bin:/bin pm2 resurrect") | crontab -
fi
# ---------------------------------------------------------------------------

pm2 status "$APP_NAME" || true
echo "Deployment finished successfully!"
