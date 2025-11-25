# USA Luxury Limo - Backend Application

Standalone backend API server with admin portals for USA Luxury Limo. This backend is **completely self-contained** and can be deployed independently using Docker.

## 📦 What's Included

- **RESTful API** - Express.js JSON API server
- **Admin Dashboard** - Web-based admin interface
- **Driver Portal** - Mobile-optimized driver app
- **Dispatcher Dashboard** - Real-time job management
- **Authentication** - Multi-role auth (Admin, Driver, Dispatcher, Passenger)
- **Payment Processing** - Stripe, PayPal, Square integration
- **Notifications** - Email (SMTP) and SMS (Twilio)
- **Object Storage** - MinIO/S3 for uploads
- **Location Services** - TomTom API for geocoding
- **Flight Tracking** - AeroDataBox integration (optional)

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose** (for production deployment)
- **Node.js 20+** (for local development)
- **PostgreSQL 14+** (external database)
- **MinIO or S3** (object storage)
- **API Keys**: Stripe, Twilio, TomTom

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 3. Run database migrations
npm run db:push

# 4. Start development server
npm run dev
```

Server runs on **http://localhost:5000**

### Docker Deployment (Production)

```bash
# 1. Configure environment
cp .env.example .env
# Edit .env with production values

# 2. Build and start
docker-compose up -d

# 3. Check health
curl http://localhost:5000/health

