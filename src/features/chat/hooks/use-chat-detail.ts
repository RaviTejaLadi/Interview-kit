import { useQuery } from '@tanstack/react-query';

import { chatDetailRequest } from '@/features/chat/apis/chat.api';
import { chatQueryKeys } from '@/features/chat/constants/chat.constants';

export function useChatDetail(chatId: string | null, enabled = true) {
  return useQuery({
    queryKey: chatQueryKeys.detail(chatId ?? 'none'),
    queryFn: () => chatDetailRequest(chatId as string),
    enabled: Boolean(chatId) && enabled,
    staleTime: 10_000,
  });
}
