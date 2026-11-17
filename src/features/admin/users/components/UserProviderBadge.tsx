import { cn } from '@/lib/utils';

export function UserProviderBadge({
  provider,
  google,
  github,
}: {
  provider: string;
  google: boolean;
  github: boolean;
}) {
  const label = google ? 'Google' : github ? 'GitHub' : provider;
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px]',
        provider === 'local' ? 'bg-muted text-muted-foreground' : 'bg-blue-500/15 text-blue-600',
      )}
    >
      {label}
    </span>
  );
}
