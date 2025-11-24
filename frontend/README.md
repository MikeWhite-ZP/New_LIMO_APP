# USA Luxury Limo - Frontend

## Overview
Public-facing website for USA Luxury Limo. This is a lightweight React SPA that communicates with the backend API.

## Structure
```
frontend/
├── src/
│   ├── pages/        # Page components
│   ├── components/   # Reusable UI components
│   ├── lib/          # API client & utilities
│   ├── hooks/        # Custom React hooks
│   ├── App.tsx       # Main app component
│   └── main.tsx      # Entry point
├── public/           # Static assets
├── Dockerfile        # Production build
├── nginx.conf        # Nginx config for production
└── package.json      # Dependencies
```

## Quick Start

```bash
cd frontend
npm install
cp .env.example .env  # Configure backend URL
npm run dev
```

Frontend runs on `http://localhost:3000`

## Environment Variables

### Development (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

### Production
```env
VITE_API_BASE_URL=https://api.best-chauffeurs.com
```

## Pages
- `/` - Homepage
- `/about` - About us
- `/services` - Services
- `/fleet` - Vehicle catalog
- `/locations` - Service areas
- `/contact` - Contact form
- `/booking` - Booking wizard

## API Integration

The frontend uses a custom API client (`src/lib/api.ts`):

```typescript
import api from '@/lib/api';

// GET request
const branding = await api.get('/api/branding');

// POST request
const booking = await api.post('/api/bookings', data);
```

All API calls go to the backend server configured in `VITE_API_BASE_URL`.

## Development

```bash
npm run dev        # Start dev server (port 3000)
npm run build      # Build for production
npm run preview    # Preview production build
```

## Production Build

### Docker
```bash
docker build -t frontend .
docker run -p 80:80 frontend
```

### Static Hosting
```bash
npm run build
# Deploy dist/ folder to Netlify, Vercel, etc.
```

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- Wouter (routing)
- TanStack Query (data fetching)
- Tailwind CSS (styling)

## License
Proprietary - USA Luxury Limo
