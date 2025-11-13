# 📋 Complete API Configuration Guide

## Your Current Setup

**Project:** Lendsqr Admin Dashboard  
**Frontend:** React + TypeScript  
**Required:** API with 500 users  

---

## Best Solution for You: JSON Server

### Why JSON Server?
✅ **Local** - Runs on your computer  
✅ **Free** - No cost  
✅ **Easy** - One command  
✅ **Full CRUD** - Create, Read, Update, Delete  
✅ **Perfect for Development** - Exactly what you need  
✅ **Can migrate later** - Easy to move to production  

---

## Complete Setup (Copy-Paste Instructions)

### Step 1: Install JSON Server
```bash
npm install -g json-server
```

### Step 2: Generate 500 Users Database
Run in your project directory:
```bash
node generate-users.js
```

Expected output:
```
📊 Generating 500 users...
✓ Generated 50 users...
✓ Generated 100 users...
✓ Generated 150 users...
✓ Generated 200 users...
✓ Generated 250 users...
✓ Generated 300 users...
✓ Generated 350 users...
✓ Generated 400 users...
✓ Generated 450 users...
✓ Generated 500 users...
✅ Successfully generated 500 users in db.json
📁 File size: 4500.25 KB

🚀 Now run: json-server --watch db.json --port 3001
```

A `db.json` file will be created in your project root.

### Step 3: Start JSON Server
In a terminal, run:
```bash
json-server --watch db.json --port 3001
```

Expected output:
```
  \{^_^}/ hi!

  Loading db.json
  Doing nothing is so fast.

  ⚡ Server is running at http://localhost:3001
  🔗 Database: db.json
  📊 Resources: /users
  🔌 Home: http://localhost:3001

  💡 Tips:
  - If you only want to expose some routes, use the --routes option
  - Stereoscopic sure to enter slow mode --slowmo
```

### Step 4: Update Your API Configuration

Open `src/services/userApi.ts` and change:

```typescript
// FIND THIS:
const MOCK_API_URL = 'https://api.mockapi.io/api/lendsqr/users';

// REPLACE WITH THIS:
const API_BASE_URL = 'http://localhost:3001';
```

Or add axios configuration:

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userApi = {
  async getUsers() {
    const response = await apiClient.get('/users');
    return response.data;
  },
  
  async getUserById(id: string) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
};
```

### Step 5: Run Your Frontend

In a NEW terminal window:
```bash
npm run dev
```

Your app will be at: `http://localhost:5177`

### Step 6: Verify Everything Works

1. Open `http://localhost:5177`
2. Go to Dashboard
3. You should see all 500 users
4. Check browser console for success messages
5. Try clicking on a user to see details

---

## API Endpoints Available

Once JSON Server is running, you have:

### Get All Users
```bash
curl http://localhost:3001/users
```
Returns all 500 users

### Get Single User
```bash
curl http://localhost:3001/users/1
```
Returns user with ID 1

### Get Paginated Users
```bash
curl http://localhost:3001/users?_start=0&_end=50
```
Returns users 0-50

### Get Users with Filter
```bash
curl http://localhost:3001/users?status=active
```
Returns only active users

### Create User
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "organization": "New Org",
    "username": "newuser",
    "email": "new@email.com",
    "phoneNumber": "09012345678",
    "dateJoined": "Nov 13, 2025",
    "status": "active"
  }'
```

### Update User
```bash
curl -X PUT http://localhost:3001/users/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3001/users/1
```

---

## Two Terminals Setup

You need to run TWO things simultaneously:

**Terminal 1: JSON Server (API)**
```bash
json-server --watch db.json --port 3001
```

**Terminal 2: Your React App**
```bash
npm run dev
```

Both should be running at the same time!

---

## Data Structure

Each user has this structure:

```json
{
  "id": "1",
  "organization": "Lendsqr",
  "username": "user_grace_1",
  "email": "grace.effiom1@email.com",
  "phoneNumber": "09123456789",
  "dateJoined": "Aug 15, 2023",
  "status": "active",
  "firstName": "Grace",
  "lastName": "Effiom",
  "tier": 2,
  "userTierId": "LSQF000001",
  "accountNumber": "1234567890/Providus Bank",
  "accountBalance": "₦2,500,000.00",
  "bvn": "12345678901",
  "gender": "Female",
  "maritalStatus": "Single",
  "children": "0",
  "typeOfResidence": "Own House",
  "levelOfEducation": "B.Sc",
  "employmentStatus": "Employed",
  "sectorOfEmployment": "Technology",
  "durationOfEmployment": "3 years",
  "officeEmail": "grace.effiom@lendsqr.com",
  "monthlyIncome": "₦750,000",
  "loanRepayment": "₦50,000",
  "twitter": "@grace_effiom",
  "facebook": "grace.effiom",
  "instagram": "@grace_effiom",
  "guarantors": [
    {
      "fullName": "John Smith",
      "phoneNumber": "08123456789",
      "emailAddress": "john@gmail.com",
      "relationship": "Brother"
    }
  ]
}
```

---

## Troubleshooting

### JSON Server won't start
```bash
# Check if port 3001 is available:
netstat -an | find ":3001"

# If in use, try different port:
json-server --watch db.json --port 3002
```

### API not responding
1. Make sure JSON Server is running (Terminal 1)
2. Check URL: http://localhost:3001/users
3. Try in browser directly to test

### Users not showing in app
1. Check console for errors (F12)
2. Verify API URL in userApi.ts
3. Make sure db.json was generated
4. Restart both servers

### db.json not created
```bash
# Make sure you ran:
node generate-users.js

# You should see a db.json file in your project root
```

---

## File Structure After Setup

```
your-project/
├── src/
│   ├── services/
│   │   └── userApi.ts          (update this with new API URL)
│   └── ...
├── db.json                      (created by generate-users.js)
├── generate-users.js            (use this to create db.json)
└── ...
```

---

## Summary

```bash
# 1. Install JSON Server
npm install -g json-server

# 2. Generate 500 users
node generate-users.js

# 3. Start API (Terminal 1)
json-server --watch db.json --port 3001

# 4. Start App (Terminal 2)
npm run dev

# 5. Open browser
http://localhost:5177

# 6. See 500 users in Dashboard!
```

Done! 🎉

---

## Next Steps

1. Follow steps 1-6 above
2. Test that everything works
3. Commit files to git
4. When ready for production, migrate to cloud database

---

**Questions?** Check these files:
- `API_SETUP_GUIDE.md` - Full detailed guide
- `QUICK_START_API.md` - Quick reference
- `generate-users.js` - User generation script
