import * as React from 'react';
import {
  ArrowLeftIcon,
  BookIcon,
  BookOpenTextIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  Code2Icon,
  FolderIcon,
  ListTreeIcon,
  SparklesIcon,
  SearchIcon,
  StarIcon,
} from 'lucide-react';

import type { TopicProgressMap } from '@/hooks/use-topic-progress';
import type { Topic, TopicGroup } from '@/lib/content-index';
import {
  buildKitMenus,
  getFolderNavId,
  getTopicNavId,
  type KitMenu,
  type KitSection,
} from '@/lib/kit-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  groups: TopicGroup[];
  searchValue: string;
  selectedNavId: string | null;
  topicProgressById: TopicProgressMap;
  totalTopicCount: number;
  completedTopicCount: number;
  importantTopicCount: number;
  onSearchChange: (value: string) => void;
  onSelectNav: (navId: string) => void;
  onBackToKits: () => void;
};

type SidebarGlyph = {
  Icon: React.ComponentType<{ className?: string }>;
  className: string;
};

function getRootTopicIcon(title: string): SidebarGlyph | null {
  const normalizedTitle = title.trim().toLowerCase();

  if (normalizedTitle === 'overview') {
    return {
      Icon: BookIcon,
      className: 'text-sky-600',
    };
  }

  if (normalizedTitle === 'topics') {
    return {
      Icon: ListTreeIcon,
      className: 'text-indigo-600',
    };
  }

  return null;
}

function getSectionIcon(section: KitSection): SidebarGlyph {
  const normalizedKey = `${section.id} ${section.label}`.toLowerCase();

  if (normalizedKey.includes('theory')) {
    return {
      Icon: BookOpenTextIcon,
      className: 'text-emerald-500 dark:text-emerald-400',
    };
  }

  if (
    normalizedKey.includes('coding') ||
    normalizedKey.includes('code') ||
    normalizedKey.includes('practical')
  ) {
    return {
      Icon: Code2Icon,
      className: 'text-amber-500 dark:text-amber-400',
    };
  }

  if (normalizedKey.includes('advanced')) {
    return {
      Icon: SparklesIcon,
      className: 'text-fuchsia-500 dark:text-fuchsia-400',
    };
  }

  if (normalizedKey.includes('behavioral')) {
    return {
      Icon: FolderIcon,
      className: 'text-orange-500 dark:text-orange-400',
    };
  }

  if (normalizedKey.includes('logistics')) {
    return {
      Icon: FolderIcon,
      className: 'text-cyan-500 dark:text-cyan-400',
    };
  }

  if (normalizedKey.includes('frameworks')) {
    return {
      Icon: FolderIcon,
      className: 'text-indigo-500 dark:text-indigo-400',
    };
  }

  return {
    Icon: FolderIcon,
    className: 'text-slate-500 dark:text-slate-400',
  };
}

function getStarRatingAppearance(rating: number) {
  if (rating >= 5) {
    return {
      label: 'Must know',
      className: 'bg-emerald-500',
    };
  }

  if (rating === 4) {
    return {
      label: 'Important',
      className: 'bg-amber-400',
    };
  }

  return {
    label: 'Good to know',
    className: 'bg-rose-500',
  };
}

function StarRatingDot({ rating }: { rating: number }) {
  const appearance = getStarRatingAppearance(rating);

  return (
    <span
      className={cn(
        'mt-0.5 size-2 shrink-0 rounded-full shadow-[0_0_0_1px_rgb(15_23_42/12%)] dark:shadow-[0_0_0_1px_rgb(255_255_255/18%)]',
        appearance.className,
      )}
      title={`${appearance.label} (${rating} star${rating === 1 ? '' : 's'})`}
      aria-label={`${appearance.label}, ${rating} star rating`}
    />
  );
}

