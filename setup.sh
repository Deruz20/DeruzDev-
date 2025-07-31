#!/bin/bash

# This script will set up the OmniTrack environment.

echo "Setting the DATABASE_URL variable..."
# --- IMPORTANT: PASTE YOUR FULL DATABASE URL (WITH PASSWORD) INSIDE THE QUOTES BELOW ---
export DATABASE_URL="postgresql://postgres:_M_gZj+PMk4Pce6@db.myhforoskvjrbjamjncp.supabase.co:5432/postgres"

echo "DATABASE_URL has been set."
echo "-------------------------------------------"

echo "Installing dependencies..."
npm install

echo "-------------------------------------------"
echo "Setting up the database..."
npx prisma db push

echo "-------------------------------------------"
echo "✅ Setup is complete! You can now run 'npm run dev' to start the application."

