# Multi-Tenancy Setup Guide

## Overview

USA Luxury Limo Backend now supports multi-tenancy, allowing multiple companies to use the same application with separate databases.

## Architecture

- **Single Application**: One Node.js app serves all companies
- **Separate Databases**: Each company has its own PostgreSQL database
- **Shared Schema**: All databases have identical schema
- **Company Detection**: Automatic detection via domain/hostname
- **Connection Pooling**: Cached connections for performance

## How It Works

### 1. Company Detection
The system detects which company based on the request domain:

```
Request to: api.best-chauffeurs.com  → Database: best_chauffeurs
Request to: api.hopelimo.com         → Database: hopelimo
```

### 2. Database Connection
Each request gets routed to the correct company's database:

```
Middleware: Extract company from domain
    ↓
Load company-specific database connection
    ↓
Execute query against company database
```

### 3. Connection Pooling
Connections are cached and reused:
- First request to best_chauffeurs → Create pool for best_chauffeurs
- Second request to best_chauffeurs → Reuse existing pool
- Request to hopelimo → Create new pool for hopelimo

## Setup Instructions

### Step 1: Create Company Databases

On your PostgreSQL server, create a database for each company:

```sql
-- Connect to default postgres database
psql -U postgres -h a40ws8ccs8wwcscssos0css4

-- Create database for best-chauffeurs
CREATE DATABASE best_chauffeurs;

-- Create database for hopelimo
CREATE DATABASE hopelimo;

-- Create database for other companies as needed
CREATE DATABASE company_name;
```

### Step 2: Run Migrations for Each Database

After deployment, migrations run automatically against each company's database.

**Manual migration (if needed):**

```bash
# For best_chauffeurs
DATABASE_URL=postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/best_chauffeurs npm run db:push

# For hopelimo
DATABASE_URL=postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/hopelimo npm run db:push
```

### Step 3: Configure Domain Mappings

Edit `backend/server/companyContext.ts` and update the `DOMAIN_TO_COMPANY_MAP`:

```typescript
const DOMAIN_TO_COMPANY_MAP: Record<string, string> = {
  // best-chauffeurs.com company
  'api.best-chauffeurs.com': 'best_chauffeurs',
  'best-chauffeurs.com': 'best_chauffeurs',
  'adminaccess.best-chauffeurs.com': 'best_chauffeurs',
  
  // hopelimo.com company
  'api.hopelimo.com': 'hopelimo',
  'hopelimo.com': 'hopelimo',
  'adminaccess.hopelimo.com': 'hopelimo',
  
  // Add more companies here
  'api.newcompany.com': 'newcompany',
};
```

### Step 4: Deploy

Redeploy your backend. The multi-tenancy middleware is now active:

1. Each request is routed based on domain
2. Connection pools are cached for performance
3. All data remains isolated per company

## Adding a New Company

### To add a new company (e.g., newcompany.com):

1. **Create database** on PostgreSQL server:
   ```sql
   CREATE DATABASE newcompany;
   ```

2. **Run migrations**:
   ```bash
   DATABASE_URL=postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/newcompany npm run db:push
   ```

3. **Update domain mapping** in `backend/server/companyContext.ts`:
   ```typescript
   'api.newcompany.com': 'newcompany',
   'newcompany.com': 'newcompany',
   'adminaccess.newcompany.com': 'newcompany',
   ```

4. **Update DNS records** to point to your Coolify VPS:
   ```
   A  api.newcompany.com       → [Your VPS IP]
   A  newcompany.com           → [Your VPS IP]
   A  adminaccess.newcompany.com → [Your VPS IP]
   ```

5. **Redeploy** backend to load new configuration

## Configuration Options

### Override Company via Query Parameter (Testing)

```bash
# Use best_chauffeurs database even on hopelimo domain
curl "https://api.hopelimo.com/api/branding?company=best_chauffeurs"
```

### Override Company via Header (Internal Services)

```bash
# Use hopelimo database
curl -H "X-Company-ID: hopelimo" https://api.best-chauffeurs.com/api/branding
```

## Database Connection Details

### PostgreSQL Connection String Format

```
postgresql://username:password@host:port/database_name
```

