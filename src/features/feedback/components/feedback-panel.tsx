import { useState, type FormEvent } from 'react';
import { Clock3Icon, MessageSquareTextIcon, SendIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AuthField, AuthFormError } from '@/features/auth/components/auth-field';
import {
  FEEDBACK_FIELD_LIMITS,
  FEEDBACK_STATUS_LABELS,
} from '@/features/feedback/constants/feedback.constants';
import { useDeleteFeedback } from '@/features/feedback/hooks/use-delete-feedback';
import { useFeedbackList } from '@/features/feedback/hooks/use-feedback-list';
import { useSubmitFeedback } from '@/features/feedback/hooks/use-submit-feedback';
import type { FeedbackStatus } from '@/features/feedback/types/feedback';
import { validateFeedbackForm, type FeedbackFormInput } from '@/features/feedback/utils/validation';
import { cn } from '@/lib/utils';
import type { FieldErrors } from '@/lib/zod-field-errors';
import { getApiErrorMessage } from '@/utils/axios';

function feedbackStatusClassName(status: FeedbackStatus) {
  if (status === 'resolved') {
    return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300';
  }
  if (status === 'in_progress') {
    return 'bg-amber-500/15 text-amber-700 dark:text-amber-300';
  }
  return 'bg-muted text-muted-foreground';
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function FeedbackPanel() {
  const [form, setForm] = useState<FeedbackFormInput>({ title: '', description: '' });
  const [errors, setErrors] = useState<FieldErrors<'title' | 'description'>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const submitFeedback = useSubmitFeedback();
  const feedbackList = useFeedbackList();
  const deleteFeedback = useDeleteFeedback();

  function updateField(field: keyof FeedbackFormInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFeedbackForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      submitFeedback.reset();
      return;
    }

    submitFeedback.mutate(
      {
        title: form.title.trim(),
        description: form.description.trim(),
      },
      {
        onSuccess: () => {
          setForm({ title: '', description: '' });
          setErrors({});
        },
      },
    );
  }

  function handleDelete(feedbackId: string) {
    if (!window.confirm('Delete this feedback item? This action cannot be undone.')) {
      return;
    }

    setDeletingId(feedbackId);
    deleteFeedback.mutate(feedbackId, {
      onSettled: () => {
        setDeletingId(null);
      },
    });
  }

  const loadError = feedbackList.error
    ? getApiErrorMessage(feedbackList.error, 'Could not load your feedback right now.')
    : '';
  const submitError = submitFeedback.error
    ? getApiErrorMessage(submitFeedback.error, 'Could not submit feedback. Try again.')
    : '';
  const deleteError = deleteFeedback.error
    ? getApiErrorMessage(deleteFeedback.error, 'Could not delete this feedback. Try again.')
    : '';

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="px-5 py-6 sm:px-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <MessageSquareTextIcon className="size-4 text-primary" />
            Submit feedback
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <AuthFormError message={submitError} />
            <AuthField
              label="Title"
              name="feedbackTitle"
              required
              value={form.title}
              maxLength={FEEDBACK_FIELD_LIMITS.titleMax}
              error={errors.title}
              onChange={(event) => updateField('title', event.target.value)}
            />
            <AuthField
              label="Description"
              name="feedbackDescription"
              required
              hint={`${FEEDBACK_FIELD_LIMITS.descriptionMin} to ${FEEDBACK_FIELD_LIMITS.descriptionMax} characters.`}
              error={errors.description}
            >
              <Textarea
                id="feedbackDescription"
                name="feedbackDescription"
                rows={4}
                value={form.description}
                maxLength={FEEDBACK_FIELD_LIMITS.descriptionMax}
                aria-invalid={errors.description ? true : undefined}
                className={errors.description ? 'border-destructive' : undefined}
                onChange={(event) => updateField('description', event.target.value)}
              />
            </AuthField>
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={submitFeedback.isPending}>
                <SendIcon className="size-4" />
                {submitFeedback.isPending ? 'Submitting…' : 'Submit feedback'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="px-5 py-6 sm:px-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <Clock3Icon className="size-4 text-primary" />
            Your feedback
          </h2>
          <AuthFormError message={loadError || deleteError} />
          {feedbackList.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading your feedback…</p>
          ) : null}
          {!feedbackList.isLoading && !loadError && (feedbackList.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground">You have not submitted feedback yet.</p>
          ) : null}
          {!feedbackList.isLoading && !loadError && (feedbackList.data?.length ?? 0) > 0 ? (
            <ul className="space-y-3">
              {feedbackList.data?.map((item) => {
                const status = item.status ?? 'open';
                return (
                  <li
                    key={item.id}
                    className="rounded-lg border border-border bg-background/80 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            'inline-flex rounded-full px-2 py-0.5 text-[11px]',
                            feedbackStatusClassName(status),
                          )}
                        >
                          {FEEDBACK_STATUS_LABELS[status]}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description || 'No description'}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        disabled={deleteFeedback.isPending && deletingId === item.id}
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2Icon className="size-3.5" />
                        {deleteFeedback.isPending && deletingId === item.id
                          ? 'Deleting…'
                          : 'Delete feedback'}
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
