# Coolify Deployment Checklist

Complete this checklist before deploying to Coolify.

## Pre-Deployment Setup

### 1. External Services Setup

- [ ] **PostgreSQL Database**
  - [ ] Database created and accessible
  - [ ] Database URL: `postgresql://user:pass@host:port/db`
  - [ ] Test connection: `psql <DATABASE_URL>`

- [ ] **MinIO / S3 Object Storage**
  - [ ] Bucket created
  - [ ] Access Key & Secret Key obtained
  - [ ] Endpoint URL (for Coolify internal: `http://minio:9000`)

- [ ] **Payment Processing - Stripe**
  - [ ] Account created
  - [ ] Live Secret Key obtained: `sk_live_...`
  - [ ] Live Public Key obtained: `pk_live_...`

- [ ] **SMS - Twilio**
  - [ ] Account created
  - [ ] Account SID obtained
  - [ ] Auth Token obtained
  - [ ] Phone number assigned

- [ ] **Location Services - TomTom**
  - [ ] Developer account created
  - [ ] API Key generated

- [ ] **Email - SMTP**
  - [ ] Email provider configured (Gmail, SendGrid, AWS SES, etc.)
  - [ ] SMTP credentials obtained
  - [ ] App-specific password (if using Gmail)

### 2. Domain & DNS Setup

- [ ] **Main Domain**
  - [ ] Domain registered
  - [ ] DNS A record pointing to Coolify server IP
  - [ ] Example: `yourdomain.com → Coolify_IP`

- [ ] **API Subdomain**
  - [ ] DNS A record: `api.yourdomain.com → Coolify_IP`

- [ ] **Admin Subdomain**
  - [ ] DNS A record: `admin.yourdomain.com → Coolify_IP`

- [ ] **WWW Subdomain**
  - [ ] DNS A record: `www.yourdomain.com → Coolify_IP`

### 3. Generate Required Security Keys

```bash
# 1. SESSION_SECRET (run in terminal)
openssl rand -base64 32
# Copy the output

# 2. ENCRYPTION_KEY (exactly 32 characters)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
# Copy the output
```

## Coolify Configuration

### 4. Create Docker Compose Project

- [ ] In Coolify Dashboard: Click "New Project"
- [ ] Choose "Docker Compose"
- [ ] Paste content from `docker-compose.production.yml`
- [ ] Review the configuration

### 5. Environment Variables

Set these in Coolify UI (mark secrets with "Secret" checkbox):

#### Application Settings
- [ ] `NODE_ENV` = `production`
- [ ] `DOMAIN` = `yourdomain.com`

#### Database
- [ ] `DATABASE_URL` = `postgresql://user:pass@host:5432/db`
- [ ] **Mark as Secret**

#### Security
- [ ] `SESSION_SECRET` = (generated above)
- [ ] **Mark as Secret**
- [ ] `ENCRYPTION_KEY` = (generated above)
- [ ] **Mark as Secret**

#### APIs
- [ ] `STRIPE_SECRET_KEY` = `sk_live_...`
- [ ] **Mark as Secret**
- [ ] `VITE_STRIPE_PUBLIC_KEY` = `pk_live_...`
- [ ] `TOMTOM_API_KEY` = (from TomTom Dashboard)
- [ ] **Mark as Secret**

#### SMS - Twilio
- [ ] `TWILIO_ACCOUNT_SID` = `ACxxxxxxx...`
- [ ] **Mark as Secret**
- [ ] `TWILIO_AUTH_TOKEN` = (from Twilio)
- [ ] **Mark as Secret**
- [ ] `TWILIO_PHONE_NUMBER` = `+1234567890`

#### Email - SMTP
- [ ] `SMTP_HOST` = `smtp.gmail.com`
- [ ] `SMTP_PORT` = `587`
- [ ] `SMTP_USER` = `your@email.com`
- [ ] `SMTP_PASS` = (App Password, not regular password)
- [ ] **Mark as Secret**
- [ ] `EMAIL_FROM` = `noreply@yourdomain.com`

