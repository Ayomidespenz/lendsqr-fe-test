# 🚀 API Generation Guide for Lendsqr Project

## Overview
Your Lendsqr project needs an API with **500 users** and detailed user information. Here are the BEST working options:

---

## Option 1: JSON Server (RECOMMENDED - Easiest & Best for Development)

### Why Use It?
✅ Free & Local  
✅ No external service needed  
✅ Full CRUD operations  
✅ Works offline  
✅ Perfect for development  

### Setup Steps

#### Step 1: Install JSON Server
```bash
npm install -g json-server
```

#### Step 2: Create `db.json` in Your Project Root
```bash
# Create the file
touch db.json
# Or on Windows:
# Copy nul > db.json
```

#### Step 3: Add This Content to `db.json`
Create the file `db.json` in `C:\Users\THIS PC\lendsqr-frontend\`:

```json
{
  "users": [
    {
      "id": "1",
      "organization": "Lendsqr",
      "username": "adekunleadebisi",
      "email": "adekunleadebisi@gmail.com",
      "phoneNumber": "09031940409",
      "dateJoined": "May 15, 2020 10:30 PM",
      "status": "active",
      "firstName": "Adekunle",
      "lastName": "Adebisi",
      "tier": 1,
      "userTierId": "LSQF000001",
      "accountNumber": "0123456789/Providus Bank",
      "accountBalance": "₦250,000.00",
      "bvn": "12345678901",
      "gender": "Male",
      "maritalStatus": "Single",
      "children": "0",
      "typeOfResidence": "Own House",
      "levelOfEducation": "B.Sc",
      "employmentStatus": "Employed",
      "sectorOfEmployment": "Technology",
      "durationOfEmployment": "3 years",
      "officeEmail": "adekunleadebisi@lendsqr.com",
      "monthlyIncome": "₦500,000 - ₦1,000,000",
      "loanRepayment": "₦50,000",
      "twitter": "@adekunleadebisi",
      "facebook": "adekunleadebisi",
      "instagram": "@adekunleadebisi",
      "guarantors": [
        {
          "fullName": "Olakunle Adebisi",
          "phoneNumber": "08123456789",
          "emailAddress": "olakunle@gmail.com",
          "relationship": "Brother"
        },
        {
          "fullName": "Grace Adebisi",
          "phoneNumber": "07123456789",
          "emailAddress": "grace@gmail.com",
          "relationship": "Sister"
        }
      ]
    },
    {
      "id": "2",
      "organization": "LendStart",
      "username": "olatunji_femi",
      "email": "femi.olatunji@email.com",
      "phoneNumber": "08012345678",
      "dateJoined": "Jun 12, 2020 2:15 PM",
      "status": "inactive",
      "firstName": "Olatunji",
      "lastName": "Femi",
      "tier": 2,
      "userTierId": "LSQF000002",
      "accountNumber": "0123456790/GTBank",
      "accountBalance": "₦150,000.00",
      "bvn": "12345678902",
      "gender": "Male",
      "maritalStatus": "Married",
      "children": "2",
      "typeOfResidence": "Rented Apartment",
      "levelOfEducation": "M.Sc",
      "employmentStatus": "Self-employed",
      "sectorOfEmployment": "Finance",
      "durationOfEmployment": "5 years",
      "officeEmail": "olatunji@lendsqr.com",
      "monthlyIncome": "₦750,000 - ₦1,200,000",
      "loanRepayment": "₦75,000",
      "twitter": "@olatunji_femi",
      "facebook": "olatunji_femi",
      "instagram": "@olatunji_femi",
      "guarantors": [
        {
          "fullName": "Femi Olatunji Sr",
          "phoneNumber": "09087654321",
          "emailAddress": "femi.sr@gmail.com",
          "relationship": "Father"
        }
      ]
    }
  ]
}
```

#### Step 4: Start JSON Server
```bash
json-server --watch db.json --port 3001
```

You'll see:
```
  ⚡ Server is running at http://localhost:3001
```

#### Step 5: Update `userApi.ts`
```typescript
const API_BASE_URL = 'http://localhost:3001';

// Change this line:
// const MOCK_API_URL = 'https://api.mockapi.io/api/lendsqr/users';
// To this:
const API_ENDPOINT = 'http://localhost:3001/users';
```

#### Step 6: Test the API
```
GET http://localhost:3001/users → Get all users
GET http://localhost:3001/users/1 → Get user by ID
POST http://localhost:3001/users → Create user
PUT http://localhost:3001/users/1 → Update user
DELETE http://localhost:3001/users/1 → Delete user
```

---

## Option 2: Postman Mock Server (Cloud-Based & Easy)

### Setup Steps

#### 1. Go to Postman
- Open https://www.postman.com
- Sign up (free)

#### 2. Create Collection
- Create new collection: "Lendsqr API"

#### 3. Add Endpoints
Add these requests:
- `GET /users` 
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`

#### 4. Create Mock Server
- Right-click collection
- Select "Mock Collection"
- Get your mock URL

#### 5. Use in Your App
```typescript
const API_BASE_URL = 'YOUR_POSTMAN_MOCK_URL';
```

---

## Option 3: Vercel + JSON File (Recommended for Production)

### Setup Steps

#### 1. Create GitHub Repo
```bash
git init
git add .
git commit -m "initial"
```

