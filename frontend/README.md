# USA Luxury Limo - Frontend

## Overview
This is the public-facing website for USA Luxury Limo. It provides:
- Homepage with company overview
- Services showcase
- Fleet information
- Booking system (4-step wizard)
- Contact information
- Location pages

This is a lightweight React SPA that communicates with the backend API.

## Tech Stack
- **Frontend:** React 18, TypeScript, Vite
- **Routing:** Wouter
- **State Management:** TanStack Query
- **Styling:** Tailwind CSS
- **API Client:** Custom fetch wrapper

## Project Structure
```
frontend/
├── src/
│   ├── pages/           # Page components
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utilities & API client
│   ├── hooks/           # Custom React hooks
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
└── vite.config.ts       # Vite configuration
```

## Running Locally

### Prerequisites
- Node.js 18+
- Backend server running (for API calls)

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000
```

For production:
```env
VITE_API_BASE_URL=https://api.best-chauffeurs.com
```

### Run Development Server
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Output: `dist/` directory

## API Integration

### API Client
The frontend uses a typed API client (`src/lib/api.ts`) to communicate with the backend:

```typescript
import api from '@/lib/api';

// GET request
const data = await api.get('/api/branding');

// POST request
const result = await api.post('/api/bookings', bookingData);
```

### API Endpoints Used
- `GET /api/branding` - Company branding
- `GET /api/vehicle-types` - Vehicle catalog
- `GET /api/services` - Service list
- `POST /api/bookings` - Create booking
- `POST /api/flight-search` - Search flights
- `POST /api/geocode` - Geocode addresses

## Pages

### Public Pages
- `/` - Homepage
- `/about` - About us
- `/services` - Services showcase
- `/fleet` - Vehicle catalog
- `/locations` - Service areas
- `/contact` - Contact information
- `/booking` - Booking wizard

## Deployment

### Static Hosting
The frontend is a static SPA that can be deployed to:
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

### Docker Build
```bash
# Build stage
docker build -t usa-luxury-limo-frontend .

# Serve with nginx
docker run -p 80:80 usa-luxury-limo-frontend
```

### Environment Variables (Production)
- `VITE_API_BASE_URL` - Backend API URL (e.g., `https://api.best-chauffeurs.com`)

## Development

### Adding a New Page
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation

### Shared Types
Shared TypeScript types are in `../shared/schema.ts` and can be imported:
```typescript
import type { VehicleType } from '@shared/schema';
```

## License
Proprietary - USA Luxury Limo
