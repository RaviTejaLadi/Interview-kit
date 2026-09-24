# Implement the `cn(...)` utility using `clsx` and `tailwind-merge`.

### Definition

`cn()` is a small utility used to **combine conditional class names and intelligently resolve conflicting Tailwind classes**.

It commonly combines:

- **`clsx`** → conditionally joins class names.
- **`tailwind-merge`** → removes conflicting Tailwind utilities.

For example:

```text
clsx
"px-4", condition && "bg-blue-500"
          ↓
"px-4 bg-blue-500"

tailwind-merge
"px-4 px-6"
    ↓
"px-6"
```

### Implementation

```bash
# Install the utilities used by cn()
npm install clsx tailwind-merge
```

```typescript
// Create a reusable className composition utility.
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Usage

```tsx
// Conditionally compose Tailwind classes.
<div
  className={cn(
    'rounded-lg px-4 py-2',
    isActive && 'bg-blue-500',
    disabled && 'opacity-50',
    className,
  )}
/>
```

The important part is that `twMerge()` understands Tailwind conflicts.

```tsx
// tailwind-merge resolves conflicting utilities.
cn('px-4', 'px-6');
// → "px-6"

cn('text-red-500', 'text-blue-500');
// → "text-blue-500"
```

### Why not just use `clsx`?

`clsx` only combines classes.

```tsx
// clsx does not understand Tailwind conflicts.
clsx('px-4', 'px-6');
// "px-4 px-6"
```

`tailwind-merge` understands that both utilities affect the same CSS property.
