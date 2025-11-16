# Troubleshooting Guide

Solutions for common problems and errors.

## Installation & Setup Issues

### npm install Fails

**Problem**: Error when running `npm install`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete old installations
rm -r node_modules package-lock.json

# Install fresh
npm install
```

---

### Node Version Too Old

**Problem**: Error about Node version compatibility

**Solution**:
1. Check your version: `node --version`
2. Download Node.js 18+: https://nodejs.org/
3. Install and restart terminal
4. Verify: `node --version`

---

### Port Already in Use

**Problem**: "Port 5173 is already in use" or "Port 3001 already in use"

**Solution:**

**For dev server (port 5173):**
```bash
# Use different port
npm run dev -- --port 3000
```

**For API server (port 3001):**
```bash
# Use different port
json-server --watch public/data.json --port 3002
```

Then update `.env.local`:
```env
REACT_APP_API_URL=http://localhost:3002
```

---

## Runtime Errors

### "Cannot find module"

**Problem**: Error like "Cannot find module './Component'"

**Causes**:
- File name mismatch (case sensitive on Linux/Mac)
- File deleted but still imported
- Typo in file path

**Solution**:
1. Check file exists: `ls src/components/`
2. Check spelling (exact case)
3. Fix the import statement

Example fix:
```typescript
// ❌ Wrong - doesn't exist
import { Button } from './button';

// ✅ Right - correct path
import { Button } from './Button';
```

---

### API Not Connecting

**Problem**: "Cannot fetch users" or API errors in dashboard

**Solution 1: Check API is running**
```bash
# Is JSON server running?
curl http://localhost:3001/users

# If error, start it
json-server --watch public/data.json --port 3001
```

**Solution 2: Check .env.local**
```env
# Should match running API
REACT_APP_API_URL=http://localhost:3001
```

**Solution 3: Check network**
- Open browser DevTools (F12)
- Go to "Network" tab
- Look for failed requests
- Check the error message

---

### useState/useEffect Errors

**Problem**: "Hooks can only be called inside function components"

**Cause**: You tried to use hooks in a class component

**Solution**: Convert to functional component

```typescript
// ❌ Wrong - class component
class MyComponent extends React.Component {
  useState() {  // Can't use hooks here!
    //...
  }
}

// ✅ Right - functional component
const MyComponent: React.FC = () => {
  const [state, setState] = useState(null);  // ✓ Works
};
```

---

### Infinite Loop in useEffect

**Problem**: Component keeps re-rendering, API called repeatedly

**Cause**: Missing or wrong dependency array

**Solution**:
```typescript
// ❌ Bad - infinite loop
useEffect(() => {
  setUsers(users);  // Causes re-render, calls effect again
});

// ✅ Good - runs once on mount
useEffect(() => {
  loadUsers();
}, []);  // Empty array = run once

// ✅ Good - runs when 'id' changes
useEffect(() => {
  loadUser(id);
}, [id]);  // Array with dependencies
```

---

### "Cannot read property of undefined"

**Problem**: Error accessing object property that doesn't exist

**Example**:
```typescript
// ❌ Wrong - user might not exist
<h1>{user.name}</h1>  // Crashes if user is null/undefined

// ✅ Right - check first
<h1>{user?.name}</h1>  // Safe navigation

// Or
{user && <h1>{user.name}</h1>}
```

---

## Build Issues

### Build Fails with Type Errors

**Problem**: `npm run build` shows TypeScript errors

**Solution**:
```bash
# 1. Read the error message carefully
# 2. Fix the error in the file
# 3. Try building again
npm run build

# If stuck, check types
npm run build -- --noEmit
```

Example error:
```
src/pages/DashboardPage.tsx:25:5 - error TS2345:
Argument of type 'number' is not assignable to parameter of type 'string'.
```

Fix: Change the type or convert the value
```typescript
// ❌ Wrong
const userId: string = 123;

// ✅ Right
const userId: string = '123';  // or
const userId: number = 123;
```

---

### Build Size Too Large

**Problem**: Production bundle is huge

**Solution**: Check what's included
```bash
# Build with analysis
npm run build

