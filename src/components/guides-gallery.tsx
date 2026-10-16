import { useMemo, useState } from 'react';
import {
  BookOpenTextIcon,
  ChevronDownIcon,
  CheckCircle2Icon,
  CircleIcon,
  SearchIcon,
  StarIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import type { GuideProgressMap } from '@/hooks/use-guide-progress';
import type { Guide, GuideTopic } from '@/lib/guides-index';
import { cn } from '@/lib/utils';

type GuidesGalleryProps = {
  guides: Guide[];
  guideProgressById: GuideProgressMap;
  readGuideCount: number;
  starredGuideCount: number;
  onOpenGuide: (guideId: string) => void;
  onToggleGuideRead: (guideId: string) => void;
  onToggleGuideStarred: (guideId: string) => void;
};

type StatusFilter = 'all' | 'read' | 'unread' | 'starred';
type SortMode = 'featured' | 'latest' | 'read-time' | 'title';
type TopicFilter = 'all' | GuideTopic;

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

function getDifficultyTone(difficulty: Guide['difficulty']) {
  if (difficulty === 'Intermediate') {
    return 'text-amber-600 dark:text-amber-400';
  }

  return 'text-muted-foreground';
}

const STATUS_LABEL: Record<StatusFilter, string> = {
  all: 'All statuses',
  read: 'Read',
  unread: 'Unread',
  starred: 'Starred',
};

const SORT_LABEL: Record<SortMode, string> = {
  featured: 'Featured',
  latest: 'Latest',
  'read-time': 'Read time',
  title: 'Title',
};

export function GuidesGallery({
  guides,
  guideProgressById,
  readGuideCount,
  starredGuideCount,
  onOpenGuide,
  onToggleGuideRead,
  onToggleGuideStarred,
}: GuidesGalleryProps) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('featured');

  const queryValue = query.trim().toLowerCase();
  const topics = useMemo(
    () => Array.from(new Set(guides.map((guide) => guide.topic))),
    [guides],
  );

  const visibleGuides = useMemo(() => {
    const filtered = guides.filter((guide) => {
      const progress = guideProgressById[guide.id];
      const isRead = progress?.read === true;
      const isStarred = progress?.starred === true;

      if (topicFilter !== 'all' && guide.topic !== topicFilter) {
        return false;
      }

      if (statusFilter === 'read' && !isRead) {
        return false;
      }

      if (statusFilter === 'unread' && isRead) {
        return false;
      }

      if (statusFilter === 'starred' && !isStarred) {
        return false;
      }

      if (!queryValue) {
        return true;
      }

      const haystack = `${guide.title} ${guide.summary} ${guide.topic} ${guide.tags.join(' ')}`.toLowerCase();
      return haystack.includes(queryValue);
    });

    return filtered.sort((a, b) => {
      if (sortMode === 'title') {
        return a.title.localeCompare(b.title);
      }

      if (sortMode === 'latest') {
        return b.publishedAt.localeCompare(a.publishedAt);
      }

      if (sortMode === 'read-time') {
        return a.readTimeMinutes - b.readTimeMinutes || a.title.localeCompare(b.title);
      }

      const starA = guideProgressById[a.id]?.starred ? 1 : 0;
      const starB = guideProgressById[b.id]?.starred ? 1 : 0;
      if (starA !== starB) {
        return starB - starA;
      }
      return b.publishedAt.localeCompare(a.publishedAt);
    });
  }, [guideProgressById, guides, queryValue, sortMode, statusFilter, topicFilter]);

  return (
    <div className="craft-scan relative">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:pr-28">
        <section id="guides" className="scroll-mt-6">
          <div className="border-b border-border pb-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="hud-label text-muted-foreground shrink-0">01 / Guides</p>
              <p className="hud-label text-faint ml-auto shrink-0 whitespace-nowrap">
                {guides.length} guides · {readGuideCount} read · {starredGuideCount} starred
              </p>
            </div>
            <h1 className="font-display text-foreground mt-4 max-w-4xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
              Topic-specific <span className="text-accent-ink">guides</span> to revise faster.
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl text-sm leading-6">
              Read practical guides inspired by roadmap-style structure, then track your progress
              with local read and star actions.
            </p>
          </div>
        </section>

        <section className="pt-8">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <SearchIcon className="text-faint pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search guides"
                placeholder="Search guides, topics, or tags"
                className="border-line-strong h-10 bg-transparent pl-9 font-sans"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Sort guides"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-10 justify-between bg-card px-3 text-sm',
                )}
              >
                <span>Sort: {SORT_LABEL[sortMode]}</span>
                <ChevronDownIcon className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={6}>
                <DropdownMenuRadioGroup
                  value={sortMode}
                  onValueChange={(value) => setSortMode(value as SortMode)}
                >
                  {Object.entries(SORT_LABEL).map(([value, label]) => (
                    <DropdownMenuRadioItem key={value} value={value}>
                      {label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Guide status filter"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-10 justify-between bg-card px-3 text-sm',
                )}
              >
                <span>{STATUS_LABEL[statusFilter]}</span>
                <ChevronDownIcon className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={6}>
                <DropdownMenuRadioGroup
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                >
                  {Object.entries(STATUS_LABEL).map(([value, label]) => (
                    <DropdownMenuRadioItem key={value} value={value}>
                      {label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={topicFilter === 'all' ? 'default' : 'outline'}
              className={cn(topicFilter !== 'all' && 'bg-transparent')}
              onClick={() => setTopicFilter('all')}
            >
              All topics
            </Button>
            {topics.map((topic) => (
              <Button
                key={topic}
                type="button"
                size="sm"
                variant={topicFilter === topic ? 'default' : 'outline'}
                className={cn(topicFilter !== topic && 'bg-transparent')}
                onClick={() => setTopicFilter(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </section>

        <section className="pt-8">
          {visibleGuides.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="hud-label text-muted-foreground">No guides found</p>
              <p className="text-muted-foreground mt-2 text-sm">Try changing search or filters.</p>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visibleGuides.map((guide) => {
                const guideProgress = guideProgressById[guide.id];
                const isRead = guideProgress?.read === true;
                const isStarred = guideProgress?.starred === true;

                return (
                  <Card key={guide.id} className="group">
                    <CardHeader className="p-4 pb-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <Badge variant="outline">{guide.topic}</Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-pressed={isStarred}
                          aria-label={isStarred ? 'Unstar guide' : 'Star guide'}
                          title={isStarred ? 'Starred' : 'Star guide'}
                          onClick={() => onToggleGuideStarred(guide.id)}
                        >
                          <StarIcon
                            className={cn(
                              'size-4',
                              isStarred ? 'fill-amber-400 text-amber-500' : 'text-muted-foreground',
                            )}
                          />
                        </Button>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpenTextIcon className="mt-0.5 size-4 text-accent-ink" />
                        <CardTitle className="text-base">{guide.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-2">
                      <CardDescription
                        className={cn(
                          '[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden',
                        )}
                      >
                        {guide.summary}
                      </CardDescription>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <Badge variant="secondary">{guide.readTimeMinutes} min</Badge>
                        <Badge variant="outline">{formatPublishedDate(guide.publishedAt)}</Badge>
                        <Badge variant="outline" className={getDifficultyTone(guide.difficulty)}>
                          {guide.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="border-t-0 px-4 py-2.5">
                      <Button type="button" size="sm" variant="outline" onClick={() => onOpenGuide(guide.id)}>
                        Open
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleGuideRead(guide.id)}
                      >
                        {isRead ? (
                          <>
                            <CheckCircle2Icon className="size-4 text-emerald-500" />
                            Unread
                          </>
                        ) : (
                          <>
                            <CircleIcon className="size-4 text-muted-foreground" />
                            Read
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
