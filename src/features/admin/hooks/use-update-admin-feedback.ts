import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAdminFeedbackRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';
import type { AdminUpdateFeedbackInput } from '@/features/admin/types/admin';
import { feedbackQueryKeys } from '@/features/feedback/constants/feedback.constants';

export function useUpdateAdminFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      feedbackId,
      input,
    }: {
      feedbackId: string;
      input: AdminUpdateFeedbackInput;
    }) => updateAdminFeedbackRequest(feedbackId, input),
    onSuccess: (feedback) => {
      queryClient.setQueryData(adminQueryKeys.feedback(feedback.id), feedback);
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.feedbacks });
      void queryClient.invalidateQueries({ queryKey: feedbackQueryKeys.list });
    },
  });
}
