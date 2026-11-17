import { useState, type FormEvent } from 'react';
import { SendIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AuthField, AuthFormError } from '@/features/auth/components/AuthField';
import { FEEDBACK_FIELD_LIMITS } from '@/features/feedback/constants/feedback.constants';
import { useSubmitFeedback } from '@/features/feedback/hooks/use-submit-feedback';
import { validateFeedbackForm, type FeedbackFormInput } from '@/features/feedback/utils/validation';
import type { FieldErrors } from '@/lib/zod-field-errors';
import { getApiErrorMessage } from '@/utils/axios';

const emptyForm: FeedbackFormInput = { title: '', description: '' };

export function FeedbackFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const submitFeedback = useSubmitFeedback();
  const [form, setForm] = useState<FeedbackFormInput>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors<'title' | 'description'>>({});

  function updateField(field: keyof FeedbackFormInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setForm(emptyForm);
      setErrors({});
      submitFeedback.reset();
    }
    onOpenChange(nextOpen);
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
          setForm(emptyForm);
          setErrors({});
          onOpenChange(false);
        },
      },
    );
  }

  const submitError = submitFeedback.error
    ? getApiErrorMessage(submitFeedback.error, 'Could not submit feedback. Try again.')
    : '';

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {open ? (
        <DialogContent className="max-h-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add feedback</DialogTitle>
            <DialogDescription>Share feedback about the interview kits.</DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
