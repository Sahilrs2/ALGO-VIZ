# Algorithm Visualizer - Deployment Guide

This guide covers deploying the Algorithm Visualizer to production.

## Architecture Overview

- **Frontend**: React SPA deployed to Vercel (or any static hosting)
- **Backend**: Express API deployed to Railway, Heroku, or AWS
- **Database**: MongoDB Atlas (MongoDB cloud)

## Database Setup: MongoDB Atlas

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project and cluster
4. Choose M0 (Free) tier

### 2. Get Connection String
1. In Atlas, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Format: `mongodb+srv://username:password@cluster.mongodb.net/algorithm-visualizer?retryWrites=true&w=majority`

### 3. Create Database User
1. In Security → Database Access
2. Add database user with strong password
3. Note the credentials

## Backend Deployment: Railway

Railway is the recommended option (simplest setup).

### 1. Prepare Backend for Deployment

Update `backend/package.json` scripts:
```json
"scripts": {
  "dev": "node --watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

Make sure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### 2. Deploy to Railway

1. Go to https://railway.app
2. Sign in with GitHub
3. Create new project → "Deploy from GitHub"
4. Select your repository
5. Choose `backend` as the root directory

### 3. Set Environment Variables in Railway

In Railway dashboard:
- `PORT` = 5000
- `MONGODB_URI` = Your MongoDB Atlas connection string
- `JWT_SECRET` = Generate a strong random string
- `NODE_ENV` = production
- `CORS_ORIGIN` = Your frontend deployment URL (e.g., https://yourdomain.vercel.app)

### 4. Deploy
Railway auto-deploys on git push to main branch.

## Frontend Deployment: Vercel

### 1. Prepare Frontend for Deployment

Create `.env.production` in frontend folder:
```
VITE_API_URL=https://your-backend-url.railway.app
```

Update `frontend/src/context/AuthContext.tsx`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const axiosInstance = axios.create({
  baseURL: API_URL,
})
```

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/algorithm-visualizer.git
git push -u origin main
```

### 3. Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Import your repository
4. Framework: Vite
5. Root Directory: `frontend`
6. Build Command: `pnpm build`
7. Output Directory: `dist`

### 4. Set Environment Variables in Vercel

In Vercel dashboard → Settings → Environment Variables:
- `VITE_API_URL` = Your backend Railway URL

### 5. Deploy
Click "Deploy" - Vercel will auto-deploy on git push.

## Backend Deployment: Heroku (Alternative)

If you prefer Heroku:

### 1. Create Heroku App
```bash
heroku login
heroku create your-app-name
heroku config:set PORT=5000
```

### 2. Set Environment Variables
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=your_frontend_url
```

### 3. Deploy
```bash
git subtree push --prefix backend heroku main
```

## Backend Deployment: AWS EC2 (Advanced)

### 1. Launch EC2 Instance
- AMI: Ubuntu 22.04 LTS
- Instance type: t2.micro (free tier)

### 2. Connect and Setup
```bash
ssh -i your-key.pem ubuntu@your-instance-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Clone repository
git clone https://github.com/yourusername/algorithm-visualizer.git
cd algorithm-visualizer
```

### 3. Configure and Deploy
```bash
cd backend
cp .env.example .env
# Edit .env with your settings

pnpm install
pnpm build

# Use PM2 to keep server running
sudo npm install -g pm2
pm2 start dist/server.js
pm2 startup
pm2 save
```

### 4. Setup Nginx as Reverse Proxy
```bash
sudo apt install nginx

# Create /etc/nginx/sites-available/default
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Start Nginx:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Domain Setup

### Add Custom Domain

**Vercel Frontend**:
1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Follow DNS instructions

**Railway Backend**:
1. Railway → Environment → Custom Domains
2. Add domain (e.g., api.yourdomain.com)
3. Follow DNS instructions

## SSL/HTTPS Setup

**Vercel**: Automatic with Let's Encrypt
**Railway**: Automatic with Let's Encrypt
**Heroku**: Automatic with SSL
**AWS EC2**: Use Certbot
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Monitoring & Logging

### Railway
- Dashboard shows logs in real-time
- Metrics for CPU, memory, bandwidth

### Vercel
- Analytics dashboard
- Performance metrics
- Build logs

### AWS EC2
- CloudWatch for monitoring
- Use `pm2 logs` for application logs

## Environment Variables Checklist

### Backend
- [x] MONGODB_URI
- [x] JWT_SECRET (strong random string)
- [x] PORT (5000)
- [x] NODE_ENV (production)
- [x] CORS_ORIGIN (frontend URL)

### Frontend
- [x] VITE_API_URL (backend URL)

## Database Backups

### MongoDB Atlas
1. Atlas Dashboard → Backup → Automatic Backup
2. Enable automatic backups
3. Manual backups available anytime

## Troubleshooting Deployment

### Backend not connecting to MongoDB
- Verify MONGODB_URI format
- Check MongoDB Atlas IP whitelist (allow all IPs or specific IPs)
- Test connection locally with same URI

### Frontend API calls failing
- Verify CORS_ORIGIN in backend matches frontend URL
- Check network tab in DevTools
- Verify API URL in environment variables

### Build fails on Vercel
- Check build logs
- Ensure all dependencies are in package.json
- Verify environment variables are set

### Backend crashes after deploy
- Check Heroku/Railway logs
- Verify environment variables
- Ensure database connection works

## Performance Optimization

### Frontend
```javascript
// Enable compression
vercel.json:
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache" }
      ]
    }
  ]
}
```

### Backend
- Add database indexes for frequently queried fields
- Implement caching with Redis (optional)
- Use connection pooling

## Cost Estimate (Monthly)

| Service | Cost |
|---------|------|
| MongoDB Atlas (free) | $0 |
| Railway (free tier) | $0-5 |
| Vercel (free tier) | $0 |
| Custom Domain | $10-15 |
| **Total** | **$10-20** |

## Scaling for Production

1. **Database**: Upgrade MongoDB Atlas tier as needed
2. **Backend**: Upgrade Railway resources or use multiple instances
3. **Frontend**: Vercel handles scaling automatically
4. **CDN**: Consider Cloudflare for caching and DDoS protection

---

For questions or issues, refer to:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
