import { useMutation, useQueryClient } from '@tanstack/react-query';

import { sendChatMessageRequest } from '@/features/chat/apis/chat.api';
import { chatQueryKeys } from '@/features/chat/constants/chat.constants';

export function useSendChatMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId, message }: { chatId: string; message: string }) =>
      sendChatMessageRequest(chatId, message),
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
