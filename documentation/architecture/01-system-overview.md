# System Overview

Understand how the Lendsqr Frontend application works.

## What is This App?

Lendsqr Frontend is an **Admin Dashboard** for managing users in a financial application.

### Key Features

**Users Can:**
- ✅ Login with email/password
- ✅ View all users in a table
- ✅ Click users to see detailed profiles
- ✅ Filter users by status, organization, date, etc.
- ✅ Change user status (activate, deactivate, blacklist)
- ✅ Search for specific users

---

## How It Works

### Simple Flow

```
User Opens App
    ↓
Login Page Shows
    ↓
User Enters Email/Password
    ↓
App Sends to API
    ↓
API Returns Token
    ↓
Dashboard Shows
    ↓
App Fetches Users from API
    ↓
Users Shown in Table
    ↓
User Clicks a User
    ↓
App Fetches That User's Details
    ↓
Detailed Profile Shows
```

---

## Technology Stack

### Frontend (What You See)

| Technology | Version | What It Does |
|-----------|---------|-------------|
| **React** | 19.2.0 | Creates the UI components |
| **TypeScript** | 5.9.3 | Adds type safety to code |
| **Vite** | 7.2.2 | Bundles code for browser |
| **SCSS** | Latest | Styles components |
| **React Router** | 7.9.5 | Navigation between pages |
| **Axios** | 1.13.2 | Fetches data from API |

### Backend (Where Data Lives)

- **JSON Server** (for development): Fake API for testing
- **Real Backend API** (production): Your actual server

---

## File Organization

```
src/
├── pages/                  # Full pages (screens)
│   ├── LoginPage.tsx       # Login screen
│   ├── DashboardPage.tsx   # User list screen
│   └── UserDetailsPage.tsx # User profile screen
│
├── components/             # Reusable UI parts
│   ├── Navbar.tsx          # Top bar
│   ├── Sidebar.tsx         # Left menu
│   ├── Table.tsx           # User table
│   └── ... more components
│
├── services/               # API communication
│   └── userApi.ts          # User API calls
│
├── styles/                 # Shared styles
│   ├── global.scss         # Global styles
│   └── variables.scss      # Colors, sizes, etc
│
└── assets/                 # Images and icons
```

---

## Three Main Pages

### 1. Login Page

**What it does:**
- Shows email and password inputs
- Sends login request to API
- Stores token if successful

**File**: `src/pages/LoginPage.tsx`

### 2. Dashboard Page

**What it does:**
- Shows table of all users
- Allows filtering and searching
- Shows user statistics

**File**: `src/pages/DashboardPage.tsx`

### 3. User Details Page

**What it does:**
- Shows one user's complete information
- Personal info, address, employment, etc.
- Can change user status

**File**: `src/pages/UserDetailsPage.tsx`

---

## Data Flow

### How Data Moves

```
1. Component Needs Data
        ↓
2. Component Calls userApi.getUsers()
        ↓
3. Axios Makes HTTP Request
        ↓
4. API Server Responds
        ↓
5. Data Returned to Component
        ↓
6. Component Updates Display
        ↓
7. User Sees the Data
```

### Where Data Comes From

**API File**: `src/services/userApi.ts`

This file has all functions:
- `loginUser()` - Authenticate user
- `getUsers()` - Get user list
- `getUserById()` - Get one user
- `updateUserStatus()` - Change user status
- `searchUsers()` - Search users

---

## Component Communication

### How Components Talk

```
App.tsx (Main)
    ↓
Routes (Navigation)
    ├── LoginPage ← User logs in
    ├── DashboardPage ← Calls userApi.getUsers()
    └── UserDetailsPage ← Calls userApi.getUserById()
```

### Props Passing

Components pass data using `props`:

```typescript
// Parent component
<UserTable users={users} />

// Child component receives it
interface UserTableProps {
  users: User[];
}
```

---

## State Management

### Storing Data

React uses `useState` hook:

```typescript
const [users, setUsers] = useState([]);  // Initially empty
// When API returns data:
setUsers(data);  // Now contains user list
```

### Authentication Token

Token stored in browser's localStorage:

```typescript
// After login
localStorage.setItem('auth_token', token);

// On protected pages
const token = localStorage.getItem('auth_token');
```

---

## Styling

### How Styling Works

Uses **CSS Modules** - styles are scoped to components:

```typescript
// Button.module.scss
.button { color: blue; }

// Button.tsx
import styles from './Button.module.scss';
<button className={styles.button}>Click</button>

// Only this button gets blue color
// No conflicts with other .button classes
```

---

## API Communication

### Axios Setup

Axios is configured in `src/services/userApi.ts`:

```typescript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

// Add token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## Error Handling

### When Something Goes Wrong

```
API Request
    ↓
Success? ──→ Show data ✅
    ↓
   No
    ↓
Show Error Toast ✅
```

Example:
```typescript
try {
  const data = await userApi.getUsers();
  setUsers(data);
} catch (error) {
  // Show error message to user
  toast.error('Failed to load users');
}
```

---

## Security

### Protected Routes

Only logged-in users can access dashboard:

```typescript
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    return <Navigate to="/login" />;  // Redirect to login
  }
  
  return children;  // Show page
}
```

### API Authentication

Every API call includes token:

```
Headers: {
  Authorization: 'Bearer token123456'
}
```

---

## Performance

### Optimization Techniques

1. **Pagination** - Load 10 users at a time, not all 500
2. **Lazy Loading** - Load images only when visible
3. **Memoization** - Cache expensive calculations
4. **Code Splitting** - Split code into smaller chunks

---

## Next Steps

- Read: **[Project Structure](02-project-structure.md)** for detailed file organization
- Read: **[Data Flow](03-data-flow.md)** for how data moves
- Read: **[API Overview](../api-reference/01-api-overview.md)** for API details

---

**You now understand how the app works!** 🎉
