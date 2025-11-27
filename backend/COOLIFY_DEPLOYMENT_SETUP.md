# Coolify Deployment Setup for best-chauffeurs.com

Complete configuration guide for deploying USA Luxury Limo backend on Coolify with your specific domain setup.

---

## 📋 Your Domain Configuration

```
Primary Domain:        best-chauffeurs.com
WWW Domain:            www.best-chauffeurs.com
Backend API:           api.best-chauffeurs.com          ← Backend runs here
Admin Panel:           adminaccess.best-chauffeurs.com  ← Admin access
MinIO Storage:         minio.best-chauffeurs.com        ← S3-compatible storage
MinIO Console:         console.best-chauffeurs.com      ← MinIO web UI
```

---

## ✅ Pre-Deployment Checklist

- [ ] PostgreSQL database created and accessible
- [ ] DNS records created for all subdomains:
  - [ ] `api.best-chauffeurs.com` → Your VPS IP
  - [ ] `adminaccess.best-chauffeurs.com` → Your VPS IP  
  - [ ] `minio.best-chauffeurs.com` → Your VPS IP
  - [ ] `console.best-chauffeurs.com` → Your VPS IP
- [ ] SSL certificate ready (Let's Encrypt via Coolify)
- [ ] MinIO service setup and running
- [ ] All API keys obtained:
  - [ ] Stripe Secret Key
  - [ ] Twilio Account SID & Auth Token
  - [ ] TomTom API Key
  - [ ] SMTP credentials
  - [ ] MinIO Access/Secret Keys

---

## 🚀 Step-by-Step Deployment

### Step 1: Generate Required Secrets

Open terminal and generate secure values:

```bash
# Session secret (32+ random chars)
openssl rand -base64 32
# Output: AbC1234567890XyZ...

# Encryption key (32 hex chars)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
# Output: a1b2c3d4e5f6...
```

**Save these values** - you'll need them in Coolify.

---

### Step 2: Create Coolify Docker Compose Stack

**In Coolify Dashboard:**

1. Go to **Projects** → **New Project**
2. Name: `USA Luxury Limo`
3. Add Service → **Docker Compose**
4. Paste this configuration:

```yaml
version: "3.8"

services:
  backend:
    build:
      context: .
      dockerfile: backend/deployment/Dockerfile
    
    container_name: usa-limo-backend
    restart: unless-stopped
    
    environment:
      # Node environment
      NODE_ENV: production
      PORT: 5000
      
      # Database (REQUIRED - use your DATABASE_URL)
      DATABASE_URL: ${DATABASE_URL}
      
      # Security
      SESSION_SECRET: ${SESSION_SECRET}
      ENCRYPTION_KEY: ${ENCRYPTION_KEY}
      
      # Domain configuration
      DOMAIN: best-chauffeurs.com
      ALLOWED_ORIGINS: https://best-chauffeurs.com,https://www.best-chauffeurs.com
      ADMIN_PANEL_HOSTS: adminaccess.best-chauffeurs.com
      BASE_URL: https://best-chauffeurs.com
      API_BASE_URL: https://api.best-chauffeurs.com
      
      # Payment (Stripe)
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      VITE_STRIPE_PUBLIC_KEY: ${VITE_STRIPE_PUBLIC_KEY}
      
      # SMS (Twilio)
      TWILIO_ACCOUNT_SID: ${TWILIO_ACCOUNT_SID}
      TWILIO_AUTH_TOKEN: ${TWILIO_AUTH_TOKEN}
      TWILIO_PHONE_NUMBER: ${TWILIO_PHONE_NUMBER}
      
      # Email (SMTP)
      SMTP_HOST: ${SMTP_HOST}
      SMTP_PORT: ${SMTP_PORT}
      SMTP_SECURE: ${SMTP_SECURE}
      SMTP_USER: ${SMTP_USER}
      SMTP_PASS: ${SMTP_PASS}
      EMAIL_FROM: ${EMAIL_FROM}
      
      # Location services
      TOMTOM_API_KEY: ${TOMTOM_API_KEY}
      
      # Object storage (MinIO)
      MINIO_ENDPOINT: minio.best-chauffeurs.com
      MINIO_PORT: 9000
      MINIO_USE_SSL: true
      MINIO_ACCESS_KEY: ${MINIO_ACCESS_KEY}
      MINIO_SECRET_KEY: ${MINIO_SECRET_KEY}
      MINIO_BUCKET: luxury-limo
    
    healthcheck:
      test: ["CMD-SHELL", "node healthcheck.sh"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    
    labels:
      # API Endpoint
      - "caddy=https://api.best-chauffeurs.com"
      - "caddy.encode=zstd gzip"
      - "caddy.reverse_proxy={{upstreams 5000}}"
      - "caddy.header=-Server"
      - "caddy.header.X-Frame-Options=SAMEORIGIN"
      - "caddy.header.X-Content-Type-Options=nosniff"
      - "caddy.header.X-XSS-Protection=1; mode=block"
      - "caddy.header.Referrer-Policy=strict-origin-when-cross-origin"
      
      # Admin Panel
      - "caddy_admin=https://adminaccess.best-chauffeurs.com"
      - "caddy_admin.reverse_proxy={{upstreams 5000}}"

networks:
  default:
    name: usa-limo-network
```

---

### Step 3: Configure Environment Variables in Coolify

In the Coolify dashboard for this service, add these variables:

#### 🔒 SECRET Variables (Mark as "Secret")

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your PostgreSQL URL | postgresql://user:password@host:port/db |
| `SESSION_SECRET` | Generated above | Use `openssl rand -base64 32` |
| `ENCRYPTION_KEY` | Generated above | 32 hex characters |
| `STRIPE_SECRET_KEY` | Your Stripe key | From dashboard.stripe.com |
| `VITE_STRIPE_PUBLIC_KEY` | Your Stripe public | From dashboard.stripe.com |
| `TWILIO_AUTH_TOKEN` | Your Twilio token | From console.twilio.com |
| `SMTP_PASS` | Your email password | For SMTP provider |
| `MINIO_SECRET_KEY` | Your MinIO secret | From MinIO console |

#### 📋 PUBLIC Variables

| Variable | Value |
|----------|-------|
| `TWILIO_ACCOUNT_SID` | Your SID |
| `TWILIO_PHONE_NUMBER` | +1234567890 format |
| `SMTP_HOST` | smtp.gmail.com (or your provider) |
| `SMTP_PORT` | 587 or 465 |
| `SMTP_SECURE` | true or false |
| `SMTP_USER` | your-email@gmail.com |
| `EMAIL_FROM` | noreply@best-chauffeurs.com |
| `TOMTOM_API_KEY` | Your TomTom key |
| `MINIO_ACCESS_KEY` | Your MinIO access key |

---

### Step 4: Configure DNS Records

In your domain registrar (GoDaddy, Cloudflare, etc.), add these DNS records:

```
Type    Subdomain           Value
─────────────────────────────────────────────────
A       api                 [Your Coolify VPS IP]
A       adminaccess         [Your Coolify VPS IP]
A       minio               [Your Coolify VPS IP]
A       console             [Your Coolify VPS IP]
```

**Example with Cloudflare:**
```
api.best-chauffeurs.com          → 192.0.2.100 (Your VPS IP)
adminaccess.best-chauffeurs.com  → 192.0.2.100
minio.best-chauffeurs.com        → 192.0.2.100
console.best-chauffeurs.com      → 192.0.2.100
```

Allow 5-10 minutes for DNS propagation.

---

### Step 5: Deploy in Coolify

1. In Coolify dashboard, click **Deploy**
2. Watch the build process:
   ```
   📦 Building Node.js image...
   📥 Installing dependencies...
   🔨 Compiling TypeScript...
   🗄️ Running migrations...
   ✅ Starting server...
   ```
3. Expected completion: **3-5 minutes**

---

### Step 6: Verify Deployment

After deployment completes, test each endpoint:

```bash
# Health check
curl https://api.best-chauffeurs.com/health

# Expected response:
{"status": "healthy", "timestamp": "2024-11-27T..."}

# Get branding
curl https://api.best-chauffeurs.com/api/branding

# Admin panel (check if served)
curl https://adminaccess.best-chauffeurs.com/

# Check logs in Coolify
# Dashboard → Service → Logs tab
```

---

## 🐛 Troubleshooting

### Build Fails: "Cannot find shared/ folder"

**Problem:** Docker can't access shared/ folder from parent directory

**Solution:**
- Ensure build context is set to `.` (root directory)
- Verify `backend/deployment/Dockerfile` uses `COPY backend/` and `COPY shared/`
- Check Coolify shows `backend/deployment/Dockerfile` as Dockerfile path

### Database Connection Error

```
Error: connect ECONNREFUSED at [DATABASE_URL]
```

**Solutions:**
1. Verify `DATABASE_URL` is correct:
   ```bash
   psql "postgresql://user:pass@host:5432/db"
   ```
2. Check if database allows connections from your VPS IP
3. Verify credentials (username, password, database name)
4. Ensure URL is properly encoded (@ → %40, etc.)

### SSL Certificate Not Issued

**Problem:** Caddy can't get Let's Encrypt certificate

**Solution:**
1. Verify DNS records are propagated:
   ```bash
   nslookup api.best-chauffeurs.com
   ```
2. Ensure firewall allows HTTP:80 (needed for Let's Encrypt validation)
3. Check Coolify logs for certificate errors
4. Manual retry: Restart service in Coolify dashboard

### Health Check Failing

```
Healthcheck: Container unhealthy
```

**Debug:**
```bash
# SSH into VPS
ssh root@your-vps-ip

# Check running containers
docker ps | grep limo

# Check logs
docker logs usa-limo-backend -f

# Test health endpoint inside container
docker exec usa-limo-backend curl http://localhost:5000/health
```

### CORS Errors in Browser

```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:**
- Verify `ALLOWED_ORIGINS` includes your frontend domain
- Check if frontend uses http vs https
- Restart backend after changing ALLOWED_ORIGINS

### Migrations Timeout

```
Error: FATAL: password authentication failed
```

**Cause:** Migrations can't connect to database during startup

**Solution:**
1. Test database connection manually
2. Increase `start_period` in healthcheck (40s → 60s)
3. Check database logs for connection issues

---

## 📊 Monitoring

### View Logs in Coolify

**Dashboard → Your Project → Service → Logs**

```
Real-time output:
- Build progress
- Migration status
- Server startup
- API requests (if logging enabled)
```

### Check Container Health

```bash
docker ps | grep usa-limo-backend
```

Status indicators:
- `Up ... (healthy)` ✅ Running properly
- `Up ... (unhealthy)` ❌ Health check failing
- `Exited` ❌ Crashed

### Monitor Resources

In Coolify dashboard:
- CPU/Memory usage
- Container restart count
- Network traffic

---

## 🔄 Updating Backend Code

When you push new code to repository:

1. **In Coolify Dashboard:** Click **Redeploy**
2. **Automatic steps:**
   - Pull latest code
   - Build new image
   - Stop old container
   - Start new container with migrations
3. **Zero downtime:** Caddy routes traffic seamlessly

---

## 🔐 Security Checklist

After deployment:

- [ ] All secrets marked as "Secret" in Coolify
- [ ] SSL/TLS working (green padlock in browser)
- [ ] CORS properly restricted to your domains
- [ ] Admin panel accessible only from adminaccess subdomain
- [ ] Database URL uses strong password
- [ ] Regular backups enabled (Coolify → Database settings)
- [ ] Never commit `.env` to Git repository

---

## 📞 Need Help?

### Quick Diagnostics

```bash
# SSH into VPS
ssh root@your-vps-ip

# Check if DNS resolves
nslookup api.best-chauffeurs.com

# Check if VPS can reach database
psql $DATABASE_URL -c "SELECT version();"

# Check Coolify logs
docker logs -f usa-limo-backend

# Test API locally
curl http://localhost:5000/health
```

### Common Issues

| Issue | Check |
|-------|-------|
| Can't reach api.best-chauffeurs.com | DNS records, firewall, VPS IP correct |
| Health check failing | Database connection, migrations timeout |
| CORS errors | ALLOWED_ORIGINS configuration |
| Admin panel 404 | Service running, check logs |
| Database errors | DATABASE_URL format, credentials, access |

---

## ✨ Success Indicators

After deployment, you should see:

✅ `https://api.best-chauffeurs.com/health` returns `{"status": "healthy"}`
✅ Admin panel accessible at `https://adminaccess.best-chauffeurs.com`
✅ Browser shows green SSL padlock
✅ Coolify dashboard shows "healthy" status
✅ Logs show no ERROR messages
✅ Database tables created and accessible

---

## 📚 Files Reference

**Backend Deployment Files:**
- `backend/docker-compose.yml` - Main deployment config
- `backend/.env.example` - Environment template
- `backend/deployment/Dockerfile` - Production build
- `backend/deployment/entrypoint.sh` - Startup script
- `backend/deployment/healthcheck.sh` - Health monitor
- `COOLIFY_DEPLOYMENT.md` - Detailed guide (original)
- `COOLIFY_DEPLOYMENT_SETUP.md` - This file (your domains)

---

**Deployment Ready!** 🚀

All configuration is customized for your domains. Follow the steps above to deploy on Coolify.
