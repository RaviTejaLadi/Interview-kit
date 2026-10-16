import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2Icon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  CircleIcon,
  StarIcon,
} from 'lucide-react';

import { MarkdownPreview } from '@/components/markdown-preview';
import { TopicStepButtons } from '@/components/topic-navigator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { TopicProgressMap } from '@/hooks/use-topic-progress';
import type { Topic } from '@/lib/content-index';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

type TopicAccordionProps = {
  title: string;
  section: string;
  topics: Topic[];
  contentById: Record<string, string>;
  isLoading: boolean;
  theme: Theme;
  topicProgressById: TopicProgressMap;
  focusedTopicId?: string | null;
  previousTopic: { id: string; title: string } | null;
  nextTopic: { id: string; title: string } | null;
  onToggleTopicCompleted: (topicId: string) => void;
  onToggleTopicImportant: (topicId: string) => void;
  onSetAllTopicsCompleted: (topicIds: string[], completed: boolean) => void;
  onSetAllTopicsImportant: (topicIds: string[], important: boolean) => void;
  onSelectTopic: (topicId: string) => void;
  onInternalLink: (fromPath: string, href: string) => boolean;
};

function hasOwn(obj: Record<string, string>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function TopicAccordion({
  title,
  section,
  topics,
  contentById,
  isLoading,
  theme,
  topicProgressById,
  focusedTopicId = null,
  previousTopic,
  nextTopic,
  onToggleTopicCompleted,
  onToggleTopicImportant,
  onSetAllTopicsCompleted,
  onSetAllTopicsImportant,
  onSelectTopic,
  onInternalLink,
}: TopicAccordionProps) {
  const topicIdsKey = topics.map((topic) => topic.id).join('\0');
  const topicIds = useMemo(() => (topicIdsKey ? topicIdsKey.split('\0') : []), [topicIdsKey]);
  const [openItems, setOpenItems] = useState<string[]>(
    focusedTopicId && topicIds.includes(focusedTopicId) ? [focusedTopicId] : [],
  );
  const [renderedIds, setRenderedIds] = useState<Set<string>>(
    () => new Set(focusedTopicId && topicIds.includes(focusedTopicId) ? [focusedTopicId] : []),
  );

  useEffect(() => {
    if (!focusedTopicId || !topicIds.includes(focusedTopicId)) {
      return;
    }

    setOpenItems((current) =>
      current.includes(focusedTopicId) ? current : [...current, focusedTopicId],
    );
    setRenderedIds((current) => {
      if (current.has(focusedTopicId)) {
        return current;
      }

      const next = new Set(current);
      next.add(focusedTopicId);
      return next;
    });

    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(`topic-accordion-${focusedTopicId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusedTopicId, topicIds]);

  const allOpen = openItems.length === topicIds.length && topicIds.length > 0;
  const completedCount = useMemo(
    () =>
      topics.reduce(
        (count, topic) => count + (topicProgressById[topic.id]?.completed ? 1 : 0),
        0,
      ),
    [topicProgressById, topics],
  );
  const importantCount = useMemo(
    () =>
      topics.reduce(
        (count, topic) => count + (topicProgressById[topic.id]?.important ? 1 : 0),
        0,
      ),
    [topicProgressById, topics],
  );
  const allCompleted = topics.length > 0 && completedCount === topics.length;
  const allImportant = topics.length > 0 && importantCount === topics.length;

  const handleOpenChange = (next: Array<string | number>) => {
    const nextIds = next.map(String);
    setOpenItems(nextIds);
    setRenderedIds((current) => {
      let changed = false;
      const rendered = new Set(current);

      for (const id of nextIds) {
        if (!rendered.has(id)) {
          rendered.add(id);
          changed = true;
        }
      }

      return changed ? rendered : current;
    });
  };

  const handleToggleAll = () => {
    if (allOpen) {
      setOpenItems([]);
      return;
    }

    setOpenItems(topicIds);
    setRenderedIds(new Set(topicIds));
  };

  return (
    <div className="bg-card p-4 sm:p-5 lg:p-8">
      <div className="mb-4 flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="hud-label text-muted-foreground">{section}</p>
          <h1 className="font-display mt-1 text-2xl text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {topics.length} question{topics.length === 1 ? '' : 's'}. Open any item, or expand the
            whole page.
          </p>
          <p className="hud-label mt-2 text-faint">
            {completedCount}/{topics.length} completed · {importantCount} important
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <TopicStepButtons
            previousTopic={previousTopic}
            nextTopic={nextTopic}
            onSelect={onSelectTopic}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSetAllTopicsCompleted(topicIds, !allCompleted)}
            className="border-line-strong bg-transparent font-mono text-[11px] font-bold tracking-[0.12em] uppercase"
            title={allCompleted ? 'Mark entire section as unread' : 'Mark entire section as read'}
          >
            {allCompleted ? 'Mark all unread' : 'Mark all read'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSetAllTopicsImportant(topicIds, !allImportant)}
            className="border-line-strong bg-transparent font-mono text-[11px] font-bold tracking-[0.12em] uppercase"
            title={allImportant ? 'Remove important flag from all topics' : 'Mark all as important'}
          >
            {allImportant ? 'Unstar all' : 'Star all'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleToggleAll}
            className={cn(
              'border-line-strong bg-transparent font-mono text-[11px] font-bold tracking-[0.12em] uppercase opacity-0 transition-opacity duration-150',
              'group-hover/reader:opacity-100 group-focus-within/reader:opacity-100',
              '[@media(hover:none)]:opacity-100',
            )}
          >
            {allOpen ? <ChevronsDownUpIcon /> : <ChevronsUpDownIcon />}
            {allOpen ? 'Collapse all' : 'Expand all'}
          </Button>
        </div>
      </div>

      <Accordion
        multiple
        value={openItems}
        onValueChange={handleOpenChange}
        className="w-full gap-3"
      >
        {topics.map((topic) => {
          const hasContent = hasOwn(contentById, topic.id);
          const content = contentById[topic.id] ?? '';
          const shouldRender = renderedIds.has(topic.id);
          const topicProgress = topicProgressById[topic.id];
          const isCompleted = topicProgress?.completed === true;
          const isImportant = topicProgress?.important === true;

          return (
            <AccordionItem
              key={topic.id}
              id={`topic-accordion-${topic.id}`}
              value={topic.id}
              className="scroll-mt-24 overflow-hidden border border-border"
            >
              <div className="flex items-stretch border-b border-border bg-muted/10">
                <AccordionTrigger className="rounded-none border-0 px-4 py-3.5 hover:bg-muted/40 hover:no-underline data-panel-open:bg-muted/30">
                  <span className="font-display min-w-0 flex-1 text-lg leading-tight text-foreground">
                    {topic.title}
                  </span>
                </AccordionTrigger>
                <div className="ml-auto flex shrink-0 items-center justify-end gap-1 border-l border-border px-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onToggleTopicCompleted(topic.id)}
                    aria-pressed={isCompleted}
                    aria-label={isCompleted ? 'Mark topic as unread' : 'Mark topic as read'}
                    title={isCompleted ? 'Read' : 'Mark as read'}
                    className={cn(isCompleted ? 'text-emerald-500' : 'text-muted-foreground')}
                  >
                    {isCompleted ? <CheckCircle2Icon className="size-3.5" /> : <CircleIcon className="size-3.5" />}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => onToggleTopicImportant(topic.id)}
                    aria-pressed={isImportant}
                    aria-label={isImportant ? 'Remove topic from important' : 'Mark topic as important'}
                    title={isImportant ? 'Marked important' : 'Mark as important'}
                    className={cn(
                      isImportant ? 'text-amber-500' : 'text-muted-foreground',
                    )}
                  >
                    <StarIcon className={cn('size-3.5', isImportant && 'fill-amber-400')} />
                  </Button>
                </div>
              </div>
              <AccordionContent className="border-t border-border px-4 pt-4 sm:px-5 [&_.markdown-body>div]:ml-0 [&_.markdown-body_h1]:pl-0 [&_.markdown-body_h2]:pl-0 [&_.markdown-body_h3]:pl-0 [&_.markdown-body_h4]:pl-0 [&_.markdown-body_h5]:pl-0 [&_.markdown-body_h6]:pl-0 [&_.markdown-body_p]:pl-0">
                {shouldRender ? (
                  isLoading && !hasContent ? (
                    <p className="text-sm text-muted-foreground">Loading…</p>
                  ) : hasContent ? (
                    <div className="[&_.markdown-body_h1:first-child]:hidden">
                      <MarkdownPreview
                        content={content}
                        theme={theme}
                        onInternalLink={(href) => onInternalLink(topic.path, href)}
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-red-600">Could not load this file.</p>
                  )
                ) : null}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
