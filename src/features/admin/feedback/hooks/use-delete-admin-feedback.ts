import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAdminFeedbackRequest } from '@/features/admin/feedback/apis/feedback.api';
import { adminFeedbackQueryKeys } from '@/features/admin/feedback/constants/feedback.constants';

export function useDeleteAdminFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackId: string) => deleteAdminFeedbackRequest(feedbackId),
    onSuccess: (_value, feedbackId) => {
      queryClient.removeQueries({
        queryKey: adminFeedbackQueryKeys.detail(feedbackId),
        exact: true,
      });
      void queryClient.invalidateQueries({ queryKey: adminFeedbackQueryKeys.list });
    },
  });
}
