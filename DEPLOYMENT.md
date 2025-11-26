# USA Luxury Limo - Production Deployment Guide

Coolify-optimized deployment guide for the USA Luxury Limo monorepo.

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Coolify Deployment](#coolify-deployment)
- [Troubleshooting](#troubleshooting)

## 🏗️ Project Structure

This is a **monorepo** with two separate applications:

```
/
├── backend/              # Backend API + Admin Portals
│   ├── server/           # Express API
│   ├── client/           # Admin/Driver/Dispatcher UIs
│   ├── deployment/       # Docker configs
│   └── package.json
│
├── frontend/             # Public Website
│   ├── src/pages/        # Public pages
│   ├── Dockerfile        # Production build
│   └── package.json
│
└── docker-compose.production.yml  # Orchestration
```

## ✅ Prerequisites

### Required Services
- **PostgreSQL Database** (Neon recommended)
- **MinIO or S3** - Object storage for images/documents
- **Twilio Account** - SMS notifications
- **Stripe Account** - Payment processing
- **TomTom API Key** - Geocoding
- **AeroDataBox API Key** - Flight search (optional)

### Required Tools
- Docker & Docker Compose
- Git
- Node.js 20+ (for local development)

## 🔐 Environment Variables

### Backend Environment Variables

Create a `.env` file in the `backend/` directory or set these in Coolify:

```bash
# Database (REQUIRED)
DATABASE_URL=postgresql://user:password@host:5432/database

# Node Environment (REQUIRED)
NODE_ENV=production

# Session Secret (REQUIRED)
SESSION_SECRET=your-very-long-random-secret-key-here

# Encryption Key for sensitive data (REQUIRED - 32 bytes)
ENCRYPTION_KEY=your-32-character-encryption-key

# CORS - Frontend URL (REQUIRED)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Admin Panel Access (REQUIRED)
ADMIN_PANEL_HOSTS=admin.yourdomain.com,localhost:5000

# Stripe (REQUIRED)
STRIPE_SECRET_KEY=sk_live_xxx
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx

# Twilio (REQUIRED)
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890

# Email (REQUIRED)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# MinIO/S3 Object Storage (REQUIRED)
# These can also be configured via Admin Settings in the app
MINIO_ENDPOINT=minio.yourdomain.com
MINIO_PORT=9000
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=your-access-key
MINIO_SECRET_KEY=your-secret-key
MINIO_BUCKET=replit

# TomTom API (REQUIRED)
TOMTOM_API_KEY=your-tomtom-api-key

# AeroDataBox API (OPTIONAL)
AERODATABOX_API_KEY=your-aerodatabox-key

# Replit Auth (if using Replit)
REPLIT_DOMAINS=your-repl-slug.repl.co
ISSUER_URL=https://replit.com

# PayPal (OPTIONAL)
PAYPAL_CLIENT_ID=xxx
PAYPAL_CLIENT_SECRET=xxx
PAYPAL_MODE=live

# Square (OPTIONAL)
SQUARE_ACCESS_TOKEN=xxx
SQUARE_LOCATION_ID=xxx
SQUARE_ENVIRONMENT=production

# Application URLs
BASE_URL=https://yourdomain.com
API_BASE_URL=https://api.yourdomain.com
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```bash
# Backend API URL (REQUIRED)
VITE_API_BASE_URL=https://api.yourdomain.com
```

### ⚠️ Important Notes

1. **DATABASE_URL Encoding**: Special characters in password must be URL-encoded:
   - `?` → `%3F`
   - `@` → `%40`
   - `#` → `%23`
   - etc.

2. **SESSION_SECRET**: Generate with: `openssl rand -base64 32`

3. **ENCRYPTION_KEY**: Must be exactly 32 characters. Generate with: `openssl rand -hex 16`

## 💻 Local Development

### Backend Development

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Run Both (from root)

```bash
npm run dev
```

This delegates to the backend and runs on port 5000.

## 🚀 Production Deployment

### Using Docker Compose

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/usa-luxury-limo.git
cd usa-luxury-limo
```

2. **Set environment variables:**
   - Copy `.env.example` files in `backend/` and `frontend/`
   - Fill in all required values

3. **Build and run:**
```bash
docker-compose -f docker-compose.production.yml up -d --build
```

4. **Check status:**
```bash
docker-compose -f docker-compose.production.yml ps
docker-compose -f docker-compose.production.yml logs -f
```

### Services

- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:80`

### Health Checks

- Backend: `http://localhost:5000/health`
- Frontend: `http://localhost:80/` (should load website)

## 🎯 Coolify Deployment

### Step 1: Create New Project in Coolify

1. Go to Coolify dashboard
2. Create new project: "USA Luxury Limo"

### Step 2: Add Git Source

1. Connect your Git repository
2. Select branch: `main` or `production`

### Step 3: Configure Build Settings

**Build Pack:** Docker Compose

**Docker Compose File:** `docker-compose.production.yml`

### Step 4: Set Environment Variables

In Coolify, add all environment variables listed above:

#### Backend Service Environment Variables
```
DATABASE_URL=postgresql://...
NODE_ENV=production
SESSION_SECRET=...
ENCRYPTION_KEY=...
ALLOWED_ORIGINS=https://yourdomain.com
ADMIN_PANEL_HOSTS=admin.yourdomain.com
STRIPE_SECRET_KEY=...
TWILIO_ACCOUNT_SID=...
SMTP_HOST=...
... (all backend variables)
```

#### Frontend Service Environment Variables
```
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Step 5: Configure Domains

1. **Backend Service:**
   - Domain: `api.yourdomain.com`
   - Port: 5000
   - Enable HTTPS

2. **Frontend Service:**
   - Domain: `yourdomain.com`
   - Port: 80
   - Enable HTTPS

3. **Admin Subdomain (optional):**
   - Point `admin.yourdomain.com` to backend service
   - Same as `api.yourdomain.com`

### Step 6: Deploy

Click "Deploy" in Coolify. The deployment process will:

1. Pull latest code from Git
2. Build backend Docker image
3. Build frontend Docker image  
4. Start both services
5. Run health checks

### Step 7: Verify Deployment

1. **Check backend health:**
   ```bash
   curl https://api.yourdomain.com/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

2. **Check frontend:**
   Open `https://yourdomain.com` in browser

3. **Check logs in Coolify:**
   - Go to your project
   - Check "Logs" tab for each service

## 🔧 Post-Deployment Setup

### 1. Database Migrations

The backend automatically runs migrations on startup. No manual action needed.

### 2. Admin Account

Create your first admin account:

1. Go to `https://yourdomain.com/login`
2. Sign up with your email
3. Connect to database and manually set role to 'admin':
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

### 3. MinIO/Object Storage Setup

1. Log into admin panel: `https://admin.yourdomain.com`
2. Go to Settings → Storage
3. Configure MinIO credentials
4. Test connection

### 4. Email Templates

Email templates are automatically seeded on startup. You can customize them in:
Admin Panel → Settings → Email Templates

## 🐛 Troubleshooting

### Backend Won't Start

**Check logs:**
```bash
docker-compose -f docker-compose.production.yml logs backend
```

**Common issues:**

1. **Database connection failed:**
   - Verify `DATABASE_URL` is correct
   - Check special characters are URL-encoded
   - Ensure database is accessible from Docker container

2. **Missing environment variables:**
   - Check all required env vars are set
   - Verify no typos in variable names

3. **Port already in use:**
   - Check if port 5000 is available
   - Change port in docker-compose.yml if needed

### Frontend Won't Start

**Check logs:**
```bash
docker-compose -f docker-compose.production.yml logs frontend
```

**Common issues:**

1. **Can't connect to backend:**
   - Verify `VITE_API_BASE_URL` is correct
   - Check CORS settings in backend (`ALLOWED_ORIGINS`)

2. **Build failed:**
   - Check Node.js version (requires 20+)
   - Clear node_modules and rebuild

### CORS Errors

If you see CORS errors in browser console:

1. Add your frontend domain to `ALLOWED_ORIGINS`:
   ```bash
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

2. Restart backend service

### Database Encoding Issues

If you see authentication errors with special characters in password:

1. URL-encode the password in `DATABASE_URL`:
   ```
   # Wrong:
   postgresql://user:p@ssw0rd?#@host:5432/db
   
   # Correct:
   postgresql://user:p%40ssw0rd%3F%23@host:5432/db
   ```

### MinIO Connection Issues

1. **Verify credentials** in Admin Settings → Storage
2. **Check network** - ensure MinIO is accessible
3. **Test connection** using the admin panel test button

## 📊 Monitoring

### Health Checks

- Backend: `GET /health`
- Database: Backend connects on startup
- Object Storage: Test via admin panel

### Logs

**View logs in Coolify:**
- Go to Project → Service → Logs

**View logs with Docker Compose:**
```bash
# All services
docker-compose -f docker-compose.production.yml logs -f

# Backend only
docker-compose -f docker-compose.production.yml logs -f backend

# Frontend only
docker-compose -f docker-compose.production.yml logs -f frontend
```

## 🔄 Updates and Redeployment

### Automatic Deployment (Coolify)

If you have Coolify configured with Git integration:

1. Push changes to your Git repository
2. Coolify automatically detects changes
3. Rebuilds and redeploys services

### Manual Deployment

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.production.yml up -d --build
```

## 📚 Additional Resources

- [Backend Deployment Guide](./backend/DEPLOYMENT.md)
- [Frontend Deployment Guide](./frontend/DEPLOYMENT.md)
- [Monorepo Guide](./MONOREPO-GUIDE.md)
- [Complete Documentation](./MONOREPO-COMPLETE.md)

## 🆘 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review service logs in Coolify
3. Check database connectivity
4. Verify all environment variables are set correctly

## 📝 Notes

- **Database persistence:** All data is stored in external PostgreSQL (Neon)
- **Session storage:** Uses PostgreSQL in production, memory in development
- **Object storage:** MinIO or S3 for images and documents
- **Mobile apps:** iOS and Android apps in `backend/android/` and `backend/ios/`