# Check size of dist folder
du -sh dist/
```

Common issues:
- Unused dependencies in package.json
- Large images not optimized
- Missing tree-shaking due to bad imports

---

## Development Server Issues

### Hot Reload Not Working

**Problem**: Changes to files don't refresh in browser

**Solution**:
```bash
# 1. Stop server (Ctrl+C)
# 2. Restart server
npm run dev

# 3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
```

---

### Console Errors About .scss

**Problem**: CSS Module import errors

**Check**:
- File is named `*.module.scss` (not just `.scss`)
- Import path is correct
- File exists in expected location

```typescript
// ✅ Right
import styles from './Component.module.scss';
<div className={styles.container}>

// ❌ Wrong
import styles from './Component.scss';  // Missing 'module'
```

---

## Authentication Issues

### "Undefined is not a function" on Login

**Problem**: Login button click causes error

**Likely Cause**: API not running or wrong URL

**Solution**:
1. Check API is running: `curl http://localhost:3001`
2. Check `.env.local` has correct URL
3. Check `userApi.ts` has correct endpoint
4. Restart dev server

---

### Logged in but Redirected to Login

**Problem**: Can login but immediately redirected to login page

**Cause**: Token not being saved or checked correctly

**Solution**:
```bash
# 1. Open browser DevTools (F12)
# 2. Go to Application → Local Storage
# 3. Look for 'auth_token'
# 4. If missing, login again
# 5. If exists but still redirected, check ProtectedRoute.tsx
```

---

### localStorage Not Working

**Problem**: Token/data not persisting after refresh

**Cause**: Private browsing or storage quota

**Solution**:
```bash
# 1. Exit private/incognito mode
# 2. Check localStorage manually
localStorage.clear()  # In browser console
# Then login again
```

---

## Git Issues

### "Cannot push to repository"

**Problem**: `git push` fails

**Solution 1: Update local code first**
```bash
git pull origin main
git push origin feature/my-feature
```

**Solution 2: Force push (use carefully)**
```bash
git push origin feature/my-feature --force-with-lease
```

---

### "Detached HEAD" Warning

**Problem**: Git is in weird state

**Solution**:
```bash
# Go back to main branch
git checkout main

# Check status
git status
```

---

### Merge Conflicts

**Problem**: Can't merge due to conflicts

**Solution**:
1. Open the conflicted file
2. Look for `<<<< HEAD` and `>>>> branch-name`
3. Choose which code to keep
4. Delete the conflict markers
5. `git add` and `git commit`

---

## Browser DevTools Tips

### View API Requests

1. Open DevTools (F12)
2. Click "Network" tab
3. Refresh page or trigger action
4. Look for failed requests (red)
5. Click request to see details

### Check localStorage

1. Open DevTools (F12)
2. Click "Application" tab
3. Click "Local Storage" in left sidebar
4. Look for `auth_token` or other saved data

### Console Errors

1. Open DevTools (F12)
2. Click "Console" tab
3. Red X = error, Yellow = warning
4. Click to see full details
5. Search for specific errors

---

## Quick Reference

| Problem | Command/Solution |
|---------|------------------|
| npm install fails | `npm cache clean --force && rm -r node_modules && npm install` |
| Port in use | `npm run dev -- --port 3000` |
| API not connecting | Check URL in `.env.local`, restart `json-server` |
| Build errors | Read error message, fix code, `npm run build` |
| Changes not showing | Stop dev server, restart `npm run dev`, hard refresh browser |
| Stuck in git | `git status` then `git pull` and `git push` |

---

## Getting Help

1. **Check this guide** - Use Ctrl+F to search
2. **Read error messages** - They usually tell you what's wrong
3. **Check browser console** - F12 → Console tab
4. **Check browser network** - F12 → Network tab
5. **Google the error** - Usually someone had the same issue

---

**Still stuck? Try:**
- Close and reopen terminal
- Restart your computer
- Clear cache: `npm cache clean --force`
- Start fresh: Delete `node_modules` and reinstall

---

**Good luck! Most issues have simple solutions.** 🚀
