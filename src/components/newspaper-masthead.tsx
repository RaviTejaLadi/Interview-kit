import { useEffect, useState, type ReactNode } from 'react';

import { kitIconToneClass } from '@/lib/kit-meta';
import { cn } from '@/lib/utils';

type SiteHeaderProps = {
  actions?: ReactNode;
  leading?: ReactNode;
  kitLabel?: string;
  kitKey?: string | null;
  kitIcon?: string | null;
  detail?: string;
  onBrandClick?: () => void;
  showBrand?: boolean;
};

function formatDigitalTime(date: Date) {
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);

  return `${formattedDate} · ${formattedTime}`;
}

export function SiteHeader({
  actions,
  leading,
  kitLabel,
  kitKey,
  kitIcon,
  detail,
  onBrandClick,
  showBrand = true,
}: SiteHeaderProps) {
  const [localTime, setLocalTime] = useState(() => formatDigitalTime(new Date()));

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(formatDigitalTime(new Date()));
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="flex min-h-14 shrink-0 items-center gap-3 border-b border-black/20 bg-[var(--color-header)] px-4 py-2.5 text-[var(--color-header-foreground)] sm:px-6">
      {leading}
      {showBrand
        ? (onBrandClick ? (
            <button
              type="button"
              onClick={onBrandClick}
              className="font-display shrink-0 text-base text-[var(--color-header-foreground)] transition-colors hover:text-primary"
            >
              Interview Kits
            </button>
          ) : (
            <p className="font-display shrink-0 text-base text-[var(--color-header-foreground)]">Interview Kits</p>
          ))
        : null}
      {kitLabel ? (
        <>
          <span className="hidden h-5 w-px shrink-0 bg-white/25 sm:block" aria-hidden="true" />
          {kitIcon ? (
            <img
              src={kitIcon}
              alt=""
              aria-hidden="true"
              className={cn('size-5 shrink-0 object-contain', kitIconToneClass(kitKey))}
            />
          ) : null}
          <p className="font-display truncate text-lg leading-none text-[var(--color-header-foreground)] sm:text-xl">
            {kitLabel}
          </p>
        </>
      ) : null}
      {detail ? (
        <p className="hidden min-w-0 truncate text-sm text-[var(--color-header-muted)] lg:block">{detail}</p>
      ) : null}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <p className="hidden whitespace-nowrap rounded-[var(--radius-control)] border border-white/20 bg-black/20 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-[var(--color-header-foreground)] tabular-nums sm:block">
          {localTime}
        </p>
        {actions}
      </div>
    </header>
  );
}
