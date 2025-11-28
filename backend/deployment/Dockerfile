# USA Luxury Limo - Backend Production Dockerfile
# Optimized for Coolify deployment
# Multi-stage build for minimal image size and security

# ================================================================
# STAGE 1: DEPENDENCIES & BUILDER
# ================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files from backend folder
COPY backend/package*.json ./

# Install all dependencies (needed for building)
RUN npm ci

# Copy source code from backend folder
COPY backend/server ./server
COPY backend/client ./client
COPY backend/database ./database
COPY backend/deployment ./deployment
COPY backend/migrations ./migrations
COPY backend/scripts ./scripts
COPY backend/tsconfig.json ./
COPY backend/drizzle.config.ts ./
COPY backend/vite.config.ts ./
COPY backend/tailwind.config.ts ./
COPY backend/postcss.config.js ./
COPY backend/components.json ./

# Copy shared schemas from root (required for imports)
COPY shared ./shared

# Build application (Vite + esbuild)
# This compiles TypeScript to JavaScript in dist/
RUN npm run build

# ================================================================
# STAGE 2: PRODUCTION RUNTIME
# ================================================================
FROM node:20-alpine

WORKDIR /app

# Copy package files from backend
COPY backend/package*.json ./

# Install only production dependencies and clean cache
RUN npm ci --only=production && \
    npm cache clean --force

# Copy compiled application from builder
# Server bundle (esbuild output)
COPY --from=builder /app/dist ./dist

# Client assets (Vite output - admin/driver/dispatcher UIs)
# Vite builds to dist/public/, which Express serves as static files

# Database and shared code
COPY --from=builder /app/database ./database
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/drizzle.config.ts ./

# Copy deployment scripts from backend
COPY backend/deployment/entrypoint.sh ./
COPY backend/deployment/healthcheck.sh ./
RUN chmod +x entrypoint.sh healthcheck.sh

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose API port
EXPOSE 5000

# Health check - verifies API is responding
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node healthcheck.sh

# Start application (runs compiled JavaScript via entrypoint)
ENTRYPOINT ["./entrypoint.sh"]
