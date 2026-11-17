import { useQuery } from '@tanstack/react-query';

import { adminFeedbacksRequest } from '@/features/admin/feedback/apis/feedback.api';
import { adminFeedbackQueryKeys } from '@/features/admin/feedback/constants/feedback.constants';

export function useAdminFeedbacks(enabled = true) {
  return useQuery({
    queryKey: adminFeedbackQueryKeys.list,
    queryFn: adminFeedbacksRequest,
    enabled,
  });
}
