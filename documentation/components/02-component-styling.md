# Component Styling & SCSS

How to style components with SCSS Modules.

## SCSS Modules Overview

### What Are SCSS Modules?

SCSS Modules create **scoped styles** - styles only apply to their component.

```scss
/* Button.module.scss */
.button {
  color: blue;
}

/* Other styles won't affect this! */
```

### Why Use Modules?

| Benefit | Example |
|---------|---------|
| **Scoped** | `.button` in Button.module.scss doesn't conflict with `.button` in Input.module.scss |
| **Safe** | Change one component's style without breaking others |
| **Organized** | Each component has its own CSS file |
| **Reusable** | Common styles in `variables.scss` |

---

## File Structure

### Component with Styling

```
Button/
├── Button.tsx               # Component code
├── Button.module.scss       # Component styles
└── Button.types.ts          # Type definitions (optional)
```

### Global Styles

```
styles/
├── global.scss              # Reset & defaults
├── variables.scss           # Colors, sizes, etc.
└── mixins.scss              # Reusable patterns
```

---

## Using Styles in Components

### Import Style

```typescript
// Button.tsx
import styles from './Button.module.scss';

export const Button: React.FC = () => {
  return (
    <button className={styles.button}>
      Click Me
    </button>
  );
};
```

### Multiple Classes

```typescript
import styles from './Button.module.scss';

// ✅ One class
<button className={styles.button}>

// ✅ Multiple classes
<div className={`${styles.button} ${styles.large}`}>

// ✅ Conditional classes
<button className={`${styles.button} ${disabled ? styles.disabled : ''}`}>
```

### With Tailwind or CSS-in-JS

If using utility classes alongside modules:

```typescript
<button className={`${styles.button} p-4 rounded`}>
```

---

## SCSS Module Syntax

### Basic Styles

```scss
/* Button.module.scss */

.button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}
```

### Variants

```scss
.button {
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
}

/* Primary variant */
.primary {
  background-color: #007bff;
  color: white;
}

.primary:hover {
  background-color: #0056b3;
}

/* Secondary variant */
.secondary {
  background-color: #6c757d;
  color: white;
}

.secondary:hover {
  background-color: #5a6268;
}

/* Danger variant */
.danger {
  background-color: #dc3545;
  color: white;
}

.danger:hover {
  background-color: #c82333;
}
```

### Usage

```typescript
<button className={`${styles.button} ${styles.primary}`}>
  Primary Button
</button>

<button className={`${styles.button} ${styles.secondary}`}>
  Secondary Button
</button>

<button className={`${styles.button} ${styles.danger}`}>
  Danger Button
</button>
```

---

## Shared Styles (variables.scss)

### Define Variables

```scss
/* styles/variables.scss */

// Colors
$color-primary: #007bff;
$color-secondary: #6c757d;
$color-danger: #dc3545;
$color-success: #28a745;
$color-warning: #ffc107;

$color-text-dark: #212529;
$color-text-light: #6c757d;
$color-border: #dee2e6;
$color-background: #f8f9fa;

// Spacing (padding, margin)
$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;

// Font sizes
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-md: 16px;
$font-size-lg: 18px;
$font-size-xl: 24px;

// Border radius
$border-radius-sm: 4px;
$border-radius-md: 8px;
$border-radius-lg: 12px;

// Breakpoints (for responsive)
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
$breakpoint-large: 1440px;

// Shadows
$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15);
```

### Import & Use

```scss
/* Button.module.scss */

@import '../styles/variables.scss';

.button {
  padding: $spacing-md;
  background-color: $color-primary;
  color: white;
  border: none;
  border-radius: $border-radius-sm;
  font-size: $font-size-md;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button:hover {
  background-color: darken($color-primary, 10%);
  box-shadow: $shadow-md;
}

.button:disabled {
  background-color: $color-secondary;
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## Mixins (Reusable Patterns)

### Define Mixins

```scss
/* styles/mixins.scss */

// Flexbox center
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Flexbox space between
@mixin flex-space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// Text truncate
@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Text clamp (2 lines)
@mixin text-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// Responsive text
@mixin responsive-font($mobile, $tablet, $desktop) {
  font-size: $mobile;

  @media (min-width: $breakpoint-tablet) {
    font-size: $tablet;
  }

  @media (min-width: $breakpoint-desktop) {
    font-size: $desktop;
  }
}

// Smooth transition
@mixin transition-smooth {
  transition: all 0.3s ease;
}
```

### Use Mixins

```scss
/* Button.module.scss */

@import '../styles/variables.scss';
@import '../styles/mixins.scss';

.button {
  @include flex-center;      // Use mixin
  padding: $spacing-md;
  background-color: $color-primary;
  color: white;
  border: none;
  border-radius: $border-radius-sm;
  @include transition-smooth; // Use mixin
}

