export type ChatRole = 'user' | 'model';

export type ChatMessage = {
  role: ChatRole;
  text: string;
  createdAt: string;
};

export type ChatSummary = {
  id: string;
  title: string;
  userMessageCount: number;
  messagesRemainingInChat: number;
  createdAt: string;
  updatedAt: string;
};

export type ChatDetail = ChatSummary & {
  messages: ChatMessage[];
};

export type ChatUsage = {
  chatsUsed: number;
  chatsLimit: number;
  chatsRemaining: number;
  messagesToday: number;
  dailyMessageLimit: number;
  messagesRemainingToday: number;
  messagesPerChatLimit: number;
  maxMessageCharacters: number;
  resetsAt: string;
};

export type ChatListResult = {
  chats: ChatSummary[];
  usage: ChatUsage;
};

export type ChatDetailResult = {
  chat: ChatDetail;
  usage: ChatUsage;
};

export type ChatMutationResult = {
  chat: ChatDetail;
  reply: string;
  usage: ChatUsage;
};

export type ChatDeleteResult = {
  usage: ChatUsage;
};