Your setup:
```
Base URL: postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432

For best_chauffeurs:
postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/best_chauffeurs

For hopelimo:
postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/hopelimo
```

**Note:** The `%3F` is URL-encoded `?` character. Keep it as-is.

## Data Isolation

Each company's data is completely isolated:

- ✅ Users in best_chauffeurs cannot see users in hopelimo
- ✅ Bookings are isolated per company
- ✅ Drivers, vehicles, invoices - all isolated
- ✅ Settings and configurations are separate

## Performance

- **Connection Pooling**: Connections cached to avoid creation overhead
- **Automatic Cleanup**: Old connections are closed to prevent resource leaks
- **Scalable**: Support hundreds of companies on single server

## Monitoring

### Check Company Context in Logs

The middleware logs company detection:

```
[Company] Request to api.best-chauffeurs.com → best_chauffeurs database
[Company] Request to api.hopelimo.com → hopelimo database
```

### Verify Database Connections

```bash
# Connect to company database
psql postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/best_chauffeurs

# Check tables
\dt

# Verify data is isolated
SELECT * FROM users LIMIT 5;
```

## Troubleshooting

### 404 Error - Company Database Not Found

**Problem:** Getting 404 errors when accessing a company endpoint

**Solution:**
1. Verify database exists: `psql -l` (list all databases)
2. Verify domain mapping in `companyContext.ts`
3. Check DNS records are pointing to correct VPS

### CORS Errors Between Companies

**Problem:** Admin panel for best_chauffeurs can't access api.hopelimo.com

**Solution:**
1. Verify ALLOWED_ORIGINS includes all domains:
   ```env
   ALLOWED_ORIGINS=https://best-chauffeurs.com,https://hopelimo.com,https://api.best-chauffeurs.com,https://api.hopelimo.com
   ```

2. Restart backend after updating ALLOWED_ORIGINS

### Migrations Failed for Company Database

**Problem:** One company database has old schema

**Solution:**
```bash
# Re-run migrations for that specific company
DATABASE_URL=postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/company_name npm run db:push
```

## Production Best Practices

1. **Database Backups**
   - Back up all company databases regularly
   - Test recovery procedures
   - Consider per-company backup schedules

2. **Monitoring**
   - Monitor connection pool size per company
   - Alert on database connection failures
   - Track request volume per company

3. **Security**
   - Use environment variable for DATABASE_URL (includes credentials)
   - Mark DATABASE_URL as Secret in Coolify
   - Use SSL for database connections
   - Restrict database user to minimum permissions

4. **Scaling**
   - Each company gets dedicated connection pool
   - Monitor for connection pool exhaustion
   - Consider separate database servers for large deployments

## Migration from Single to Multi-Tenancy

If you're migrating from single database to multi-tenancy:

1. **Backup old database**: `pg_dump` the existing database
2. **Create company database**: `CREATE DATABASE best_chauffeurs`
3. **Restore data**: `psql best_chauffeurs < backup.sql`
4. **Update code**: Deploy updated backend with multi-tenancy
5. **Verify**: Test that data loads correctly for each company

## Deployment on Coolify

When deploying on Coolify with multi-tenancy:

1. **Environment Variables**
   ```
   DATABASE_URL: postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/best_chauffeurs
   ```

2. **Initial Database**: Use the first company (best_chauffeurs) for migrations
3. **Other Companies**: Create separately and update domain mappings
4. **Redeploy**: Update docker-compose.yml when adding companies

## API Examples

### List Users for Current Company

```bash
# This user request uses the company extracted from domain
curl https://api.best-chauffeurs.com/api/user

# Returns only best_chauffeurs users
{
  "id": "user-123",
  "email": "user@best-chauffeurs.com",
  ...
}
```

### Get Bookings for Current Company

```bash
curl https://api.best-chauffeurs.com/api/bookings

# Returns only best_chauffeurs bookings
```

### Login (Company-Specific)

```bash
curl -X POST https://api.best-chauffeurs.com/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "driver@best-chauffeurs.com", "password": "..."}'

# Login uses best_chauffeurs database for credentials
```

---

**Multi-tenancy is now active!** Each company is completely isolated while sharing the same application infrastructure.
