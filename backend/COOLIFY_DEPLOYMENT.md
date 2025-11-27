# Coolify Deployment Guide - USA Luxury Limo Backend

Complete step-by-step guide to deploy the backend on Ubuntu VPS with Coolify's Docker system.

## Prerequisites

- **Coolify installed** on Ubuntu VPS
- **External PostgreSQL database** (Neon, AWS RDS, or Coolify-managed)
- **Domain name** with DNS pointing to your VPS
- **MinIO/S3 object storage** (separate service)
- **All API keys** ready (Stripe, Twilio, TomTom, etc.)

---

## Step 1: Prepare Environment Variables

Generate required secrets:

```bash
# Session secret (32+ characters)
openssl rand -base64 32

# Encryption key (32 characters)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Create a secure copy of `.env` values from `.env.example` with your actual credentials:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Generated above
- `ENCRYPTION_KEY` - Generated above
- `STRIPE_SECRET_KEY`, `TWILIO_AUTH_TOKEN`, etc. from your service accounts

---

## Step 2: Create Docker Compose Project in Coolify

### 2.1 Access Coolify Dashboard
- Login to your Coolify instance (usually `https://your-vps-ip:3000`)
- Navigate to **Projects** → **New Project**

### 2.2 Create New Project
- **Project Name**: `USA Luxury Limo`
- **Project Description**: `Backend API + Admin Panel`

### 2.3 Add Docker Compose Stack
- Click **Add Service** → **Docker Compose**
- **Stack Name**: `backend`
- **Description**: `Express API Server`

### 2.4 Paste Docker Compose Configuration
In the Docker Compose editor, paste this configuration:

```yaml
version: "3.8"

services:
  backend:
    build:
      context: .  # Coolify automatically sets this correctly
      dockerfile: backend/deployment/Dockerfile
    
    container_name: usa-limo-backend
    restart: unless-stopped
    
    environment:
      NODE_ENV: production
      PORT: 5000
      DATABASE_URL: ${DATABASE_URL}
      SESSION_SECRET: ${SESSION_SECRET}
      ENCRYPTION_KEY: ${ENCRYPTION_KEY}
      DOMAIN: ${DOMAIN}
      ALLOWED_ORIGINS: ${ALLOWED_ORIGINS}
      ADMIN_PANEL_HOSTS: ${ADMIN_PANEL_HOSTS}
      BASE_URL: ${BASE_URL}
      API_BASE_URL: ${API_BASE_URL}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      VITE_STRIPE_PUBLIC_KEY: ${VITE_STRIPE_PUBLIC_KEY}
      TWILIO_ACCOUNT_SID: ${TWILIO_ACCOUNT_SID}
      TWILIO_AUTH_TOKEN: ${TWILIO_AUTH_TOKEN}
      TWILIO_PHONE_NUMBER: ${TWILIO_PHONE_NUMBER}
      SMTP_HOST: ${SMTP_HOST}
      SMTP_PORT: ${SMTP_PORT}
      SMTP_SECURE: ${SMTP_SECURE}
      SMTP_USER: ${SMTP_USER}
      SMTP_PASS: ${SMTP_PASS}
      EMAIL_FROM: ${EMAIL_FROM}
      TOMTOM_API_KEY: ${TOMTOM_API_KEY}
      MINIO_ENDPOINT: ${MINIO_ENDPOINT}
      MINIO_PORT: ${MINIO_PORT}
      MINIO_USE_SSL: ${MINIO_USE_SSL}
      MINIO_ACCESS_KEY: ${MINIO_ACCESS_KEY}
      MINIO_SECRET_KEY: ${MINIO_SECRET_KEY}
      MINIO_BUCKET: ${MINIO_BUCKET}
    
    healthcheck:
      test: ["CMD-SHELL", "node healthcheck.sh"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    
    labels:
      # Main API endpoint
      - "caddy=https://api.${DOMAIN}"
      - "caddy.encode=zstd gzip"
      - "caddy.reverse_proxy={{upstreams 5000}}"
      - "caddy.header=-Server"
      - "caddy.header.X-Frame-Options=SAMEORIGIN"
      - "caddy.header.X-Content-Type-Options=nosniff"
      - "caddy.header.X-XSS-Protection=1; mode=block"
      - "caddy.header.Referrer-Policy=strict-origin-when-cross-origin"

networks:
  default:
    name: usa-limo-backend-network
```

