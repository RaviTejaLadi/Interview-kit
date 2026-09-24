# What is CVA (`class-variance-authority`) and how does it create type-safe UI variants?

**CVA (Class Variance Authority)** is a library for defining **component variants** in a structured and type-safe way.

It is particularly useful for components such as:

```text
Button
Badge
Alert
Input
Card
```

where the component has multiple variants.

For example, a button might have:

```text
variant:
  primary
  secondary
  destructive

size:
  small
  medium
  large
```

Instead of manually writing conditional logic everywhere, CVA lets you define these variants once.

### Example

```tsx id="t4v9x1"
// Define reusable, type-safe button variants with CVA
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white",
        secondary: "bg-gray-200 text-gray-900",
        destructive: "bg-red-600 text-white",
      },

      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

Now:

```tsx id="k7p2m4"
// Select button variants declaratively
<button className={buttonVariants({
  variant: "destructive",
  size: "lg",
})}>
  Delete
</button>
```

CVA generates the appropriate class combination.

---

## Why is CVA called type-safe?

With TypeScript, you can derive the available variants:

```tsx id="v0m6s8"
// Derive TypeScript props directly from the CVA configuration
type ButtonProps = VariantProps<typeof buttonVariants>;
```

Now TypeScript understands that:

```text
variant
```

can be:

```text
primary
secondary
destructive
```

and:

```text
size
```

can be:

```text
sm
md
lg
```

So invalid values can be caught during development.

---

# How these tools work together

This is the most useful mental model for React + Tailwind.

```text
                    React Component
                          │
                          ▼
                    CVA / variants
                          │
                          ▼
                        clsx
               conditional classes
                          │
                          ▼
                    tailwind-merge
               resolve Tailwind conflicts
                          │
                          ▼
                    Final className
```

For example:

```tsx id="e5m2q9"
// Combine CVA variants, conditional classes, and consumer overrides
const className = cn(
  buttonVariants({ variant, size }),
  isDisabled && "opacity-50",
  className
);
```

---

# `clsx` vs `tailwind-merge` vs `cn` vs CVA

| Tool | Main purpose | Resolves Tailwind conflicts? |
|---|---|---|
| **`clsx`** | Conditional class composition | ❌ |
| **`tailwind-merge`** | Resolve conflicting Tailwind utilities | ✅ |
| **`cn()`** | Convenient combination of `clsx` + `tailwind-merge` | ✅ |
| **CVA** | Define reusable component variants | ❌ by itself |

### Example

```js id="0c4x8s"
// Compare the responsibilities of the common class utilities
clsx("p-2", condition && "p-4");
// → "p-2 p-4" when condition is true

twMerge("p-2 p-4");
// → "p-4"

cn("p-2", condition && "p-4");
// → "p-4" when condition is true

buttonVariants({
  variant: "primary",
  size: "lg",
});
// → returns the appropriate variant class combination
```