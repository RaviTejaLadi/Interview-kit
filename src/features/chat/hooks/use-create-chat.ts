import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createChatRequest } from '@/features/chat/apis/chat.api';
import { chatQueryKeys } from '@/features/chat/constants/chat.constants';

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => createChatRequest(message),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: chatQueryKeys.list });
      void queryClient.invalidateQueries({ queryKey: chatQueryKeys.usage });
      queryClient.setQueryData(chatQueryKeys.detail(data.chat.id), {
        chat: data.chat,
        usage: data.usage,
      });
    },
  });
}
