#!/bin/bash

# ==============================================================================
# broz.agency Deployment Script
# Pattern: CoinLover Strategy
# ==============================================================================

# Exit on error
set -e

# Configuration
PROJECT_NAME="broz-agency"
SERVER_USER="root"
SERVER_HOST="server.reloto.ru"
PROJECT_PATH="/var/www/broz-agency"

echo "🚀 Starting deployment for $PROJECT_NAME..."

# Execute commands on remote server
ssh "${SERVER_USER}@${SERVER_HOST}" << EOF
  # Navigate to project directory
  cd "$PROJECT_PATH" || { echo "❌ Directory $PROJECT_PATH not found"; exit 1; }

  echo "📥 Pulling latest changes from git..."
  git pull origin main

  echo "🐳 Building and starting Docker containers..."
  # Use --build to ensure we rebuild the Astro app with new code
  docker compose up -d --build --remove-orphans

  echo "🧹 Cleaning up dangling images..."
  docker image prune -f

  echo "✅ Deployment finished successfully on server!"
EOF

echo "🎉 $PROJECT_NAME is now live at http://broz.agency (or port 8020)"
