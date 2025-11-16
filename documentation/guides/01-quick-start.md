# Quick Start Guide - 5 Minutes Setup

Get the Lendsqr Frontend running in 5 minutes.

## 🚀 What You'll Need

- **Node.js** v18 or higher
- **npm** v9 or higher
- **Git**
- A code editor (VS Code recommended)

## ⚡ Quick Setup (5 Steps)

### Step 1: Clone the Project
```bash
git clone https://github.com/Ayomidespenz/lendsqr-fe-test.git
cd lendsqr-fe-test
```

### Step 2: Install Dependencies
```bash
npm install
```
*Takes 1-2 minutes*

### Step 3: Start API Server (Optional but Recommended)

**Option A: Use JSON Server (Easier)**
```bash
# Install if not already installed
npm install -g json-server

# Start the server
json-server --watch public/data.json --port 3001
```

**Option B: Skip - Use test data**
Just skip this and the app uses mock data

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
- Browser automatically opens to `http://localhost:5173`
- If not, manually go to: `http://localhost:5173`

## ✅ You're Done!

The app is now running. You can:

- **Login**: Use any email/password (it's demo mode)
- **View Users**: See the user dashboard
- **Click Users**: View detailed user information
- **Filter Users**: Use the filter button to search

---

## 🎯 Next Steps

- Read: **[Installation Guide](02-installation.md)** for detailed setup
- Read: **[Development Workflow](04-development-workflow.md)** to start coding
- Check: **[Troubleshooting](06-troubleshooting.md)** if something doesn't work

---

## 🐛 Quick Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**API not connecting?**
- Make sure `json-server` is running on port 3001
- Or ignore it and use demo mode

**npm install fails?**
```bash
rm -r node_modules package-lock.json
npm install
```

---

**That's it! Happy coding! 🚀**
