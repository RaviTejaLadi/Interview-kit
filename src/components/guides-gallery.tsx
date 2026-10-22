import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDownIcon,
  CheckCircle2Icon,
  CircleIcon,
  LayoutGridIcon,
  ListIcon,
  SearchIcon,
  StarIcon,
} from 'lucide-react';

import apiIcon from '../../assets/kits-svgs/api.svg';
import algorithmIcon from '../../assets/kits-svgs/algorithm.svg';
import cssIcon from '../../assets/kits-svgs/css.svg';
import dockerIcon from '../../assets/kits-svgs/docker.svg';
import expressIcon from '../../assets/kits-svgs/express.svg';
import gitIcon from '../../assets/kits-svgs/git.svg';
import hrIcon from '../../assets/kits-svgs/hr.svg';
import htmlIcon from '../../assets/kits-svgs/html.svg';
import javascriptIcon from '../../assets/kits-svgs/javascript.svg';
import mongodbIcon from '../../assets/kits-svgs/mongodb.svg';
import nextjsIcon from '../../assets/kits-svgs/nextjs.svg';
import nodejsIcon from '../../assets/kits-svgs/nodejs.svg';
import npmIcon from '../../assets/kits-svgs/npm.svg';
import reactIcon from '../../assets/kits-svgs/react.svg';
import redisIcon from '../../assets/kits-svgs/redis.svg';
import tailwindIcon from '../../assets/kits-svgs/tailwind.svg';
import testingIcon from '../../assets/kits-svgs/testing.svg';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import type { GuideProgressMap } from '@/hooks/use-guide-progress';
import type { Guide, GuideTopic } from '@/lib/guides-index';
import { IMPORTANT_GUIDE_TOPICS } from '@/lib/important-guide-topics';
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
type CategoryFilter = 'all' | GuideTopic;
type SubjectFilter = 'all' | string;
type GuidesViewMode = 'grid' | 'list';
type DisplayGuideCard = {
  id: string;
  title: string;
  summary: string;
  topic: GuideTopic;
  subject: string;
  difficulty: string;
  readTimeMinutes: number;
  publishedAt: string;
  isPlaceholder: boolean;
  isRead: boolean;
  isStarred: boolean;
};

const STATUS_LABEL: Record<StatusFilter, string> = {
  all: 'All statuses',
  read: 'Read',
  unread: 'Unread',
  starred: 'Starred',
};

const CATEGORY_LABEL: Record<CategoryFilter, string> = {
  all: 'All categories',
  Frontend: 'Frontend',
  Backend: 'Backend',
  Specific: 'Specific',
};

const SORT_LABEL: Record<SortMode, string> = {
  featured: 'Featured',
  latest: 'Latest',
  'read-time': 'Read time',
  title: 'Title',
};

const GUIDES_VIEW_STORAGE_KEY = 'interview-kit-guides-view-mode-v1';

const SUBJECT_ICON_SRC: Record<string, string> = {
  api: apiIcon,
  auth: apiIcon,
  authorization: apiIcon,
  aws: apiIcon,
  azure: apiIcon,
  cloud: apiIcon,
  communication: hrIcon,
  css: cssIcon,
  database: mongodbIcon,
  ddd: nodejsIcon,
  debugging: testingIcon,
  'design-system': tailwindIcon,
  devops: dockerIcon,
  docker: dockerIcon,
  engineering: nodejsIcon,
  'event-driven': nodejsIcon,
  express: expressIcon,
  forms: reactIcon,
  gcp: apiIcon,
  git: gitIcon,
  html: htmlIcon,
  iac: dockerIcon,
  interview: hrIcon,
  javascript: javascriptIcon,
  kubernetes: dockerIcon,
  microservices: nodejsIcon,
  mongodb: mongodbIcon,
  nextjs: nextjsIcon,
  nodejs: nodejsIcon,
  nosql: mongodbIcon,
  react: reactIcon,
  redis: redisIcon,
  sql: mongodbIcon,
  testing: testingIcon,
  typescript: javascriptIcon,
  career: hrIcon,
  offer: hrIcon,
  dsa: algorithmIcon,
};

