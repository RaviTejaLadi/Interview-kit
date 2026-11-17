import { cn } from '@/lib/utils';

export function UserRoleBadge({ role }: { role: string }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px]',
        role === 'admin' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground',
      )}
    >
      {role}
    </span>
  );
}
