import { useQuery } from '@tanstack/react-query';

import { chatListRequest } from '@/features/chat/apis/chat.api';
import { chatQueryKeys } from '@/features/chat/constants/chat.constants';

export function useChatList(enabled = true) {
  return useQuery({
    queryKey: chatQueryKeys.list,
    queryFn: chatListRequest,
    enabled,
    staleTime: 15_000,
  });
}
