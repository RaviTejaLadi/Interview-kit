import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAdminFeedbackRequest } from '@/features/admin/feedback/apis/feedback.api';
import { adminFeedbackQueryKeys } from '@/features/admin/feedback/constants/feedback.constants';
import type { AdminUpdateFeedbackInput } from '@/features/admin/feedback/types/feedback';
import { feedbackQueryKeys } from '@/features/feedback/constants/feedback.constants';

export function useUpdateAdminFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ feedbackId, input }: { feedbackId: string; input: AdminUpdateFeedbackInput }) =>
      updateAdminFeedbackRequest(feedbackId, input),
    onSuccess: (feedback) => {
      queryClient.setQueryData(adminFeedbackQueryKeys.detail(feedback.id), feedback);
      void queryClient.invalidateQueries({ queryKey: adminFeedbackQueryKeys.list });
      void queryClient.invalidateQueries({ queryKey: feedbackQueryKeys.list });
    },
  });
}
