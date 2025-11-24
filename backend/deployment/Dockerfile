# Production Dockerfile for USA Luxury Limo Backend
# Optimized for Coolify deployment
# Multi-stage build for minimal image size

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY server ./server
COPY shared ./shared
COPY tsconfig.json ./
COPY drizzle.config.ts ./

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application from builder
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Copy scripts
COPY deployment/entrypoint.sh ./
COPY deployment/healthcheck.sh ./
RUN chmod +x entrypoint.sh healthcheck.sh

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node healthcheck.sh

# Start application
ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "--import", "tsx", "server/index.ts"]
