# Project Structure

Detailed explanation of where everything is in the project.

## Complete Folder Structure

```
lendsqr-frontend/
│
├── documentation/              # ALL DOCUMENTATION
│   ├── README.md              # Navigation index
│   ├── guides/                # Step-by-step guides
│   ├── architecture/           # System design
│   ├── components/             # Component docs
│   └── api-reference/          # API docs
│
├── src/                        # SOURCE CODE
│   ├── pages/                 # Full page components
│   │   ├── LoginPage.tsx
│   │   ├── LoginPage.module.scss
│   │   ├── DashboardPage.tsx
│   │   ├── DashboardPage.module.scss
│   │   ├── UserDetailsPage.tsx
│   │   └── UserDetailsPage.module.scss
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Navbar.module.scss
│   │   ├── Sidebar.tsx
│   │   ├── Sidebar.module.scss
│   │   ├── Table.tsx
│   │   ├── Table.module.scss
│   │   ├── DashboardLayout.tsx
│   │   ├── FilterModal.tsx
│   │   ├── Pagination.tsx
│   │   ├── ActionMenu.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ... more components
│   │
│   ├── services/              # API communication
│   │   └── userApi.ts         # User API functions
│   │
│   ├── styles/                # Global styles
│   │   ├── global.scss        # Reset & defaults
│   │   ├── variables.scss     # Colors & sizes
│   │   ├── mixins.scss        # Reusable SCSS
│   │   └── index.css          # Base styles
│   │
│   ├── assets/                # Images & icons
│   │   ├── dashboard.png
│   │   ├── filtericon.png
│   │   ├── bellIcon.png
│   │   └── ... more assets
│   │
│   ├── App.tsx                # Main app component
│   ├── App.css                # App styles
│   ├── main.tsx               # Entry point
│   └── index.css              # Index styles
│
├── public/                     # Static files
│   ├── data.json              # Mock data (for JSON Server)
│   └── ... other static files
│
├── README.md                   # Main project README
├── package.json                # Dependencies
├── package-lock.json           # Lock file
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── tsconfig.app.json           # App TS config
├── tsconfig.node.json          # Node TS config
├── eslint.config.js            # Code quality rules
├── index.html                  # HTML entry point
└── .env.local                  # Environment variables (create this)
```

---

## Key Files Explained

### `src/App.tsx`

The **main component** that controls everything:
- Sets up routes (pages)
- Defines ProtectedRoute wrapper
- Sets up global toast notifications

```typescript
// Routes in App.tsx
/login          → LoginPage
/dashboard      → DashboardPage (Protected)
/dashboard/users/:userId → UserDetailsPage (Protected)
```

### `src/main.tsx`

**Entry point** - where React starts:
- Renders App.tsx into HTML
- Sets up the app

### `index.html`

The **HTML file** that loads everything:
- Defines `<div id="root">` where React renders
- Loads CSS and JavaScript

### `src/services/userApi.ts`

**API communication** file:
- All API calls (login, getUsers, etc.)
- Error handling
- Token management

### `src/styles/variables.scss`

**Design system** - shared values:
- Colors: `$color-primary`, `$color-secondary`
- Sizes: `$spacing-sm`, `$spacing-md`
- Breakpoints: tablet, desktop sizes

### `src/pages/` Folder

**Full page components** (screens users see):
- `LoginPage.tsx` - Login screen
- `DashboardPage.tsx` - User list
- `UserDetailsPage.tsx` - User profile

### `src/components/` Folder

**Reusable UI components** used across pages:
- `Button.tsx` - Reusable button
- `Input.tsx` - Reusable input field
- `Table.tsx` - User table
- `Navbar.tsx` - Top navigation
- etc.

---

## File Naming Conventions

### Component Files

```
ComponentName/
├── ComponentName.tsx           # Component code
├── ComponentName.module.scss   # Component styles
└── ComponentName.types.ts      # Type definitions (if complex)
```

### Naming Rules

| Type | Format | Example |
|------|--------|---------|
| Components | PascalCase | `UserTable.tsx` |
| Pages | PascalCase | `LoginPage.tsx` |
| Utils | camelCase | `formatDate.ts` |
| SCSS modules | kebab-case | `user-table.module.scss` |
| Types | interfaces | `interface User {}` |

---

## Where to Put New Files

### Adding a New Component

1. Create folder in `src/components/`: `MyComponent/`
2. Create files:
   - `MyComponent.tsx`
   - `MyComponent.module.scss`
   - `MyComponent.types.ts` (if needed)

### Adding a New Page

1. Create folder in `src/pages/`: `MyPage/`
2. Create files:
   - `MyPage.tsx`
   - `MyPage.module.scss`

### Adding Utilities

Create files in `src/utils/`:
- `stringUtils.ts`
- `dateUtils.ts`
- `validators.ts`
- etc.

---

## Import Paths

### From Top Level

```typescript
// ✅ Good
import { Button } from '../../../components/Button/Button';

// Better - use relative paths
import { Button } from '@/components/Button/Button';
```

### Configure Path Alias (Optional)

In `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Then import becomes simpler:
```typescript
import { Button } from '@/components/Button/Button';
import { userApi } from '@/services/userApi';
```

---

## Configuration Files

### `package.json`

Defines:
- Project name and version
- All dependencies
- npm scripts (`npm run dev`, etc.)

### `vite.config.ts`

Vite configuration:
- Build settings
- Development server settings
- Plugin configuration

### `tsconfig.json`

TypeScript configuration:
- Type checking rules
- Target JavaScript version
- Module system

### `eslint.config.js`

Code quality rules:
- Style standards
- Error detection
- Formatting rules

---

## Development vs Production Files

### In Development

- `npm run dev` uses Vite dev server
- Code is NOT minified (readable)
- Source maps for debugging
- Hot Module Replacement (HMR)

### In Production

- `npm run build` creates optimized bundle
- Code IS minified (smaller)
- No debug information
- Optimized for performance

---

## Asset Organization

### Images & Icons

```
src/assets/
├── dashboard.png
├── filtericon.png
├── bellIcon.png
├── default-avatar.png
└── ...
```

Use in components:
```typescript
import dashboardImg from '@/assets/dashboard.png';

<img src={dashboardImg} alt="Dashboard" />
```

---

## Clean vs Cluttered

### ✅ Well Organized

```
components/
├── Button/
│   ├── Button.tsx
│   └── Button.module.scss
├── Table/
│   ├── Table.tsx
│   └── Table.module.scss
```

### ❌ Messy

```
components/
├── Button.tsx
├── Button.scss
├── Table.tsx
├── Table.scss
├── Random.tsx
├── Unused.tsx
```

---

## Finding Files

### Search by Component

```bash
# Find Button component
find . -name "*Button*"

# Result: src/components/Button/Button.tsx
```

### Search by Type

```bash
# Find all components
find src/components -name "*.tsx"

# Find all styles
find src -name "*.module.scss"

# Find all API files
find src/services -name "*.ts"
```

---

## Total Lines of Code

Typical structure:
- Pages: 500-1000 lines each
- Components: 100-500 lines each
- Services: 200-400 lines
- Styles: 100-300 lines per file

**Total**: 3,000-5,000 lines of code

---

## Next Steps

- Read: **[Data Flow](03-data-flow.md)** to understand how data moves
- Check: **[Component List](../components/01-component-list.md)** to see all components
- Read: **[API Overview](../api-reference/01-api-overview.md)** for API details

---

**You now know the project structure!** 🎯
