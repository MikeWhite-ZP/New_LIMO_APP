# USA Luxury Limo - Monorepo

Complete luxury transportation booking platform with separate backend and frontend applications.

## 🚀 Quick Start

### Development

```bash
# Run backend (port 5000)
cd backend && npm run dev

# Run frontend (port 3000)
cd frontend && npm run dev

# Or run from root (delegates to backend)
npm run dev
```

### Production

```bash
docker-compose -f docker-compose.production.yml up -d --build
```

## 📁 Project Structure

```
/
├── backend/              # Backend API + Admin Portals
│   ├── server/           # Express API server
│   ├── client/           # Admin/Driver/Dispatcher UIs
│   ├── database/         # Database configuration
│   ├── migrations/       # Database migrations
│   ├── deployment/       # Docker configs
│   └── docs/             # Mobile app documentation
│
├── frontend/             # Public Website
│   ├── src/
│   │   ├── pages/        # Public pages
│   │   ├── components/   # Reusable UI components
│   │   └── lib/          # API client
│   ├── Dockerfile        # Production build
│   └── nginx.conf        # Web server config
│
├── shared/               # Shared TypeScript Types
│   └── schema.ts         # Drizzle schema
│
└── docker-compose.production.yml  # Deployment orchestration
```

## 🎯 Features

### Backend
- Multi-role authentication (Admin, Driver, Dispatcher, Passenger)
- RESTful API with Express.js
- PostgreSQL database with Drizzle ORM
- Real-time GPS tracking
- Payment processing (Stripe, PayPal, Square)
- SMS notifications (Twilio)
- Email system with templates
- Document management
- Invoice system
- CMS for content management
- iOS & Android mobile apps

### Frontend
- Public website for customers
- Service showcase
- Fleet display
- Booking interface
- Contact forms
- Responsive design
- SEO optimized

## 📚 Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - Complete deployment instructions
- **[Monorepo Guide](./MONOREPO-GUIDE.md)** - Quick start for monorepo
- **[Backend Deployment](./backend/DEPLOYMENT.md)** - Backend-specific deployment
- **[Frontend Deployment](./frontend/DEPLOYMENT.md)** - Frontend-specific deployment
- **[Complete Documentation](./MONOREPO-COMPLETE.md)** - Full implementation details
- **[Project Overview](./replit.md)** - Architecture and design decisions

## 🔧 Technology Stack

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle
- **Auth:** Replit Auth / Passport.js
- **Storage:** MinIO / AWS S3
- **Mobile:** Ionic Capacitor

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Library:** Shadcn/ui (Radix UI)
- **Routing:** Wouter
- **Forms:** React Hook Form + Zod
- **State:** TanStack Query
- **Server:** Nginx

## 🌐 Services Required

- PostgreSQL database (Neon recommended)
- MinIO or S3 for object storage
- Twilio for SMS
- Stripe for payments
- TomTom API for geocoding
- SMTP server for emails

## 🚢 Deployment

### Coolify

1. Connect Git repository
2. Select `docker-compose.production.yml`
3. Configure environment variables
4. Set domains:
   - Backend: `api.yourdomain.com`
   - Frontend: `yourdomain.com`
5. Deploy

### Docker Compose

```bash
# Set environment variables in backend/ and frontend/
# Then deploy:
docker-compose -f docker-compose.production.yml up -d --build
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔐 Environment Variables

### Backend (Required)
```bash
DATABASE_URL=postgresql://...
NODE_ENV=production
SESSION_SECRET=...
ENCRYPTION_KEY=...
ALLOWED_ORIGINS=https://yourdomain.com
STRIPE_SECRET_KEY=...
TWILIO_ACCOUNT_SID=...
SMTP_HOST=...
# ... see DEPLOYMENT.md for full list
```

### Frontend (Required)
```bash
VITE_API_BASE_URL=https://api.yourdomain.com
```

## 📝 Development Workflow

1. **Make changes** in `backend/` or `frontend/`
2. **Test locally** with `npm run dev`
3. **Build** with `npm run build`
4. **Commit** and push to Git
5. **Deploy** via Coolify or Docker Compose

## ✅ Health Checks

### Backend
```bash
curl http://localhost:5000/health
# {"status":"ok","timestamp":"..."}
```

### Frontend
```bash
curl http://localhost:80
# Returns HTML
```

## 🐛 Troubleshooting

### Backend Won't Start
- Check `DATABASE_URL` is correct and encoded
- Verify all required environment variables are set
- Check logs: `docker-compose logs backend`

### Frontend Can't Connect to Backend
- Verify `VITE_API_BASE_URL` is correct
- Check CORS settings in backend (`ALLOWED_ORIGINS`)
- Test backend health endpoint

### CORS Errors
Add frontend domain to backend `ALLOWED_ORIGINS`:
```bash
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for more troubleshooting.

## 📊 Project Status

✅ **Backend:** Running and tested  
✅ **Frontend:** Running and tested  
✅ **Monorepo:** Successfully separated  
✅ **Docker:** Production-ready configurations  
✅ **Documentation:** Complete deployment guides  

## 🔄 Updates

### Latest Changes
- Restructured into monorepo (Nov 2024)
- Separated backend and frontend
- Created independent deployment configs
- Updated documentation

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Review service logs
3. Verify environment variables
4. Check database connectivity

## 📄 License

MIT

## 🎉 Getting Started

1. **Clone repository:**
   ```bash
   git clone https://github.com/yourusername/usa-luxury-limo.git
   cd usa-luxury-limo
   ```

2. **Install dependencies:**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   # Edit .env files with your values
   ```

4. **Start development:**
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend (in another terminal)
   cd frontend && npm run dev
   ```

5. **Deploy to production:**
   ```bash
   # See DEPLOYMENT.md for detailed instructions
   docker-compose -f docker-compose.production.yml up -d --build
   ```

---

Built with ❤️ for luxury transportation services
