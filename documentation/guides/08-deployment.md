# Deployment Guide

Deploy your app to production - Vercel, Netlify, AWS, or Docker.

## Before Deploying

Complete this checklist:
- ✅ Build works: `npm run build`
- ✅ No lint errors: `npm run lint`
- ✅ Tested thoroughly
- ✅ Correct API URL configured
- ✅ Environment file ready

---

## Option 1: Vercel (Easiest) ⭐ Recommended

Vercel is designed for React/Vite apps.

### Step 1: Create Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Use GitHub account

### Step 2: Import Project

1. Click "New Project"
2. Select your GitHub repository
3. Click "Import"

### Step 3: Configure Environment

In Vercel dashboard:
1. Go to "Settings"
2. Click "Environment Variables"
3. Add: `REACT_APP_API_URL = https://api.lendsqr.com/v1`
4. Add any other variables from `.env.production`
5. Click "Save"

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Done! ✅

**Your app is live!**

Every time you push to `main` branch, Vercel auto-deploys.

---

## Option 2: Netlify

### Step 1: Create Account

1. Go to https://netlify.com
2. Click "Sign Up"
3. Use GitHub account

### Step 2: Import Project

1. Click "New site from Git"
2. Select GitHub
3. Select your repository
4. Click "Deploy"

### Step 3: Configure Build

If not auto-detected, set:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Step 4: Add Environment Variables

1. Go to "Site settings"
2. Click "Build & deploy"
3. Click "Environment"
4. Add environment variables
5. Trigger redeploy

---

## Option 3: AWS S3 + CloudFront

For manual hosting on AWS.

### Step 1: Create S3 Bucket

```bash
# Create bucket
aws s3 mb s3://my-lendsqr-app

# Enable static website hosting
aws s3 website s3://my-lendsqr-app \
  --index-document index.html \
  --error-document index.html
```

### Step 2: Upload Files

```bash
# Build first
npm run build

# Upload to S3
aws s3 sync dist/ s3://my-lendsqr-app --delete
```

### Step 3: Create CloudFront Distribution

This caches your app globally for speed:

1. Go to AWS CloudFront console
2. Click "Create distribution"
3. Set origin to S3 bucket
4. Create distribution
5. Note the domain (e.g., `d123.cloudfront.net`)

---

## Option 4: Docker

For containerized deployment.

### Step 1: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Create nginx.conf

Create `nginx.conf`:

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

### Step 3: Build Docker Image

```bash
docker build -t my-lendsqr-app:1.0.0 .
```

### Step 4: Run Locally

```bash
docker run -p 80:80 my-lendsqr-app:1.0.0
```

Open `http://localhost`

### Step 5: Push to Registry

```bash
# Tag for registry
docker tag my-lendsqr-app:1.0.0 myregistry/my-lendsqr-app:latest

# Push
docker push myregistry/my-lendsqr-app:latest
```

---

## Comparing Options

| Platform | Difficulty | Cost | Best For |
|----------|-----------|------|----------|
| **Vercel** | Easy | Free tier available | React/Vite apps |
| **Netlify** | Easy | Free tier available | Static sites |
| **AWS** | Hard | Pay per use | Enterprise |
| **Docker** | Medium | Depends on hosting | Custom deployments |

---

## Domain Setup

After deploying, you can add a custom domain.

### Example: Add Domain to Vercel

1. In Vercel dashboard
2. Go to "Settings"
3. Click "Domains"
4. Add your domain name
5. Follow DNS instructions
6. Done! Your custom domain works

---

## Post-Deployment

### Monitor Your App

After deploying:
- ✅ Test all features
- ✅ Check performance
- ✅ Monitor errors
- ✅ Check analytics

### Setup Error Tracking (Optional)

Use Sentry to catch errors:
1. Create account at https://sentry.io
2. Create project for React
3. Add DSN to environment variables
4. Errors automatically logged

### Setup Analytics (Optional)

Use Google Analytics:
1. Create account at https://analytics.google.com
2. Get tracking ID
3. Add to environment
4. Track user behavior

---

## Troubleshooting Deployments

### "Build Failed"

Check:
1. Build works locally: `npm run build`
2. No TypeScript errors
3. All dependencies in `package.json`
4. Environment variables set correctly

### "App Blank/White"

Check:
1. `npm run preview` works locally
2. Correct API URL in environment
3. Browser console for errors (F12)

### "Page Not Found on Refresh"

Solution: Configure server to redirect to `index.html`

This is auto-configured on Vercel/Netlify/etc.

---

## Continuous Deployment

Both Vercel and Netlify auto-deploy:

```
1. You push code to GitHub
    ↓
2. Vercel/Netlify detects change
    ↓
3. Runs build
    ↓
4. Deploys new version
    ↓
5. Your app updates automatically
```

No manual deployment needed!

---

## Rollback (Undo Deployment)

**If something breaks after deploying:**

### Vercel
- Go to "Deployments"
- Click previous deployment
- Click "Promote to Production"

### Netlify
- Go to "Deploys"
- Click previous deploy
- Click "Publish deploy"

---

## Environment Variables for Production

Create `.env.production`:

```env
REACT_APP_API_URL=https://api.lendsqr.com/v1
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

Set these in your deployment platform:
- Vercel: Settings → Environment Variables
- Netlify: Settings → Build & deploy → Environment
- AWS: Add to CloudFront or application config
- Docker: Pass as environment variables

---

## Security Tips

- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS (all platforms do this)
- ✅ Keep dependencies updated
- ✅ Monitor for security alerts
- ✅ Use strong passwords

---

## Summary

**Quickest Way**: Use Vercel
1. Push to GitHub
2. Connect Vercel to GitHub
3. Vercel auto-deploys
4. Done!

---

**Your app is now in production!** 🎉
