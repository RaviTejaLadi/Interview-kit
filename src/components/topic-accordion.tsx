import { useEffect, useMemo, useState } from 'react';
import { ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';

import { MarkdownPreview } from '@/components/markdown-preview';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { Topic } from '@/lib/content-index';

type Theme = 'light' | 'dark';

type TopicAccordionProps = {
  title: string;
  section: string;
  topics: Topic[];
  contentById: Record<string, string>;
  isLoading: boolean;
  theme: Theme;
  focusedTopicId?: string | null;
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
  focusedTopicId = null,
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
    <div className="rounded-md border border-border/70 bg-card/96 p-4 shadow-[0_2px_10px_rgb(15_23_42/5%)] backdrop-blur sm:p-5 lg:p-7 dark:border-border/35 dark:bg-card/92 dark:shadow-none">
      <div className="mb-4 flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-start sm:justify-between dark:border-border/35">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.12em] text-primary uppercase">
            {section}
          </p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {topics.length} question{topics.length === 1 ? '' : 's'} in this topic. Open any item,
            or expand all to read everything here.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleToggleAll}
            className="rounded-md border-border/70 bg-card/96 dark:border-border/35 dark:bg-card/90"
          >
            {allOpen ? <ChevronsDownUpIcon /> : <ChevronsUpDownIcon />}
            {allOpen ? 'Collapse all' : 'Expand all'}
          </Button>
        </div>
      </div>

      <Accordion multiple value={openItems} onValueChange={handleOpenChange} className="w-full">
        {topics.map((topic) => {
          const hasContent = hasOwn(contentById, topic.id);
          const content = contentById[topic.id] ?? '';
          const shouldRender = renderedIds.has(topic.id);

          return (
            <AccordionItem
              key={topic.id}
              id={`topic-accordion-${topic.id}`}
              value={topic.id}
              className="scroll-mt-24 border-border/70 dark:border-border/35"
            >
              <AccordionTrigger className="px-1 hover:no-underline">
                <span className="min-w-0 flex-1 text-[15px] leading-snug font-semibold text-foreground">
                  {topic.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-1">
                {shouldRender ? (
                  isLoading && !hasContent ? (
                    <p className="text-sm text-foreground/70">Loading markdown...</p>
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
