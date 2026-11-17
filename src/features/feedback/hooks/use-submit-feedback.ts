import { useMutation, useQueryClient } from '@tanstack/react-query';

import { submitFeedbackRequest } from '@/features/feedback/apis/feedback.api';
import { feedbackQueryKeys } from '@/features/feedback/constants/feedback.constants';
import type { SubmitFeedbackInput } from '@/features/feedback/types/feedback';

export function useSubmitFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SubmitFeedbackInput) => submitFeedbackRequest(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: feedbackQueryKeys.list });
    },
  });
}
