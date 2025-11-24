# Frontend Deployment Guide

Deployment instructions for the USA Luxury Limo public website (frontend).

## Overview

The frontend is a static React SPA served via Nginx, designed for public users to:
- View services and fleet
- Book luxury transportation
- Contact the company
- Learn about locations served

## Build Process

### Development Build
```bash
npm run dev
```

Runs Vite dev server on port 3000 with hot reload.

### Production Build
```bash
npm run build
```

Creates optimized static files in `dist/`:
- HTML, CSS, JavaScript bundles
- Minified and compressed
- Code-split for performance

### Preview Production Build
```bash
npm run preview
```

Serves the production build locally for testing.

## Docker Deployment

### Dockerfile Location
```
frontend/Dockerfile
```

### Build Process

The Dockerfile uses a multi-stage build:

1. **Build Stage:** Compiles React app with Vite
2. **Production Stage:** Serves static files with Nginx

### Build Docker Image
```bash
cd frontend
docker build -t usa-limo-frontend:latest .
```

### Run Docker Container
```bash
docker run -p 80:80 \
  -e VITE_API_BASE_URL=https://api.yourdomain.com \
  --name usa-limo-frontend \
  usa-limo-frontend:latest
```

## Environment Variables

### Build Time Variables

These must be set during the build process (Docker build or `npm run build`):

```bash
# Backend API URL (REQUIRED)
VITE_API_BASE_URL=https://api.yourdomain.com
```

**Important:** Vite environment variables are embedded at build time, not runtime.

### Setting in Docker

**Option 1: Build Args (Recommended)**
```dockerfile
docker build --build-arg VITE_API_BASE_URL=https://api.yourdomain.com \
  -t usa-limo-frontend:latest .
```

**Option 2: .env File**
Create `.env` in `frontend/`:
```bash
VITE_API_BASE_URL=https://api.yourdomain.com
```

Then build normally:
```bash
docker build -t usa-limo-frontend:latest .
```

## Nginx Configuration

### Configuration File
```
frontend/nginx.conf
```

### Key Settings

```nginx
server {
    listen 80;
    server_name _;
    
    # Serve static files
    root /usr/share/nginx/html;
    index index.html;
    
    # SPA routing - redirect all to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Custom Nginx Config

To modify Nginx settings:

1. Edit `frontend/nginx.conf`
2. Rebuild Docker image
3. Redeploy

## Pages

The frontend includes these public pages:

- `/` - Home page
- `/about` - About the company
- `/services` - Service offerings
- `/fleet` - Vehicle fleet
- `/booking` - Book a ride
- `/contact` - Contact form
- `/locations` - Service areas

## API Integration

### API Client

The frontend uses a centralized API client (`src/lib/api.ts`) to communicate with the backend.

**Base URL:**
Configured via `VITE_API_BASE_URL` environment variable.

**Example:**
```typescript
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function fetchServices() {
  const response = await fetch(`${API_BASE_URL}/api/services`);
  return response.json();
}
```

### CORS

The backend must allow your frontend domain in `ALLOWED_ORIGINS`:

```bash
# In backend environment
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## Deployment Platforms

### Coolify

1. **Add Service:** Docker Compose or Dockerfile
2. **Set Build Args:** `VITE_API_BASE_URL=https://api.yourdomain.com`
3. **Set Domain:** `yourdomain.com`
4. **Deploy**

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

Set environment variable in Vercel dashboard:
- `VITE_API_BASE_URL` → `https://api.yourdomain.com`

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
cd frontend
netlify deploy --prod
```

Set environment variable in Netlify dashboard:
- `VITE_API_BASE_URL` → `https://api.yourdomain.com`

### Nginx (Manual)

```bash
# Build frontend
cd frontend
npm run build

# Copy to Nginx web root
sudo cp -r dist/* /var/www/html/

# Configure Nginx
sudo cp nginx.conf /etc/nginx/sites-available/usa-limo
sudo ln -s /etc/nginx/sites-available/usa-limo /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Performance Optimization

### Built-in Optimizations

- **Code Splitting:** Automatic route-based splitting
- **Lazy Loading:** Components loaded on demand
- **Minification:** JavaScript and CSS minified
- **Compression:** Gzip enabled in Nginx
- **Caching:** Static assets cached for 1 year

### Lighthouse Scores

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Tips for Better Performance

1. **Optimize Images:** Use WebP format, compress images
2. **Enable CDN:** Use Cloudflare or similar
3. **HTTP/2:** Enable in Nginx
4. **Preload Fonts:** Add preload links
5. **Remove Unused Code:** Audit dependencies

## Testing

### Build Test
```bash
npm run build
```

Should complete without errors.

### Local Preview
```bash
npm run preview
```

Visit `http://localhost:4173` to test production build.