#### Object Storage - MinIO/S3
- [ ] `MINIO_ENDPOINT` = `minio.yourdomain.com`
- [ ] `MINIO_PORT` = `9000`
- [ ] `MINIO_USE_SSL` = `true`
- [ ] `MINIO_ACCESS_KEY` = (from MinIO)
- [ ] **Mark as Secret**
- [ ] `MINIO_SECRET_KEY` = (from MinIO)
- [ ] **Mark as Secret**
- [ ] `MINIO_BUCKET` = `luxury-limo`

#### CORS & Domains
- [ ] `ALLOWED_ORIGINS` = `https://yourdomain.com,https://www.yourdomain.com`
- [ ] `ADMIN_PANEL_HOSTS` = `admin.yourdomain.com`
- [ ] `BASE_URL` = `https://yourdomain.com`
- [ ] `API_BASE_URL` = `https://api.yourdomain.com`
- [ ] `VITE_API_BASE_URL` = `https://api.yourdomain.com`

#### Optional (PayPal, Square, AeroDataBox)
- [ ] `PAYPAL_CLIENT_ID` = (if using PayPal)
- [ ] `PAYPAL_CLIENT_SECRET` = (if using PayPal) - **Mark as Secret**
- [ ] `SQUARE_ACCESS_TOKEN` = (if using Square) - **Mark as Secret**
- [ ] `SQUARE_LOCATION_ID` = (if using Square)
- [ ] `AERODATABOX_API_KEY` = (if using flight search) - **Mark as Secret**

## Deployment

### 6. Deploy to Coolify

- [ ] Click "Deploy" button
- [ ] Wait for Docker images to build (3-5 minutes)
- [ ] Watch logs for errors
- [ ] Verify services status shows "running"

### 7. Post-Deployment Verification

#### Health Checks
```bash
# Backend API
curl https://api.yourdomain.com/health
# Expected: 200 OK

# Frontend Website
curl https://yourdomain.com/health
# Expected: 200 OK or HTML response
```

#### Service URLs
- [ ] Frontend: `https://yourdomain.com` → Works
- [ ] API: `https://api.yourdomain.com` → Responds to health check
- [ ] Admin: `https://admin.yourdomain.com` → Shows admin login

#### Database
- [ ] Check Coolify logs for migration success
- [ ] Verify migrations ran without errors

#### Email/SMS (Optional)
- [ ] Test email sending (if applicable)
- [ ] Test SMS sending (if applicable)

## Troubleshooting

### Common Issues

**Services keep restarting:**
1. Check Coolify logs for specific errors
2. Verify DATABASE_URL is correct
3. Check all required environment variables are set
4. Ensure special characters in DATABASE_URL are URL-encoded

**502 Bad Gateway:**
1. Verify backend service is healthy: `curl https://api.yourdomain.com/health`
2. Check ALLOWED_ORIGINS includes your domain
3. Check logs for startup errors
4. Verify all database connections work

**Database migration fails:**
1. Check DATABASE_URL format is correct
2. Verify database is accessible from Coolify
3. Ensure database user has CREATE TABLE permissions
4. Check Coolify logs for SQL errors

**SSL Certificate Issues:**
1. Verify DNS is pointing correctly to Coolify
2. Wait 2-3 minutes for certificate generation
3. Check Coolify logs for certificate generation errors
4. Verify DOMAIN variable matches your actual domain

**Email not working:**
1. Verify SMTP credentials are correct
2. For Gmail: Use App Password, not regular password
3. Check email provider isn't blocking SMTP
4. Verify SMTP_PORT is correct for your provider (usually 587 or 465)

## References

- **Full Documentation**: See `COOLIFY-DEPLOYMENT.md` for detailed guide
- **Quick Start**: See `COOLIFY-DEPLOYMENT-QUICK.md` for 5-step guide
- **Environment Variables**: See `.env.example` for all available variables

## Success Indicators

✅ Deployment successful when:
- [ ] Docker containers are running in Coolify
- [ ] Health endpoints return 200 OK
- [ ] Frontend loads in browser
- [ ] API responds to requests
- [ ] Database migrations completed
- [ ] SSL certificates are valid
- [ ] Services are accessible via custom domain

---

**Need Help?**
Check the logs in Coolify dashboard for specific error messages.
