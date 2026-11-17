import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import {
  HistoryIcon,
  LoaderCircleIcon,
  MessageCircleIcon,
  PlusIcon,
  SendIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { CHAT_MESSAGE_FALLBACK_MAX } from '@/features/chat/constants/chat.constants';
import { useChatDetail } from '@/features/chat/hooks/use-chat-detail';
import { useChatList } from '@/features/chat/hooks/use-chat-list';
import { useCreateChat } from '@/features/chat/hooks/use-create-chat';
import { useDeleteChat } from '@/features/chat/hooks/use-delete-chat';
import { useSendChatMessage } from '@/features/chat/hooks/use-send-chat-message';
import type { ChatMessage, ChatUsage } from '@/features/chat/types/chat';
import { validateChatMessage } from '@/features/chat/utils/validation';
import { cn } from '@/lib/utils';
import type { FieldErrors } from '@/lib/zod-field-errors';
import { getApiErrorMessage } from '@/utils/axios';

type KitChatPanelProps = {
  kitLabel: string;
  section: string;
  topicTitle: string;
  onClose: () => void;
};

type PanelView = 'chat' | 'history';

function formatShortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function UsageStrip({ usage }: { usage: ChatUsage | undefined }) {
  if (!usage) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
      <span className="rounded-[var(--radius-control)] border border-border bg-background px-1.5 py-0.5">
        Chats {usage.chatsUsed}/{usage.chatsLimit}
      </span>
      <span className="rounded-[var(--radius-control)] border border-border bg-background px-1.5 py-0.5">
        Today {usage.messagesToday}/{usage.dailyMessageLimit}
      </span>
      <span className="rounded-[var(--radius-control)] border border-border bg-background px-1.5 py-0.5">
        Reset {usage.resetsAt}
      </span>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[92%] rounded-[var(--radius-control)] px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'border border-border bg-background text-foreground',
        )}
      >
        {message.text}
      </div>
    </div>
  );
}

