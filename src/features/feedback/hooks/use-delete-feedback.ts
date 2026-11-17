import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFeedbackRequest } from '@/features/feedback/apis/feedback.api';
import { feedbackQueryKeys } from '@/features/feedback/constants/feedback.constants';

export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackId: string) => deleteFeedbackRequest(feedbackId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: feedbackQueryKeys.list });
    },
  });
}