function TopicNavButton({
  topic,
  isActive,
  topicProgressById,
  onSelect,
}: {
  topic: Topic;
  isActive: boolean;
  topicProgressById: TopicProgressMap;
  onSelect: (navId: string) => void;
}) {
  const RootTopicIcon = getRootTopicIcon(topic.title);
  const topicProgress = topicProgressById[topic.id];
  const isCompleted = topicProgress?.completed === true;
  const isImportant = topicProgress?.important === true;

  return (
    <SidebarMenuButton
      size="sm"
      isActive={isActive}
      onClick={() => onSelect(getTopicNavId(topic.id))}
      className="h-auto w-full rounded-[var(--radius-control)] border border-transparent py-2 text-[13px] text-sidebar-foreground/95 data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
    >
      {topic.starRating && !topic.topicTitle ? (
        <StarRatingDot rating={topic.starRating} />
      ) : RootTopicIcon ? (
        <RootTopicIcon.Icon className={cn('mt-0.5 shrink-0', RootTopicIcon.className)} />
      ) : null}
      <span className="line-clamp-2 min-w-0 flex-1 leading-tight">{topic.title}</span>
      <span className="ml-auto inline-flex shrink-0 items-center gap-1">
        {isImportant ? (
          <StarIcon className="size-3 text-amber-500 fill-amber-400" aria-label="Important topic" />
        ) : null}
        {isCompleted ? (
          <CheckCircle2Icon className="size-3 text-emerald-500" aria-label="Completed topic" />
        ) : null}
      </span>
    </SidebarMenuButton>
  );
}

