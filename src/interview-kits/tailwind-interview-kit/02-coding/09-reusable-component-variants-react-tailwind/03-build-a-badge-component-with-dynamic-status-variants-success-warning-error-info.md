# Build a `Badge` component with dynamic status variants (`success`, `warning`, `error`, `info`).

### Definition

A **badge** is a small UI element used to communicate a compact piece of information such as:

- Status
- Category
- State
- Priority
- Availability

For example:

```text
✓ Success
⚠ Warning
✕ Error
ℹ Info
```

CVA is useful here because the visual styling changes according to the badge's status.

### Implementation

```tsx
// Create a type-safe status Badge using CVA.
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      status: {
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
      },
    },

    defaultVariants: {
      status: "info",
    },
  }
);

type BadgeProps =
  React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({
  className,
  status,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ status }), className)}
      {...props}
    />
  );
}
```

### Usage

```tsx
// Render badges with different semantic statuses.
<Badge status="success">Active</Badge>

<Badge status="warning">Pending</Badge>

<Badge status="error">Failed</Badge>

<Badge status="info">Processing</Badge>
```

### Important accessibility point

Don't communicate status **only through color**.

For example:

```text
❌ Red badge = Failed
```

is less accessible than:

```text
✕ Failed
```

The text itself should communicate the meaning.