#### 2. Create `api/users.js`
```javascript
export default function handler(req, res) {
  const users = [
    // ... 500 users here
  ];
  
  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      return res.json(users.find(u => u.id === id));
    }
    return res.json(users);
  }
  
  res.status(405).end();
}
```

#### 3. Deploy to Vercel
- Go to https://vercel.com
- Connect GitHub repo
- Deploy automatically
- Get your API URL

---

## Option 4: Firebase Realtime Database (Cloud & Scalable)

### Setup Steps

#### 1. Create Firebase Project
- Go to https://firebase.google.com
- Create new project
- Enable Realtime Database

#### 2. Add Data
Upload your users JSON

#### 3. Get Firebase URL
```
https://your-project.firebaseio.com/users.json
```

#### 4. Use in App
```typescript
const API_BASE_URL = 'https://your-project.firebaseio.com';
```

---

## Option 5: Node.js + Express (Full Backend)

### Setup Steps

#### 1. Create Backend Project
```bash
mkdir lendsqr-backend
cd lendsqr-backend
npm init -y
npm install express cors
```

#### 2. Create `server.js`
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const users = [/* 500 users */];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  res.json(user);
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

#### 3. Start Server
```bash
node server.js
```

#### 4. Use in Frontend
```typescript
const API_BASE_URL = 'http://localhost:3001';
```

---

## Generate 500 Users Script

Here's a script to generate 500 sample users:

```javascript
// Run this in browser console to generate users
const generateUsers = () => {
  const organizations = ['Lendsqr', 'LendStart', 'Fintech Pro', 'Credit Hub', 'MoneyFlow', 'FastCredit', 'Trust Finance', 'Capital Rise'];
  const statuses = ['active', 'inactive', 'pending', 'blacklisted'];
  const firstNames = ['Grace', 'John', 'Mary', 'David', 'Sarah', 'Michael', 'Emma', 'James', 'Adekunle', 'Olatunji'];
  const lastNames = ['Effiom', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Adebisi', 'Femi'];

  const users = [];
  for (let i = 1; i <= 500; i++) {
    users.push({
      id: String(i),
      organization: organizations[Math.floor(Math.random() * organizations.length)],
      username: `user_${i}`,
      email: `user${i}@email.com`,
      phoneNumber: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
      dateJoined: new Date(2020, Math.floor(Math.random() * 4), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      tier: Math.floor(Math.random() * 3) + 1,
      userTierId: `LSQF${String(i).padStart(6, '0')}`,
      accountNumber: `${Math.floor(Math.random() * 9000000000) + 1000000000}/Bank`,
      accountBalance: `₦${(Math.random() * 1000000).toLocaleString()}`,
      bvn: String(Math.floor(Math.random() * 9000000000) + 1000000000),
      gender: Math.random() > 0.5 ? 'Male' : 'Female',
      maritalStatus: ['Single', 'Married', 'Divorced'][Math.floor(Math.random() * 3)],
      children: Math.random() > 0.5 ? 'None' : String(Math.floor(Math.random() * 5) + 1),
      typeOfResidence: ["Parent's Apartment", 'Own House', 'Rented Apartment'][Math.floor(Math.random() * 3)],
      levelOfEducation: ['B.Sc', 'M.Sc', 'HND', 'ND'][Math.floor(Math.random() * 4)],
      employmentStatus: ['Employed', 'Self-employed', 'Unemployed'][Math.floor(Math.random() * 3)],
      sectorOfEmployment: ['FinTech', 'Banking', 'Technology', 'Retail'][Math.floor(Math.random() * 4)],
      durationOfEmployment: `${Math.floor(Math.random() * 20) + 1} years`,
      officeEmail: `user${i}@lendsqr.com`,
      monthlyIncome: `₦${(Math.random() * 1000000).toLocaleString()}`,
      loanRepayment: String(Math.floor(Math.random() * 500000)),
      twitter: `@user_${i}`,
      facebook: `user_${i}`,
      instagram: `@user_${i}`,
      guarantors: [
        {
          fullName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
          phoneNumber: `0${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`,
          emailAddress: `guarantor${i}@gmail.com`,
          relationship: ['Brother', 'Sister', 'Parent', 'Friend'][Math.floor(Math.random() * 4)]
        }
      ]
    });
  }
  
  console.log(JSON.stringify({ users }, null, 2));
};

generateUsers();
```

---

## MY RECOMMENDATION: Use JSON Server

**Why?**
✅ **Easiest to setup** - 3 commands  
✅ **Local development** - No internet needed  
✅ **Full CRUD** - Create, Read, Update, Delete  
✅ **Fast response** - Instant API  
✅ **No costs** - Completely free  
✅ **Can export to cloud later** - Easy migration  

### Quick Setup (3 Steps)

**Step 1:** Install
```bash
npm install -g json-server
```

**Step 2:** Create `db.json` in project root with 500 users

**Step 3:** Start
```bash
json-server --watch db.json --port 3001
```

**That's it!** Your API is running at `http://localhost:3001/users`

---

## Next Steps

1. Choose one of the options above
2. Set up the API endpoint
3. Update `userApi.ts` with your API URL
4. Test with your frontend

Which option would you like to use? I can help you set it up!

---

**Recommendation:** JSON Server (local development) + Later migrate to Vercel (production)
