import { useMemo, useState } from 'react';
import { BookOpenTextIcon, SearchIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import type { TopicGroup } from '@/lib/content-index';
import { KIT_DESCRIPTIONS, KIT_DESKS, KIT_ICON_BY_KEY, sortKitsByDisplayOrder } from '@/lib/kit-meta';
import { cn } from '@/lib/utils';

type KitGalleryProps = {
  groups: TopicGroup[];
  onSelectKit: (kitId: string) => void;
};

type VisibleKit = {
  group: TopicGroup;
  matchCount: number;
};

const COUNT_WORDS = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
  'Twenty',
];

const KIT_TILE: Record<string, string> = {
  'html-interview-kit': '#e4572e',
  'css-interview-kit': '#2f7bf5',
  'tailwind-interview-kit': '#14b8a6',
  'javascript-interview-kit': '#f5b301',
  'dsa-interview-kit': '#7c5cbf',
  'react-interview-kit': '#00b4d8',
  'next-js-interview-kit': '#111111',
  'node-js-interview-kit': '#3c9d4e',
  'mongo-db-interview-kit': '#10aa50',
  'git-interview-kit': '#f05033',
  'docker-devops-interview-kit': '#2496ed',
  'hr-interview-kit': '#e84d8a',
  'redis-interview-kit': '#d82c20',
  'testing-interview-kit': '#8b5cf6',
};

const PRINCIPLES = [
  {
    index: '01',
    title: 'On your machine',
    body: 'Every question is a markdown file in this project. Nothing is fetched from a server between you and the page.',
  },
  {
    index: '02',
    title: 'One kit at a time',
    body: 'Open a kit, then move through its topics. The arrow keys jump to the previous and next item.',
  },
  {
    index: '03',
    title: 'Familiar from the first page',
    body: 'Theory, coding drills, and the traps interviews actually use, in the order you would study them.',
  },
];

function countWord(count: number) {
  return COUNT_WORDS[count] ?? String(count);
}

function getDesk(kitId: string) {
  return KIT_DESKS[kitId] ?? 'Interview kit';
}

