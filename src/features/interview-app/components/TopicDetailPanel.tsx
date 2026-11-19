import { CheckCircle2Icon, CircleIcon, MessageCircleIcon, StarIcon } from 'lucide-react';

import { MarkdownPreview } from '@/components/MarkdownPreview';
import { TopicStepButtons } from '@/components/TopicNavigator';
import { Button } from '@/components/ui/button';
import type { Theme } from '@/features/interview-app/lib/navigation';
import type { TopicProgressEntry } from '@/hooks/use-topic-progress';
import type { Topic } from '@/lib/content-index';
import { cn } from '@/lib/utils';

type NavTarget = {
  id: string;
  title: string;
};

type TopicDetailPanelProps = {
  selectedTopic: Topic | null;
  selectedTopicProgress: TopicProgressEntry | null;
  previousTopic: NavTarget | null;
  nextTopic: NavTarget | null;
  isRightPanelOpen: boolean;
  onToggleRightPanel: () => void;
  onSelectTopic: (topicId: string) => void;
  onToggleTopicCompleted: (topicId: string) => void;
  onToggleTopicImportant: (topicId: string) => void;
  isLoading: boolean;
  hasSelectedTopicContent: boolean;
  loadError: string;
  content: string;
  theme: Theme;
  onInternalLink: (href: string) => boolean;
};

export function TopicDetailPanel({
  selectedTopic,
  selectedTopicProgress,
  previousTopic,
  nextTopic,
  isRightPanelOpen,
  onToggleRightPanel,
  onSelectTopic,
  onToggleTopicCompleted,
  onToggleTopicImportant,
  isLoading,
  hasSelectedTopicContent,
  loadError,
  content,
  theme,
  onInternalLink,
}: TopicDetailPanelProps) {
  return (
    <div className="bg-background p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        {selectedTopic && selectedTopicProgress ? (
          <div className="flex items-center gap-1 rounded-(--radius-control) border border-border bg-background p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onToggleTopicCompleted(selectedTopic.id)}
              aria-pressed={selectedTopicProgress.completed}
              aria-label={
                selectedTopicProgress.completed ? 'Mark topic as unread' : 'Mark topic as read'
              }
              title={selectedTopicProgress.completed ? 'Read' : 'Mark as read'}
            >
              {selectedTopicProgress.completed ? (
                <CheckCircle2Icon className="size-3.5 text-emerald-500" />
              ) : (
                <CircleIcon className="size-3.5 text-muted-foreground" />
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onToggleTopicImportant(selectedTopic.id)}
              aria-pressed={selectedTopicProgress.important}
              aria-label={
                selectedTopicProgress.important
                  ? 'Remove topic from important'
                  : 'Mark topic as important'
              }
              title={selectedTopicProgress.important ? 'Marked important' : 'Mark as important'}
            >
              <StarIcon
                className={cn(
                  'size-3.5',
                  selectedTopicProgress.important
                    ? 'fill-amber-400 text-amber-500'
                    : 'text-muted-foreground',
                )}
              />
            </Button>
          </div>
        ) : null}
        <TopicStepButtons
          previousTopic={previousTopic}
          nextTopic={nextTopic}
          onSelect={onSelectTopic}
        />
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          className="border-border bg-card"
          onClick={onToggleRightPanel}
          aria-pressed={isRightPanelOpen}
          aria-label={isRightPanelOpen ? 'Hide chat panel' : 'Open chat panel'}
          title={isRightPanelOpen ? 'Hide chat' : 'Open chat'}
        >
          <MessageCircleIcon className="size-3.5" />
        </Button>
      </div>
      {isLoading && !hasSelectedTopicContent ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : loadError ? (
        <p className="text-sm text-destructive">Could not load this file. {loadError}</p>
      ) : (
        <MarkdownPreview content={content} theme={theme} onInternalLink={onInternalLink} />
      )}
    </div>
  );
}
