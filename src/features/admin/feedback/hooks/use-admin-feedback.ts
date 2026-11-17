import { useQuery } from '@tanstack/react-query';

import { adminFeedbackRequest } from '@/features/admin/feedback/apis/feedback.api';
import { adminFeedbackQueryKeys } from '@/features/admin/feedback/constants/feedback.constants';

export function useAdminFeedback(feedbackId: string | null) {
  return useQuery({
    queryKey: feedbackId
      ? adminFeedbackQueryKeys.detail(feedbackId)
      : ['admin', 'feedbacks', 'none'],
    queryFn: () => adminFeedbackRequest(feedbackId as string),
    enabled: Boolean(feedbackId),
  });
}
