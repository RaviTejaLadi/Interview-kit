import type { ReactNode } from 'react';

type GazetteBannerProps = {
  actions?: ReactNode;
  leading?: ReactNode;
  sectionLabel?: string;
};

type EditionDatelineProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  actions?: ReactNode;
};

export function GazetteBanner({ actions, leading, sectionLabel }: GazetteBannerProps) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-background px-3 sm:px-5">
      {leading}
      <span className="font-display flex size-7 shrink-0 items-center justify-center bg-foreground text-[15px] leading-none text-background">
        I
      </span>
      <p className="font-display hidden text-sm text-foreground sm:block">Interview Kit</p>
      <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
      <span className="hud-label bg-foreground px-2.5 py-1 text-background">
        {sectionLabel ?? 'Kits'}
      </span>
      {actions ? <div className="ml-auto flex shrink-0 items-center gap-1.5">{actions}</div> : null}
    </header>
  );
}

export function EditionDateline({ kicker, title, subtitle, leading, actions }: EditionDatelineProps) {
  return (
    <div className="flex min-h-14 items-center gap-3 border-b border-border bg-background px-3 py-3 sm:px-5">
      {leading}
      <div className="min-w-0">
        {kicker ? <p className="hud-label truncate text-muted-foreground">{kicker}</p> : null}
        {subtitle ? <p className="hud-label truncate text-faint">{subtitle}</p> : null}
      </div>
      <p className="font-display ml-auto max-w-[46%] truncate text-right text-2xl leading-none text-foreground sm:text-3xl">
        {title}
      </p>
      {actions}
    </div>
  );
}
