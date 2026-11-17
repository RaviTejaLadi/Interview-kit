import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAdminFeedbackRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';

export function useDeleteAdminFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackId: string) => deleteAdminFeedbackRequest(feedbackId),
    onSuccess: (_value, feedbackId) => {
      queryClient.removeQueries({ queryKey: adminQueryKeys.feedback(feedbackId), exact: true });
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.feedbacks });
    },
  });
}
