# Component List & Guide

Overview of all components and what they do.

## Components Overview

All reusable UI components are in `src/components/`.

| Component | Purpose | Used In |
|-----------|---------|---------|
| **Button** | Reusable button | All pages |
| **Input** | Reusable input field | Login, Filters |
| **Navbar** | Top navigation bar | All pages |
| **Sidebar** | Left sidebar menu | Dashboard |
| **Table** | User data table | Dashboard |
| **Pagination** | Page navigation | Dashboard |
| **StatusBadge** | Status display (active/suspended/blacklisted) | Table rows |
| **FilterModal** | Filter dialog | Dashboard |
| **ActionMenu** | Action dropdown menu | Table rows |
| **DashboardLayout** | Dashboard page layout | Dashboard |

---

## Component: Button

### What It Does
Reusable button component with multiple styles.

### File
```
src/components/Button/
├── Button.tsx
└── Button.module.scss
```

### Props

```typescript
interface ButtonProps {
  label: string;              // Button text
  onClick?: () => void;       // Click handler
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;         // Is disabled?
  loading?: boolean;          // Show loading?
  className?: string;         // Extra CSS
}
```

### Usage

```typescript
import { Button } from '@/components/Button/Button';

// Basic button
<Button label="Click Me" onClick={() => console.log('clicked')} />

// Primary (blue)
<Button label="Submit" variant="primary" />

// Secondary (gray)
<Button label="Cancel" variant="secondary" />

// Danger (red)
<Button label="Delete" variant="danger" />

// Disabled
<Button label="Disabled" disabled />

// Loading state
<Button label="Loading..." loading />
```

---

## Component: Input

### What It Does
Reusable text input field.

### File
```
src/components/Input/
├── Input.tsx
└── Input.module.scss
```

### Props

```typescript
interface InputProps {
  label?: string;             // Field label
  placeholder?: string;       // Placeholder text
  type?: 'text' | 'email' | 'password' | 'number';
  value: string;              // Current value
  onChange: (value: string) => void;  // Change handler
  error?: string;             // Error message
  disabled?: boolean;         // Is disabled?
  required?: boolean;         // Required field?
  icon?: React.ReactNode;     // Icon inside
}
```

### Usage

```typescript
import { Input } from '@/components/Input/Input';
import { useState } from 'react';

export const MyForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      {/* Basic input */}
      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={setEmail}
      />

      {/* Password input */}
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      {/* With error */}
      <Input
        label="Name"
        value={name}
        onChange={setName}
        error="Name is required"
      />

      {/* Required field */}
      <Input
        label="Phone"
        required
        value={phone}
        onChange={setPhone}
      />
    </>
  );
};
```

---

## Component: Navbar

### What It Does
Top navigation bar with branding and user menu.

### File
```
src/components/Navbar/
├── Navbar.tsx
└── Navbar.module.scss
```

### Props

```typescript
interface NavbarProps {
  onLogout?: () => void;      // Logout handler
  userName?: string;          // Current user name
}
```

### Usage

```typescript
import { Navbar } from '@/components/Navbar/Navbar';

<Navbar 
  userName="John Doe"
  onLogout={() => navigate('/login')}
/>
```

### Features
- Logo/branding
- Search box
- User profile dropdown
- Logout button
- Notification bell (if needed)

---

## Component: Sidebar

### What It Does
Left sidebar menu with navigation links.

### File
```
src/components/Sidebar/
├── Sidebar.tsx
└── Sidebar.module.scss
```

### Props

```typescript
interface SidebarProps {
  activeMenu?: string;        // Active menu item
  onMenuClick?: (menu: string) => void;
}
```

### Usage

```typescript
import { Sidebar } from '@/components/Sidebar/Sidebar';

<Sidebar 
  activeMenu="dashboard"
  onMenuClick={(menu) => console.log(menu)}
/>
```

### Menu Items
- Dashboard
- Users
- Reports
- Settings
- etc.

---

## Component: Table

### What It Does
Data table for displaying users list.

### File
```
src/components/Table/
├── Table.tsx
└── Table.module.scss
```

### Props

```typescript
interface TableProps {
  users: User[];              // Data to display
  onViewDetails?: (id: string) => void;  // Click handler
  onAction?: (id: string, action: string) => void;
  loading?: boolean;          // Is loading?
  onSort?: (field: string) => void;  // Sort handler
}
```

### Usage

```typescript
import { Table } from '@/components/Table/Table';

const [users, setUsers] = useState<User[]>([]);

<Table
  users={users}
  onViewDetails={(id) => navigate(`/users/${id}`)}
  onAction={(id, action) => handleAction(id, action)}
/>
```

### Features
- Column headers
- Sortable columns
- Action menu per row
- Status badges
- Checkbox selection (optional)

---

## Component: Pagination

### What It Does
Page navigation controls.

### File
```
src/components/Pagination/
├── Pagination.tsx
└── Pagination.module.scss
```

### Props

```typescript
interface PaginationProps {
  currentPage: number;        // Current page
  totalPages: number;         // Total pages
  onPageChange: (page: number) => void;  // Page change handler
  onLimitChange?: (limit: number) => void;
}
```

### Usage

```typescript
import { Pagination } from '@/components/Pagination/Pagination';

const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);

<Pagination
  currentPage={page}
  totalPages={Math.ceil(total / limit)}
  onPageChange={setPage}
  onLimitChange={setLimit}
/>
```

