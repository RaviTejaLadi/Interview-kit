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
    <header className="flex min-h-12 shrink-0 items-center gap-2 border-b border-border bg-[var(--color-header)] px-3 py-2 text-[var(--color-header-foreground)] sm:gap-3 sm:px-4 lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {leading}
        {showBrand ? (
          onBrandClick ? (
            <button
              type="button"
              onClick={onBrandClick}
              className="shrink-0 text-sm font-semibold text-[var(--color-header-foreground)] transition-colors hover:text-primary"
            >
              Interview Kits
            </button>
          ) : (
            <p className="shrink-0 text-sm font-semibold text-[var(--color-header-foreground)]">
              Interview Kits
            </p>
          )
        ) : null}
        {kitLabel ? (
          <div className="flex min-w-0 items-center gap-2">
            <span className="hidden h-4 w-px shrink-0 bg-border md:block" aria-hidden="true" />
            {kitIcon ? (
              <img
                src={kitIcon}
                alt=""
                aria-hidden="true"
                className={cn('size-5 shrink-0 object-contain', kitIconToneClass(kitKey))}
              />
            ) : null}
            <p className="truncate text-sm font-semibold leading-none text-[var(--color-header-foreground)]">
              {kitLabel}
            </p>
          </div>
        ) : null}
        {detail ? (
          <p className="hidden min-w-0 truncate text-xs text-[var(--color-header-muted)] xl:block">
            {detail}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <p className="hidden whitespace-nowrap rounded-[var(--radius-control)] px-2 py-1 font-mono text-[11px] font-medium tracking-wide text-[var(--color-header-foreground)] tabular-nums lg:block">
          {localTime}
        </p>
        {actions}
      </div>
    </header>
  );
}
