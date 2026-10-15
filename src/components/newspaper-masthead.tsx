import type { ReactNode } from 'react';

type SiteHeaderProps = {
  actions?: ReactNode;
  leading?: ReactNode;
  kitLabel?: string;
  kitIcon?: string | null;
  detail?: string;
  onBrandClick?: () => void;
};

export function SiteHeader({
  actions,
  leading,
  kitLabel,
  kitIcon,
  detail,
  onBrandClick,
}: SiteHeaderProps) {
  return (
    <header className="flex min-h-12 shrink-0 items-center gap-3 border-b border-border bg-background px-3 py-2 sm:px-5">
      {leading}
      {onBrandClick ? (
        <button
          type="button"
          onClick={onBrandClick}
          className="font-display shrink-0 text-sm text-foreground"
        >
          Interview Kits
        </button>
      ) : (
        <p className="font-display shrink-0 text-sm text-foreground">Interview Kits</p>
      )}
      {kitLabel ? (
        <>
          <span className="hidden h-4 w-px shrink-0 bg-border sm:block" aria-hidden="true" />
          {kitIcon ? (
            <img
              src={kitIcon}
              alt=""
              aria-hidden="true"
              className="size-5 shrink-0 object-contain"
            />
          ) : null}
          <p className="font-display truncate text-lg leading-none text-foreground sm:text-xl">
            {kitLabel}
          </p>
        </>
      ) : null}
      {detail ? (
        <p className="hud-label hidden min-w-0 truncate text-faint lg:block">{detail}</p>
      ) : null}
      {actions ? <div className="ml-auto flex shrink-0 items-center gap-1.5">{actions}</div> : null}
    </header>
  );
}
