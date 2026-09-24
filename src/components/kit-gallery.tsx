import { useMemo, useState } from 'react';
import { BookOpenTextIcon, SearchIcon } from 'lucide-react';

import { NewspaperNameplate } from '@/components/newspaper-masthead';
import { Input } from '@/components/ui/input';
import type { TopicGroup } from '@/lib/content-index';
import {
  KIT_DESKS,
  KIT_DESCRIPTIONS,
  KIT_ICON_BY_KEY,
  sortKitsByDisplayOrder,
} from '@/lib/kit-meta';
import { cn } from '@/lib/utils';

type KitGalleryProps = {
  groups: TopicGroup[];
  theme: 'light' | 'dark';
  onSelectKit: (kitId: string) => void;
};

type VisibleKit = {
  group: TopicGroup;
  matchCount: number;
};

function getKitSections(group: TopicGroup) {
  return Array.from(new Set(group.topics.map((topic) => topic.section))).filter(
    (section) => section !== 'General',
  );
}

function getDesk(kitId: string) {
  return KIT_DESKS[kitId] ?? 'Special edition';
}

function StoryByline({
  group,
  matchCount,
  query,
}: {
  group: TopicGroup;
  matchCount: number;
  query: string;
}) {
  const sections = getKitSections(group);
  const countLabel =
    query && matchCount > 0 ? `${matchCount} matching` : `${group.topics.length} questions`;

  return (
    <p className="font-heading mt-2 text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
      {countLabel}
      {sections.length > 0 ? ` · ${sections.slice(0, 3).join(' · ')}` : ''}
    </p>
  );
}