# 4. View logs
docker-compose logs -f
```

## 🏗️ Project Structure

```
backend/
├── server/              # Express API server
│   ├── index.ts         # Main entry point
│   ├── routes.ts        # API routes
│   └── vite.ts          # Vite dev integration
├── client/              # Admin/Driver/Dispatcher UIs (React)
├── database/            # Database configuration
├── migrations/          # Drizzle ORM migrations
├── deployment/          # Docker deployment files
│   ├── Dockerfile       # Production image
│   ├── entrypoint.sh    # Startup script with migrations
│   ├── healthcheck.sh   # Health check endpoint
│   └── .dockerignore    # Build optimization
├── docker-compose.yml   # Standalone deployment config
├── .env.example         # Environment variable template
├── .dockerignore        # Docker build exclusions
└── package.json         # Dependencies
```

## 🔐 Environment Variables

### Required Variables

| Variable | Description | How to Get |
|----------|-------------|------------|
| `DATABASE_URL` | PostgreSQL connection string | From Neon, AWS RDS, etc. |
| `SESSION_SECRET` | Session encryption (32+ chars) | `openssl rand -base64 32` |
| `ENCRYPTION_KEY` | AES-256 key (exactly 32 chars) | `node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"` |
| `STRIPE_SECRET_KEY` | Stripe API key | [Stripe Dashboard](https://dashboard.stripe.com/) |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe public key | [Stripe Dashboard](https://dashboard.stripe.com/) |
| `TOMTOM_API_KEY` | Geocoding API key | [TomTom Developer](https://developer.tomtom.com/) |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | [Twilio Console](https://console.twilio.com/) |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | [Twilio Console](https://console.twilio.com/) |
| `TWILIO_PHONE_NUMBER` | Twilio phone | Format: `+1234567890` |
| `MINIO_ENDPOINT` | Object storage endpoint | MinIO server address |
| `MINIO_ACCESS_KEY` | Storage access key | From MinIO/S3 |
| `MINIO_SECRET_KEY` | Storage secret key | From MinIO/S3 |

### Domain Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `DOMAIN` | Main domain | `yourdomain.com` |
| `ALLOWED_ORIGINS` | CORS origins (comma-separated) | `https://yourdomain.com,https://www.yourdomain.com` |
| `ADMIN_PANEL_HOSTS` | Admin subdomains | `admin.yourdomain.com` |
| `API_BASE_URL` | API endpoint URL | `https://api.yourdomain.com` |

See **`.env.example`** for complete list with descriptions.

## 🐳 Docker Deployment

### Standalone Backend Deployment

This docker-compose.yml deploys **only the backend service** (API + Admin UIs):

```bash
# Build image
docker-compose build

# Start service
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop service
docker-compose down
```

### Coolify Deployment

1. **Prepare Domain & DNS**
   ```
   A Record: api.yourdomain.com → Coolify_Server_IP
   A Record: admin.yourdomain.com → Coolify_Server_IP
   ```

2. **Create Project in Coolify**
   - Dashboard → New Project → Docker Compose
   - Paste content from `docker-compose.yml`

3. **Enable Caddy Labels** (for SSL/routing)
   
   Edit `docker-compose.yml` and uncomment the labels section:
   ```yaml
   labels:
     - "caddy=https://api.${DOMAIN}"
     - "caddy_1=https://admin.${DOMAIN}"
     # ... etc
   ```

4. **Set Environment Variables**
   
   In Coolify UI, add all variables from `.env.example`:
   - Mark secrets as "Secret" type ✓
   - Use Coolify's encrypted storage

5. **Deploy**
   - Click "Deploy" button
   - Wait 3-5 minutes for build
   - Check logs for errors

6. **Verify Deployment**
   ```bash
   curl https://api.yourdomain.com/health
   ```

### Health Check

Backend includes automatic health monitoring:

```bash
# Local
curl http://localhost:5000/health

# Production
curl https://api.yourdomain.com/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-25T..."
}
```

## 🗄️ Database

### Setup

Uses PostgreSQL with Drizzle ORM.

**Recommended Providers:**
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [AWS RDS](https://aws.amazon.com/rds/) - Managed PostgreSQL
- Coolify Built-in PostgreSQL

### Connection String Format

```
postgresql://username:password@host:port/database
```

**Important:** URL-encode special characters:
- `@` → `%40`
- `#` → `%23`
- `?` → `%3F`

Example:
```
postgresql://user:p%40ss@db.example.com:5432/limo_db
```

### Migrations

Migrations run **automatically** on container startup via `entrypoint.sh`.

Manual migration:
```bash
npm run db:push
```

## 📡 API Endpoints

### Public API (CORS-enabled)

```
GET  /api/branding           # Company branding
GET  /api/vehicle-types      # Available vehicles
POST /api/bookings           # Create booking
POST /api/flight-search      # Search flights
POST /api/geocode            # Geocode address
GET  /api/pricing            # Calculate pricing
```

### Authentication

```
POST /api/login              # User login
POST /api/logout             # User logout
GET  /api/user               # Current user info
POST /api/register           # New user registration
```

### Admin API (requires admin role)

```
GET  /api/admin/bookings     # All bookings
POST /api/admin/drivers      # Create driver
PUT  /api/admin/settings     # Update settings
GET  /api/admin/users        # User management
```

### Driver API (requires driver role)

```
GET  /api/driver/jobs        # Assigned jobs
POST /api/driver/accept/:id  # Accept job
POST /api/driver/location    # Update GPS
```

### Dispatcher API (requires dispatcher role)

```
GET  /api/dispatcher/active-jobs  # Real-time jobs
POST /api/dispatcher/assign       # Assign driver
```

Full API routes in `/server/routes.ts`.

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Apply schema changes
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio (DB GUI)

# Docker
docker-compose up        # Start service
docker-compose build     # Build image
docker-compose down      # Stop service
docker-compose logs -f   # Follow logs
```

## 🚨 Troubleshooting

### Database Connection Failed

```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL

# Verify URL encoding
# Special chars must be encoded: @ → %40, # → %23
```

### Docker Build Errors

```bash
# Clear cache and rebuild
docker-compose down
docker system prune -a
docker-compose build --no-cache
```

### Health Check Failing

```bash
# Check logs
docker-compose logs backend

# Verify port
docker-compose ps

# Test locally
curl http://localhost:5000/health
```

### Migration Errors

```bash
# View migration logs
docker-compose logs backend | grep migration

# Force schema sync (CAUTION: dev only)
npm run db:push --force
```

### CORS Issues

```bash
# Verify ALLOWED_ORIGINS includes frontend domain
# Must be comma-separated, no spaces
ALLOWED_ORIGINS=https://example.com,https://www.example.com
```

## 📊 Monitoring & Logs

### Docker Logs

```bash
# All logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Specific service
docker-compose logs -f backend
```

### Application Logs

Logs are written to stdout/stderr (Docker captures automatically).

In production, configure log aggregation (Loki, CloudWatch, etc.).

## 🔐 Security Best Practices

✅ **Implemented:**
- Non-root user in Docker (nodejs:1001)
- Environment-based secrets (no hardcoded keys)
- HTTPS enforced via Coolify Caddy
- CORS properly configured
- SQL injection prevention (Drizzle ORM parameterized queries)
- Session encryption (AES-256-GCM)
- Password hashing (scrypt)
- Security headers (CSP, HSTS, X-Frame-Options)

⚠️ **Important:**
- Never commit `.env` to git
- Use strong SESSION_SECRET (32+ random chars)
- Mark all secrets as "Secret" in Coolify UI
- Enable SSL/TLS in production
- Regularly update dependencies

## 🌐 Frontend Integration

This backend is designed to work with a separate frontend application.

**CORS Configuration:**
```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Frontend Environment:**
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

Frontend makes requests to backend API endpoints.

## 📚 Tech Stack

- **Runtime:** Node.js 20 (Alpine Linux)
- **Framework:** Express.js
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** Replit Auth (OIDC) + Password-based
- **Storage:** MinIO / AWS S3
- **Payments:** Stripe, PayPal, Square
- **SMS:** Twilio
- **Email:** Nodemailer (SMTP)
- **Location:** TomTom API
- **Deployment:** Docker + Coolify

## 📖 Additional Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Drizzle ORM Guide](https://orm.drizzle.team/)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## 🆘 Need Help?

1. **Check Logs:** `docker-compose logs -f`
2. **Verify Environment:** Compare `.env` with `.env.example`
3. **Test Health:** `curl http://localhost:5000/health`
4. **Database Connection:** `psql $DATABASE_URL`

For Coolify deployment issues, check the Coolify dashboard logs.

## 📄 License

Copyright © 2025 USA Luxury Limo. All rights reserved.
