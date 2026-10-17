import { useMemo, useState } from 'react';
import {
  ArrowRightIcon,
  BookOpenTextIcon,
  FlameIcon,
  Layers3Icon,
  ListChecksIcon,
  SearchIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { TopicProgressMap } from '@/hooks/use-topic-progress';
import type { TopicGroup } from '@/lib/content-index';
import { KIT_DESCRIPTIONS, KIT_ICON_BY_KEY, kitIconToneClass, sortKitsByDisplayOrder } from '@/lib/kit-meta';
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
  const query = searchValue.trim().toLowerCase();

  const orderedGroups = useMemo(() => sortKitsByDisplayOrder(groups), [groups]);
  const totalTopics = groups.reduce((count, group) => count + group.topics.length, 0);
  const totalCompleted = groups.reduce(
    (count, group) =>
      count + group.topics.reduce((sum, topic) => sum + (topicProgressById[topic.id]?.completed ? 1 : 0), 0),
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
          group.label.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query);
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
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section id="kits" className="scroll-mt-6">
          <div className="rounded-[var(--radius-panel)] border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-5 lg:p-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-start">
              <div className="lg:pr-4">
                <h1 className="max-w-3xl text-2xl text-foreground sm:text-3xl lg:text-4xl">
                  Structured interview kits for focused preparation.
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Practice by topic, track solved questions, and revise weak areas faster.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 lg:justify-self-end">
                <Card>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium text-muted-foreground">Total Kits</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <p className="text-lg font-semibold leading-none text-foreground">{groups.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium text-muted-foreground">Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <p className="text-lg font-semibold leading-none text-foreground">{totalTopics}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium text-muted-foreground">Solved</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <p className="text-lg font-semibold leading-none text-emerald-600">{totalCompleted}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-3 pb-1.5">
                    <CardTitle className="text-xs font-medium text-muted-foreground">Completion</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <p className="text-lg font-semibold leading-none text-primary">{completionRate}%</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="relative mt-5 max-w-xl">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="kit-search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              aria-label="Search kits"
              placeholder="Search kits, topics, or questions"
              className="h-11 border-input bg-card pl-9"
            />
          </div>
        </section>

        <section id="all-kits" className="scroll-mt-6 pt-8 sm:pt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl text-foreground sm:text-3xl">Interview Categories</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {visibleKits.length} of {groups.length} kits shown
              </p>
            </div>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {totalCompleted}/{totalTopics} completed
            </p>
          </div>

          {visibleKits.length === 0 ? (
            <Card className="p-10 text-center">
              <p className="text-sm font-medium text-muted-foreground">No kits found</p>
              <p className="mt-2 text-sm text-foreground">
                Nothing matches “{searchValue.trim()}”.
              </p>
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
                const progress = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;
                const progressLabel = `${completedCount}/${totalQuestions} completed`;
                const countLabel = `${totalQuestions} question${totalQuestions === 1 ? '' : 's'}`;
                const matchLabel = query && matchCount > 0 ? `${matchCount} matching` : null;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => onSelectKit(group.id)}
                    className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-card p-4 text-left shadow-[var(--shadow-card)] transition-all hover:border-primary/35 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                        {icon ? (
                          <img
                            src={icon}
                            alt=""
                            aria-hidden="true"
                            className={cn('size-6 object-contain', kitIconToneClass(group.id))}
                          />
                        ) : (
                          <BookOpenTextIcon className="size-5 text-foreground" />
                        )}
                      </span>
                      <span className="rounded-full border border-border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        {countLabel}
                      </span>
                    </span>
                    <span className="font-display mt-3 block text-lg leading-tight text-foreground">
                      {group.label}
                    </span>
                    <span
                      className={cn(
                        'mt-1.5 block flex-1 text-sm leading-6 text-muted-foreground',
                        '[display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden',
                      )}
                    >
                      {description}
                    </span>
                    <span className="mt-3.5">
                      <span className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{progressLabel}</span>
                        <span className="font-medium text-foreground">{progress}%</span>
                      </span>
                      <span className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <span
                          className={cn(
                            'block h-full rounded-full',
                            progress >= 100 ? 'bg-emerald-500' : 'bg-primary',
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </span>
                      {matchLabel ? <span className="mt-2 block text-xs text-muted-foreground">{matchLabel}</span> : null}
                    </span>
                    <span className="mt-3.5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Open kit
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section id="how-to-study" className="scroll-mt-6 pt-8 sm:pt-10">
          <div className="mb-5">
            <h2 className="text-2xl text-foreground sm:text-3xl">How to use this effectively</h2>
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
