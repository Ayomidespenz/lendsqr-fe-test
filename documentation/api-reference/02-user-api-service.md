# API Reference - User Service File

Complete reference for `src/services/userApi.ts` - the single file handling all API calls.

## File Location

```
src/services/userApi.ts
```

## What It Does

This file:
- Handles all communication with the backend API
- Manages authentication tokens
- Provides reusable functions for API calls
- Handles errors consistently

## Setup

### Import in Components

```typescript
import { userApi } from '@/services/userApi';
```

### Use Any Function

```typescript
const users = await userApi.getUsers();
const user = await userApi.getUserById('user-1');
const result = await userApi.loginUser(email, password);
```

---

## Available Functions

### 1. Login User

**Function:**
```typescript
userApi.loginUser(email: string, password: string)
```

**What it does:**
- Sends login request to API
- Receives auth token
- Saves token to localStorage
- Returns user data

**Parameters:**
| Name | Type | Required | Example |
|------|------|----------|---------|
| email | string | Yes | `"user@example.com"` |
| password | string | Yes | `"password123"` |

**Returns:**
```typescript
{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}
```

**Example:**
```typescript
try {
  const user = await userApi.loginUser(
    'john@example.com',
    'password123'
  );
  console.log('Welcome:', user.firstName);
  // Token automatically saved - you don't need to do it!
} catch (error) {
  console.error('Login failed:', error.message);
}
```

---

### 2. Get All Users

**Function:**
```typescript
userApi.getUsers(page?: number, limit?: number)
```

**What it does:**
- Fetches paginated list of users
- Default: page 1, 10 users per page
- Returns array of users

**Parameters:**
| Name | Type | Required | Default | Example |
|------|------|----------|---------|---------|
| page | number | No | 1 | `2` |
| limit | number | No | 10 | `20` |

**Returns:**
```typescript
Array<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'active' | 'suspended' | 'blacklisted';
  organization: string;
  loanAmount: number;
  loanRepayment: number;
  bvn: string;
}>
```

**Examples:**
```typescript
// Get first page (default)
const users = await userApi.getUsers();

// Get specific page
const page2 = await userApi.getUsers(2);

// Get with different page size
const bigPage = await userApi.getUsers(1, 20);

// Get 5th page with 20 items each
const page5 = await userApi.getUsers(5, 20);
```

---

### 3. Get Single User

**Function:**
```typescript
userApi.getUserById(userId: string)
```

**What it does:**
- Fetches detailed info for one user
- Returns all user details
- Use for user profile page

**Parameters:**
| Name | Type | Required | Example |
|------|------|----------|---------|
| userId | string | Yes | `"user-1"` |

**Returns:**
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'suspended' | 'blacklisted';
  dateJoined: string;
  organization: string;
  loanAmount: number;
  loanRepayment: number;
  accountNumber: string;
  accountBank: string;
  // ... more fields
}
```

**Example:**
```typescript
const user = await userApi.getUserById('user-1');
console.log(user.firstName);  // "John"
console.log(user.status);      // "active"
```

---

### 4. Search Users

**Function:**
```typescript
userApi.searchUsers(query: string)
```

**What it does:**
- Searches by name or email
- Returns matching users
- Use for search box feature

**Parameters:**
| Name | Type | Required | Example |
|------|------|----------|---------|
| query | string | Yes | `"john"` |

**Returns:**
```typescript
Array<User>  // Same as getUsers
```

**Example:**
```typescript
const results = await userApi.searchUsers('john');
console.log(results.length);  // How many matches
console.log(results[0].email); // First match email
```

---

### 5. Filter Users

**Function:**
```typescript
userApi.filterUsers(filters: {
  status?: string;
  organization?: string;
})
```

**What it does:**
- Filters users by criteria
- Returns matching users
- Use for filter modal

**Parameters:**
| Name | Type | Required | Options |
|------|------|----------|---------|
| status | string | No | `"active"`, `"suspended"`, `"blacklisted"` |
| organization | string | No | Organization name |

**Example:**
```typescript
// Filter by status
const active = await userApi.filterUsers({ 
  status: 'active' 
});

// Filter by organization
const lendsqr = await userApi.filterUsers({ 
  organization: 'Lendsqr' 
});

