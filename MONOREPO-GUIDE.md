# Monorepo Structure Guide

## Overview
This repository now contains two separate applications:
1. **Backend** (`backend/`) - API server + Admin portals
2. **Frontend** (`frontend/`) - Public website

## Quick Start

### Backend (Port 5000)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend (Port 3000)
```bash
cd frontend
npm install
cp .env.example .env  
# Set VITE_API_BASE_URL=http://localhost:5000
npm run dev
```

## Architecture

```
Frontend (React SPA)
    ↓ API calls
Backend (Express + Admin UIs)
    ↓
PostgreSQL Database
```

## Deployment

### Backend
- Domain: `api.best-chauffeurs.com`
- Dockerfile: `backend/deployment/Dockerfile.backend`
- Env: `ALLOWED_ORIGINS=https://www.best-chauffeurs.com`

### Frontend
- Domain: `www.best-chauffeurs.com`
- Dockerfile: `frontend/Dockerfile`
- Env: `VITE_API_BASE_URL=https://api.best-chauffeurs.com`

## Documentation
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Main: `README.md`
