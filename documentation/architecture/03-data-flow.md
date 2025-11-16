# Data Flow

How data moves through the application.

## Simple Data Flow

### Example: Loading Users

```
1. User Visits Dashboard
        ↓
2. DashboardPage.tsx Mounts
        ↓
3. useEffect Runs
        ↓
4. Calls: userApi.getUsers()
        ↓
5. Axios Makes HTTP Request to API
        ↓
6. API Returns JSON Array of Users
        ↓
7. setUsers(data) Updates State
        ↓
8. Component Re-renders
        ↓
9. <Table users={users} /> Shows Data
```

---

## Code Example

### Component Fetching Data

```typescript
// src/pages/DashboardPage.tsx

import { useState, useEffect } from 'react';
import { userApi } from '../services/userApi';

export const DashboardPage: React.FC = () => {
  // 1. State to hold users
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. Effect runs on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // 3. Function to load users
  const loadUsers = async () => {
    setLoading(true);
    try {
      // 4. Call API service
      const data = await userApi.getUsers();
      
      // 5. Update state with data
      setUsers(data);
    } catch (error) {
      // 6. Handle errors
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  // 7. Render with data
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table users={users} />
      )}
    </div>
  );
};
```

---

## API Service

### Making API Calls

```typescript
// src/services/userApi.ts

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// 1. Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// 2. Add token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Define API functions
export const userApi = {
  // Get all users
  async getUsers(page = 1, limit = 10) {
    const response = await api.get('/users', {
      params: { page, limit }
    });
    return response.data.data.users;
  },

  // Get one user
  async getUserById(userId: string) {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
  },

  // Login
  async loginUser(email: string, password: string) {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    const { token } = response.data.data;
    // Save token for future requests
    localStorage.setItem('auth_token', token);
    return response.data.data;
  }
};
```

---

## React Component Hierarchy

### Data Flows Down (Props)

```
App.tsx (Main)
  ↓
DashboardPage.tsx
  ├── users (state)
  ├── loading (state)
  ├── onViewDetails (function)
  ↓
DashboardLayout.tsx
  ├── children (content)
  ↓
Navbar.tsx (receives props)
  ├── onSearch (callback)
  ↓
Table.tsx (receives props)
  ├── users (props)
  ├── onViewDetails (callback)
  ↓
TableRow.tsx (for each user)
  ├── user (props)
  ├── onAction (callback)
```

### Events Flow Up (Callbacks)

```
TableRow.tsx
  (User clicks button)
  ↓
Calls onAction(userId)
  ↓
DashboardPage.tsx
  (Handle action)
  ↓
Update state
  ↓
Re-render Table with new data
```

---

## State vs Props vs API

### Different Ways to Store Data

| Type | Location | Updates |
|------|----------|---------|
| **State** | Component memory | Manually with setState |
| **Props** | Component input | Parent changes |
| **API** | Server | Fetch when needed |
| **localStorage** | Browser storage | When user logs in |

### Example Using All Three

```typescript
const DashboardPage = () => {
  // State - component memory
  const [users, setUsers] = useState([]);
  
  // Props - from parent (usually in routes)
  const { pageSize } = props;
  
  // API - fetch from server
  useEffect(() => {
    const data = await userApi.getUsers();
    setUsers(data);
  }, []);
  
  // localStorage - persistent data
  const token = localStorage.getItem('auth_token');
  
  return <Table users={users} pageSize={pageSize} />;
};
```

---

## Login Data Flow

### Step by Step

```
1. User Enters Email/Password
   ↓
2. LoginPage Calls: userApi.loginUser(email, password)
   ↓
3. Axios POST to: /auth/login
   ↓
4. API Validates Credentials
   ↓
5. API Returns: { token: "abc123..." }
   ↓
6. Service Saves Token: localStorage.setItem('auth_token', token)
   ↓
7. Component Redirects: navigate('/dashboard')
   ↓
8. ProtectedRoute Checks: localStorage.getItem('auth_token')
   ↓
9. Token Exists → Show Dashboard ✅
```

---

## API Request/Response Flow

### Full HTTP Request

```typescript
// Component makes request
const data = await userApi.getUsers();

// This triggers:
// 1. Axios interceptor adds token
// 2. HTTP Request sent
GET http://localhost:3001/users
Headers: {
  'Authorization': 'Bearer token123'
  'Content-Type': 'application/json'
}

// 3. Server processes request
// 4. Server returns response
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-1",
        "name": "John",
        "email": "john@example.com",
        ...
      },
      ...
    ]
  }
}

// 5. Response handler processes data
// 6. Component state updated
// 7. Component re-renders with new data
```

---

## Filtering Data Flow

```
User Clicks "Filter" Button
  ↓
FilterModal Opens
  ↓
User Selects Filters:
  - Status: "active"
  - Organization: "Lendsqr"
  ↓
User Clicks "Apply"
  ↓
Calls: userApi.getUsers({ 
  status: 'active', 
  organization: 'Lendsqr' 
})
  ↓
API Filters Data
  ↓
Returns Only Matching Users
  ↓
Component Updates Table
  ↓
User Sees Filtered Results
```

---

## Search Data Flow

```
User Types in Search Box
  ↓
onChange Event Triggered
  ↓
Calls: userApi.searchUsers(query)
  ↓
API Searches by Name/Email
  ↓
Returns Matching Users
  ↓
Table Updates with Results
```

---

## Error Handling Flow

```
Component Makes API Call
  ↓
API Request Fails (500 Error)
  ↓
try/catch Catches Error
  ↓
console.error() Logs Error
  ↓
toast.error() Shows Message
  ↓
User Sees: "Something went wrong"
  ↓
User Can Try Again
```

---

## Re-render Flow

### What Causes Component to Re-render?

1. **State Changed**
```typescript
setUsers(newUsers);  // Component re-renders
```

2. **Props Changed**
```typescript
// Parent changed props
// Child component re-renders
```

3. **Parent Re-rendered**
```typescript
// Any parent component re-renders
// All children also re-render
```

---

## Performance Optimization

### Avoid Unnecessary Re-renders

```typescript
// ❌ Bad - Re-fetches on every render
export const MyComponent = () => {
  useEffect(() => {
    loadUsers();  // Runs every render
  });  // No dependency array!
  
  return <div>...</div>;
};

// ✅ Good - Fetches once on mount
export const MyComponent = () => {
  useEffect(() => {
    loadUsers();  // Runs only once
  }, []);  // Empty dependency array
  
  return <div>...</div>;
};
```

---

## Data Persistence

### Where Data Stays

**Temporary (Lost on Refresh)**
- State variables
- Props
- Component variables

**Persistent (Stays on Refresh)**
- localStorage
- Cookies
- Database (via API)

```typescript
// Temporary
const [currentPage, setCurrentPage] = useState(1);

// Persistent
localStorage.setItem('userPreferences', JSON.stringify(prefs));
const prefs = localStorage.getItem('userPreferences');
```

---

## Summary Diagram

```
        ┌─────────────────┐
        │   User Action   │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │   Component     │
        │   (setState)    │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  Calls API via  │
        │  userApi.ts     │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  Axios Request  │
        │  (HTTP GET/POST)│
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  Server/API     │
        │  Processes      │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  Response JSON  │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  Component      │
        │  Updates State  │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  Component      │
        │  Re-renders     │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │  User Sees      │
        │  New Data ✅    │
        └─────────────────┘
```

---

## Next Steps

- Read: **[Using Components](../components/02-using-components.md)** to use components
- Read: **[API Overview](../api-reference/01-api-overview.md)** for API details

---

**You now understand data flow!** 🚀