.buttonContainer {
  @include flex-space-between;  // Mixin for layout
  padding: $spacing-lg;
}

.buttonText {
  @include text-truncate;    // Mixin for text
  @include responsive-font($font-size-sm, $font-size-md, $font-size-lg);
}
```

---

## Responsive Design

### Media Queries

```scss
.button {
  padding: $spacing-md;
  font-size: $font-size-md;

  // Tablet size
  @media (max-width: $breakpoint-tablet) {
    padding: $spacing-sm;
    font-size: $font-size-sm;
  }

  // Mobile size
  @media (max-width: 480px) {
    padding: $spacing-xs;
    font-size: $font-size-xs;
    width: 100%;
  }
}
```

### Responsive Text

```scss
.heading {
  @include responsive-font(
    $font-size-lg,       // Mobile
    $font-size-xl,       // Tablet
    32px                 // Desktop
  );
}
```

---

## Common Patterns

### Pattern 1: Variants

```scss
.button {
  padding: $spacing-md;
  border: none;
  border-radius: $border-radius-sm;
  cursor: pointer;
  @include transition-smooth;
}

.primary {
  background-color: $color-primary;
  color: white;

  &:hover {
    background-color: darken($color-primary, 10%);
  }
}

.secondary {
  background-color: $color-secondary;
  color: white;

  &:hover {
    background-color: darken($color-secondary, 10%);
  }
}

.danger {
  background-color: $color-danger;
  color: white;

  &:hover {
    background-color: darken($color-danger, 10%);
  }
}
```

### Pattern 2: States

```scss
.button {
  padding: $spacing-md;
  background-color: $color-primary;
  color: white;
  cursor: pointer;

  // Hover state
  &:hover {
    background-color: darken($color-primary, 10%);
    box-shadow: $shadow-md;
  }

  // Active state
  &:active {
    transform: scale(0.98);
  }

  // Disabled state
  &:disabled {
    background-color: $color-secondary;
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: $color-secondary;
    }
  }

  // Focus state (accessibility)
  &:focus {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}
```

### Pattern 3: Nesting

```scss
.card {
  background-color: white;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
  padding: $spacing-lg;

  // Nested header
  .cardHeader {
    border-bottom: 1px solid $color-border;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-md;

    h2 {
      margin: 0;
      color: $color-text-dark;
    }
  }

  // Nested content
  .cardContent {
    margin-bottom: $spacing-lg;

    p {
      color: $color-text-light;
      line-height: 1.6;
    }
  }

  // Nested footer
  .cardFooter {
    border-top: 1px solid $color-border;
    padding-top: $spacing-md;
    display: flex;
    justify-content: flex-end;
    gap: $spacing-md;
  }
}
```

---

## Accessibility in Styles

### Focus States

```scss
.button {
  // Always include focus state for keyboard users!
  &:focus {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
}
```

### Color Contrast

```scss
// ✅ Good contrast
.text-on-primary {
  color: white;               // White on blue
  background-color: $color-primary;
}

// ❌ Bad contrast
.text-bad {
  color: #cccccc;            // Light gray on white
  background-color: white;
}
```

### Skip Focus State

```scss
// For mouse users only (not keyboard)
.button {
  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }
}
```

---

## Common Mistakes

### ❌ Wrong

```scss
/* Don't use !important */
.button {
  color: blue !important;     // Avoid this
}

/* Don't use ID selectors */
#myButton {                   // Avoid - too specific
  color: blue;
}

/* Don't use global class names */
.button {                     // If not in module!
  color: blue;
}
```

### ✅ Right

```scss
/* Use SCSS modules */
.button {                     // Module scoped
  color: blue;
}

/* Use variables */
.button {
  color: $color-primary;      // From variables.scss
}

/* Use classes, not IDs */
.myButton {
  color: blue;
}
```

---

## Testing Styles

### Check in Browser

1. Open DevTools (F12)
2. Click Inspector
3. Select element
4. Check "Styles" panel
5. Verify class names match

### Verify Scoping

```
Expected: button_Button__a1b2c
Actual:   button_Button__a1b2c

✅ Good! The style is scoped.
```

---

## Global Styles

### Using global.scss

```scss
/* styles/global.scss */

@import './variables.scss';

/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Default body styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: $font-size-md;
  color: $color-text-dark;
  background-color: $color-background;
  line-height: 1.6;
}

/* Default link styles */
a {
  color: $color-primary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

/* Default form styles */
input, textarea, select {
  font-size: $font-size-md;
  padding: $spacing-sm;
  border: 1px solid $color-border;
  border-radius: $border-radius-sm;
  font-family: inherit;
}
```

### Import in main.tsx

```typescript
import '@/styles/global.scss';
```

---

## Next Steps

- Read: **[Component List](01-component-list.md)** to see all components
- Read: **[Development Workflow](../guides/04-development-workflow.md)** for daily work

---

**SCSS Guide Complete!** ✅
