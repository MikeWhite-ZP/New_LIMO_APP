# Backend Deployment Verification Checklist

Complete verification guide to ensure flawless deployment on Coolify.

---

## ✅ Pre-Deployment Verification

### Build Configuration
- [ ] `backend/deployment/Dockerfile` exists and is readable
- [ ] Build context set to `..` (parent directory for shared/ access)
- [ ] Multi-stage build includes builder and production stages
- [ ] `npm run build` command correctly configured
- [ ] Compiled files output to `dist/`

### Files & Dependencies
- [ ] `backend/package.json` has all required dependencies
- [ ] **tsx is in dependencies** (line 121, not devDependencies) ✅
- [ ] `shared/schema.ts` exists in repository root
- [ ] `backend/drizzle.config.ts` references correct schema path
- [ ] All deployment scripts are executable:
  - [ ] `backend/deployment/entrypoint.sh`
  - [ ] `backend/deployment/healthcheck.sh`

### Environment Configuration
- [ ] `.env.example` has all required variables
- [ ] All variables documented with descriptions
- [ ] Domain values updated to `best-chauffeurs.com`
- [ ] MinIO endpoint set to `minio.best-chauffeurs.com`
- [ ] Admin panel host set to `adminaccess.best-chauffeurs.com`
- [ ] API base URL set to `https://api.best-chauffeurs.com`

### Docker Configuration
- [ ] `backend/docker-compose.yml` is valid YAML
- [ ] Health check uses `CMD-SHELL` syntax (not `CMD`)
- [ ] Port 5000 correctly exposed
- [ ] Environment variables properly referenced as `${VAR_NAME}`
- [ ] Caddy labels configured for SSL routing
- [ ] Network configuration is correct

---

## ✅ Coolify Configuration

### DNS Records
- [ ] `api.best-chauffeurs.com` → VPS IP
- [ ] `adminaccess.best-chauffeurs.com` → VPS IP
- [ ] `minio.best-chauffeurs.com` → VPS IP
- [ ] `console.best-chauffeurs.com` → VPS IP
- [ ] DNS records propagated (test with `nslookup`)

### Database Setup
- [ ] PostgreSQL database created
- [ ] DATABASE_URL generated and tested
- [ ] Database accepts connections from VPS
- [ ] All special characters in password are URL-encoded

### MinIO Setup
- [ ] MinIO running on separate service or external endpoint
- [ ] MinIO access key and secret configured
- [ ] Bucket "luxury-limo" created in MinIO
- [ ] MinIO endpoint accessible from backend container

### Secrets Management (Coolify UI)
- [ ] All secret variables marked as "Secret" type:
  - [ ] `DATABASE_URL` ⭐
  - [ ] `SESSION_SECRET` ⭐
  - [ ] `ENCRYPTION_KEY` ⭐
  - [ ] `STRIPE_SECRET_KEY` ⭐
  - [ ] `VITE_STRIPE_PUBLIC_KEY` ⭐
  - [ ] `TWILIO_AUTH_TOKEN` ⭐
  - [ ] `SMTP_PASS` ⭐
  - [ ] `MINIO_SECRET_KEY` ⭐

### API Keys Ready
- [ ] Stripe Secret Key obtained
- [ ] Stripe Public Key obtained
- [ ] Twilio Account SID obtained
- [ ] Twilio Auth Token obtained
- [ ] Twilio Phone Number configured
- [ ] TomTom API Key obtained
- [ ] SMTP credentials obtained
- [ ] MinIO keys obtained

---

## ✅ Deployment Process

### Build Stage
```
Expected output:
✓ FROM node:20-alpine AS builder
✓ npm ci
✓ npm run build
✓ Vite builds React UIs
✓ esbuild bundles server
✓ Build succeeds (no errors)
```

Monitor in Coolify logs for:
- [ ] Dependencies installing successfully
- [ ] TypeScript compiling without errors
- [ ] Vite build completing
- [ ] esbuild creating dist/index.js

### Migration Stage
```
Expected output:
✓ Running database migrations...
✓ Migrations complete (or "already applied")
✓ No errors in migration logs
```

If migrations fail:
- [ ] Check DATABASE_URL is correct
- [ ] Verify database is accessible
- [ ] Check tsx is in production dependencies
- [ ] Review `backend/deployment/entrypoint.sh` output

### Startup Stage
```
Expected output:
✓ Server listening on port 5000
✓ Health check returns 200 OK
✓ No errors in logs
```

---

## ✅ Post-Deployment Verification

### Container Health
```bash
# Check container running
docker ps | grep usa-limo-backend
# Should show: "Up ... (healthy)"

# Check logs
docker logs usa-limo-backend -f
# Should show: "✅ Migrations complete" and "Server running"

# Test health endpoint
curl https://api.best-chauffeurs.com/health
# Expected: {"status": "healthy", "timestamp": "2024-..."}
```

- [ ] Container shows "healthy" status
- [ ] No ERROR messages in logs
- [ ] Health endpoint returns 200 OK
- [ ] No exceptions or crashes in logs

### API Functionality
```bash
# Test public API
curl https://api.best-chauffeurs.com/api/branding
# Should return branding info

# Test with auth header (for protected endpoints)
curl -H "Authorization: Bearer $TOKEN" \
  https://api.best-chauffeurs.com/api/user
```

- [ ] Public endpoints respond (200 status)
- [ ] Protected endpoints return proper error if no auth
- [ ] CORS headers present
- [ ] No 404 or 500 errors

