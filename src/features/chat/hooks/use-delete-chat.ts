import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteChatRequest } from '@/features/chat/apis/chat.api';
import { chatQueryKeys } from '@/features/chat/constants/chat.constants';

export function useDeleteChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => deleteChatRequest(chatId),
    onSuccess: (_data, chatId) => {
      void queryClient.invalidateQueries({ queryKey: chatQueryKeys.list });
      void queryClient.invalidateQueries({ queryKey: chatQueryKeys.usage });
      queryClient.removeQueries({ queryKey: chatQueryKeys.detail(chatId) });
    },
  });
}
