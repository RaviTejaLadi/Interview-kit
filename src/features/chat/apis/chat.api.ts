import type {
  ChatDeleteResult,
  ChatDetailResult,
  ChatListResult,
  ChatMutationResult,
  ChatUsage,
} from '@/features/chat/types/chat';
import type { IHttpResponse } from '@/types/http-response';
import withApiBoundary from '@/utils/apiErrorBoundary';
import { api } from '@/utils/axios';
import { apiUrls } from '@/utils/urls';

export async function chatUsageRequest() {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<{ usage: ChatUsage }>>(apiUrls.chatUsage),
    'Could not load chat limits.',
    { silentSuccess: true },
  );
  return body.data.usage;
}

export async function chatListRequest() {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<ChatListResult>>(apiUrls.chat),
    'Could not load your chats.',
    { silentSuccess: true },
  );
  return body.data;
}

export async function chatDetailRequest(chatId: string) {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<ChatDetailResult>>(`${apiUrls.chat}/${chatId}`),
    'Could not load this chat.',
    { silentSuccess: true },
  );
  return body.data;
}

export async function createChatRequest(message: string) {
  const body = await withApiBoundary(
    () => api.post<IHttpResponse<ChatMutationResult>>(apiUrls.chat, { message }),
    'Could not start this chat. Try again.',
  );
  return body.data;
}

export async function sendChatMessageRequest(chatId: string, message: string) {
  const body = await withApiBoundary(
    () =>
      api.post<IHttpResponse<ChatMutationResult>>(`${apiUrls.chat}/${chatId}/messages`, {
        message,
      }),
    'Could not send this message. Try again.',
  );
  return body.data;
}

export async function deleteChatRequest(chatId: string) {
  const body = await withApiBoundary(
    () => api.delete<IHttpResponse<ChatDeleteResult>>(`${apiUrls.chat}/${chatId}`),
    'Could not delete this chat. Try again.',
  );
  return body.data;
}
