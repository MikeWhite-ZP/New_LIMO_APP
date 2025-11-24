# Coolify Deployment - Quick Start Guide

**5 Simple Steps to Deploy USA Luxury Limo**

## 1. Prepare Your Domain & Services

- [ ] Domain pointing to Coolify server (DNS)
- [ ] PostgreSQL database created (Neon, AWS RDS, etc.)
- [ ] MinIO/S3 bucket created
- [ ] API Keys: Stripe, Twilio, TomTom
- [ ] SMTP email configured

## 2. Generate Required Values

```bash
# Generate SESSION_SECRET (copy output)
openssl rand -base64 32

# Generate ENCRYPTION_KEY (32 chars)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## 3. Copy docker-compose.production.yml to Coolify

```
File: docker-compose.production.yml
Services: backend (port 5000) + frontend (port 80)
```

## 4. Set Environment Variables in Coolify UI

**Required Variables (30 minimum):**

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `DOMAIN` | `yourdomain.com` |
| `DATABASE_URL` | `postgresql://...` |
| `SESSION_SECRET` | *generated above* |
| `ENCRYPTION_KEY` | *generated above* |
| `STRIPE_SECRET_KEY` | From Stripe Dashboard |
| `TOMTOM_API_KEY` | From TomTom Developer |
| `TWILIO_ACCOUNT_SID` | From Twilio Console |
| `TWILIO_AUTH_TOKEN` | From Twilio Console |
| `TWILIO_PHONE_NUMBER` | Your Twilio number |
| `SMTP_HOST` | smtp.gmail.com (or your provider) |
| `SMTP_USER` | your@email.com |
| `SMTP_PASS` | Gmail App Password |
| `EMAIL_FROM` | noreply@yourdomain.com |
| `MINIO_ENDPOINT` | minio.yourdomain.com |
| `MINIO_ACCESS_KEY` | Your MinIO access key |
| `MINIO_SECRET_KEY` | Your MinIO secret key |
| `ALLOWED_ORIGINS` | `https://yourdomain.com,https://www.yourdomain.com` |
| `ADMIN_PANEL_HOSTS` | `admin.yourdomain.com` |
| `BASE_URL` | `https://yourdomain.com` |
| `API_BASE_URL` | `https://api.yourdomain.com` |
| `VITE_API_BASE_URL` | `https://api.yourdomain.com` |

**For Secrets:** Mark all keys as "Secret" type in Coolify UI

## 5. Deploy!

1. Click **"Deploy"** in Coolify
2. Wait for images to build (3-5 minutes)
3. Check **Logs** for any errors
4. Verify health endpoints:
   ```bash
   curl https://api.yourdomain.com/health
   curl https://yourdomain.com/health
   ```

## Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Public Website | `https://yourdomain.com` | Frontend |
| API Backend | `https://api.yourdomain.com` | API endpoints |
| Admin Panel | `https://admin.yourdomain.com` | Admin/Driver/Dispatcher UI |

## Troubleshooting

**Services keep restarting?**
- Check DATABASE_URL format
- Verify all required env variables are set
- Check logs for migration errors

**502 Bad Gateway?**
- Verify backend health: `curl https://api.yourdomain.com/health`
- Check ALLOWED_ORIGINS setting
- Restart services

**Email/SMS not working?**
- Verify SMTP credentials
- Check Twilio account has credits
- Test with correct app password (not regular password)

**See COOLIFY-DEPLOYMENT.md for detailed guide**

