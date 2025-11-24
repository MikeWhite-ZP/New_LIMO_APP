# USA Luxury Limo - Backend Production Dockerfile
# Optimized for Coolify deployment
# Multi-stage build for minimal image size and security

# ================================================================
# STAGE 1: DEPENDENCIES & BUILDER
# ================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install all dependencies (needed for building)
RUN npm ci

# Copy source code
COPY server ./server
COPY shared ./shared
COPY database ./database
COPY migrations ./migrations
COPY tsconfig.json ./
COPY drizzle.config.ts ./

# ================================================================
# STAGE 2: PRODUCTION RUNTIME
# ================================================================
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies and clean cache
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/database ./database
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/drizzle.config.ts ./

# Copy deployment scripts
COPY deployment/entrypoint.sh ./
COPY deployment/healthcheck.sh ./
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

# Start application
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "--import", "tsx", "server/index.ts"]
