# 10. The `cn` Utility Architecture



You must know why this is required in modern React + Tailwind codebases:

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Solves:
// cn('px-2 py-1', 'px-4') => 'py-1 px-4' (px-2 is safely removed by twMerge!)
```
