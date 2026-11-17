import { useEffect, useState } from 'react';
import { CheckCircle2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FeedbackStatusBadge } from '@/features/admin/feedback/components/feedback-status-badge';
import { useAdminFeedback } from '@/features/admin/feedback/hooks/use-admin-feedback';
import { useUpdateAdminFeedback } from '@/features/admin/feedback/hooks/use-update-admin-feedback';
import type { FeedbackStatus } from '@/features/admin/feedback/types/feedback';
import { formatDateTime } from '@/features/admin/feedback/utils/format-date-time';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import {
  FEEDBACK_STATUS_LABELS,
  FEEDBACK_STATUSES,
} from '@/features/feedback/constants/feedback.constants';
import { getApiErrorMessage } from '@/utils/axios';

export function FeedbackDetails({ feedbackId }: { feedbackId: string }) {
  const selectedFeedback = useAdminFeedback(feedbackId);
  const updateFeedback = useUpdateAdminFeedback();
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>('open');

  useEffect(() => {
    if (!selectedFeedback.data) {
      return;
    }
    setFeedbackStatus(selectedFeedback.data.status ?? 'open');
  }, [selectedFeedback.data]);

  function handleUpdateFeedbackStatus(nextStatus: FeedbackStatus) {
    if (!selectedFeedback.data || nextStatus === (selectedFeedback.data.status ?? 'open')) {
      return;
    }

    updateFeedback.mutate({
      feedbackId: selectedFeedback.data.id,
      input: { status: nextStatus },
    });
  }

  if (selectedFeedback.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading feedback details…</p>;
  }

  if (selectedFeedback.error) {
    return (
      <AuthFormError
        message={getApiErrorMessage(
          selectedFeedback.error,
          'Could not load this feedback right now.',
        )}
      />
    );
  }

  if (!selectedFeedback.data) {
    return <p className="text-sm text-muted-foreground">Feedback details unavailable.</p>;
  }

  const feedback = selectedFeedback.data;

  return (
    <div className="space-y-3">
      <AuthFormError
        message={
          updateFeedback.error
            ? getApiErrorMessage(
                updateFeedback.error,
                'Could not update this feedback status right now.',
              )
            : ''
        }
      />
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-medium text-foreground">{feedback.title}</p>
        <FeedbackStatusBadge status={feedback.status ?? 'open'} />
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {feedback.description || 'No description'}
      </p>
      <div className="space-y-1 text-xs text-muted-foreground">
        <p>User id: {feedback.user}</p>
        <p>Created: {formatDateTime(feedback.createdAt)}</p>
        <p>Updated: {formatDateTime(feedback.updatedAt)}</p>
      </div>
      <AuthField label="Status" name="adminFeedbackStatus" required>
        <Select
          value={feedbackStatus}
          onValueChange={(value) => {
            if (value === 'open' || value === 'in_progress' || value === 'resolved') {
              setFeedbackStatus(value);
              handleUpdateFeedbackStatus(value);
            }
          }}
          disabled={updateFeedback.isPending}
        >
          <SelectTrigger id="adminFeedbackStatus">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FEEDBACK_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {FEEDBACK_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AuthField>
      <div className="flex justify-end">
        <Button
          type="button"
          size="sm"
          disabled={updateFeedback.isPending || (feedback.status ?? 'open') === 'resolved'}
          onClick={() => handleUpdateFeedbackStatus('resolved')}
        >
          <CheckCircle2Icon className="size-3.5" />
          {updateFeedback.isPending ? 'Updating…' : 'Mark resolved'}
        </Button>
      </div>
    </div>
  );
}
