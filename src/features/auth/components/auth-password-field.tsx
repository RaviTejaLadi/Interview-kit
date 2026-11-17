import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from 'lucide-react';
import { useId, useState, type ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthField } from '@/features/auth/components/auth-field';
import { cn } from '@/lib/utils';

type AuthPasswordFieldProps = {
  label: string;
  error?: string;
  hint?: string;
} & Omit<ComponentProps<typeof Input>, 'className' | 'type'>;

export function AuthPasswordField({ label, error, hint, id, ...props }: AuthPasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const generatedId = useId();
  const fieldId = id ?? props.name ?? generatedId;

  return (
    <AuthField label={label} error={error} hint={hint} id={fieldId} required={props.required}>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-2.5 inline-flex items-center text-muted-foreground">
          <LockKeyholeIcon className="size-3.5" />
        </span>
        <Input
          id={fieldId}
          type={isVisible ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          className={cn('pr-8 pl-8', error && 'border-destructive')}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          onClick={() => setIsVisible((value) => !value)}
          className="absolute inset-y-0 right-0 h-full w-8 rounded-none text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          {isVisible ? <EyeOffIcon className="size-3.5" /> : <EyeIcon className="size-3.5" />}
        </Button>
      </div>
    </AuthField>
  );
}