---

## Step 3: Configure Environment Variables in Coolify

In Coolify's environment variables section, add all variables from `.env.example`:

### Security Variables (Mark as "Secret")
- `DATABASE_URL` ⭐ SECRET
- `SESSION_SECRET` ⭐ SECRET
- `ENCRYPTION_KEY` ⭐ SECRET
- `STRIPE_SECRET_KEY` ⭐ SECRET
- `TWILIO_AUTH_TOKEN` ⭐ SECRET
- `SMTP_PASS` ⭐ SECRET
- `MINIO_SECRET_KEY` ⭐ SECRET
- `VITE_STRIPE_PUBLIC_KEY` ⭐ SECRET

### Public Variables (Mark as "Public")
- `NODE_ENV=production`
- `PORT=5000`
- `DOMAIN=yourdomain.com`
- `ALLOWED_ORIGINS=https://yourdomain.com,https://api.yourdomain.com`
- `ADMIN_PANEL_HOSTS=admin.yourdomain.com`
- `BASE_URL=https://yourdomain.com`
- `API_BASE_URL=https://api.yourdomain.com`
- `MINIO_ENDPOINT=minio.yourdomain.com`
- `MINIO_PORT=9000`
- `MINIO_USE_SSL=true`
- `TOMTOM_API_KEY=your-key`
- All other API keys and configuration

**Important**: Mark sensitive variables as "Secret" in Coolify UI for encryption.

---

## Step 4: Configure Networking & SSL

