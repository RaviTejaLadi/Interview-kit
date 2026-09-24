# Build a type-safe `Button` component supporting variants (`primary`, `secondary`, `outline`, `destructive`, `ghost`) and sizes (`sm`, `md`, `lg`) using `cva`.

### Definition

**CVA (Class Variance Authority)** is a utility for defining reusable component styles based on **variants**.

Instead of manually writing:

```tsx
variant === "primary" ? "..." : "..."
```

you define the variants once and let CVA generate the appropriate classes.

A button might have:

```text
Button
├── variant
│   ├── primary
│   ├── secondary
│   ├── outline
│   ├── destructive
│   └── ghost
│
└── size
    ├── sm
    ├── md
    └── lg
```

### Installation

```bash
# Install CVA for type-safe component variants.
npm install class-variance-authority
```

### Button implementation

```tsx
// Define a type-safe Button component using CVA.
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-600",

        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-500",

        outline:
          "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:outline-gray-500",

        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",

        ghost:
          "bg-transparent hover:bg-gray-100 focus-visible:outline-gray-500",
      },

      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

### Usage

```tsx
// Use the Button component with type-safe variants.
<Button variant="primary" size="md">
  Save
</Button>

<Button variant="destructive" size="sm">
  Delete
</Button>

<Button variant="outline" size="lg">
  Cancel
</Button>

<Button variant="ghost">
  More
</Button>
```

TypeScript now understands the allowed values:

```tsx
// TypeScript rejects unsupported variant values.
<Button variant="danger">
  Delete
</Button>
```

`danger` isn't part of the defined variant type, so TypeScript reports an error.

### Why CVA is useful

Without CVA:

```tsx
// Conditional styling becomes difficult to maintain as variants grow.
className={`
  ${variant === "primary" ? "bg-blue-600" : ""}
  ${variant === "outline" ? "border" : ""}
  ${size === "sm" ? "h-8" : ""}
`}
```

With CVA:

```tsx
// Variants remain declarative and centralized.
buttonVariants({
  variant: "primary",
  size: "lg",
});
```