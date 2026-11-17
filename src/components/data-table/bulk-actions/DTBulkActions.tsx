import type { ReactNode } from 'react';

type DTBulkActionsProps = {
  children?: ReactNode;
};

export function DTBulkActions({ children }: DTBulkActionsProps) {
  return (
    <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-between gap-2 rounded-(--radius-card) border border-border bg-card px-3 py-2 text-sm text-card-foreground shadow-[var(--shadow-pop)]">
      {children}
    </div>
  );
}
