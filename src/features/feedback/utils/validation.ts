import { z } from 'zod';

import { FEEDBACK_FIELD_LIMITS } from '@/features/feedback/constants/feedback.constants';
import { toFieldErrors, type FieldErrors } from '@/lib/zod-field-errors';

export type FeedbackFormInput = {
  title: string;
  description: string;
};

const feedbackSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required.')
    .min(
      FEEDBACK_FIELD_LIMITS.titleMin,
      `Title must be at least ${FEEDBACK_FIELD_LIMITS.titleMin} characters.`,
    )
    .max(
      FEEDBACK_FIELD_LIMITS.titleMax,
      `Title cannot exceed ${FEEDBACK_FIELD_LIMITS.titleMax} characters.`,
    ),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required.')
    .min(
      FEEDBACK_FIELD_LIMITS.descriptionMin,
      `Description must be at least ${FEEDBACK_FIELD_LIMITS.descriptionMin} characters.`,
    )
    .max(
      FEEDBACK_FIELD_LIMITS.descriptionMax,
      `Description cannot exceed ${FEEDBACK_FIELD_LIMITS.descriptionMax} characters.`,
    ),
});

export function validateFeedbackForm(
  input: FeedbackFormInput,
): FieldErrors<'title' | 'description'> {
  const result = feedbackSchema.safeParse(input);
  if (result.success) {
    return {};
  }
  return toFieldErrors(result.error, ['title', 'description']);
}
