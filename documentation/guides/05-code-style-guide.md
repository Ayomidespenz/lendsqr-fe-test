# Code Style Guide

Standards and best practices for writing code in Lendsqr Frontend.

## TypeScript Standards

### Always Add Types

**Component Props:**
```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// ❌ Bad - No types
export const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

**Function Return Types:**
```typescript
// ✅ Good
const getUsers = (page: number): Promise<User[]> => {
  return axios.get(`/users?page=${page}`);
};

// ❌ Bad - No return type
const getUsers = (page) => {
  return axios.get(`/users?page=${page}`);
};
```

**Data Models:**
```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

// ❌ Bad - Object without type
const user = {
  id: '1',
  name: 'John',
  // Could be anything
};
```

---

## React Standards

### Use Functional Components

```typescript
// ✅ Good - Functional component with hooks
const Dashboard: React.FC<DashboardProps> = ({ title }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userApi.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  return <div>{/* Component JSX */}</div>;
};

// ❌ Bad - Class component (old style)
class Dashboard extends React.Component {
  render() {
    return <div>Old style</div>;
  }
}
```

### Component File Structure

```typescript
// 1. Imports at top
import { useState, useEffect } from 'react';
import styles from './MyComponent.module.scss';
import { userApi } from '../../services/userApi';

// 2. Type definitions
interface MyComponentProps {
  id: string;
  onClose?: () => void;
}

interface ComponentState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// 3. Component definition
export const MyComponent: React.FC<MyComponentProps> = ({ id, onClose }) => {
  // 4. State
  const [state, setState] = useState<ComponentState>({
    users: [],
    loading: false,
    error: null,
  });

  // 5. Effects
  useEffect(() => {
    loadData();
  }, [id]);

  // 6. Event handlers
  const handleClick = () => {
    // Logic here
  };

  // 7. Async functions
  const loadData = async () => {
    // Logic here
  };

  // 8. JSX
  return (
    <div className={styles.container}>
      {/* Component JSX */}
    </div>
  );
};
```

---

## SCSS/CSS Standards

### Use CSS Modules

```scss
// ✅ Good - CSS Module (scoped)
// Button.module.scss
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: darken($color-primary, 10%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.primary {
  background-color: $color-primary;
  color: white;
}

.secondary {
  background-color: $color-secondary;
  color: white;
}
```

Use in component:
```typescript
import styles from './Button.module.scss';

<button className={`${styles.button} ${styles.primary}`}>
  Click
</button>
```

### Color Variables

Use variables from `src/styles/variables.scss`:

```scss
$color-primary: #39cdcc;       // Main blue/teal
$color-secondary: #fd8235;     // Orange
$color-text: #545f7d;          // Dark text
$color-bg: #f5f5f5;            // Light background
$color-danger: #e74c3c;        // Red alerts
$color-success: #27ae60;       // Green success
```

### Responsive Design

Mobile-first approach:

```scss
// ✅ Good - Mobile first
.container {
  width: 100%;        // Mobile default
  padding: 10px;
}

// Tablet (768px+)
@media (min-width: 768px) {
  .container {
    width: 90%;
    padding: 20px;
  }
}

// Desktop (1024px+)
@media (min-width: 1024px) {
  .container {
    width: 80%;
    padding: 30px;
  }
}

// ❌ Bad - Desktop first (old approach)
.container {
  width: 80%;
}

@media (max-width: 1024px) {
  .container {
    width: 90%;
  }
}
```

---

## Naming Conventions

### Components (PascalCase)
```typescript
✅ UserTable
✅ FilterModal
✅ DashboardLayout
✅ StatusBadge
```

### Functions & Variables (camelCase)
```typescript
✅ getUsers
✅ handleButtonClick
✅ isLoading
✅ userCount
✅ formatDate
```

### Constants (UPPER_SNAKE_CASE)
```typescript
✅ DEFAULT_PAGE_SIZE = 10
✅ API_TIMEOUT_MS = 5000
✅ MAX_RETRY_ATTEMPTS = 3
```

### CSS Classes (kebab-case in SCSS)
```scss
✅ .button
✅ .modal-header
✅ .user-list-item
```

---

## Comments & Documentation

### Function Comments

```typescript
/**
 * Fetch users from API
 * @param page - Page number (starts at 1)
 * @param limit - Items per page (default: 10)
 * @returns Promise with user array
 */
const getUsers = (page: number, limit: number = 10): Promise<User[]> => {
  return axios.get(`/users?page=${page}&limit=${limit}`);
};
```

### Complex Logic Comments

```typescript
// Only show users that are active and have verified email
const activeUsers = users.filter(
  (user) => user.status === 'active' && user.emailVerified
);
```

### Don't Over-Comment

```typescript
// ❌ Too obvious
let x = 5;  // Set x to 5

// ✅ Good - explains WHY not WHAT
const maxAttempts = 5;  // Prevent brute force attacks
```

---

## Error Handling

### Always Handle Errors

```typescript
// ✅ Good
const loadUsers = async () => {
  try {
    const data = await userApi.getUsers();
    setUsers(data);
  } catch (error) {
    console.error('Failed to load users:', error);
    showErrorToast('Unable to load users');
  }
};

// ❌ Bad - No error handling
const loadUsers = async () => {
  const data = await userApi.getUsers();
  setUsers(data);
};
```

### Meaningful Error Messages

```typescript
// ✅ Good
catch (error) {
  if (error.response?.status === 404) {
    toast.error('User not found');
  } else if (error.response?.status === 401) {
    toast.error('Please login again');
    redirectToLogin();
  } else {
    toast.error('Something went wrong. Please try again.');
  }
}

// ❌ Bad
catch (error) {
  console.log('Error');  // Not helpful
}
```

---

## Performance Tips

### Use useMemo for Expensive Operations

```typescript
// ✅ Good - Memoize expensive calculation
const sortedUsers = useMemo(
  () => users.sort((a, b) => a.name.localeCompare(b.name)),
  [users]
);

// ❌ Bad - Recalculates every render
const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
```

### Use useCallback for Event Handlers

```typescript
// ✅ Good - Stable reference
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

// ❌ Bad - New function every render
const handleClick = () => {
  console.log('Clicked');
};
```

---

## Import/Export Standards

### Use Named Exports

```typescript
// ✅ Good - Named export
export const UserTable: React.FC = () => {
  // Component
};

// Import it
import { UserTable } from './UserTable';

// ❌ Bad - Default export (less clear)
export default UserTable;
```

### Organize Imports

```typescript
// 1. React and third-party libraries
import { useState, useEffect } from 'react';
import axios from 'axios';

// 2. Styles
import styles from './Component.module.scss';

// 3. Local imports
import { userApi } from '../../services/userApi';
import { User } from '../../types/user';
```

---

## Linting

Run ESLint to check code:

```bash
# Check all files
npm run lint

# Fix automatically
npm run lint -- --fix

# Check specific file
npm run lint src/components/Button.tsx
```

---

## Summary Checklist

- ✅ Use TypeScript for all code
- ✅ Add types to functions and components
- ✅ Use functional components with hooks
- ✅ Use CSS Modules for styling
- ✅ Use semantic variable names
- ✅ Handle errors properly
- ✅ Add comments for complex logic
- ✅ Format imports properly
- ✅ Test before committing
- ✅ Run `npm run lint -- --fix` before git commit

---

**Code quality makes projects maintainable!** ✨