function KitTopicTree({
  kit,
  selectedNavId,
  hasSearchQuery,
  topicProgressById,
  onSelectNav,
}: {
  kit: KitMenu;
  selectedNavId: string | null;
  hasSearchQuery: boolean;
  topicProgressById: TopicProgressMap;
  onSelectNav: (navId: string) => void;
}) {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    for (const section of kit.sections) {
      const sectionHasSelectedTopic =
        selectedNavId !== null &&
        (section.topics.some((topic) => getTopicNavId(topic.id) === selectedNavId) ||
          section.folders.some(
            (folder) => getFolderNavId(kit.id, section.id, folder.id) === selectedNavId,
          ));

      if (sectionHasSelectedTopic) {
        setOpenSections((current) =>
          current[section.id] ? current : { ...current, [section.id]: true },
        );
      }
    }
  }, [kit.id, kit.sections, selectedNavId]);

  return (
    <div className="space-y-2">
      {kit.rootTopics.length > 0 && (
        <div className="space-y-1">
          {kit.rootTopics.map((topic) => (
            <TopicNavButton
              key={topic.id}
              topic={topic}
              isActive={selectedNavId === getTopicNavId(topic.id)}
              topicProgressById={topicProgressById}
              onSelect={onSelectNav}
            />
          ))}
        </div>
      )}

      {kit.sections.map((section) => {
        const sectionHasSelectedTopic =
          selectedNavId !== null &&
          (section.topics.some((topic) => getTopicNavId(topic.id) === selectedNavId) ||
            section.folders.some(
              (folder) => getFolderNavId(kit.id, section.id, folder.id) === selectedNavId,
            ));
        const SectionIcon = getSectionIcon(section);
        const isSectionOpen =
          hasSearchQuery ||
          openSections[section.id] ||
          (openSections[section.id] === undefined && sectionHasSelectedTopic);

        return (
          <Collapsible
            key={`${kit.id}-${section.id}`}
            open={isSectionOpen}
            onOpenChange={(open) => {
              setOpenSections((current) => ({
                ...current,
                [section.id]: open,
              }));
            }}
            className="group/section-collapsible space-y-1"
          >
            <CollapsibleTrigger
              render={
                <SidebarMenuButton
                  size="sm"
                  tooltip={section.label}
                  isActive={sectionHasSelectedTopic}
                  className="h-8 border border-transparent text-xs font-semibold text-muted-foreground data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
                />
              }
            >
              <SectionIcon.Icon className={cn('size-3.5 shrink-0', SectionIcon.className)} />
              <span>{section.label}</span>
              <ChevronRightIcon className="ml-auto size-3.5 transition-transform duration-200 group-data-open/section-collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1 pl-3">
                {section.topics.map((topic) => (
                  <TopicNavButton
                    key={topic.id}
                    topic={topic}
                    isActive={selectedNavId === getTopicNavId(topic.id)}
                    topicProgressById={topicProgressById}
                    onSelect={onSelectNav}
                  />
                ))}
                {section.folders.map((folder) => {
                  const folderNavId = getFolderNavId(kit.id, section.id, folder.id);
                  const isActive = selectedNavId === folderNavId;
                  const completedCount = folder.questions.reduce(
                    (count, topic) => count + (topicProgressById[topic.id]?.completed ? 1 : 0),
                    0,
                  );
                  const importantCount = folder.questions.reduce(
                    (count, topic) => count + (topicProgressById[topic.id]?.important ? 1 : 0),
                    0,
                  );

                  return (
                    <SidebarMenuButton
                      key={folderNavId}
                      size="sm"
                      tooltip={folder.label}
                      isActive={isActive}
                      onClick={() => onSelectNav(folderNavId)}
                      className="h-auto rounded-[var(--radius-control)] border border-transparent py-2 text-[13px] text-sidebar-foreground/95 data-active:border-primary data-active:bg-primary data-active:text-primary-foreground"
                    >
                      {folder.starRating ? (
                        <StarRatingDot rating={folder.starRating} />
                      ) : (
                        <FolderIcon className="mt-0.5 size-3.5 shrink-0" />
                      )}
                      <span className="line-clamp-2 min-w-0 flex-1 leading-tight">{folder.label}</span>
                      <span
                        className="ml-auto shrink-0 text-[11px] text-sidebar-foreground/65"
                        title={`${completedCount} of ${folder.questions.length} completed`}
                      >
                        {completedCount}/{folder.questions.length}
                      </span>
                      {importantCount > 0 ? (
                        <span
                          className="shrink-0 text-[11px] text-amber-500"
                          title={`${importantCount} marked important`}
                        >
                          <StarIcon className="size-3 fill-amber-400" />
                        </span>
                      ) : null}
                    </SidebarMenuButton>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

export function AppSidebar({
  groups,
  searchValue,
  selectedNavId,
  topicProgressById,
  totalTopicCount,
  completedTopicCount,
  importantTopicCount,
  onSearchChange,
  onSelectNav,
  onBackToKits,
  className,
  ...props
}: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const kitMenus = React.useMemo(() => buildKitMenus(groups), [groups]);
  const activeKit = kitMenus[0] ?? null;
  const hasSearchQuery = searchValue.trim().length > 0;

  const handleSelectNav = React.useCallback(
    (navId: string) => {
      onSelectNav(navId);
      if (isMobile) {
        setOpenMobile(false);
      }
    },
    [isMobile, onSelectNav, setOpenMobile],
  );

  const handleBackToKits = React.useCallback(() => {
    onBackToKits();
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, onBackToKits, setOpenMobile]);

  return (
    <Sidebar
      collapsible="icon"
      className={cn('border-r border-sidebar-border bg-sidebar', className)}
      {...props}
    >
      <SidebarHeader className="gap-3 border-b border-sidebar-border bg-sidebar px-3 pt-3 pb-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleBackToKits}
          className="h-9 w-full justify-start px-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
        >
          <ArrowLeftIcon className="size-4" />
          <span className="group-data-[collapsible=icon]:hidden">All kits</span>
        </Button>
        <div className="px-2 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-sidebar-foreground/75" />
            <SidebarInput
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              aria-label="Search topics"
              placeholder="Search this kit"
              className="h-8 rounded-[var(--radius-control)] border-sidebar-border bg-card pl-7 text-xs shadow-none placeholder:text-sidebar-foreground/66 focus-visible:border-sidebar-ring"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        {!activeKit || (activeKit.rootTopics.length === 0 && activeKit.sections.length === 0) ? (
          <div className="p-4 text-sm text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
            No topics found.
          </div>
        ) : (
          <SidebarGroup className="py-1.5">
            <SidebarGroupLabel className="px-2 text-xs text-muted-foreground">Contents</SidebarGroupLabel>
            <div className="px-1">
              <KitTopicTree
                kit={activeKit}
                selectedNavId={selectedNavId}
                hasSearchQuery={hasSearchQuery}
                topicProgressById={topicProgressById}
                onSelectNav={handleSelectNav}
              />
            </div>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border bg-sidebar px-4 py-3 group-data-[collapsible=icon]:hidden">
        <p className="text-xs text-muted-foreground">
          {completedTopicCount}/{totalTopicCount} completed
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-sidebar-foreground/72">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2Icon className="size-3 text-emerald-500" aria-hidden="true" />
            Progress saved locally
          </span>
          <span className="inline-flex items-center gap-1.5">
            <StarIcon className="size-3 text-amber-500 fill-amber-400" aria-hidden="true" />
            {importantTopicCount} important
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Must know
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-amber-400" aria-hidden="true" />
            Important
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-rose-500" aria-hidden="true" />
            Good to know
          </span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
