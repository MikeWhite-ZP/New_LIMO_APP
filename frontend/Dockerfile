# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built files from builder - copy the entire dist directory
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Serve static files with a simple HTTP server
# Install http-server globally
RUN npm install -g http-server

# Start serving from dist/public (where Vite puts the HTML)
CMD ["http-server", "dist/public", "-p", "3000", "--gzip"]
