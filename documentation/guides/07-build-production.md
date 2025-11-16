# Build for Production Guide

Create optimized production build for deployment.

## What is a Production Build?

A production build is:
- ✅ Optimized and minified
- ✅ Removed debug code
- ✅ Smaller file size
- ✅ Faster loading
- ✅ Ready for real users

---

## Creating Production Build

### Step 1: Prepare Code

Before building, make sure:
- No `console.log()` left in code
- No errors when running `npm run lint`
- Tested everything

```bash
# Check code quality
npm run lint -- --fix

# Test it works
npm run dev
# ... test in browser ...
```

### Step 2: Create Build

```bash
npm run build
```

**Output:**
```
vite v7.2.2 building for production...

✓ 1234 modules transformed
dist/index.html                   0.51 kB │ gzip:  0.32 kB
dist/assets/index-abc123.js     456.78 kB │ gzip: 145.23 kB
dist/assets/index-xyz789.css     89.34 kB │ gzip: 34.56 kB
```

✅ Build complete! Files in `dist/` folder

### Step 3: Verify Build

```bash
# Preview production build locally
npm run preview
```

Opens at `http://localhost:4173` - test it works correctly.

---

## Build Optimization Tips

### 1. Remove Unused Code

Check `package.json` - remove unused packages:

```bash
npm uninstall unused-package-name
```

### 2. Optimize Images

Before committing:
- Compress images (use TinyPNG.com or similar)
- Use modern formats (WebP instead of PNG)
- Remove old/unused images

### 3. Check Bundle Size

```bash
# Build and check size
npm run build
du -sh dist/

# Should be under 300KB gzipped
```

### 4. Remove Debug Code

Before building, search for:
```bash
# Find all console.logs
grep -r "console.log" src/

# Remove them or comment out
```

---

## Environment for Production

Create `.env.production` file:

```env
# Use real API, not localhost
REACT_APP_API_URL=https://api.lendsqr.com/v1
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

When building, this file is automatically used:
```bash
npm run build  # Uses .env.production automatically
```

---

## Pre-Deployment Checklist

Before deploying, verify:

- [ ] Build completes without errors: `npm run build`
- [ ] No lint errors: `npm run lint`
- [ ] Preview works: `npm run preview`
- [ ] Tested all features
- [ ] No console errors (F12)
- [ ] No `console.log()` in code
- [ ] Correct API URL in `.env.production`
- [ ] Mobile responsive tested
- [ ] All links work correctly

---

## What Gets Built

The `dist/` folder contains:

```
dist/
├── index.html         # Main HTML file
├── assets/
│   ├── index-xxx.js   # JavaScript bundle
│   └── index-xxx.css  # CSS bundle
└── [images, fonts, etc]
```

This entire `dist/` folder is what you deploy.

---

## Build Troubleshooting

### Build Fails with Errors

**Solution**: Read the error message

```bash
# Run build again
npm run build

# Look for first error message
# Fix the issue
# Try building again
```

### Bundle Size Too Large

**Check what's included:**
```bash
npm run build

# Check size
ls -lh dist/assets/
```

If too large:
- Remove unused dependencies
- Check for duplicate packages
- Split code into smaller chunks

### Build Succeeds but App Broken

**Test locally first:**
```bash
npm run preview

# Test in browser at http://localhost:4173
# Check console for errors (F12)
```

---

## Next Steps

After building successfully:
→ Read: **[Deployment Guide](08-deployment.md)** to deploy to production

---

**Production build created!** 🚀