function getSubjectIconSrc(subject: string) {
  const normalized = subject.trim().toLowerCase();
  return SUBJECT_ICON_SRC[normalized] ?? npmIcon;
}

function getSubjectIconClass(subject: string) {
  const normalized = subject.trim().toLowerCase();
  return normalized === 'express' || normalized === 'nextjs' ? 'dark:invert' : '';
}

function toSubjectSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getPrimarySubjectFromTags(tags: string[], fallbackTopic: GuideTopic) {
  const ignored = new Set(['important', 'frontend', 'backend', 'specific']);
  const picked = tags.find((tag) => !ignored.has(tag.trim().toLowerCase()));
  return toSubjectSlug(picked ?? fallbackTopic);
}

function formatSubjectLabel(subject: string) {
  const normalized = subject.trim().toLowerCase();
  const knownLabels: Record<string, string> = {
    api: 'API',
    aws: 'AWS',
    css: 'CSS',
    ddd: 'DDD',
    git: 'Git',
    gcp: 'GCP',
    html: 'HTML',
    iac: 'IaC',
    javascript: 'JavaScript',
    kubernetes: 'Kubernetes',
    mongodb: 'MongoDB',
    nextjs: 'Next.js',
    nodejs: 'Node.js',
    nosql: 'NoSQL',
    react: 'React',
    sql: 'SQL',
    typescript: 'TypeScript',
  };

  if (knownLabels[normalized]) {
    return knownLabels[normalized];
  }

  return normalized
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

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
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [viewMode, setViewMode] = useState<GuidesViewMode>(() => {
    if (typeof window === 'undefined') {
      return 'list';
    }

    const stored = window.localStorage.getItem(GUIDES_VIEW_STORAGE_KEY);
    return stored === 'grid' ? 'grid' : 'list';
  });

  const queryValue = query.trim().toLowerCase();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(GUIDES_VIEW_STORAGE_KEY, viewMode);
  }, [viewMode]);
  const topicMetaByTitle = useMemo(
    () =>
      new Map(
        IMPORTANT_GUIDE_TOPICS.map((item) => [item.title.trim().toLowerCase(), item] as const),
      ),
    [],
  );

  const mergedGuides = useMemo<DisplayGuideCard[]>(() => {
    const existingGuideTitles = new Set(guides.map((guide) => guide.title.trim().toLowerCase()));
    const placeholderGuides: DisplayGuideCard[] = IMPORTANT_GUIDE_TOPICS.filter(
      (topic) => !existingGuideTitles.has(topic.title.trim().toLowerCase()),
    ).map((topic) => ({
      id: `placeholder-${topic.topic}-${topic.title}`,
      title: topic.title,
      summary: 'Title-only placeholder card. Add guide markdown content later.',
      topic: topic.category,
      subject: topic.topic,
      difficulty: topic.difficulty,
      readTimeMinutes: 10,
      publishedAt: '1970-01-01',
      isPlaceholder: true,
      isRead: false,
      isStarred: false,
    }));

    const realGuides: DisplayGuideCard[] = guides.map((guide) => ({
      ...(topicMetaByTitle.get(guide.title.trim().toLowerCase())
        ? {
            topic: topicMetaByTitle.get(guide.title.trim().toLowerCase())!.category,
            subject: topicMetaByTitle.get(guide.title.trim().toLowerCase())!.topic,
          }
        : {
            topic: guide.topic,
            subject: getPrimarySubjectFromTags(guide.tags, guide.topic),
          }),
      id: guide.id,
      title: guide.title,
      summary: guide.summary,
      difficulty: guide.difficulty,
      readTimeMinutes: guide.readTimeMinutes,
      publishedAt: guide.publishedAt,
      isPlaceholder: false,
      isRead: guideProgressById[guide.id]?.read === true,
      isStarred: guideProgressById[guide.id]?.starred === true,
    }));

    return [...realGuides, ...placeholderGuides];
  }, [guideProgressById, guides, topicMetaByTitle]);

  const subjects = useMemo(
    () =>
      Array.from(new Set(mergedGuides.map((guide) => guide.subject)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [mergedGuides],
  );

  const visibleGuides = useMemo(() => {
    const filtered = mergedGuides.filter((guide) => {
      const progress = guideProgressById[guide.id];
      const isRead = guide.isPlaceholder ? false : progress?.read === true;
      const isStarred = guide.isPlaceholder ? false : progress?.starred === true;

      if (categoryFilter !== 'all' && guide.topic !== categoryFilter) {
        return false;
      }

      if (subjectFilter !== 'all' && guide.subject !== subjectFilter) {
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

      const haystack = `${guide.title} ${guide.summary} ${guide.topic} ${guide.subject}`.toLowerCase();
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

      const starA = a.isPlaceholder ? 0 : (guideProgressById[a.id]?.starred ? 1 : 0);
      const starB = b.isPlaceholder ? 0 : (guideProgressById[b.id]?.starred ? 1 : 0);
      if (starA !== starB) {
        return starB - starA;
      }
      return b.publishedAt.localeCompare(a.publishedAt);
    });
  }, [categoryFilter, guideProgressById, mergedGuides, queryValue, sortMode, statusFilter, subjectFilter]);

  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <section id="guides" className="scroll-mt-6">
          <div className="rounded-[var(--radius-panel)] border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="text-sm font-medium text-muted-foreground shrink-0">Guides</p>
              <p className="ml-auto shrink-0 whitespace-nowrap text-sm text-muted-foreground">
                {guides.length} guides · {readGuideCount} read · {starredGuideCount} starred
              </p>
            </div>
            <h1 className="mt-4 max-w-4xl text-2xl leading-tight text-foreground sm:text-3xl lg:text-4xl">
              Topic-specific <span className="text-primary">guides</span> to revise faster.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              Read practical guides inspired by roadmap-style structure, then track your progress
              with local read and star actions.
            </p>
          </div>
        </section>

        <section className="pt-8">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search guides"
                placeholder="Search guides, topics, or tags"
                className="h-8 border-input bg-card pl-8 text-xs"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Sort guides"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-8 w-full justify-between bg-card px-2.5 text-xs lg:w-auto',
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
                aria-label="Guide category filter"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-8 w-full justify-between bg-card px-2.5 text-xs lg:w-auto',
                )}
              >
                <span>{CATEGORY_LABEL[categoryFilter]}</span>
                <ChevronDownIcon className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={6}>
                <DropdownMenuRadioGroup
                  value={categoryFilter}
                  onValueChange={(value) => setCategoryFilter(value as CategoryFilter)}
                >
                  {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
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
                  'h-8 w-full justify-between bg-card px-2.5 text-xs lg:w-auto',
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
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Guide topic filter"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-8 w-full justify-between bg-card px-2.5 text-xs lg:w-auto',
                )}
              >
                <span>
                  <img
                    src={subjectFilter === 'all' ? npmIcon : getSubjectIconSrc(subjectFilter)}
                    alt=""
                    aria-hidden="true"
                    className={cn(
                      'mr-1.5 inline-block size-3.5 align-[-2px] object-contain',
                      subjectFilter === 'all' ? '' : getSubjectIconClass(subjectFilter),
                    )}
                  />
                  Topic:{' '}
                  {subjectFilter === 'all' ? 'All topics' : formatSubjectLabel(subjectFilter)}
                </span>
                <ChevronDownIcon className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={6}
                className="max-h-80 w-64 overflow-y-auto"
              >
                <DropdownMenuRadioGroup value={subjectFilter} onValueChange={setSubjectFilter}>
                  <DropdownMenuRadioItem value="all">
                    <span className="inline-flex items-center gap-2">
                      <img src={npmIcon} alt="" aria-hidden="true" className="size-3.5 object-contain" />
                      All topics
                    </span>
                  </DropdownMenuRadioItem>
                  {subjects.map((subject) => (
                    <DropdownMenuRadioItem key={subject} value={subject}>
                      <span className="inline-flex items-center gap-2">
                        <img
                          src={getSubjectIconSrc(subject)}
                          alt=""
                          aria-hidden="true"
                          className={cn('size-3.5 object-contain', getSubjectIconClass(subject))}
                        />
                        {formatSubjectLabel(subject)}
                      </span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-3 flex justify-end">
            <div className="inline-flex items-center gap-1 rounded-[var(--radius-control)] border border-border bg-card p-1">
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
            </div>
          </div>
        </section>

        <section className="pt-8">
          {visibleGuides.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-sm font-medium text-muted-foreground">No guides found</p>
              <p className="text-muted-foreground mt-2 text-sm">Try changing search or filters.</p>
            </Card>
          ) : viewMode === 'grid' ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {visibleGuides.map((guide) => {
                const guideProgress = guideProgressById[guide.id];
                const isRead = guide.isPlaceholder ? false : guideProgress?.read === true;
                const isStarred = guide.isPlaceholder ? false : guideProgress?.starred === true;
                const canOpen = !guide.isPlaceholder;

                return (
                  <div
                    key={guide.id}
                    role={canOpen ? 'button' : undefined}
                    tabIndex={canOpen ? 0 : undefined}
                    onClick={canOpen ? () => onOpenGuide(guide.id) : undefined}
                    onKeyDown={
                      canOpen
                        ? (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              onOpenGuide(guide.id);
                            }
                          }
                        : undefined
                    }
                    className={cn(
                      'group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:border-primary/35 hover:shadow-[var(--shadow-card-hover)]',
                      canOpen && 'cursor-pointer',
                    )}
                  >
                    <p className="line-clamp-2 text-sm font-semibold text-foreground">{guide.title}</p>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">
                      {guide.summary}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <img
                        src={getSubjectIconSrc(guide.subject)}
                        alt=""
                        aria-hidden="true"
                        className={cn('size-3.5 object-contain', getSubjectIconClass(guide.subject))}
                      />
                      <span>{formatSubjectLabel(guide.subject)}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                      <span>{guide.readTimeMinutes} min</span>
                    </div>
                    <div className="mt-auto pt-3">
                      {guide.isPlaceholder ? (
                        <span className="text-xs text-muted-foreground">Pending content</span>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            aria-pressed={isStarred}
                            aria-label={isStarred ? 'Unstar guide' : 'Star guide'}
                            title={isStarred ? 'Starred' : 'Star guide'}
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggleGuideStarred(guide.id);
                            }}
                          >
                            <StarIcon
                              className={cn(
                                'size-4',
                                isStarred ? 'fill-amber-400 text-amber-500' : 'text-muted-foreground',
                              )}
                            />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggleGuideRead(guide.id);
                            }}
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
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-[var(--shadow-card)]">
              {visibleGuides.map((guide) => {
                const guideProgress = guideProgressById[guide.id];
                const isRead = guide.isPlaceholder ? false : guideProgress?.read === true;
                const isStarred = guide.isPlaceholder ? false : guideProgress?.starred === true;
                const canOpen = !guide.isPlaceholder;

                return (
                  <div
                    key={guide.id}
                    role={canOpen ? 'button' : undefined}
                    tabIndex={canOpen ? 0 : undefined}
                    onClick={canOpen ? () => onOpenGuide(guide.id) : undefined}
                    onKeyDown={
                      canOpen
                        ? (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              onOpenGuide(guide.id);
                            }
                          }
                        : undefined
                    }
                    className={cn(
                      'group flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-muted/40',
                      canOpen && 'cursor-pointer',
                    )}
                  >
                    <div className="min-w-0 flex flex-1 items-center gap-2">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded bg-muted/70">
                        <img
                          src={getSubjectIconSrc(guide.subject)}
                          alt=""
                          aria-hidden="true"
                          className={cn('size-3.5 object-contain', getSubjectIconClass(guide.subject))}
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{guide.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {formatSubjectLabel(guide.subject)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      {guide.isPlaceholder ? (
                        <span className="text-xs text-muted-foreground">Pending content</span>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            aria-pressed={isStarred}
                            aria-label={isStarred ? 'Unstar guide' : 'Star guide'}
                            title={isStarred ? 'Starred' : 'Star guide'}
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggleGuideStarred(guide.id);
                            }}
                          >
                            <StarIcon
                              className={cn(
                                'size-4',
                                isStarred ? 'fill-amber-400 text-amber-500' : 'text-muted-foreground',
                              )}
                            />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggleGuideRead(guide.id);
                            }}
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
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
