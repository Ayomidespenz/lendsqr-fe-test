# Environment Setup Guide

Configure environment variables and settings.

## What are Environment Variables?

Environment variables are settings that change based on where the app runs:
- **Development**: Connect to local API
- **Production**: Connect to live API

---

## Create Environment File

Create a file named `.env.local` in the project root:

```bash
# Project root directory
lendsqr-frontend/
├── .env.local          # ← Create this file
├── src/
├── package.json
└── ...
```

---

## Environment Variables

### For Development (Recommended)

Copy this into `.env.local`:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001
REACT_APP_API_TIMEOUT=10000

# Application Mode
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

**What each means:**
- `REACT_APP_API_URL` - Where to fetch data from
- `REACT_APP_API_TIMEOUT` - How long to wait for API response (milliseconds)
- `REACT_APP_ENV` - App environment (development or production)
- `REACT_APP_DEBUG` - Show debug info in console

---

### For Production (When Deploying)

When deploying to live server:

```env
# API Configuration
REACT_APP_API_URL=https://api.lendsqr.com/v1
REACT_APP_API_TIMEOUT=10000

# Application Mode
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

---

## Common API URLs

| Environment | URL | Use Case |
|-------------|-----|----------|
| Local | `http://localhost:3001` | Development with JSON Server |
| Local | `http://localhost:8000` | Development with other API |
| Staging | `https://staging-api.lendsqr.com` | Testing before production |
| Production | `https://api.lendsqr.com/v1` | Live application |

---

## Using Environment Variables in Code

Environment variables are accessed like this:

```typescript
// In your code
const API_URL = process.env.REACT_APP_API_URL;

// Example
console.log(API_URL);  // Outputs: http://localhost:3001
```

---

## Verify Setup

After creating `.env.local`, restart the dev server:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

Check the console for the API URL:
```typescript
// Add to src/main.tsx temporarily
console.log('API URL:', process.env.REACT_APP_API_URL);
```

---

## Common Setup Scenarios

### Scenario 1: Using JSON Server

`.env.local`:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

Then run:
```bash
json-server --watch public/data.json --port 3001
```

### Scenario 2: Using Real Backend

`.env.local`:
```env
REACT_APP_API_URL=https://api.yourcompany.com
REACT_APP_ENV=development
```

No need to run JSON Server.

### Scenario 3: Without Any API

`.env.local`:
```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=development
```

App will show demo data even if API not available.

---

## Troubleshooting

### "API is undefined"

Solution: You might have typed the variable name wrong. Check:
- Variable name starts with `REACT_APP_`
- Restart dev server after creating `.env.local`
- No spaces around `=` sign

Correct:
```env
REACT_APP_API_URL=http://localhost:3001
```

Wrong:
```env
REACT_APP_API_URL = http://localhost:3001
API_URL=http://localhost:3001  # Missing REACT_APP_ prefix
```

### "Can't connect to API"

Check:
1. API server is running (`json-server` or your backend)
2. Port number is correct (3001 by default)
3. URL in `.env.local` matches running API
4. Restart dev server

### "Port already in use"

Run API on different port:
```bash
json-server --watch public/data.json --port 3002
```

Then update `.env.local`:
```env
REACT_APP_API_URL=http://localhost:3002
```

---

## Important Notes

⚠️ **Don't commit `.env.local`** - Keep it local only
- Add to `.gitignore` if not already
- Each developer uses their own `.env.local`

✅ **Use meaningful values**
- Test with real data when possible
- Use different URLs for dev/staging/production

---

## 🎯 Next Steps

- Read: **[Development Workflow](04-development-workflow.md)** to start coding
- Read: **[Troubleshooting](06-troubleshooting.md)** for issues

---

**Environment setup complete!** 🎉
