import { useQuery } from '@tanstack/react-query';

import { feedbackListRequest } from '@/features/feedback/apis/feedback.api';
import { feedbackQueryKeys } from '@/features/feedback/constants/feedback.constants';

export function useFeedbackList(enabled = true) {
  return useQuery({
    queryKey: feedbackQueryKeys.list,
    queryFn: feedbackListRequest,
    enabled,
  });
}
