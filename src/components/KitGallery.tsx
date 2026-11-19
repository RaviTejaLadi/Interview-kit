import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  FlameIcon,
  LayoutGridIcon,
  Layers3Icon,
  ListIcon,
  ListChecksIcon,
  SearchIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { TopicProgressMap } from '@/hooks/use-topic-progress';
import type { TopicGroup } from '@/lib/content-index';
import {
  KIT_DESCRIPTIONS,
  KIT_ICON_BY_KEY,
  kitIconToneClass,
  sortKitsByDisplayOrder,
} from '@/lib/kit-meta';
import { SEARCH_QUERY_MAX, sanitizeSearchQuery } from '@/lib/search-validation';
import { cn } from '@/lib/utils';

type KitGalleryProps = {
  groups: TopicGroup[];
  topicProgressById: TopicProgressMap;
  onSelectKit: (kitId: string) => void;
};

type VisibleKit = {
  group: TopicGroup;
  matchCount: number;
};

type KitsViewMode = 'grid' | 'list';

const KITS_VIEW_STORAGE_KEY = 'interview-kit-kits-view-mode-v1';

const PRINCIPLES = [
  {
    title: 'Theory + coding, together',
    body: 'Study concepts and practice interview-style coding in the same flow so revision stays structured.',
  },
  {
    title: 'Progress you can trust',
    body: 'Mark topics complete or important to quickly return to weak areas during revision cycles.',
  },
  {
    title: 'Built for consistency',
    body: 'Every kit follows a predictable layout so you can focus on preparation instead of navigation.',
  },
];

