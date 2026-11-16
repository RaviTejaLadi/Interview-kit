import type { ComponentProps, ReactNode } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type AuthFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Input>, 'className'>;

export function AuthField({ label, error, hint, className, id, children, ...props }: AuthFieldProps) {
  const fieldId = id ?? props.name;

  return (
    <div className={className}>
      <label htmlFor={fieldId} className="mb-1.5 block text-xs font-medium text-foreground">
        {label}
      </label>
      {children ?? (
        <Input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          className={cn('h-10 text-sm', error && 'border-destructive')}
          {...props}
        />
      )}
      {error ? <p className="mt-1.5 text-xs text-destructive">{error}</p> : null}
      {!error && hint ? <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function AuthFormError({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <p
      role="alert"
      className="rounded-[var(--radius-control)] border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      {message}
    </p>
  );
}
