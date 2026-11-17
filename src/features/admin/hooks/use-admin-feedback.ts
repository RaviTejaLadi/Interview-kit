import { useQuery } from '@tanstack/react-query';

import { adminFeedbackRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';

export function useAdminFeedback(feedbackId: string | null) {
  return useQuery({
    queryKey: feedbackId ? adminQueryKeys.feedback(feedbackId) : ['admin', 'feedbacks', 'none'],
    queryFn: () => adminFeedbackRequest(feedbackId as string),
    enabled: Boolean(feedbackId),
  });
}