export function KitGallery({ groups, topicProgressById, onSelectKit }: KitGalleryProps) {
  const [searchValue, setSearchValue] = useState('');
  const [viewMode, setViewMode] = useState<KitsViewMode>(() => {
    if (typeof window === 'undefined') {
      return 'grid';
    }

    const stored = window.localStorage.getItem(KITS_VIEW_STORAGE_KEY);
    return stored === 'list' ? 'list' : 'grid';
  });
  const query = searchValue.trim().toLowerCase();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(KITS_VIEW_STORAGE_KEY, viewMode);
  }, [viewMode]);

  const orderedGroups = useMemo(() => sortKitsByDisplayOrder(groups), [groups]);
  const totalTopics = groups.reduce((count, group) => count + group.topics.length, 0);
  const totalCompleted = groups.reduce(
    (count, group) =>
      count +
      group.topics.reduce(
        (sum, topic) => sum + (topicProgressById[topic.id]?.completed ? 1 : 0),
        0,
      ),
    0,
  );
  const completionRate = totalTopics > 0 ? Math.round((totalCompleted / totalTopics) * 100) : 0;

  const visibleKits = useMemo(() => {
    if (!query) {
      return orderedGroups.map((group) => ({
        group,
        matchCount: 0,
      }));
    }

    return orderedGroups
      .map((group) => {
        const description = KIT_DESCRIPTIONS[group.id] ?? '';
        const kitMatches =
          group.label.toLowerCase().includes(query) || description.toLowerCase().includes(query);
        const matchCount = group.topics.filter((topic) => {
          const haystack =
            `${topic.title} ${topic.topicTitle ?? ''} ${topic.section} ${topic.kitLabel}`.toLowerCase();
          return haystack.includes(query);
        }).length;

        if (!kitMatches && matchCount === 0) {
          return null;
        }

        return { group, matchCount };
      })
      .filter((item): item is VisibleKit => item !== null)
      .sort((a, b) => {
        const nameA = a.group.label.toLowerCase().includes(query) ? 0 : 1;
        const nameB = b.group.label.toLowerCase().includes(query) ? 0 : 1;
        if (nameA !== nameB) {
          return nameA - nameB;
        }
        return b.matchCount - a.matchCount;
      });
  }, [orderedGroups, query]);

  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
        <section id="kits" className="scroll-mt-6">
          <div className="rounded-[var(--radius-panel)] border border-border bg-card p-3 shadow-(--shadow-card) sm:p-4">
            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] md:items-start lg:grid-cols-[minmax(0,1fr)_minmax(18rem,32rem)]">
              <div className="lg:pr-4">
                <h1 className="max-w-3xl text-lg text-foreground sm:text-xl">
                  Structured interview kits for focused preparation.
                </h1>
                <p className="mt-1.5 max-w-2xl text-xs leading-5 text-muted-foreground">
                  Practice by topic, track solved questions, and revise weak areas faster.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 md:justify-self-end">
                <Card>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Total Kits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <p className="text-sm font-semibold leading-none text-foreground">
                      {groups.length}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <p className="text-sm font-semibold leading-none text-foreground">
                      {totalTopics}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Solved
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <p className="text-sm font-semibold leading-none text-emerald-600">
                      {totalCompleted}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium text-muted-foreground">
                      Completion
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <p className="text-sm font-semibold leading-none text-primary">
                      {completionRate}%
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="all-kits" className="scroll-mt-6 pt-8 sm:pt-10">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <h2 className="shrink-0 text-base text-foreground">Kits</h2>
            <div className="relative ml-auto w-full max-w-xs sm:w-64">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="kit-search"
                value={searchValue}
                onChange={(event) => setSearchValue(sanitizeSearchQuery(event.target.value))}
                maxLength={SEARCH_QUERY_MAX}
                aria-label="Search kits"
                placeholder="Search kits…"
                className="h-8 rounded-[8px] border-input bg-card pl-8 text-xs"
              />
            </div>
            <div className="inline-flex shrink-0 items-center gap-0.5">
              <Button
                type="button"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon-xs"
                aria-label="Grid view"
                title="Grid view"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGridIcon className="size-4" />
              </Button>
              <Button
                type="button"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon-xs"
                aria-label="List view"
                title="List view"
                onClick={() => setViewMode('list')}
              >
                <ListIcon className="size-4" />
              </Button>
            </div>
          </div>

          {visibleKits.length === 0 ? (
            <Card className="p-10 text-center">
              <p className="text-sm font-medium text-muted-foreground">No kits found</p>
              <p className="mt-2 text-sm text-foreground">
                Nothing matches “{searchValue.trim()}”.
              </p>
            </Card>
          ) : viewMode === 'list' ? (
            <div className="overflow-hidden rounded-(--radius-card) border border-border bg-card shadow-(--shadow-card)">
              {visibleKits.map((item) => {
                const { group, matchCount } = item;
                const icon = KIT_ICON_BY_KEY[group.id];
                const description =
                  KIT_DESCRIPTIONS[group.id] ?? 'Interview questions and practice topics.';
                const totalQuestions = group.topics.length;
                const completedCount = group.topics.reduce(
                  (count, topic) => count + (topicProgressById[topic.id]?.completed ? 1 : 0),
                  0,
                );
                const progress =
                  totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;
                const progressLabel = `${completedCount}/${totalQuestions} completed`;
                const countLabel = `${totalQuestions} question${totalQuestions === 1 ? '' : 's'}`;
                const matchLabel = query && matchCount > 0 ? `${matchCount} matching` : null;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => onSelectKit(group.id)}
                    className="group flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left last:border-b-0 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      {icon ? (
                        <img
                          src={icon}
                          alt=""
                          aria-hidden="true"
                          className={cn('size-5 object-contain', kitIconToneClass(group.id))}
                        />
                      ) : (
                        <BookOpenTextIcon className="size-4.5 text-foreground" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{group.label}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{description}</p>
                    </div>
                    <div className="hidden shrink-0 items-center gap-2 text-xs md:flex">
                      <span className="rounded-full border border-border bg-muted px-2 py-1 font-medium text-muted-foreground">
                        {countLabel}
                      </span>
                      <span className="hidden text-muted-foreground lg:inline">
                        {progressLabel}
                      </span>
                      <span className="font-medium text-foreground">{progress}%</span>
                      {matchLabel ? (
                        <span className="hidden text-muted-foreground xl:inline">{matchLabel}</span>
                      ) : null}
                    </div>
                    <ArrowRightIcon className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {visibleKits.map((item) => {
                const { group, matchCount } = item;
                const icon = KIT_ICON_BY_KEY[group.id];
                const description =
                  KIT_DESCRIPTIONS[group.id] ?? 'Interview questions and practice topics.';
                const totalQuestions = group.topics.length;
                const completedCount = group.topics.reduce(
                  (count, topic) => count + (topicProgressById[topic.id]?.completed ? 1 : 0),
                  0,
                );
                const progress =
                  totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;
                const progressLabel = `${completedCount}/${totalQuestions} completed`;
                const countLabel = `${totalQuestions} question${totalQuestions === 1 ? '' : 's'}`;
                const matchLabel = query && matchCount > 0 ? `${matchCount} matching` : null;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => onSelectKit(group.id)}
                    className="group flex h-full flex-col rounded-(--radius-card) border border-border bg-card p-2.5 text-left shadow-(--shadow-card) transition-all hover:border-primary/35 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded bg-muted">
                        {icon ? (
                          <img
                            src={icon}
                            alt=""
                            aria-hidden="true"
                            className={cn('size-3.5 object-contain', kitIconToneClass(group.id))}
                          />
                        ) : (
                          <BookOpenTextIcon className="size-3.5 text-foreground" />
                        )}
                      </span>
                      <span className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {countLabel}
                      </span>
                    </span>
                    <span className="mt-1.5 block truncate text-xs font-semibold leading-tight text-foreground">
                      {group.label}
                    </span>
                    <span className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-muted-foreground">
                      {description}
                    </span>
                    <span className="mt-2 block">
                      <span className="mb-1 flex items-center justify-between gap-2 text-[10px] leading-none">
                        <span className="truncate text-muted-foreground">{progressLabel}</span>
                        <span className="shrink-0 font-medium text-foreground">{progress}%</span>
                      </span>
                      <span
                        className="block h-1 w-full overflow-hidden rounded-full bg-muted leading-none"
                        aria-hidden="true"
                      >
                        <span
                          className={cn(
                            'block h-full rounded-full transition-[width]',
                            progress >= 100 ? 'bg-emerald-500' : 'bg-primary',
                          )}
                          style={{ width: `${Math.max(progress, 0)}%` }}
                        />
                      </span>
                      {matchLabel ? (
                        <span className="mt-1 block text-[10px] text-muted-foreground">
                          {matchLabel}
                        </span>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section id="how-to-study" className="scroll-mt-6 pt-8 sm:pt-10">
          <div className="mb-5">
            <h2 className="text-base text-foreground">How to use this effectively</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep progress moving with short, repeatable preparation loops.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {PRINCIPLES.map((principle, index) => (
              <Card key={principle.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    {index === 0 ? <Layers3Icon className="size-4 text-primary" /> : null}
                    {index === 1 ? <ListChecksIcon className="size-4 text-emerald-600" /> : null}
                    {index === 2 ? <FlameIcon className="size-4 text-amber-500" /> : null}
                    {principle.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{principle.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mt-10 border-t border-border pt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Interview Kits
        </div>
      </div>
    </div>
  );
}