export function KitChatPanel({ kitLabel, section, topicTitle, onClose }: KitChatPanelProps) {
  const [view, setView] = useState<PanelView>('chat');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [draftError, setDraftError] = useState<FieldErrors<'message'>>({});
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const chatList = useChatList();
  const chatDetail = useChatDetail(activeChatId);
  const createChat = useCreateChat();
  const sendMessage = useSendChatMessage();
  const deleteChat = useDeleteChat();

  const usage = chatDetail.data?.usage ?? chatList.data?.usage;
  const messages = chatDetail.data?.chat.messages ?? [];
  const activeTitle = chatDetail.data?.chat.title;
  const maxChars = usage?.maxMessageCharacters ?? CHAT_MESSAGE_FALLBACK_MAX;
  const isSending = createChat.isPending || sendMessage.isPending;
  const canStartChat = (usage?.chatsRemaining ?? 0) > 0;
  const canSendInChat =
    Boolean(activeChatId) &&
    (chatDetail.data?.chat.messagesRemainingInChat ?? 0) > 0 &&
    (usage?.messagesRemainingToday ?? 0) > 0;
  const canCompose =
    Boolean(draft.trim()) &&
    draft.trim().length <= maxChars &&
    !isSending &&
    (activeChatId ? canSendInChat : canStartChat && (usage?.messagesRemainingToday ?? 0) > 0);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, isSending, activeChatId]);

  function startNewChat() {
    setActiveChatId(null);
    setView('chat');
    setDraft('');
    setDraftError({});
    createChat.reset();
    sendMessage.reset();
  }

  function handleSelectChat(chatId: string) {
    setActiveChatId(chatId);
    setView('chat');
    createChat.reset();
    sendMessage.reset();
  }

  function handleDelete(chatId: string) {
    if (!window.confirm('Delete this chat? This frees a saved-chat slot.')) {
      return;
    }

    setDeletingId(chatId);
    deleteChat.mutate(chatId, {
      onSuccess: () => {
        if (activeChatId === chatId) {
          setActiveChatId(null);
        }
      },
      onSettled: () => {
        setDeletingId(null);
      },
    });
  }

  function submitMessage() {
    if (isSending) {
      return;
    }

    const nextErrors = validateChatMessage(draft, maxChars);
    setDraftError(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const message = draft.trim();
    if (activeChatId) {
      if (!canSendInChat) {
        return;
      }
      sendMessage.mutate(
        { chatId: activeChatId, message },
        {
          onSuccess: () => {
            setDraft('');
            setDraftError({});
          },
        },
      );
      return;
    }

    if (!canStartChat || (usage?.messagesRemainingToday ?? 0) <= 0) {
      return;
    }

    createChat.mutate(message, {
      onSuccess: (data) => {
        setActiveChatId(data.chat.id);
        setDraft('');
        setDraftError({});
      },
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  }

  const loadError = chatList.error
    ? getApiErrorMessage(chatList.error, 'Could not load chats.')
    : chatDetail.error
      ? getApiErrorMessage(chatDetail.error, 'Could not load this chat.')
      : '';
  const sendError = createChat.error
    ? getApiErrorMessage(createChat.error, 'Could not start chat.')
    : sendMessage.error
      ? getApiErrorMessage(sendMessage.error, 'Could not send message.')
      : '';

  return (
    <div className="flex h-full min-h-0 flex-col bg-card">
      <div className="shrink-0 border-b border-border px-3 py-2.5">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-border bg-background">
            <MessageCircleIcon className="size-4 text-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="truncate text-sm font-medium text-foreground">
                {activeTitle ?? 'Study chat'}
              </p>
              <div className="ml-auto flex shrink-0 items-center gap-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  title="Chat history"
                  aria-pressed={view === 'history'}
                  onClick={() => setView((current) => (current === 'history' ? 'chat' : 'history'))}
                >
                  <HistoryIcon className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  title="New chat"
                  onClick={startNewChat}
                >
                  <PlusIcon className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  title="Hide chat"
                  onClick={onClose}
                >
                  <XIcon className="size-3.5" />
                </Button>
              </div>
            </div>
            <p className="truncate text-xs text-muted-foreground">
              {kitLabel} · {section} · {topicTitle}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <UsageStrip usage={usage} />
        </div>
      </div>

      {view === 'history' ? (
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-2 p-3">
            {chatList.isLoading ? (
              <p className="text-sm text-muted-foreground">Loading chats…</p>
            ) : loadError ? (
              <p className="text-sm text-destructive">{loadError}</p>
            ) : (chatList.data?.chats.length ?? 0) === 0 ? (
              <p className="text-sm text-muted-foreground">No saved chats yet.</p>
            ) : (
              chatList.data?.chats.map((chat) => {
                const isActive = chat.id === activeChatId;
                return (
                  <div
                    key={chat.id}
                    className={cn(
                      'flex items-start gap-2 rounded-[var(--radius-control)] border px-2.5 py-2',
                      isActive ? 'border-primary/30 bg-primary/10' : 'border-border bg-background',
                    )}
                  >
                    <button
                      type="button"
                      className="min-w-0 flex-1 text-left"
                      onClick={() => handleSelectChat(chat.id)}
                    >
                      <p className="truncate text-sm font-medium text-foreground">{chat.title}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {chat.userMessageCount} msg · {formatShortDate(chat.updatedAt)}
                      </p>
                    </button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      title="Delete chat"
                      disabled={deletingId === chat.id}
                      onClick={() => handleDelete(chat.id)}
                    >
                      {deletingId === chat.id ? (
                        <LoaderCircleIcon className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2Icon className="size-3.5 text-destructive" />
                      )}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      ) : (
        <>
          <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-3 p-3">
              {!activeChatId && messages.length === 0 ? (
                <div className="rounded-[var(--radius-control)] border border-dashed border-border bg-background px-3 py-4 text-sm text-muted-foreground">
                  Ask about this topic and get a study-focused reply. Limits apply per chat and per
                  day.
                </div>
              ) : null}

              {activeChatId && chatDetail.isLoading ? (
                <p className="text-sm text-muted-foreground">Loading conversation…</p>
              ) : null}

              {loadError && activeChatId ? (
                <p className="text-sm text-destructive">{loadError}</p>
              ) : null}

              {messages.map((message, index) => (
                <MessageBubble key={`${message.createdAt}-${index}`} message={message} />
              ))}

              {isSending ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-[var(--radius-control)] border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                    <LoaderCircleIcon className="size-3.5 animate-spin" />
                    Thinking…
                  </div>
                </div>
              ) : null}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="shrink-0 border-t border-border bg-card p-3">
            {sendError ? <p className="mb-2 text-xs text-destructive">{sendError}</p> : null}
            {!activeChatId && !canStartChat ? (
              <p className="mb-2 text-xs text-muted-foreground">
                Saved chat limit reached. Delete a chat to start another.
              </p>
            ) : null}
            {activeChatId &&
            chatDetail.data &&
            chatDetail.data.chat.messagesRemainingInChat === 0 ? (
              <p className="mb-2 text-xs text-muted-foreground">
                This chat is full. Start a new chat to continue.
              </p>
            ) : null}
            {usage && usage.messagesRemainingToday === 0 ? (
              <p className="mb-2 text-xs text-muted-foreground">
                Daily message limit reached. Resets at {usage.resetsAt}.
              </p>
            ) : null}
            <Textarea
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                if (draftError.message) {
                  setDraftError({});
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder={`Ask about ${topicTitle}…`}
              maxLength={maxChars}
              disabled={isSending}
              className={cn(
                'min-h-[4.5rem] resize-none text-sm',
                draftError.message && 'border-destructive',
              )}
              aria-invalid={draftError.message ? true : undefined}
              aria-label="Chat message"
            />
            {draftError.message ? (
              <p className="mt-1.5 text-xs text-destructive">{draftError.message}</p>
            ) : null}
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-[11px] text-muted-foreground">
                {draft.trim().length}/{maxChars}
              </p>
              <Button type="submit" size="sm" disabled={!canCompose} className="gap-1.5">
                {isSending ? (
                  <LoaderCircleIcon className="size-3.5 animate-spin" />
                ) : (
                  <SendIcon className="size-3.5" />
                )}
                {activeChatId ? 'Send' : 'Start'}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
