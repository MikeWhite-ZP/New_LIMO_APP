# Multi-Tenancy Quick Setup

## For best-chauffeurs.com

Your backend is now multi-tenant enabled. Here's what you need to do:

### 1. Create Company Databases on PostgreSQL

```sql
-- Connect to your PostgreSQL server
psql -U postgres -h a40ws8ccs8wwcscssos0css4

-- Create database for best-chauffeurs
CREATE DATABASE best_chauffeurs;

-- Create database for hopelimo (if needed)
CREATE DATABASE hopelimo;

-- List databases to verify
\l
```

### 2. Run Migrations for Each Database

```bash
# For best_chauffeurs database
DATABASE_URL="postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/best_chauffeurs" npm run db:push

# For hopelimo database (optional)
DATABASE_URL="postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/hopelimo" npm run db:push
```

### 3. Update Domain Mapping

In `backend/server/companyContext.ts`, the mapping is already configured for best-chauffeurs:

```typescript
const DOMAIN_TO_COMPANY_MAP: Record<string, string> = {
  'api.best-chauffeurs.com': 'best_chauffeurs',
  'best-chauffeurs.com': 'best_chauffeurs',
  'adminaccess.best-chauffeurs.com': 'best_chauffeurs',
  
  'api.hopelimo.com': 'hopelimo',  // Add if you have hopelimo
  'hopelimo.com': 'hopelimo',
  'adminaccess.hopelimo.com': 'hopelimo',
};
```

To add more companies, add entries to this map.

### 4. Set Environment Variable

In Coolify, set:

```
DATABASE_URL=postgres://postgres:Erka75810916%3F@a40ws8ccs8wwcscssos0css4:5432/best_chauffeurs
```

(Use the base URL - specific database selected per-request)

### 5. Deploy

Redeploy your backend. Multi-tenancy is now active!

## How It Works

- Request to `api.best-chauffeurs.com` → uses `best_chauffeurs` database
- Request to `api.hopelimo.com` → uses `hopelimo` database
- Each company has completely isolated data
- Connection pools cached for performance

## Adding New Companies

1. Create database: `CREATE DATABASE newcompany;`
2. Run migrations: `DATABASE_URL=...newcompany npm run db:push`
3. Add to `companyContext.ts`:
   ```typescript
   'api.newcompany.com': 'newcompany',
   'newcompany.com': 'newcompany',
   ```
4. Update DNS records
5. Redeploy backend

See `MULTI_TENANCY_GUIDE.md` for complete documentation.
