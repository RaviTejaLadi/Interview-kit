import type { FeedbackStatus } from '@/features/admin/feedback/types/feedback';
import { FEEDBACK_STATUS_LABELS } from '@/features/feedback/constants/feedback.constants';
import { cn } from '@/lib/utils';

function feedbackStatusClassName(status: FeedbackStatus) {
  if (status === 'resolved') {
    return 'bg-success-soft text-success';
  }
  if (status === 'in_progress') {
    return 'bg-warning-soft text-warning';
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
