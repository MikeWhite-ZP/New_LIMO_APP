# USA Luxury Limo - Backend

## Overview
This is the backend API server and admin portal for USA Luxury Limo. It handles:
- Authentication (Replit Auth, sessions, password recovery)
- Admin Portal (CMS, vehicle types, settings, email templates)
- Driver Portal (job acceptance, navigation, documents)
- Dispatcher Portal (job assignment, tracking)
- Passenger Portal (booking history, invoices)
- Mobile App APIs
- Database operations (PostgreSQL + Drizzle ORM)
- Object Storage (MinIO/S3)
- Payment processing (Stripe, PayPal, Square)
- Email/SMS notifications (Nodemailer, Twilio)
- RESTful API endpoints

## Tech Stack
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (Neon) with Drizzle ORM
- **Authentication:** Replit Auth (OpenID Connect)
- **Storage:** Replit Object Storage / MinIO / AWS S3
- **Payments:** Stripe, PayPal, Square
- **Notifications:** Twilio (SMS), Nodemailer (Email)

## Project Structure
```
backend/
├── server/              # Express server & API routes
├── client/              # Admin/Driver/Dispatcher/Passenger UIs (React)
├── shared/              # Shared TypeScript types & schemas
├── migrations/          # Database migrations (Drizzle)
├── database/            # Database utilities
├── scripts/             # Utility scripts
└── deployment/          # Docker & deployment configs
```

## Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL database
- MinIO or S3 storage (optional, for object storage)

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the backend directory:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NODE_ENV=development
SESSION_SECRET=your-secret-key

# Replit Auth (optional for local dev)
ISSUER_URL=https://replit.com/...
CLIENT_ID=...
CLIENT_SECRET=...

# Object Storage
MINIO_ENDPOINT=...
MINIO_ACCESS_KEY=...
MINIO_SECRET_KEY=...

# Twilio (SMS)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...

# Email (Nodemailer)
EMAIL_FROM=...
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...

# Payments
STRIPE_SECRET_KEY=...
VITE_STRIPE_PUBLIC_KEY=...
```

### Run Development Server
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Database Management
```bash
# Push schema changes
npm run db:push

# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate
```

## API Endpoints

### Public APIs (CORS-enabled for frontend)
- `GET /api/branding` - Get company branding
- `GET /api/vehicle-types` - Get all vehicle types
- `GET /api/services` - Get all services
- `POST /api/bookings` - Create a new booking
- `POST /api/flight-search` - Search flights (AeroDataBox)
- `POST /api/geocode` - Geocode address (TomTom)

### Authenticated APIs
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/user` - Get current user
- `POST /api/logout` - User logout
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings/:id/payment` - Process payment

### Admin APIs (require admin role)
- `GET /api/admin/cms/*` - CMS management
- `GET /api/admin/settings` - System settings
- `POST /api/admin/vehicle-types` - Manage vehicle types
- `GET /api/admin/users` - Manage users
- `GET /api/admin/drivers` - Manage drivers

## Deployment

### Docker Build
```bash
docker build -f deployment/Dockerfile -t usa-luxury-limo-backend .
```

### Coolify Deployment
See `deployment/COOLIFY-DEPLOYMENT-GUIDE.md` for detailed instructions.

### Environment Variables (Production)
Set these in Coolify or your deployment platform:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production`
- `ALLOWED_ORIGINS` - Frontend domain (e.g., `https://www.best-chauffeurs.com`)
- All other secrets (Stripe, Twilio, etc.)

## CORS Configuration
The backend allows requests from the frontend domain specified in `ALLOWED_ORIGINS` environment variable.

## License
Proprietary - USA Luxury Limo
