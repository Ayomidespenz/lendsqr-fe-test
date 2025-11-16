# Installation Guide - Complete Setup

Detailed step-by-step installation instructions.

## Prerequisites

Check you have these installed:

```bash
# Check Node.js (should be v18 or higher)
node --version

# Check npm (should be v9 or higher)
npm --version

# Check Git
git --version
```

If not installed, download from:
- **Node.js**: https://nodejs.org/
- **Git**: https://git-scm.com/

---

## Step 1: Clone Repository

Get the code from GitHub:

```bash
git clone https://github.com/Ayomidespenz/lendsqr-fe-test.git
cd lendsqr-fe-test
```

Or if you have SSH set up:
```bash
git clone git@github.com:Ayomidespenz/lendsqr-fe-test.git
cd lendsqr-fe-test
```

---

## Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

**What this does:**
- Downloads all packages listed in `package.json`
- Creates `node_modules/` folder
- Creates `package-lock.json` (lock file for exact versions)

**Takes**: 1-3 minutes depending on internet speed

---

## Step 3: Verify Installation

Check everything installed correctly:

```bash
# Check if build works
npm run build

# Should say "✓ X modules transformed" at the end
```

If it says error, try:
```bash
npm install
npm run build
```

---

## Step 4: Set Up API (Optional)

The app can work without an API, but here's how to add one:

### Option A: JSON Server (For Development)

1. Install JSON Server globally:
```bash
npm install -g json-server
```

2. Start it in a new terminal:
```bash
json-server --watch public/data.json --port 3001
```

The server runs at `http://localhost:3001`

### Option B: Real Backend API

Edit file `src/services/userApi.ts`:

```typescript
const API_URL = 'https://your-api.com/api';  // Change this line
```

---

## Step 5: Start Development

Run the app:

```bash
npm run dev
```

**Output should look like:**
```
VITE v7.2.2  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

Open `http://localhost:5173` in your browser.

---

## ✅ Installation Complete!

Your Lendsqr Frontend is now installed and running.

### Verify Everything Works

1. **App loads**: Page shows "Login" form
2. **Can login**: Use any email/password
3. **See dashboard**: Shows user table after login
4. **API connected**: If API running, shows real data

---

## 📝 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check code quality
npm run lint

# Preview production build locally
npm run preview
```

---

## 🆘 Installation Issues?

### npm install fails
```bash
# Clear cache and reinstall
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### Port 5173 already in use
```bash
# Use different port
npm run dev -- --port 3000
```

### Strange errors after update
```bash
# Clear everything and start fresh
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Node version too old
```bash
# Check your version
node --version

# Update Node.js from: https://nodejs.org/
```

---

## 🎯 What's Next?

- Read: **[Environment Setup](03-environment-setup.md)** to configure settings
- Read: **[Development Workflow](04-development-workflow.md)** to start coding
- Read: **[Quick Start](01-quick-start.md)** for 5-minute overview

---

**Installation successful! Let's code!** 🚀
