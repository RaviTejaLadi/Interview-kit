import { ArrowLeftIcon, CheckCircle2Icon, CircleIcon, StarIcon } from 'lucide-react';

import { MarkdownPreview } from '@/components/markdown-preview';
import { TopicStepButtons } from '@/components/topic-navigator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { GuideProgressEntry } from '@/hooks/use-guide-progress';
import type { Guide } from '@/lib/guides-index';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

type GuideLink = {
  id: string;
  title: string;
};

type GuideReaderProps = {
  guide: Guide;
  content: string;
  isLoading: boolean;
  loadError: string;
  theme: Theme;
  progress: GuideProgressEntry;
  previousGuide: GuideLink | null;
  nextGuide: GuideLink | null;
  onBack: () => void;
  onOpenGuide: (guideId: string) => void;
  onToggleRead: () => void;
  onToggleStarred: () => void;
};

function formatPublishedDate(date: string) {
  try {
    return new Date(date).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return date;
  }
}

export function GuideReader({
  guide,
  content,
  isLoading,
  loadError,
  theme,
  progress,
  previousGuide,
  nextGuide,
  onBack,
  onOpenGuide,
  onToggleRead,
  onToggleStarred,
}: GuideReaderProps) {
  const isRead = progress.read;
  const isStarred = progress.starred;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Card className="overflow-hidden">
        <div className="border-b border-border bg-card p-4 sm:p-5 lg:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeftIcon className="size-4" />
              Back to guides
            </Button>
            <div className="flex items-center gap-2">
              <TopicStepButtons previousTopic={previousGuide} nextTopic={nextGuide} onSelect={onOpenGuide} />
              <div className="flex items-center gap-1 rounded-[var(--radius-control)] border border-border bg-background p-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-pressed={isRead}
                  aria-label={isRead ? 'Mark guide as unread' : 'Mark guide as read'}
                  title={isRead ? 'Read' : 'Mark as read'}
                  onClick={onToggleRead}
                >
                  {isRead ? (
                    <CheckCircle2Icon className="size-3.5 text-emerald-500" />
                  ) : (
                    <CircleIcon className="size-3.5 text-muted-foreground" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-pressed={isStarred}
                  aria-label={isStarred ? 'Unstar guide' : 'Star guide'}
                  title={isStarred ? 'Starred' : 'Star guide'}
                  onClick={onToggleStarred}
                >
                  <StarIcon
                    className={cn(
                      'size-3.5',
                      isStarred ? 'fill-amber-400 text-amber-500' : 'text-muted-foreground',
                    )}
                  />
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {guide.topic} · {guide.readTimeMinutes} min read · {formatPublishedDate(guide.publishedAt)}
          </p>
          <h1 className="mt-2 text-2xl text-foreground sm:text-3xl lg:text-4xl">{guide.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">{guide.summary}</p>
        </div>
        <CardContent className="p-4 sm:p-5 lg:p-6">
          {isLoading && !content ? (
            <p className="text-sm text-muted-foreground">Loading guide...</p>
          ) : loadError ? (
            <p className="text-sm text-destructive">{loadError}</p>
          ) : (
            <div className="[&_.markdown-body_h1:first-child]:hidden">
              <MarkdownPreview content={content} theme={theme} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