### Admin Panel
```bash
# Check if admin UI is served
curl https://adminaccess.best-chauffeurs.com/
# Should return HTML (React app)

# Check for redirect
curl -I https://adminaccess.best-chauffeurs.com/
# Should show 200 (not 404 or 500)
```

- [ ] Admin UI accessible
- [ ] Page loads without JavaScript errors
- [ ] Can login with admin credentials

### SSL/TLS
```bash
# Check certificate
curl -v https://api.best-chauffeurs.com 2>&1 | grep "subject="
# Should show certificate for api.best-chauffeurs.com

# Check certificate validity
openssl s_client -connect api.best-chauffeurs.com:443 -servername api.best-chauffeurs.com
# Should show "Verify return code: 0"
```

- [ ] SSL certificate present
- [ ] Certificate valid for domain
- [ ] HSTS header present
- [ ] Browser shows green padlock

### Database Connection
```bash
# Test from VPS
psql "postgresql://user:pass@host:port/database" -c "SELECT * FROM __drizzle_migrations LIMIT 5;"
# Should list applied migrations

# Check tables exist
psql $DATABASE_URL -c "\dt"
# Should list all application tables
```

- [ ] Database accessible from VPS
- [ ] Migrations table exists (`__drizzle_migrations`)
- [ ] All application tables created
- [ ] No schema errors

### CORS Configuration
```bash
# Test CORS headers
curl -H "Origin: https://best-chauffeurs.com" \
  https://api.best-chauffeurs.com/api/branding -v
# Should include: "Access-Control-Allow-Origin: https://best-chauffeurs.com"
```

- [ ] CORS headers present
- [ ] Correct domain in CORS response
- [ ] OPTIONS requests work

---

## ✅ Performance & Monitoring

### Response Times
```bash
# Measure API response time
time curl https://api.best-chauffeurs.com/health
# Should complete in < 100ms

# Measure with more requests
for i in {1..10}; do curl -s https://api.best-chauffeurs.com/health | jq '.status'; done
# All should return "healthy"
```

- [ ] Health endpoint responds < 100ms
- [ ] API endpoints responsive
- [ ] No connection timeouts

### Resource Usage
In Coolify dashboard:
- [ ] CPU usage reasonable (< 50% idle)
- [ ] Memory usage stable (no leaks)
- [ ] No frequent restarts
- [ ] Uptime increasing

### Logs
- [ ] No ERROR level messages
- [ ] No WARN messages about missing configs
- [ ] Request logs clear (if logging enabled)
- [ ] Migration logs show completion

---

## ✅ Production Readiness

### Security
- [ ] All environment variables as secrets (not visible in logs)
- [ ] No hardcoded API keys in code
- [ ] SESSION_SECRET is strong (32+ random chars)
- [ ] ENCRYPTION_KEY properly set (32 hex chars)
- [ ] Database password URL-encoded
- [ ] SSL/TLS enforced (no HTTP)

### Backups
- [ ] Database backups enabled
- [ ] Backup schedule set (daily recommended)
- [ ] Tested backup restoration process

### Monitoring & Alerts
- [ ] Coolify alerting configured
- [ ] Health check monitored
- [ ] Log aggregation setup (optional)
- [ ] Uptime monitoring enabled

### Documentation
- [ ] Deployment guide followed (`COOLIFY_DEPLOYMENT_SETUP.md`)
- [ ] Environment variables documented
- [ ] Troubleshooting section reviewed
- [ ] Team has access to deployment procedures

---

## 🚨 Common Issues & Fixes

| Issue | Verification | Fix |
|-------|--------------|-----|
| Build fails with "shared/ not found" | Build context = `..` | Update Dockerfile path |
| Database migrations timeout | DATABASE_URL accessible | Check URL, password encoding |
| Health check failing | Container logs for errors | Review startup output |
| CORS errors | ALLOWED_ORIGINS includes domain | Restart container |
| SSL not working | DNS propagated | Wait 5-10 min, check DNS |
| API returns 404 | Routes exist | Check logs for errors |

---

## 📋 Verification Quick Summary

**Run this after deployment completes:**

```bash
#!/bin/bash
echo "=== Backend Deployment Verification ==="

# 1. Health check
echo "✓ Health check:"
curl -s https://api.best-chauffeurs.com/health | jq '.status'

# 2. Admin panel
echo "✓ Admin panel accessible:"
curl -s -I https://adminaccess.best-chauffeurs.com | grep "HTTP"

# 3. Database connection
echo "✓ Database connected:"
psql $DATABASE_URL -c "SELECT COUNT(*) as tables FROM information_schema.tables;" 2>/dev/null || echo "ERROR: Cannot connect"

# 4. API test
echo "✓ API response:"
curl -s https://api.best-chauffeurs.com/api/branding | jq '.companyName'

# 5. Logs check
echo "✓ Container status:"
docker ps | grep usa-limo-backend | awk '{print $NF}'

echo "=== Verification Complete ==="
```

---

## ✨ Success Criteria

Deployment is successful when ALL of these are true:

✅ Container running and marked "healthy"
✅ Health endpoint returns 200 OK
✅ Database migrations applied without errors
✅ Admin UI accessible and loads
✅ API endpoints respond correctly
✅ SSL certificate valid
✅ CORS headers correct
✅ No errors in logs
✅ Performance acceptable (< 100ms response time)
✅ Monitored and alerts configured

---

**When all checks pass, backend is ready for production!** 🚀
