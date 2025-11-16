# Development Workflow Guide

How to work on the project - from creating features to committing code.

## Daily Development

### Start Your Day

1. **Pull latest code**
```bash
git pull origin main
```

2. **Install any new dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Check lint** (code quality)
```bash
npm run lint
```

---

## Creating a New Feature

### Step 1: Create Feature Branch

```bash
git checkout -b feature/user-bulk-actions
```

**Branch naming:**
- `feature/description` - New features
- `fix/bug-name` - Bug fixes
- `docs/description` - Documentation updates

### Step 2: Make Your Changes

Edit files, create components, etc.

Keep changes focused on one feature.

### Step 3: Check Your Code

Before committing:

```bash
# Check for errors
npm run build

# Check code quality
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Step 4: Commit Your Changes

```bash
git add .
git commit -m "feat: add user bulk actions feature"
```

**Commit message format:**
```
[TYPE]: brief description

- Optional detailed explanation
- Bullet points for multiple changes
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code reorganization

### Step 5: Push to GitHub

```bash
git push origin feature/user-bulk-actions
```

### Step 6: Create Pull Request

On GitHub:
1. Go to repository
2. Click "New Pull Request"
3. Select your branch
4. Add description
5. Click "Create Pull Request"

### Step 7: Code Review & Merge

After review and approval:
1. Merge the pull request
2. Delete the feature branch
3. Pull main branch

---

## File Organization

Where to put new files:

### Creating a Component

```
src/components/
├── MyComponent/
│   ├── MyComponent.tsx       (Component code)
│   ├── MyComponent.module.scss (Styles)
│   └── MyComponent.types.ts  (Type definitions - if needed)
```

**Component template:**
```typescript
import styles from './MyComponent.module.scss';

interface MyComponentProps {
  title: string;
  onClick: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onClick
}) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
};
```

### Creating a Page

```
src/pages/
├── MyPage/
│   ├── MyPage.tsx           (Page component)
│   ├── MyPage.module.scss   (Page styles)
│   └── useMyPageLogic.ts    (Custom logic - if needed)
```

### Creating a Utility

```
src/utils/
├── stringUtils.ts           (String functions)
├── dateUtils.ts             (Date functions)
├── formatters.ts            (Formatting functions)
└── validators.ts            (Validation functions)
```

---

## Code Style Standards

### TypeScript - Always Use Types

❌ **Wrong:**
```typescript
const getUser = (id) => {
  return axios.get(`/users/${id}`);
};
```

✅ **Right:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): Promise<User> => {
  return axios.get(`/users/${id}`);
};
```

### React Components - Use Functional Components

❌ **Wrong:**
```typescript
class MyComponent extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}
```

✅ **Right:**
```typescript
const MyComponent: React.FC = () => {
  return <div>Hello</div>;
};
```

### SCSS - Use CSS Modules

❌ **Wrong:**
```scss
// Regular CSS - causes conflicts
.button {
  color: blue;
}
```

✅ **Right:**
```scss
// CSS Module - scoped to component
.button {
  color: blue;
  padding: 10px;
  
  &:hover {
    color: darkblue;
  }
}
```

Use in component:
```typescript
import styles from './Button.module.scss';

<button className={styles.button}>Click</button>
```

### Variable Names

```typescript
// ✅ Good - clear names
const isLoading = true;
const userCount = 5;
const handleButtonClick = () => {};

// ❌ Bad - unclear names
const loading = true;
const count = 5;
const onClick = () => {};
```

---

## Common Development Tasks

### Running Tests (If Using)

```bash
npm test
```

### Building for Production

```bash
npm run build
```

Creates optimized bundle in `dist/` folder.

### Checking Bundle Size

```bash
npm run build
ls -la dist/
```

### Linting & Fixing

```bash
# Check issues
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### Previewing Production Build

```bash
npm run preview
```

Opens production build locally at `http://localhost:4173`

---

## Git Workflow Summary

```bash
# 1. Get latest code
git pull origin main

# 2. Create feature branch
git checkout -b feature/my-feature

# 3. Make changes
# ... edit files ...

# 4. Check code
npm run lint -- --fix
npm run build

# 5. Commit changes
git add .
git commit -m "feat: add my feature"

# 6. Push to GitHub
git push origin feature/my-feature

# 7. Create Pull Request on GitHub
# ... review and merge ...

# 8. Update local main
git checkout main
git pull origin main
```

---

## Tips & Best Practices

✅ **Do:**
- Write clear commit messages
- Commit small, focused changes
- Test before pushing
- Keep branches up to date
- Review your own code first

❌ **Don't:**
- Commit without testing
- Large commits with unrelated changes
- Push directly to main
- Leave console.log() in code
- Commit node_modules or .env files

---

## Need Help?

- **Lint errors**: Run `npm run lint -- --fix`
- **Build errors**: Check the error message
- **Git confused**: See [Troubleshooting Guide](06-troubleshooting.md)

---

**Happy coding!** 🚀
