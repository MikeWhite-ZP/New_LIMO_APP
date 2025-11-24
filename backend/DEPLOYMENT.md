# Backend Deployment Guide

Deployment instructions specifically for the USA Luxury Limo backend application.

## Overview

The backend includes:
- Express API server
- Admin, Driver, and Dispatcher web portals
- Database migrations
- Mobile app builds (iOS/Android)

## Build Process

### Development Build
```bash
npm run dev
```

Runs on port 5000 with hot reload.

### Production Build
```bash
npm run build
```

Creates:
- `dist/public/` - Frontend assets (admin portals)
- `dist/index.js` - Backend server bundle

### Start Production Server
```bash
npm start
```

Runs the compiled `dist/index.js` file.

## Docker Deployment

### Dockerfile Location
```
backend/deployment/Dockerfile.backend
```

### Build Docker Image
```bash
cd backend
docker build -f deployment/Dockerfile.backend -t usa-limo-backend:latest .
```

### Run Docker Container
```bash
docker run -p 5000:5000 \
  -e DATABASE_URL="postgresql://..." \
  -e NODE_ENV=production \
  -e SESSION_SECRET="..." \
  --name usa-limo-backend \
  usa-limo-backend:latest
```

## Environment Variables

### Required

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Node environment
NODE_ENV=production

# Session management
SESSION_SECRET=your-long-random-secret

# Encryption for sensitive data
ENCRYPTION_KEY=your-32-char-key

# CORS - Allow frontend domain
ALLOWED_ORIGINS=https://yourdomain.com

# Admin panel access control
ADMIN_PANEL_HOSTS=admin.yourdomain.com,localhost:5000
```

### External Services

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx

# Twilio
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# MinIO/S3
MINIO_ENDPOINT=minio.yourdomain.com
MINIO_PORT=9000
MINIO_USE_SSL=true
MINIO_ACCESS_KEY=xxx
MINIO_SECRET_KEY=xxx
MINIO_BUCKET=replit

# TomTom
TOMTOM_API_KEY=your-api-key

# AeroDataBox (optional)
AERODATABOX_API_KEY=your-api-key
```

## Database Setup

### Automatic Migrations

The backend automatically runs migrations on startup. No manual action needed.

### Manual Migration

If you need to manually run migrations:

```bash
npm run db:push
```

## Health Checks

### Endpoint
```
GET /health
```

### Response
```json
{
  "status": "ok",
  "timestamp": "2024-11-24T12:00:00.000Z"
}
```

### Check in Production
```bash
curl https://api.yourdomain.com/health
```

## Ports

- **Development:** 5000
- **Production:** 5000 (configurable)

## API Endpoints

### Public API
- `/api/*` - Public endpoints (bookings, contact, etc.)

### Protected API
- `/api/admin/*` - Admin only
- `/api/driver/*` - Driver only
- `/api/dispatcher/*` - Dispatcher only

### Authentication
- `/login` - User login
- `/logout` - User logout
- `/signup` - User registration

## Admin Panel Access

### Development
```
http://localhost:5000/admin
```

### Production
```
https://admin.yourdomain.com
https://api.yourdomain.com/admin
```

**Note:** Access is controlled by `ADMIN_PANEL_HOSTS` environment variable.

## Mobile Apps

### iOS App
```bash
cd ios
# Follow iOS deployment guide in docs/
```

### Android App
```bash
cd android
# Follow Android deployment guide in docs/
```

## Troubleshooting

### Database Connection Issues

**Error:** "DATABASE_URL must be set"
- **Solution:** Ensure DATABASE_URL environment variable is set

**Error:** "Connection refused"
- **Solution:** Check database is accessible, verify host/port/credentials

**Error:** "Authentication failed"  
- **Solution:** URL-encode special characters in password (`?` → `%3F`, etc.)

### Email Not Sending

**Check SMTP settings:**
```bash
# Test SMTP connection via admin panel
Admin → Settings → Email → Test Connection
```

**Common issues:**
- Wrong SMTP credentials
- Firewall blocking port 587/465
- Gmail: Need to enable "App Passwords"

### Storage Issues

**MinIO/S3 connection failed:**
- Verify credentials in Admin Settings → Storage
- Test connection using admin panel
- Check network accessibility

### Port Already in Use

```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 <PID>

# Or change port in code
# server/index.ts: const PORT = process.env.PORT || 5000
```

## Logs

### View Logs
```bash
# Docker
docker logs usa-limo-backend -f

# Docker Compose
docker-compose logs backend -f
```

### Log Files
Application logs are output to stdout/stderr (captured by Docker).

## Performance

### Recommended Resources

- **CPU:** 2+ cores
- **RAM:** 2GB minimum, 4GB recommended
- **Storage:** 10GB minimum
- **Database:** Separate server (Neon recommended)

### Optimization

The backend includes:
- Code splitting
- Lazy loading
- Compression middleware
- Efficient database queries
- Connection pooling

## Security

### Best Practices

1. **Use HTTPS** in production
2. **Set strong SESSION_SECRET** (32+ characters)
3. **Encrypt sensitive data** with ENCRYPTION_KEY
4. **Limit ADMIN_PANEL_HOSTS** to trusted domains
5. **Keep dependencies updated**
6. **Use environment variables** for secrets
7. **Enable CORS** only for trusted origins

### Security Headers

The backend includes:
- Helmet.js for security headers
- CORS protection
- Rate limiting on sensitive endpoints
- Session security

## Backup

### Database Backup

Use your PostgreSQL provider's backup features (Neon has automatic backups).

### Manual Backup
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Restore
```bash
psql $DATABASE_URL < backup.sql
```

## Monitoring

### Metrics to Monitor

- Response time
- Error rate
- Database connections
- Memory usage
- CPU usage

### Health Check Integration

Configure your monitoring tool to check `/health` endpoint every 30-60 seconds.

## Support

For backend-specific issues, check:
1. Server logs
2. Database connectivity
3. Environment variables
4. External service status (Stripe, Twilio, etc.)
