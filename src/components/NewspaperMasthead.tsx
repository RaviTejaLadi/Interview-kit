import type { ReactNode } from 'react';

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

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="grid size-6 shrink-0 place-items-center rounded-[6px] bg-foreground text-[10px] font-semibold tracking-tight text-background"
    >
      IK
    </span>
  );
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
  const brand = (
    <span className="inline-flex min-w-0 items-center gap-2">
      <BrandMark />
      <span className="truncate text-[13px] font-semibold tracking-tight text-(--color-header-foreground)">
        Interview Kits
      </span>
    </span>
  );

  return (
    <header className="flex h-[52px] shrink-0 items-center gap-2 border-b border-(--line-strong) bg-(--color-header) px-4 text-(--color-header-foreground) sm:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {showBrand ? (
          onBrandClick ? (
            <button
              type="button"
              onClick={onBrandClick}
              className="shrink-0 rounded-[6px] transition-opacity hover:opacity-80"
            >
              {brand}
            </button>
          ) : (
            brand
          )
        ) : null}
        {leading}
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
            <p className="truncate text-[13px] font-semibold leading-none tracking-tight text-(--color-header-foreground)">
              {kitLabel}
            </p>
          </div>
        ) : null}
        {detail ? (
          <p className="hidden min-w-0 truncate text-xs text-(--color-header-muted) xl:block">
            {detail}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-2">{actions}</div>
    </header>
  );
}
