# USA Luxury Limo Backend - Quick Start Guide

**For:** Coolify deployment on Ubuntu VPS  
**Domain:** best-chauffeurs.com  
**Status:** ✅ Ready for deployment

---

## 🚀 30-Second Overview

Your backend is configured for **Coolify on external Ubuntu VPS** with:

- ✅ Self-contained backend folder (no frontend dependency)
- ✅ Docker Compose setup (industry standard)
- ✅ Multi-stage optimized build (~500MB image)
- ✅ Automatic database migrations
- ✅ Health checks & SSL ready
- ✅ Domain-specific configuration for best-chauffeurs.com

---

## 📋 Your Domains

```
┌─────────────────────────────────────────────────────┐
│ API Backend:        api.best-chauffeurs.com        │
│ Admin Panel:        adminaccess.best-chauffeurs.com│
│ MinIO Storage:      minio.best-chauffeurs.com      │
│ MinIO Console:      console.best-chauffeurs.com    │
│ Frontend:           best-chauffeurs.com            │
│                     www.best-chauffeurs.com        │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 Pre-Deployment (5 minutes)

### 1. Generate Secure Secrets

```bash
# Session secret (copy the output)
openssl rand -base64 32

# Encryption key (copy the output)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

### 2. Prepare Information

Gather these before starting:
- PostgreSQL database URL (or create new one)
- Stripe Secret Key
- Twilio Account SID & Auth Token
- TomTom API Key
- SMTP credentials (Gmail/SendGrid)
- MinIO credentials
- The two secrets from step 1

### 3. DNS Setup

Add these DNS records to your domain registrar:

```
A  api.best-chauffeurs.com          → [Your VPS IP]
A  adminaccess.best-chauffeurs.com  → [Your VPS IP]
A  minio.best-chauffeurs.com        → [Your VPS IP]
A  console.best-chauffeurs.com      → [Your VPS IP]
```

Wait for DNS propagation (5-10 minutes).

---

## 🎯 Deploy on Coolify (10 minutes)

### Step 1: Create Docker Compose Project

1. Open Coolify dashboard
2. **Projects** → **New Project** → **Docker Compose**
3. **Name:** `USA Luxury Limo`

### Step 2: Paste Configuration

Copy from `backend/docker-compose.yml` and paste into Coolify's Docker Compose editor.

### Step 3: Add Environment Variables

In Coolify, add each variable from `backend/.env.example`:

**Mark as SECRET (encrypted):**
```
DATABASE_URL
SESSION_SECRET (use generated secret)
ENCRYPTION_KEY (use generated key)
STRIPE_SECRET_KEY
VITE_STRIPE_PUBLIC_KEY
TWILIO_AUTH_TOKEN
SMTP_PASS
MINIO_SECRET_KEY
```

**Mark as PUBLIC:**
```
All other variables from .env.example
```

### Step 4: Deploy

Click **Deploy** button. Expected time: **3-5 minutes**

Watch logs for:
- ✓ `npm ci` - installing deps
- ✓ `npm run build` - compiling
- ✓ Database migrations running
- ✓ Server listening on port 5000

---

## ✅ Verify Deployment (2 minutes)

After deployment completes:

```bash
# 1. Test health check
curl https://api.best-chauffeurs.com/health
# Should return: {"status": "healthy", ...}

# 2. Test API
curl https://api.best-chauffeurs.com/api/branding
# Should return branding data

# 3. Check admin panel
# Open in browser: https://adminaccess.best-chauffeurs.com
# Should load admin interface
```

**All working?** ✅ **Backend is live!**

---

## 🐛 Troubleshooting (Most Common)

### ❌ Build Fails

```
Error: Cannot find shared/ folder
```

**Fix:** Verify Dockerfile path is `backend/deployment/Dockerfile`

### ❌ Database Connection Error

```
Error: ECONNREFUSED or password authentication failed
```

**Checks:**
- [ ] DATABASE_URL is correct
- [ ] Database allows connections from your VPS IP
- [ ] Special characters in password are URL-encoded (@ → %40)
- [ ] Test locally: `psql "postgresql://user:pass@host:port/db"`

### ❌ Health Check Failing

```
Healthcheck: Container unhealthy
```

**Check logs in Coolify dashboard:**
- Look for database connection errors
- Verify environment variables are set
- Check if migrations are timing out

### ❌ SSL Certificate Not Working

```
Browser warning: Certificate error
```

**Fix:**
- [ ] DNS records propagated (test with `nslookup api.best-chauffeurs.com`)
- [ ] Firewall allows HTTP:80 (needed for Let's Encrypt)
- [ ] Wait 5-10 minutes for certificate generation
- [ ] Restart service in Coolify

### ❌ CORS Errors in Browser

```
Access to XMLHttpRequest blocked by CORS policy
```

**Fix:** Restart backend after any environment variable changes

---

## 📂 Backend Folder Structure

```
backend/
├── 📄 docker-compose.yml              ← Main deployment config
├── 📄 .env.example                    ← Environment template (customized)
├── 📄 README.md                       ← Full documentation
├── 📄 QUICK_START.md                  ← This file
├── 📄 COOLIFY_DEPLOYMENT_SETUP.md     ← Detailed setup guide
├── 📄 DEPLOYMENT_VERIFICATION.md      ← Verification checklist
├── 📁 deployment/
│   ├── 📄 Dockerfile                  ← Production build (multi-stage)
│   ├── 📄 entrypoint.sh               ← Startup script
│   ├── 📄 healthcheck.sh              ← Health check
│   └── 📄 .dockerignore               ← Build optimization
├── 📁 server/                         ← Express API
├── 📁 client/                         ← Admin/Driver/Dispatcher UIs
├── 📁 database/                       ← Database config
├── 📁 migrations/                     ← Drizzle migrations
├── 📄 package.json                    ← Dependencies (tsx now included!)
└── 📄 drizzle.config.ts               ← ORM config
```

---

## 🔐 Security Checklist

- [ ] All secrets marked as "Secret" in Coolify
- [ ] DATABASE_URL uses strong password
- [ ] SESSION_SECRET is 32+ random characters
- [ ] ENCRYPTION_KEY is 32 hex characters
- [ ] SSL certificate is valid (green padlock)
- [ ] CORS limited to your domains only
- [ ] `.env` never committed to Git
- [ ] Regular database backups enabled

---

## 📞 Need Help?

### Files Reference

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Main deployment (copy to Coolify) |
| `.env.example` | All variables needed (customized) |
| `COOLIFY_DEPLOYMENT_SETUP.md` | Step-by-step guide with your domains |
| `DEPLOYMENT_VERIFICATION.md` | Post-deployment checklist |
| `Dockerfile` | Production Docker build |
| `entrypoint.sh` | Startup & migrations |

### Useful Commands

```bash
# SSH into VPS
ssh root@your-vps-ip

# Check container status
docker ps | grep usa-limo

# View logs
docker logs usa-limo-backend -f

# Test API
curl https://api.best-chauffeurs.com/health

# Connect to database
psql $DATABASE_URL
```

---

## ✨ You're Ready!

Your backend is **fully configured** and **ready to deploy** on Coolify.

**Next Step:** Follow **COOLIFY_DEPLOYMENT_SETUP.md** for detailed deployment instructions.

**Questions?** Check **README.md** for comprehensive documentation.

---

**Happy Deployment!** 🚀
