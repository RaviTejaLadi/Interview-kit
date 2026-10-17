import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button font-sans inline-flex shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]',
        outline:
          'border-border bg-card text-foreground hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground',
        secondary:
          'border-border bg-secondary text-secondary-foreground hover:bg-muted aria-expanded:bg-muted aria-expanded:text-secondary-foreground',
        ghost:
          'text-slate-700 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:text-slate-300',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:border-red-500 focus-visible:ring-red-500/30',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 gap-2 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        xs: 'h-7 gap-1 px-2 text-xs [&_svg:not([class*="size-"])]:size-3',
        sm: 'h-9 gap-1.5 px-3 text-sm [&_svg:not([class*="size-"])]:size-3.5',
        lg: 'h-11 gap-2 px-5 text-sm',
        icon: 'size-10',
        'icon-xs': 'size-7 [&_svg:not([class*="size-"])]:size-3.5',
        'icon-sm': 'size-8',
        'icon-lg': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
