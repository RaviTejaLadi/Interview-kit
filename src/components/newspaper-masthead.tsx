import type { ReactNode } from 'react';

export type GazetteTheme = 'light' | 'dark';

type GazetteBannerProps = {
  theme: GazetteTheme;
  actions?: ReactNode;
  leading?: ReactNode;
  sectionLabel?: string;
};

type NewspaperNameplateProps = {
  kitCount: number;
  questionCount: number;
  theme: GazetteTheme;
};

type EditionDatelineProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  actions?: ReactNode;
};

export function formatGazetteDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getEditionLabel(theme: GazetteTheme) {
  return theme === 'dark' ? 'Night Edition' : 'Morning Edition';
}

export function GazetteBanner({ theme, actions, leading, sectionLabel }: GazetteBannerProps) {
  const edition = getEditionLabel(theme);
  const date = formatGazetteDate();

  return (
    <div className="bg-ink text-paper flex min-h-10 shrink-0 items-center gap-2 px-3 py-1.5 sm:min-h-11 sm:px-5">
      {leading}
      <p className="font-heading min-w-0 truncate text-[11px] font-semibold tracking-[0.22em] uppercase sm:text-xs">
        The Interview Gazette
        {sectionLabel ? (
          <span className="tracking-[0.14em] opacity-80">
            {' · '}
            {sectionLabel}
          </span>
        ) : null}
      </p>
      <p className="font-heading ml-auto hidden truncate text-[10px] tracking-[0.16em] uppercase opacity-80 md:block">
        {edition} · {date}
      </p>
      {actions ? (
        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-3">{actions}</div>
      ) : null}
    </div>
  );
}

export function NewspaperNameplate({ kitCount, questionCount, theme }: NewspaperNameplateProps) {
  const edition = getEditionLabel(theme);
  const date = formatGazetteDate();

  return (
    <header className="space-y-3">
      <div className="newspaper-rule-double" />
      <div className="grid items-center gap-3 sm:grid-cols-[7.5rem_minmax(0,1fr)_7.5rem]">
        <div className="hidden border border-foreground/80 px-2 py-2 text-center sm:block">
          <p className="font-heading text-[10px] tracking-[0.18em] uppercase">Vol. I</p>
          <p className="font-heading mt-1 text-2xl leading-none font-extrabold">No. {kitCount}</p>
          <p className="font-heading mt-1 text-[10px] tracking-[0.14em] uppercase opacity-70">
            {questionCount} q's
          </p>
        </div>

        <div className="text-center">
          <p className="font-heading text-[10px] tracking-[0.42em] text-secondary uppercase sm:text-[11px]">
            {edition}
          </p>
          <h1 className="font-heading mt-1 text-[clamp(2.2rem,7vw,5.2rem)] leading-[0.9] font-extrabold tracking-tight">
            The Interview Gazette
          </h1>
          <p className="font-sans mt-2 text-sm text-muted-foreground sm:text-base">
            All the questions that’s fit to print
          </p>
        </div>

        <div className="hidden border border-foreground/80 px-2 py-2 text-center sm:block">
          <p className="font-heading text-[10px] tracking-[0.18em] uppercase">Price</p>
          <p className="font-heading mt-1 text-2xl leading-none font-extrabold">Gratis</p>
          <p className="font-heading mt-1 text-[10px] tracking-[0.14em] uppercase opacity-70">
            Est. 2026
          </p>
        </div>
      </div>
      <div className="newspaper-rule-double" />
      <div className="flex flex-wrap items-center justify-between gap-2 text-center">
        <p className="font-heading text-[11px] tracking-[0.16em] uppercase">{date}</p>
        <p className="font-heading text-[11px] tracking-[0.16em] uppercase">
          {kitCount} desks · {questionCount} questions
        </p>
        <p className="font-heading hidden text-[11px] tracking-[0.16em] uppercase sm:block">
          Hiring climate: competitive
        </p>
      </div>
      <div className="newspaper-rule" />
    </header>
  );
}

export function EditionDateline({
  kicker,
  title,
  subtitle,
  leading,
  actions,
}: EditionDatelineProps) {
  return (
    <div className="flex min-h-12 items-center gap-2 border-b-2 border-foreground bg-card px-2 py-2 sm:min-h-14 sm:gap-3 sm:px-4">
      {leading}
      <div className="min-w-0 flex-1">
        {kicker ? (
          <p className="font-heading truncate text-[10px] tracking-[0.18em] text-secondary uppercase">
            {kicker}
          </p>
        ) : null}
        <p className="font-heading truncate text-base leading-tight font-bold tracking-tight sm:text-lg">
          {title}
        </p>
        {subtitle ? (
          <p className="font-heading truncate text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}
