export const chatQueryKeys = {
  usage: ['chat', 'usage'] as const,
  list: ['chat', 'list'] as const,
  detail: (id: string) => ['chat', 'detail', id] as const,
};

export const CHAT_PANEL_WIDTH_STORAGE_KEY = 'interview-kit-chat-panel-width';
export const CHAT_PANEL_WIDTH_DEFAULT = 360;
export const CHAT_PANEL_WIDTH_MIN = 280;
export const CHAT_PANEL_WIDTH_MAX = 560;
export const CHAT_MESSAGE_FALLBACK_MAX = 2000;