function StoryCell({
  item,
  query,
  variant,
  folio,
  onSelect,
}: {
  item: VisibleKit;
  query: string;
  variant: 'lead' | 'secondary' | 'brief';
  folio: string;
  onSelect: (kitId: string) => void;
}) {
  const { group, matchCount } = item;
  const icon = KIT_ICON_BY_KEY[group.id];
  const description = KIT_DESCRIPTIONS[group.id] ?? 'Interview questions and practice topics.';
  const desk = getDesk(group.id);
  const isLead = variant === 'lead';
  const isBrief = variant === 'brief';

  return (
    <button
      type="button"
      onClick={() => onSelect(group.id)}
      className={cn(
        'group relative flex h-full cursor-pointer flex-col text-left transition-colors',
        'focus-visible:bg-foreground focus-visible:text-background focus-visible:outline-none',
        isLead && 'gap-4 p-4 sm:p-5 lg:p-6',
        variant === 'secondary' && 'gap-3 p-4 sm:p-5',
        isBrief && 'gap-2 p-3.5 sm:p-4',
      )}
    >
      {isLead ? (
        <span className="font-heading pointer-events-none absolute top-3 right-3 rotate-[-8deg] border-2 border-secondary px-2 py-0.5 text-[11px] tracking-[0.18em] text-secondary uppercase group-focus-visible:border-background group-focus-visible:text-background">
          Extra
        </span>
      ) : null}

      <div className={cn('flex items-start gap-3', isLead && 'flex-col sm:flex-row')}>
        <div
          className={cn(
            'flex shrink-0 items-center justify-center border border-foreground bg-card',
            isLead && 'size-20 sm:size-24',
            variant === 'secondary' && 'size-12',
            isBrief && 'size-9',
          )}
        >
          {icon ? (
            <img
              src={icon}
              alt=""
              aria-hidden="true"
              className={cn('object-contain', isLead ? 'size-12 sm:size-14' : 'size-6')}
            />
          ) : (
            <BookOpenTextIcon className={cn(isLead ? 'size-8' : 'size-4')} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-heading text-[10px] tracking-[0.2em] text-secondary uppercase group-focus-visible:text-background">
            {desk}
          </p>
          <h2
            className={cn(
              'font-heading mt-1 font-semibold tracking-tight text-balance group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4',
              isLead && 'text-3xl leading-[0.95] sm:text-4xl lg:text-5xl',
              variant === 'secondary' && 'text-2xl leading-tight sm:text-3xl',
              isBrief && 'text-lg leading-tight sm:text-xl',
            )}
          >
            {group.label}
          </h2>
        </div>
      </div>

      <p
        className={cn(
          'text-foreground/85',
          isLead && 'max-w-xl text-base leading-7 sm:text-lg',
          variant === 'secondary' && 'line-clamp-3 text-sm leading-6',
          isBrief && 'line-clamp-2 text-[13px] leading-5',
        )}
      >
        {description}
      </p>

      <div className="mt-auto">
        <StoryByline group={group} matchCount={matchCount} query={query} />
        <p className="font-heading mt-2 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase">
          <span className="group-hover:text-secondary">Continue reading</span>
          <span className="opacity-55">{folio}</span>
        </p>
      </div>
    </button>
  );
}

export function KitGallery({ groups, theme, onSelectKit }: KitGalleryProps) {
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

  const lead = visibleKits[0] ?? null;
  const secondary = visibleKits.slice(1, 3);
  const briefs = visibleKits.slice(3);
  const ticker = orderedGroups.map((group) => group.label).join('  ·  ');

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      <NewspaperNameplate kitCount={groups.length} questionCount={totalTopics} theme={theme} />

      <p className="font-heading overflow-hidden text-[11px] tracking-[0.14em] text-ellipsis whitespace-nowrap uppercase opacity-80">
        Inside today: {ticker || 'Late edition'}
      </p>

      <div>
        <p className="font-heading mb-1.5 text-[10px] tracking-[0.2em] uppercase">Classifieds</p>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            aria-label="Search kits"
            placeholder="Wanted: kits, desks, or questions..."
            className="h-10 rounded-none border-foreground bg-card/80 pl-9 font-sans"
          />
        </div>
      </div>

      {visibleKits.length === 0 ? (
        <div className="border border-foreground bg-card px-4 py-8 text-center">
          <p className="font-heading text-[11px] tracking-[0.18em] uppercase">No notices posted</p>
          <p className="mt-2 text-sm">
            No kits match “{searchValue.trim()}”. Try another desk or topic.
          </p>
        </div>
      ) : (
        <div className="border-y-2 border-foreground">
          {lead ? (
            <div className="grid lg:grid-cols-12">
              <div className="border-foreground lg:col-span-7 lg:border-r">
                <StoryCell
                  item={lead}
                  query={query}
                  variant="lead"
                  folio="Page 1"
                  onSelect={onSelectKit}
                />
              </div>
              <div className="border-t border-foreground lg:col-span-5 lg:border-t-0">
                {secondary.length === 0 ? (
                  <div className="flex h-full min-h-40 items-center p-5">
                    <p className="font-heading text-xl">More desks in later editions.</p>
                  </div>
                ) : (
                  secondary.map((item, index) => (
                    <div
                      key={item.group.id}
                      className={cn(index > 0 && 'border-t border-foreground')}
                    >
                      <StoryCell
                        item={item}
                        query={query}
                        variant="secondary"
                        folio={`Page ${index + 2}`}
                        onSelect={onSelectKit}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : null}

          {briefs.length > 0 ? (
            <div className="border-t-2 border-foreground">
              <div className="flex items-center justify-between px-4 py-2">
                <p className="font-heading text-[11px] tracking-[0.2em] uppercase">
                  Briefs from the desks
                </p>
                <p className="font-heading text-[10px] tracking-[0.16em] uppercase opacity-60">
                  Continued inside
                </p>
              </div>
              <div className="grid border-t border-foreground sm:grid-cols-2 lg:grid-cols-3">
                {briefs.map((item, index) => (
                  <div
                    key={item.group.id}
                    className="shadow-[inset_-1px_-1px_0_0_var(--foreground)]"
                  >
                    <StoryCell
                      item={item}
                      query={query}
                      variant="brief"
                      folio={`P. ${index + 4}`}
                      onSelect={onSelectKit}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}

      <footer className="space-y-2 pb-4">
        <div className="newspaper-rule-double" />
        <p className="font-heading text-center text-[10px] tracking-[0.18em] uppercase opacity-70">
          Printed for candidates · Set in Inter & Plus Jakarta Sans · The Interview Gazette
        </p>
      </footer>
    </div>
  );
}