### E2E Testing

Test the deployed frontend:

1. **Homepage loads:** `https://yourdomain.com`
2. **Routing works:** Navigate to `/about`, `/services`, etc.
3. **API calls work:** Check browser console for errors
4. **Forms submit:** Try contact form, booking form
5. **Responsive design:** Test on mobile, tablet, desktop

## Troubleshooting

### Build Fails

**Error:** "VITE_API_BASE_URL is not defined"
- **Solution:** Set environment variable before build:
  ```bash
  export VITE_API_BASE_URL=https://api.yourdomain.com
  npm run build
  ```

**Error:** "Out of memory"
- **Solution:** Increase Node memory:
  ```bash
  NODE_OPTIONS=--max-old-space-size=4096 npm run build
  ```

### CORS Errors in Browser

**Error:** "Access to fetch at 'https://api.yourdomain.com' has been blocked by CORS policy"

**Solution:** Add frontend domain to backend `ALLOWED_ORIGINS`:
```bash
# In backend .env
ALLOWED_ORIGINS=https://yourdomain.com
```

### Pages Return 404

**Error:** Refreshing on `/about` returns 404

**Solution:** Ensure Nginx is configured for SPA routing:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### API Calls Fail

**Check:**
1. `VITE_API_BASE_URL` is correct
2. Backend is running and accessible
3. CORS is configured in backend
4. Network tab in browser DevTools for errors

### Images Not Loading

**Check:**
1. Image paths are correct
2. Images exist in `public/` or `src/assets/`
3. Image imports are correct:
   ```typescript
   import logo from '@/assets/logo.png'
   ```

## Static Assets

### Public Directory

Files in `public/` are served as-is:
- `public/favicon.ico` → `/favicon.ico`
- `public/robots.txt` → `/robots.txt`

### Assets Directory

Files in `src/assets/` are processed by Vite:
- Hashed filenames
- Optimized
- Bundled

**Usage:**
```typescript
import logo from '@/assets/logo.png'
<img src={logo} alt="Logo" />
```

## SEO

### Meta Tags

Each page should have:
- Unique `<title>`
- Meta description
- Open Graph tags
- Twitter Card tags

**Example:**
```typescript
<Helmet>
  <title>About Us - USA Luxury Limo</title>
  <meta name="description" content="Learn about USA Luxury Limo..." />
  <meta property="og:title" content="About Us - USA Luxury Limo" />
  <meta property="og:description" content="..." />
</Helmet>
```

### Sitemap

Generate a sitemap for better SEO:

```bash
npm run build
# Then manually create sitemap.xml or use a tool
```

### robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## Security

### Content Security Policy

Add to Nginx config:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
```

### HTTPS

Always use HTTPS in production. Coolify and most platforms provide this automatically.

### Secure Headers

Nginx config includes:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

## Monitoring

### Error Tracking

Consider integrating:
- Sentry
- LogRocket
- Bugsnag

### Analytics

Add analytics to track:
- Page views
- User behavior
- Conversion rates

**Recommended:**
- Google Analytics
- Plausible
- Fathom

## Updates

### Redeployment

1. **Make changes** to code
2. **Commit and push** to Git
3. **Rebuild Docker image:**
   ```bash
   docker build -t usa-limo-frontend:latest .
   ```
4. **Redeploy** to Coolify or your platform

### Zero-Downtime Deployment

Use rolling updates or blue-green deployment:
- Coolify: Automatic
- Kubernetes: Native support
- Manual: Use load balancer

## Performance Monitoring

### Metrics to Track

- Page load time
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

### Tools

- **Lighthouse:** Built into Chrome DevTools
- **WebPageTest:** Online performance testing
- **GTmetrix:** Performance analysis

## Support

For frontend-specific issues:
1. Check browser console for errors
2. Verify `VITE_API_BASE_URL` is correct
3. Test API connectivity
4. Check Nginx logs (if using Nginx)
5. Verify CORS configuration in backend