function padIndex(index: number) {
  return String(index + 1).padStart(2, '0');
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function KitGallery({ groups, onSelectKit }: KitGalleryProps) {
  const [searchValue, setSearchValue] = useState('');
  const query = searchValue.trim().toLowerCase();

  const orderedGroups = useMemo(() => sortKitsByDisplayOrder(groups), [groups]);
  const totalTopics = groups.reduce((count, group) => count + group.topics.length, 0);

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
        const desk = getDesk(group.id);
        const kitMatches =
          group.label.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          desk.toLowerCase().includes(query);
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

  const kitCountLabel = `${countWord(groups.length)} kit${groups.length === 1 ? '' : 's'}`;

  return (
    <div className="craft-scan relative">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:pr-28">
        <section id="kits" className="scroll-mt-6">
          <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
            <p className="hud-label text-muted-foreground">01 / Interview Kits</p>
            <div className="min-w-0 text-right">
              <p className="hud-label text-faint mb-2 hidden sm:block">
                {groups.length} kits · {totalTopics} questions
              </p>
              <p className="font-display text-foreground text-4xl leading-none sm:text-6xl">
                Prepare
              </p>
            </div>
          </div>

          <h1 className="font-display text-foreground mt-10 max-w-4xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
            {kitCountLabel} for every <span className="text-accent-ink">interview</span>.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-base leading-7">
            Theory, coding, and the questions hiring teams ask across the stack. Read them on your
            machine, one kit at a time.
          </p>

          <div className="relative mt-8 max-w-xl">
            <SearchIcon className="text-faint pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              id="kit-search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              aria-label="Search kits"
              placeholder="Search kits, topics, or questions"
              className="border-line-strong h-10 bg-transparent pl-9 font-sans"
            />
          </div>

        </section>

        <section id="all-kits" className="scroll-mt-6 pt-20">
          <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
            <p className="hud-label text-muted-foreground">02 / All kits</p>
            <div className="text-right">
              <p className="hud-label text-faint mb-2 hidden sm:block">Choose a kit to study</p>
              <p className="font-display text-foreground text-4xl leading-none sm:text-6xl">Kits</p>
            </div>
          </div>

          {visibleKits.length === 0 ? (
            <div className="border-b border-border py-16 text-center">
              <p className="hud-label text-muted-foreground">No kits</p>
              <p className="text-foreground mt-3 text-sm">
                Nothing matches “{searchValue.trim()}”.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {visibleKits.map((item, index) => {
                const { group, matchCount } = item;
                const icon = KIT_ICON_BY_KEY[group.id];
                const tile = KIT_TILE[group.id] ?? '#2f7bf5';
                const description =
                  KIT_DESCRIPTIONS[group.id] ?? 'Interview questions and practice topics.';
                const countLabel =
                  query && matchCount > 0
                    ? `${matchCount} matching`
                    : `${group.topics.length} question${group.topics.length === 1 ? '' : 's'}`;

                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => onSelectKit(group.id)}
                    className="group flex h-full flex-col border border-border bg-card p-5 text-left transition-colors hover:border-line-strong"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="flex size-12 shrink-0 items-center justify-center">
                        {icon ? (
                          <img src={icon} alt="" aria-hidden="true" className="size-12 object-contain" />
                        ) : (
                          <BookOpenTextIcon className="size-6 text-foreground" />
                        )}
                      </span>
                      <span className="hud-label px-2 py-1 font-bold text-black" style={{ backgroundColor: tile }}>
                        {padIndex(index)}
                      </span>
                    </span>
                    <span className="font-display text-foreground mt-5 block text-2xl leading-none">
                      {group.label}
                    </span>
                    <span className="text-muted-foreground mt-3 block flex-1 text-sm leading-6">
                      {description}
                    </span>
                    <span className="mt-5 flex items-end justify-between gap-3">
                      <span className="hud-label text-faint">{countLabel}</span>
                      <span className="shrink-0 font-mono text-[11px] font-bold tracking-[0.12em] text-foreground uppercase">
                        Open
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section id="how-to-study" className="scroll-mt-6 pt-20">
          <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
            <p className="hud-label text-muted-foreground">03 / How to study</p>
            <p className="font-display text-foreground text-4xl leading-none sm:text-6xl">Read</p>
          </div>
          <div className="grid gap-10 py-10 md:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <div key={principle.index}>
                <p className="hud-label text-accent-ink">{principle.index}</p>
                <h2 className="font-display text-foreground mt-3 text-2xl leading-tight">
                  {principle.title}
                </h2>
                <p className="text-muted-foreground mt-3 text-sm leading-6">{principle.body}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-8 border-t border-border pt-10 pb-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-foreground text-lg">Interview Kits</p>
              <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-6">
                Questions for the full stack, set locally and free to read.
              </p>
            </div>
            <div>
              <p className="hud-label text-faint">Kits</p>
              <ul className="mt-3 space-y-2">
                {orderedGroups.slice(0, 7).map((group) => (
                  <li key={group.id}>
                    <button
                      type="button"
                      onClick={() => onSelectKit(group.id)}
                      className="text-muted-foreground hover:text-foreground text-sm"
                    >
                      {group.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="hud-label text-faint">More</p>
              <ul className="mt-3 space-y-2">
                {orderedGroups.slice(7).map((group) => (
                  <li key={group.id}>
                    <button
                      type="button"
                      onClick={() => onSelectKit(group.id)}
                      className="text-muted-foreground hover:text-foreground text-sm"
                    >
                      {group.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="hud-label text-faint">On this page</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('kits')}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Prepare
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('all-kits')}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    All kits
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('how-to-study')}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    How to study
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p className="hud-label text-faint">© {new Date().getFullYear()} Interview Kits</p>
            <p className="hud-label text-faint">Made for candidates</p>
          </div>
        </footer>
      </div>

      <nav
        aria-label="Page sections"
        className="pointer-events-none absolute inset-y-0 right-3 hidden lg:block"
      >
        <div className="pointer-events-auto sticky top-[32vh] flex flex-col items-end gap-4">
          {[
            ['kits', 'Prepare'],
            ['all-kits', 'Kits'],
            ['how-to-study', 'Study'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={cn(
                'hud-label text-faint hover:text-foreground [writing-mode:vertical-rl] rotate-180',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
