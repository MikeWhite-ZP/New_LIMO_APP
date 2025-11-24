# USA Luxury Limo - Backend

## Overview
Backend API server and admin portals for USA Luxury Limo.

**NOTE:** This is the main backend codebase, located in the `backend/` directory. For development convenience, symlinks exist at the root level pointing to this directory.

## Structure
```
backend/
├── server/              # Express server & API routes
├── client/              # Admin/Driver/Dispatcher React UIs
├── database/            # Database utilities
├── migrations/          # Drizzle migrations
├── scripts/             # Utility scripts
├── android/             # Android Capacitor app
├── ios/                 # iOS Capacitor app
├── deployment/          # Docker & deployment configs
└── package.json         # Backend dependencies
```

## Quick Start

### From Backend Directory
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment
npm run dev
```

### From Root (via symlinks)
```bash
npm install
npm run dev
```

Both approaches work because root has symlinks to backend directories.

## Environment Variables
See `.env.example` for required configuration.

Key variables:
- `DATABASE_URL` - PostgreSQL connection
- `ALLOWED_ORIGINS` - Frontend CORS (comma-separated)
- `SESSION_SECRET` - Session encryption key
- `STRIPE_SECRET_KEY` - Payment processing
- `TWILIO_ACCOUNT_SID` - SMS notifications
- And more... (see .env.example)

## Development

### Running the Backend
```bash
npm run dev           # Start dev server (port 5000)
```

### Database Commands
```bash
npm run db:push       # Push schema changes
npm run db:generate   # Generate migrations
npm run db:migrate    # Run migrations
```

## API Endpoints

### Public (CORS-enabled for frontend)
- `GET /api/branding` - Company branding
- `GET /api/vehicle-types` - Vehicle list
- `POST /api/bookings` - Create booking
- `POST /api/flight-search` - Search flights
- `POST /api/geocode` - Geocode address

### Authenticated
- `POST /api/login` - User login
- `GET /api/user` - Current user
- `GET /api/bookings` - User bookings

### Admin Only
- `GET /api/admin/*` - Admin endpoints

## Tech Stack
- Node.js 20 + Express.js
- PostgreSQL + Drizzle ORM
- Replit Auth (OpenID Connect)
- MinIO/S3 Object Storage
- Stripe/PayPal/Square Payments
- Twilio SMS + Nodemailer Email

## Deployment
See `deployment/COOLIFY-DEPLOYMENT-GUIDE.md`

## License
Proprietary - USA Luxury Limo