### 4.1 Enable SSL/TLS
- In Coolify project settings, enable **Automatic SSL (Let's Encrypt)**
- Ensure your domain DNS records point to your VPS IP

### 4.2 DNS Records Required
```
api.yourdomain.com     → VPS IP Address
admin.yourdomain.com   → VPS IP Address
```

### 4.3 Port Configuration
- Coolify uses **Caddy** as reverse proxy
- Internal port: `5000` (configured in docker-compose)
- External: Automatically routed to `api.yourdomain.com`

---

## Step 5: Database Setup

### 5.1 Create External PostgreSQL Database

**Option 1: Neon (Recommended for cloud)**
1. Create account at https://neon.tech
2. Create new project
3. Copy connection string: `postgresql://user:password@host:5432/database`
4. Keep it secure - this is your `DATABASE_URL`

**Option 2: AWS RDS**
1. Create PostgreSQL instance
2. Allow inbound connections from your VPS IP
3. Copy endpoint and create connection string

**Option 3: Coolify-managed PostgreSQL**
1. In Coolify, add PostgreSQL service
2. Use internal Docker hostname: `postgresql://user:password@postgres:5432/limo_db`
3. Note: This service must run on same Docker network

### 5.2 Verify Database Connection
Before deployment, test connection:
```bash
# From your local machine
psql "postgresql://user:password@host:5432/database"
\dt  # List tables
```

---

## Step 6: Deploy the Backend

### 6.1 Start Deployment
1. In Coolify, click **Deploy**
2. Watch logs for build progress
3. Expected steps:
   - Download Node.js alpine image
   - Install dependencies
   - Build application (Vite + esbuild)
   - Run database migrations
   - Start server

### 6.2 Monitor Deployment
```
Building image...
Running npm ci...
Running npm run build...
Compiling TypeScript...
Installing production dependencies...
Running database migrations...
✅ Migrations complete
Starting server on port 5000...
```

### 6.3 Verify Health Status
```bash
curl https://api.yourdomain.com/health

# Expected response:
{"status": "ok", "timestamp": "2024-11-27T10:00:00Z"}
```

---

## Step 7: Post-Deployment Verification

### 7.1 Check Container Status
```bash
# SSH into VPS
ssh root@your-vps-ip

# Check running containers
docker ps | grep usa-limo

# View logs
docker logs usa-limo-backend -f
```

### 7.2 Test API Endpoints
```bash
# Health check
curl https://api.yourdomain.com/health

# Example: Get branding
curl https://api.yourdomain.com/api/branding

# Example: Create booking (requires authentication)
curl -X POST https://api.yourdomain.com/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"pickupLocation": "Airport", "dropoffLocation": "Hotel"}'
```

### 7.3 Check Database Migrations
```bash
# SSH into VPS
ssh root@your-vps-ip

# Connect to database
psql $DATABASE_URL

# List tables
\dt

# Check migrations table
SELECT * FROM __drizzle_migrations;
```

### 7.4 Monitor Application Logs
In Coolify dashboard:
1. Navigate to your project
2. Click **Logs** tab
3. View real-time backend output

---

## Step 8: Admin Panel Access

The admin/driver/dispatcher UIs are served from the same backend:

- **Admin Panel**: `https://admin.yourdomain.com`
- **Driver Dashboard**: `https://driver.yourdomain.com`  
- **Dispatcher Dashboard**: `https://dispatcher.yourdomain.com`

Configure these as separate Caddy labels in docker-compose.yml if needed:

```yaml
labels:
  - "caddy_admin=https://admin.${DOMAIN}"
  - "caddy_admin.reverse_proxy={{upstreams 5000}}"
  - "caddy_driver=https://driver.${DOMAIN}"
  - "caddy_driver.reverse_proxy={{upstreams 5000}}"
  - "caddy_dispatcher=https://dispatcher.${DOMAIN}"
  - "caddy_dispatcher.reverse_proxy={{upstreams 5000}}"
```

---

## Troubleshooting

### Build Fails: "shared/ folder not found"
**Cause**: Build context incorrect
**Fix**: Ensure docker-compose.yml has `context: .` (Coolify sets this automatically)

### Migrations Fail: "Cannot read TypeScript schema"
**Cause**: tsx not in production dependencies
**Fix**: Already fixed in package.json (tsx moved to dependencies)

### Database Connection Fails
```
Error: ECONNREFUSED DATABASE_URL
```
**Solutions**:
1. Verify DATABASE_URL is correct and accessible
2. Check VPS firewall allows outbound connections
3. Ensure database host is publicly accessible or on same network
4. Test locally: `psql $DATABASE_URL`

### Health Check Failing
```
health check timeout
```
**Solutions**:
1. Check: `docker logs usa-limo-backend`
2. Verify port 5000 accessible internally
3. Ensure NODE_ENV=production is set
4. Check database connection (may hang migrations)

### CORS Errors
```
Access-Control-Allow-Origin missing
```
**Fix**: Verify ALLOWED_ORIGINS includes your frontend domain

---

## Production Best Practices

### 1. Security
- ✅ All secrets marked as "Secret" in Coolify
- ✅ Use strong SESSION_SECRET (32+ random characters)
- ✅ Enable SSL/TLS (automatic with Coolify)
- ✅ Use environment variables (no hardcoded secrets)
- ✅ Regular database backups

### 2. Monitoring
- ✅ Set up Coolify alerting for container crashes
- ✅ Monitor disk space (database growth)
- ✅ Enable application logs in Coolify

### 3. Database
- ✅ Use managed PostgreSQL (Neon, RDS, Coolify)
- ✅ Regular backups (Neon auto-backups daily)
- ✅ Test disaster recovery procedures

### 4. Updates
- ✅ Monitor Node.js LTS versions
- ✅ Update dependencies quarterly
- ✅ Test updates in staging first

---

## Useful Commands

### Connect to Database
```bash
# From VPS
psql "postgresql://user:password@host:5432/database"

# Query users
SELECT id, email, role FROM users LIMIT 10;
```

### View Real-Time Logs
```bash
docker logs -f usa-limo-backend --tail 100
```

### Restart Container
```bash
docker restart usa-limo-backend
```

### Clear Docker Cache (if build issues)
```bash
docker system prune -a
```

### Check Container Resources
```bash
docker stats usa-limo-backend
```

---

## Support & Documentation

- **GitHub**: [USA Luxury Limo Repository](https://github.com/yourusername/usa-luxury-limo)
- **Coolify Docs**: https://coolify.io/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Express.js Docs**: https://expressjs.com/

---

**Deployment completed successfully!** 🎉

Your backend is now running on `https://api.yourdomain.com` with:
- ✅ Express API server (port 5000)
- ✅ Admin/Driver/Dispatcher UIs (static assets)
- ✅ PostgreSQL database migrations
- ✅ SSL/TLS via Caddy
- ✅ Health monitoring
- ✅ Automatic restart on failure
