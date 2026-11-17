import { useQuery } from '@tanstack/react-query';

import { adminFeedbacksRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';

export function useAdminFeedbacks(enabled = true) {
  return useQuery({
    queryKey: adminQueryKeys.feedbacks,
    queryFn: adminFeedbacksRequest,
    enabled,
  });
}
