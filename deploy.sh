#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "==> Pulling latest changes..."
git pull origin main

echo "==> Building backend..."
cd backend
npm install
npm run build
pm2 restart shirinliklar-backend

echo "==> Building frontend..."
cd ../frontend
npm install
npm run build

echo "==> Deploy complete!"