### Features
- Previous/Next buttons
- Page numbers
- Items per page selector
- Jump to page input

---

## Component: StatusBadge

### What It Does
Display user status as colored badge.

### File
```
src/components/StatusBadge/
├── StatusBadge.tsx
└── StatusBadge.module.scss
```

### Props

```typescript
interface StatusBadgeProps {
  status: 'active' | 'suspended' | 'blacklisted';
  size?: 'small' | 'medium' | 'large';
}
```

### Usage

```typescript
import { StatusBadge } from '@/components/StatusBadge/StatusBadge';

// Green badge
<StatusBadge status="active" />

// Yellow badge
<StatusBadge status="suspended" size="medium" />

// Red badge
<StatusBadge status="blacklisted" size="large" />
```

### Status Colors
- ✅ **active** → Green
- ⚠️ **suspended** → Yellow/Orange
- ❌ **blacklisted** → Red

---

## Component: FilterModal

### What It Does
Modal dialog for filtering users.

### File
```
src/components/FilterModal/
├── FilterModal.tsx
└── FilterModal.module.scss
```

### Props

```typescript
interface FilterModalProps {
  isOpen: boolean;            // Modal open?
  onClose: () => void;        // Close handler
  onApply: (filters: any) => void;  // Apply handler
  filters?: any;              // Current filters
}
```

### Usage

```typescript
import { FilterModal } from '@/components/FilterModal/FilterModal';
import { useState } from 'react';

export const DashboardPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({});

  const handleApplyFilter = async (newFilters: any) => {
    const results = await userApi.filterUsers(newFilters);
    setFilters(newFilters);
    setShowFilter(false);
  };

  return (
    <>
      <button onClick={() => setShowFilter(true)}>Filter</button>
      
      <FilterModal
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={handleApplyFilter}
        filters={filters}
      />
    </>
  );
};
```

### Filter Options
- Status (active, suspended, blacklisted)
- Organization
- Date joined (from/to)
- Loan amount (from/to)
- etc.

---

## Component: ActionMenu

### What It Does
Dropdown menu with actions for each user row.

### File
```
src/components/ActionMenu/
├── ActionMenu.tsx
└── ActionMenu.module.scss
```

### Props

```typescript
interface ActionMenuProps {
  userId: string;             // User ID
  onAction: (action: string) => void;  // Action handler
  actions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
}
```

### Usage

```typescript
import { ActionMenu } from '@/components/ActionMenu/ActionMenu';

<ActionMenu
  userId={user.id}
  onAction={(action) => handleAction(user.id, action)}
  actions={[
    {
      label: 'View Details',
      onClick: () => navigate(`/users/${user.id}`)
    },
    {
      label: 'Suspend',
      onClick: () => updateStatus(user.id, 'suspended')
    },
    {
      label: 'Blacklist',
      onClick: () => updateStatus(user.id, 'blacklisted')
    }
  ]}
/>
```

### Actions Available
- View Details
- Activate
- Suspend
- Blacklist
- Delete (if allowed)

---

## Component: DashboardLayout

### What It Does
Layout wrapper for dashboard pages.

### File
```
src/components/DashboardLayout/
├── DashboardLayout.tsx
└── DashboardLayout.module.scss
```

### Props

```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;  // Page content
  title?: string;             // Page title
  breadcrumbs?: any[];        // Breadcrumbs
}
```

### Usage

```typescript
import { DashboardLayout } from '@/components/DashboardLayout/DashboardLayout';

<DashboardLayout title="Users">
  {/* Page content here */}
  <Table users={users} />
</DashboardLayout>
```

### Layout Features
- Navbar at top
- Sidebar on left
- Main content area
- Footer (optional)
- Responsive on mobile

---

## Component File Structure

### Each Component Has

```
ComponentName/
├── ComponentName.tsx         # React component
├── ComponentName.module.scss # Styles (scoped)
└── index.ts                  # (Optional) Export
```

### ComponentName.tsx Example

```typescript
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick
}) => {
  return (
    <button 
      className={styles.button}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
```

### ComponentName.module.scss Example

```scss
.button {
  padding: 12px 24px;
  background-color: $color-primary;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: darken($color-primary, 10%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

---

## Importing Components

### From Component File

```typescript
import { Button } from './components/Button/Button';
```

### From Index (if using index.ts)

```typescript
import { Button } from './components';
```

### From Pages

```typescript
import { Table } from '@/components/Table/Table';
import { Button } from '@/components/Button/Button';
```

---

## Common Patterns

### Pattern 1: Component with State

```typescript
const [count, setCount] = useState(0);

<Button 
  label={`Count: ${count}`}
  onClick={() => setCount(count + 1)}
/>
```

### Pattern 2: Conditional Rendering

```typescript
{loading ? (
  <p>Loading...</p>
) : error ? (
  <p>Error: {error}</p>
) : (
  <Table users={users} />
)}
```

### Pattern 3: Passing Data Through Props

```typescript
<Table
  users={filteredUsers}
  onViewDetails={(id) => handleView(id)}
  onAction={(id, action) => handleAction(id, action)}
/>
```

---

## Next Steps

- Read: **[Component Styling](02-component-styling.md)** for SCSS guide
- Read: **[Using Components](03-using-components.md)** for patterns

---

**Component Guide Complete!** ✅
