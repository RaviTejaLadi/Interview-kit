import type { LucideIcon } from 'lucide-react';

type AuthFormHeadingProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
};

export function AuthFormHeading({ icon: Icon, title, description, badge }: AuthFormHeadingProps) {
  return (
    <div className="space-y-2.5">
      {badge ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted-foreground">
          <Icon className="size-3.5" />
          {badge}
        </span>
      ) : null}
      <div>
        <h1 className="text-[30px] leading-9 text-foreground">{title}</h1>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
