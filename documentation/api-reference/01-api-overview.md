# API Reference Overview

Complete reference for all API endpoints and how to use them.

## Base Information

### API URL

```
Local Development: http://localhost:3001
```

### Authentication

All API requests (except login) require a Bearer token:

```
Authorization: Bearer <token>
```

The token is automatically added by the axios interceptor in `userApi.ts`.

---

## API Endpoints

### 1. Authentication

#### Login User

```
POST /auth/login
```

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-1",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Code Example:**
```typescript
import { userApi } from '@/services/userApi';

try {
  const user = await userApi.loginUser('user@example.com', 'password123');
  console.log('Logged in:', user);
} catch (error) {
  console.error('Login failed:', error);
}
```

---

### 2. Get All Users

#### List Users with Pagination

```
GET /users?page=1&limit=10
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "dateJoined": "2024-01-15",
        "status": "active",
        "organization": "Lendsqr",
        "loanAmount": 500000,
        "loanRepayment": 450000,
        "bvn": "12345678901"
      },
      ...
    ],
    "total": 500,
    "page": 1,
    "pages": 50
  }
}
```

**Code Example:**
```typescript
// Get first page
const users = await userApi.getUsers(1, 10);

// Get second page
const moreUsers = await userApi.getUsers(2, 10);
```

---

### 3. Get Single User

#### Get User Details

```
GET /users/:userId
```

**Parameters:**
- `userId` (string): User ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "dateJoined": "2024-01-15",
    "status": "active",
    "organization": "Lendsqr",
    "loanAmount": 500000,
    "loanRepayment": 450000,
    "bvn": "12345678901",
    "accountNumber": "1234567890",
    "accountBank": "GTBank",
    "accountType": "Savings",
    "accountBalance": 1250000,
    "riskLevel": "low",
    "totalLoans": 5,
    "totalSavings": 3500000,
    "personalGuarantees": 2,
    "educationLevel": "B.Sc",
    "employmentStatus": "Employed",
    "employerName": "Tech Corp",
    "sector": "Technology",
    "duration": 5,
    "officeEmail": "john.work@techcorp.com",
    "salary": 2500000,
    "salary_review": "positive"
  }
}
```

**Code Example:**
```typescript
const user = await userApi.getUserById('user-1');
console.log(user.email);
```

---

### 4. Search Users

#### Search by Name or Email

```
GET /users/search?query=john
```

**Query Parameters:**
- `query` (string): Search term (searches name and email)

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user-1",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        ...
      }
    ]
  }
}
```

**Code Example:**
```typescript
const results = await userApi.searchUsers('john');
console.log(results);  // Array of matching users
```

---

### 5. Filter Users

#### Filter by Status, Organization, etc.

```
GET /users/filter?status=active&organization=Lendsqr
```

**Query Parameters:**
- `status` (string): User status (active, suspended, blacklisted)
- `organization` (string): Organization name
- `loanAmount` (number): Minimum loan amount

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      { ... },
      { ... }
    ]
  }
}
```

**Code Example:**
```typescript
const activeUsers = await userApi.filterUsers({
  status: 'active',
  organization: 'Lendsqr'
});
```

---

### 6. Update User Status

#### Change User Status

```
PUT /users/:userId/status
```

**Body:**
```json
{
  "status": "suspended"
}
```

**Status Values:**
- `active` - User is active
- `suspended` - User account suspended
- `blacklisted` - User is blacklisted

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-1",
    "status": "suspended"
  }
}
```

**Code Example:**
```typescript
const updated = await userApi.updateUserStatus('user-1', 'suspended');
console.log(updated.status);  // "suspended"
```

---

## Response Codes

### Success Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK - Request successful | GET, PUT, DELETE |
| 201 | Created - Resource created | POST |

### Error Codes

| Code | Meaning | Fix |
|------|---------|-----|
| 400 | Bad Request | Check parameters |
| 401 | Unauthorized | Check token |
| 403 | Forbidden | Check permissions |
| 404 | Not Found | Check URL/ID |
| 500 | Server Error | Try again later |

---

## Error Handling

### Handling API Errors

```typescript
try {
  const users = await userApi.getUsers();
} catch (error: any) {
  // Error from axios
  if (error.response) {
    // Server returned error code
    console.error('Status:', error.response.status);
    console.error('Message:', error.response.data.message);
  } else if (error.request) {
    // Request made but no response
    console.error('No response from server');
  } else {
    // Error setting up request
    console.error('Error:', error.message);
  }
}
```

---

## Token Management

### How Token Works

1. **Login** - Get token from API
   ```typescript
   const { token } = await userApi.loginUser(email, password);
   ```

2. **Save** - Token auto-saved to localStorage
   ```typescript
   localStorage.getItem('auth_token');
   ```

3. **Use** - Automatically added to requests
   ```typescript
   // In axios interceptor
   headers.Authorization = `Bearer ${token}`;
   ```

4. **Logout** - Remove token
   ```typescript
   localStorage.removeItem('auth_token');
   ```

---

## Rate Limiting

**Limit:** 100 requests per minute

**Headers Returned:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Pagination

### How Pagination Works

```
GET /users?page=1&limit=10
```

**Example Response:**
```json
{
  "data": {
    "users": [...],
    "total": 500,      // Total users
    "page": 1,         // Current page
    "pages": 50        // Total pages
  }
}
```

**Calculate Pagination:**
- Total pages = Math.ceil(total / limit)
- Skip = (page - 1) * limit
- Next page = page + 1

---

## Using API in Components

### Pattern 1: Fetch on Mount

```typescript
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  loadUsers();
}, []);

const loadUsers = async () => {
  setLoading(true);
  try {
    const data = await userApi.getUsers();
    setUsers(data);
    setError(null);
  } catch (err) {
    setError('Failed to load users');
  } finally {
    setLoading(false);
  }
};
```

### Pattern 2: Fetch on Action

```typescript
const handleViewUser = async (userId: string) => {
  try {
    const user = await userApi.getUserById(userId);
    setSelectedUser(user);
  } catch (error) {
    toast.error('Failed to load user');
  }
};
```

### Pattern 3: Search/Filter

```typescript
const handleSearch = async (query: string) => {
  if (!query.trim()) {
    setResults([]);
    return;
  }
  
  try {
    const results = await userApi.searchUsers(query);
    setResults(results);
  } catch (error) {
    toast.error('Search failed');
  }
};
```

---

## Testing API Endpoints

### Using curl (Terminal)

```bash
# Get all users
curl http://localhost:3001/users

# Get one user
curl http://localhost:3001/users/user-1

# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Using Postman

1. Create new request
2. Set method: GET
3. Enter URL: `http://localhost:3001/users`
4. Add header: `Authorization: Bearer <token>`
5. Send

---

## Next Steps

- Read: **[Authentication](02-authentication.md)** for login details
- Read: **[User Endpoints](03-user-endpoints.md)** for user operations
- Read: **[Filtering & Search](04-filtering-search.md)** for filtering

---

**API Reference Complete!** ✅
