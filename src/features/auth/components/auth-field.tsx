import type { ComponentProps, ReactNode } from 'react';
import { AlertTriangleIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type AuthFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children?: ReactNode;
  icon?: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Input>, 'className'>;

export function AuthField({
  label,
  error,
  hint,
  icon,
  className,
  id,
  children,
  ...props
}: AuthFieldProps) {
  const fieldId = id ?? props.name;
  const isRequired = Boolean(props.required);

  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={fieldId} className="block text-xs font-medium tracking-wide text-foreground">
        {label}
        {isRequired ? <span className="ml-1 text-destructive">*</span> : null}
      </label>
      {children ?? (
        <div className="relative">
          {icon ? (
            <span className="pointer-events-none absolute inset-y-0 left-2.5 inline-flex items-center text-muted-foreground">
              {icon}
            </span>
          ) : null}
          <Input
            id={fieldId}
            aria-invalid={error ? true : undefined}
            className={cn(icon && 'pl-8', error && 'border-destructive')}
            {...props}
          />
        </div>
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
    <div
      role="alert"
      className="flex items-start gap-2 rounded-[var(--radius-control)] border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      <AlertTriangleIcon className="mt-0.5 size-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