// Filter by both
const result = await userApi.filterUsers({
  status: 'active',
  organization: 'Lendsqr'
});
console.log(result.length);  // Number of matches
```

---

### 6. Update User Status

**Function:**
```typescript
userApi.updateUserStatus(userId: string, status: string)
```

**What it does:**
- Changes user status
- Can activate, suspend, or blacklist
- Returns updated user

**Parameters:**
| Name | Type | Required | Options |
|------|------|----------|---------|
| userId | string | Yes | `"user-1"` |
| status | string | Yes | `"active"`, `"suspended"`, `"blacklisted"` |

**Returns:**
```typescript
{
  id: string;
  status: 'active' | 'suspended' | 'blacklisted';
  // other user fields
}
```

**Example:**
```typescript
// Activate a user
const updated = await userApi.updateUserStatus('user-1', 'active');
console.log(updated.status);  // "active"

// Suspend a user
await userApi.updateUserStatus('user-1', 'suspended');

// Blacklist a user
await userApi.updateUserStatus('user-1', 'blacklisted');
```

---

## How to Use - Step by Step

### Step 1: Import

```typescript
import { userApi } from '@/services/userApi';
```

### Step 2: Create State

```typescript
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Step 3: Create Function

```typescript
const loadUsers = async () => {
  setLoading(true);
  try {
    const data = await userApi.getUsers(1, 10);
    setUsers(data);
    setError(null);
  } catch (err: any) {
    setError(err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};
```

### Step 4: Call Function

```typescript
useEffect(() => {
  loadUsers();
}, []);
```

### Step 5: Use Data

```typescript
return (
  <div>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    {users.map(user => (
      <div key={user.id}>{user.firstName}</div>
    ))}
  </div>
);
```

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | No token or invalid token | Login again |
| 400 Bad Request | Wrong parameters | Check parameter values |
| 404 Not Found | User doesn't exist | Check user ID |
| 500 Server Error | Server problem | Try again later |

### Handling Errors

```typescript
try {
  const user = await userApi.getUserById('user-1');
} catch (error: any) {
  // Get error message
  const message = error.response?.data?.message || error.message;
  
  // Show to user
  toast.error(message);
  
  // Log for debugging
  console.error('Error:', error);
}
```

---

## Real Code Examples

### Example 1: Dashboard Page

```typescript
import { useEffect, useState } from 'react';
import { userApi } from '@/services/userApi';

export const DashboardPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await userApi.getUsers(1, 10);
        setUsers(data);
      } catch (error) {
        console.error('Failed to load:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

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

### Example 2: Search Feature

```typescript
const handleSearch = async (query: string) => {
  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  try {
    const results = await userApi.searchUsers(query);
    setSearchResults(results);
  } catch (error) {
    console.error('Search failed:', error);
  }
};
```

### Example 3: Filter Modal

```typescript
const handleApplyFilter = async (filters: any) => {
  try {
    const filtered = await userApi.filterUsers(filters);
    setFilteredUsers(filtered);
    setShowFilterModal(false);
  } catch (error) {
    toast.error('Filter failed');
  }
};
```

### Example 4: Change User Status

```typescript
const handleChangeStatus = async (userId: string, newStatus: string) => {
  try {
    const updated = await userApi.updateUserStatus(userId, newStatus);
    
    // Update local state
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: updated.status } : u
    ));
    
    toast.success(`User ${newStatus}!`);
  } catch (error) {
    toast.error('Failed to update user');
  }
};
```

---

## Best Practices

### ✅ Do This

```typescript
// 1. Always use try/catch
try {
  const users = await userApi.getUsers();
} catch (error) {
  // Handle error
}

// 2. Show loading state
const [loading, setLoading] = useState(false);
setLoading(true);
await userApi.getUsers();
setLoading(false);

// 3. Show error to user
catch (error) {
  toast.error('Failed to load users');
}

// 4. Use useEffect for auto-load
useEffect(() => {
  loadUsers();
}, []);
```

### ❌ Don't Do This

```typescript
// 1. Don't forget error handling
const users = await userApi.getUsers();  // What if it fails?

// 2. Don't call API in render
const MyComponent = () => {
  userApi.getUsers();  // Infinite loop!
  return <div>...</div>;
};

// 3. Don't forget dependency array
useEffect(() => {
  loadUsers();
});  // Runs every render!
```

---

## Next Steps

- Read: **[Authentication](02-authentication.md)** for login flow
- Read: **[User Endpoints](03-user-endpoints.md)** for user operations

---

**API Service Reference Complete!** ✅
