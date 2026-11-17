import { FEEDBACK_STATUS_LABELS } from '@/features/feedback/constants/feedback.constants';
import type { FeedbackStatus } from '@/features/feedback/types/feedback';
import { cn } from '@/lib/utils';

function feedbackStatusClassName(status: FeedbackStatus) {
  if (status === 'resolved') {
    return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300';
  }
  if (status === 'in_progress') {
    return 'bg-amber-500/15 text-amber-700 dark:text-amber-300';
  }
  return 'bg-muted text-muted-foreground';
}

export function FeedbackStatusBadge({ status }: { status: FeedbackStatus }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px]',
        feedbackStatusClassName(status),
      )}
    >
      {FEEDBACK_STATUS_LABELS[status]}
    </span>
  );
}
