# SaaSy Cookies Design System

This document describes the centralized design system for the SaaSy Cookies application. All design tokens are defined in a single source of truth: `src/design-tokens.ts`.

## Quick Start

```typescript
// Import the entire design system
import { designTokens } from './design-tokens';

// Or import specific tokens
import { colors, typography, invoiceStyles } from './design-tokens';
```

## Design Tokens Structure

### 1. Colors (`colors`)

All color values used throughout the application.

```typescript
import { colors } from './design-tokens';

// Usage examples:
colors.brand.primary           // '#6366f1' (main brand color)
colors.background.main         // '#F9FAFB' (page background)
colors.text.primary            // '#1E293B' (main text)
colors.status.success          // '#3fb950'
colors.accent.neon.mint        // '#6affd8'
```

**Categories:**
- `brand` - Brand identity colors (primary, secondary, highlight)
- `background` - Background colors and gradients
- `text` - Text colors for different contexts
- `ui` - UI element colors (headers, borders, navigation)
- `accent` - Accent and decorative colors
- `button` - Button state colors
- `status` - Success, warning, error, info colors
- `glass` - Glassmorphism effect colors

### 2. Typography (`typography`)

Font families, sizes, weights, and spacing.

```typescript
import { typography } from './design-tokens';

// Font families
typography.fonts.heading       // ['Poppins', 'Nunito', 'sans-serif']
typography.fonts.body          // ['Inter', 'Open Sans', 'sans-serif']

// Sizes
typography.sizes.xl            // '1.25rem'
typography.weights.semibold    // 600
typography.lineHeights.normal  // 1.5
```

### 3. Spacing (`spacing`)

Consistent spacing values.

```typescript
import { spacing } from './design-tokens';

spacing.md                     // '1rem' (16px)
spacing.xl                     // '2rem' (32px)
spacing.scene.desktop          // '4rem'
```

### 4. Borders & Shadows (`borders`, `shadows`)

```typescript
import { borders, shadows } from './design-tokens';

borders.radius.lg              // '0.75rem'
shadows.md                     // '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
shadows.neon                   // Neon glow effect
```

### 5. Transitions (`transitions`)

```typescript
import { transitions } from './design-tokens';

transitions.duration.normal    // '300ms'
transitions.easing.default     // 'cubic-bezier(0.4, 0, 0.2, 1)'
```

### 6. Invoice Styles (`invoiceStyles`)

Invoice-specific design configuration.

```typescript
import { invoiceStyles } from './design-tokens';

// Default values
invoiceStyles.defaults.primaryColor    // '#6366f1'
invoiceStyles.defaults.fontFamily      // 'calibri'

// Available font options
invoiceStyles.fontOptions              // Array of { value, label }

// PDF dimensions
invoiceStyles.pdf.pageWidth           // 210 (A4 width in mm)
invoiceStyles.pdf.margin              // 15 (mm)
```

### 7. Breakpoints (`breakpoints`)

Responsive breakpoints matching Tailwind.

```typescript
import { breakpoints } from './design-tokens';

breakpoints.md                 // '768px'
breakpoints.lg                 // '1024px'
```

### 8. Z-Index Scale (`zIndex`)

Consistent z-index values.

```typescript
import { zIndex } from './design-tokens';

zIndex.modal                   // 1050
zIndex.tooltip                 // 1070
```

## Utility Functions

### hexToRgb

Converts hex color to RGB object.

```typescript
import { hexToRgb } from './design-tokens';

const rgb = hexToRgb('#6366f1');
// Returns: { r: 99, g: 102, b: 241 }
```

### getFontStack

Joins font families for CSS.

```typescript
import { getFontStack, typography } from './design-tokens';

const fontStack = getFontStack(typography.fonts.heading);
// Returns: "Poppins, Nunito, sans-serif"
```

## Tailwind Integration

The design tokens are automatically integrated into Tailwind CSS via `tailwind.config.ts`. All tokens are available as Tailwind classes:

```html
<!-- Colors -->
<div class="bg-brand-primary text-text-primary">

<!-- Typography -->
<h1 class="font-heading text-2xl font-semibold">

<!-- Spacing -->
<div class="p-lg m-md">

<!-- Shadows -->
<div class="shadow-neon">
```

## Migration Guide

### From Hardcoded Values

**Before:**
```typescript
const primaryColor = '#6366f1';
const fontFamily = 'calibri';
```

**After:**
```typescript
import { invoiceStyles } from './design-tokens';

const primaryColor = invoiceStyles.defaults.primaryColor;
const fontFamily = invoiceStyles.defaults.fontFamily;
```

### From CSS Variables

**Before (CSS):**
```css
background-color: var(--accent-primary);
```

**After (TypeScript):**
```typescript
import { colors } from './design-tokens';

// Use directly in inline styles
style={{ backgroundColor: colors.accent.primary }}
```

## Best Practices

1. **Always use design tokens** - Never hardcode colors, sizes, or values
2. **Import from the central file** - Import from `design-tokens.ts` only
3. **Use Tailwind classes when possible** - They're already configured with the tokens
4. **For dynamic values** - Use the imported tokens in your components
5. **Updating the design** - Change values in `design-tokens.ts` and they propagate everywhere

## File Structure

```
src/
├── design-tokens.ts          # Main source of truth
├── index.css                 # Uses CSS variables (references design tokens)
├── styles/
│   └── colors.css            # Legacy CSS variables (for backward compatibility)
├── tailwind.config.ts        # Tailwind configuration using design tokens
└── components/
    └── invoice/
        └── StyleOptions.tsx  # Uses invoiceStyles from design tokens
```

## Maintenance

When adding new design elements:

1. Add the token to `design-tokens.ts` in the appropriate category
2. Update `tailwind.config.ts` if it needs to be a Tailwind class
3. Document the token in this README
4. Update any hardcoded values in components to use the new token

## CSS Lint Warnings

You may see warnings about `@tailwind` directives in CSS files. These are normal and can be safely ignored - they're required for Tailwind CSS to work properly.
