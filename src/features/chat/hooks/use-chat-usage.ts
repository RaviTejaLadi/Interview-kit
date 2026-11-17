import { useQuery } from '@tanstack/react-query';

import { chatUsageRequest } from '@/features/chat/apis/chat.api';
import { chatQueryKeys } from '@/features/chat/constants/chat.constants';

export function useChatUsage(enabled = true) {
  return useQuery({
    queryKey: chatQueryKeys.usage,
    queryFn: chatUsageRequest,
    enabled,
    staleTime: 30_000,
  });
}
