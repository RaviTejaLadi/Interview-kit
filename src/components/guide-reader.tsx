import { ArrowLeftIcon, CheckCircle2Icon, CircleIcon, StarIcon } from 'lucide-react';

import { MarkdownPreview } from '@/components/markdown-preview';
import { TopicStepButtons } from '@/components/topic-navigator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
  relatedGuides: Guide[];
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
  relatedGuides,
}: GuideReaderProps) {
  const isRead = progress.read;
  const isStarred = progress.starred;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <div className="mb-5 border-b border-border pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeftIcon className="size-4" />
            Back to guides
          </Button>
          <div className="flex items-center gap-1 border border-border bg-card p-1">
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

        <p className="hud-label text-faint mt-4">
          {guide.topic} · {guide.readTimeMinutes} min read · {formatPublishedDate(guide.publishedAt)}
        </p>
        <h1 className="font-display mt-2 text-3xl text-foreground sm:text-4xl">{guide.title}</h1>
        <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-6">{guide.summary}</p>
      </div>

      <div className="mb-4 flex justify-end">
        <TopicStepButtons previousTopic={previousGuide} nextTopic={nextGuide} onSelect={onOpenGuide} />
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-4 sm:p-5 lg:p-8">
          {isLoading && !content ? (
            <p className="text-sm text-muted-foreground">Loading guide...</p>
          ) : loadError ? (
            <p className="text-sm text-destructive">{loadError}</p>
          ) : (
            <MarkdownPreview content={content} theme={theme} />
          )}
        </CardContent>
      </Card>

      {relatedGuides.length > 0 ? (
        <section className="mt-8 border-t border-border pt-6">
          <p className="hud-label text-faint">Related guides</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {relatedGuides.map((related) => (
              <Card key={related.id}>
                <CardHeader className="p-4 pb-2">
                  <Badge variant="outline" className="w-fit">
                    {related.topic}
                  </Badge>
                  <CardTitle className="mt-2">{related.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardDescription>{related.summary}</CardDescription>
                  <Separator className="my-3" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenGuide(related.id)}
                  >
                    Open guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
