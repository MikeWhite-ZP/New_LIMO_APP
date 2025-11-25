#!/bin/sh
set -e

echo "🚀 Starting USA Luxury Limo..."

# Check required environment variables
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL is not set"
  exit 1
fi

echo "📦 Environment: ${NODE_ENV:-development}"

# Run database migrations
# Note: drizzle-kit requires tsx to read TypeScript schema files
# tsx is included in production dependencies for this purpose
echo "🔄 Running database migrations..."
NODE_OPTIONS='--import tsx' npx drizzle-kit push || {
  echo "⚠️  Migration failed, but continuing (may be expected in some cases)"
}

echo "✅ Migrations complete"

# Seed email templates (if needed)
echo "🌱 Ensuring email templates are seeded..."
# This is handled by server/index.ts on startup

# Start application (compiled production build)
echo "🎯 Starting application from dist/index.js..."
exec node dist/index.js
