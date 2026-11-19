import * as React from 'react';
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  FileIcon,
  FolderIcon,
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
  SidebarHeader,
  SidebarInput,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SEARCH_QUERY_MAX, sanitizeSearchQuery } from '@/lib/search-validation';
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

const FOLDER_COLORS = [
  'text-[#b7a898]',
  'text-[#7fc278]',
  'text-[#c4b0e0]',
  'text-[#e3ae3c]',
  'text-[#7eb6e0]',
  'text-[#7ec8c3]',
  'text-[#e7a0c4]',
  'text-[#c5c97a]',
  'text-[#d7c56a]',
];

function folderColor(index: number) {
  return FOLDER_COLORS[index % FOLDER_COLORS.length];
}

function sectionQuestionCount(section: KitSection) {
  return (
    section.topics.length +
    section.folders.reduce((count, folder) => count + folder.questions.length, 0)
  );
}

function sectionCompletedCount(section: KitSection, topicProgressById: TopicProgressMap) {
  const topics = [...section.topics, ...section.folders.flatMap((folder) => folder.questions)];
  return topics.reduce(
    (count, topic) => count + (topicProgressById[topic.id]?.completed ? 1 : 0),
    0,
  );
}

function getStarRatingAppearance(rating: number) {
  if (rating >= 5) {
    return {
      label: 'Must know',
      className: 'text-emerald-500',
    };
  }

  if (rating === 4) {
    return {
      label: 'Important',
      className: 'text-amber-400',
    };
  }

  return {
    label: 'Good to know',
    className: 'text-rose-500',
  };
}

const treeRowClass =
  'h-7 w-full gap-1.5 rounded-[6px] border border-transparent px-1.5 text-[12px] font-normal text-sidebar-foreground/80 hover:bg-foreground/5 hover:text-sidebar-foreground data-active:border-sidebar-border data-active:bg-transparent data-active:font-medium data-active:text-sidebar-foreground [&_svg]:size-3.5';

function LessonFileButton({
  label,
  isActive,
  starRating,
  markedImportant,
  onClick,
}: {
  label: string;
  isActive: boolean;
  starRating?: number | null;
  markedImportant?: boolean;
  onClick: () => void;
}) {
  const rating = starRating ? getStarRatingAppearance(starRating) : null;

  return (
    <SidebarMenuButton
      size="sm"
      isActive={isActive}
      onClick={onClick}
      tooltip={rating ? `${label} · ${rating.label}` : label}
      className={treeRowClass}
    >
      <FileIcon className={cn('shrink-0', rating?.className ?? 'text-muted-foreground')} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {markedImportant ? (
        <StarIcon
          className="ml-auto size-3 shrink-0 fill-amber-400 text-amber-500"
          aria-label="Important"
        />
      ) : null}
    </SidebarMenuButton>
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
  const topicProgress = topicProgressById[topic.id];

  return (
    <LessonFileButton
      label={topic.title}
      isActive={isActive}
      starRating={topic.starRating && !topic.topicTitle ? topic.starRating : null}
      markedImportant={topicProgress?.important === true}
      onClick={() => onSelect(getTopicNavId(topic.id))}
    />
  );
}

function TreeBranch({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div className="relative ml-[13px]">
      {items.map((child, index) => (
        <div key={index} className="relative pl-3">
          <span
            aria-hidden
            className={cn(
              'absolute left-0 w-px bg-(--line-strong)',
              index === items.length - 1 ? 'top-0 h-1/2' : 'inset-y-0',
            )}
          />
          <span aria-hidden className="absolute top-1/2 left-0 h-px w-2.5 bg-(--line-strong)" />
          {child}
        </div>
      ))}
    </div>
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
  const { state: sidebarState } = useSidebar();
  const sidebarCollapsed = sidebarState === 'collapsed';
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});
  const wasSidebarCollapsed = React.useRef(sidebarCollapsed);

  React.useEffect(() => {
    if (!sidebarCollapsed) {
      return;
    }

    setOpenSections((current) => {
      const next = Object.fromEntries(kit.sections.map((section) => [section.id, false]));
      const alreadyClosed = kit.sections.every((section) => current[section.id] === false);
      return alreadyClosed ? current : next;
    });
  }, [sidebarCollapsed, kit.sections]);

  React.useEffect(() => {
    const justExpanded = wasSidebarCollapsed.current && !sidebarCollapsed;
    wasSidebarCollapsed.current = sidebarCollapsed;
    if (sidebarCollapsed || justExpanded) {
      return;
    }

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
  }, [kit.id, kit.sections, selectedNavId, sidebarCollapsed]);

  const lessonCount =
    kit.rootTopics.length +
    kit.sections.reduce((count, section) => count + sectionQuestionCount(section), 0);

  return (
    <div className="space-y-0.5">
      <div className="flex h-8 items-center gap-1.5 px-1.5 text-[12px]">
        <FolderIcon className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate font-medium text-sidebar-foreground">{kit.label}</span>
        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground tabular-nums">
          {lessonCount} lessons
        </span>
      </div>

      {kit.rootTopics.map((topic) => (
        <TopicNavButton
          key={topic.id}
          topic={topic}
          isActive={selectedNavId === getTopicNavId(topic.id)}
          topicProgressById={topicProgressById}
          onSelect={onSelectNav}
        />
      ))}

      {kit.sections.map((section, sectionIndex) => {
        const sectionHasSelectedTopic =
          selectedNavId !== null &&
          (section.topics.some((topic) => getTopicNavId(topic.id) === selectedNavId) ||
            section.folders.some(
              (folder) => getFolderNavId(kit.id, section.id, folder.id) === selectedNavId,
            ));
        const isSectionOpen =
          !sidebarCollapsed &&
          (hasSearchQuery ||
            openSections[section.id] ||
            (openSections[section.id] === undefined && sectionHasSelectedTopic));
        const total = sectionQuestionCount(section);
        const completed = sectionCompletedCount(section, topicProgressById);
        const sectionNumber = String(sectionIndex + 1).padStart(2, '0');

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
            className="group/section-collapsible"
          >
            <CollapsibleTrigger
              render={
                <SidebarMenuButton
                  size="sm"
                  tooltip={section.label}
                  className={cn(
                    treeRowClass,
                    'font-medium text-sidebar-foreground',
                    isSectionOpen && 'border-sidebar-border',
                  )}
                />
              }
            >
              <ChevronRightIcon
                className={cn(
                  'size-3 shrink-0 text-muted-foreground transition-transform duration-200',
                  isSectionOpen && 'rotate-90',
                )}
              />
              <FolderIcon
                className={cn('size-3.5 shrink-0', folderColor(sectionIndex))}
                fill="currentColor"
              />
              <span className="min-w-0 flex-1 truncate">
                {sectionNumber}. {section.label}
              </span>
              <span className="ml-auto shrink-0 text-[11px] text-muted-foreground tabular-nums">
                {completed}/{total}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <TreeBranch>
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
                  const markedImportant = folder.questions.some(
                    (topic) => topicProgressById[topic.id]?.important,
                  );

                  return (
                    <LessonFileButton
                      key={folderNavId}
                      label={folder.label}
                      isActive={selectedNavId === folderNavId}
                      starRating={folder.starRating}
                      markedImportant={markedImportant}
                      onClick={() => onSelectNav(folderNavId)}
                    />
                  );
                })}
              </TreeBranch>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

function ProgressPanel({
  kit,
  completedTopicCount,
  totalTopicCount,
  importantTopicCount,
  topicProgressById,
  onSelectNav,
}: {
  kit: KitMenu | null;
  completedTopicCount: number;
  totalTopicCount: number;
  importantTopicCount: number;
  topicProgressById: TopicProgressMap;
  onSelectNav: (navId: string) => void;
}) {
  const { state: sidebarState } = useSidebar();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (sidebarState === 'collapsed') {
      setOpen(false);
    }
  }, [sidebarState]);
  const percent =
    totalTopicCount > 0 ? Math.round((completedTopicCount / totalTopicCount) * 100) : 0;
  const sections = kit?.sections ?? [];

  return (
    <div className="overflow-hidden rounded-(--radius-control) border border-sidebar-border">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex h-9 w-full items-center justify-between px-3 text-left"
        title={importantTopicCount > 0 ? `${importantTopicCount} marked important` : undefined}
      >
        <span className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground">
          PROGRESS
        </span>
        <span className="inline-flex items-center gap-1.5 text-[12px] text-sidebar-foreground tabular-nums">
          {completedTopicCount} / {totalTopicCount}
          <ChevronRightIcon
            className={cn(
              'size-3.5 text-muted-foreground transition-transform duration-200',
              open && '-rotate-90',
            )}
          />
        </span>
      </button>
      {open ? (
        <div className="border-t border-sidebar-border px-3 pt-2 pb-2">
          <div className="mb-2 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
          <ul className="max-h-52 space-y-0.5 overflow-auto">
            {sections.map((section) => {
              const total = sectionQuestionCount(section);
              const completed = sectionCompletedCount(section, topicProgressById);
              const done = total > 0 && completed === total;
              const firstFolder = section.folders[0];
              const firstTopic = section.topics[0];

              return (
                <li key={section.id}>
                  <button
                    type="button"
                    className="flex h-7 w-full items-center gap-2 rounded-[6px] px-0.5 text-left text-[12px] text-sidebar-foreground/85 hover:bg-foreground/5"
                    onClick={() => {
                      if (!kit) {
                        return;
                      }
                      if (firstFolder) {
                        onSelectNav(getFolderNavId(kit.id, section.id, firstFolder.id));
                        return;
                      }
                      if (firstTopic) {
                        onSelectNav(getTopicNavId(firstTopic.id));
                      }
                    }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border border-sidebar-border',
                        done && 'border-primary bg-primary text-primary-foreground',
                      )}
                    >
                      {done ? <CheckIcon className="size-2.5" /> : null}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{section.label}</span>
                    <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
                      {completed}/{total}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
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
              onChange={(event) => onSearchChange(sanitizeSearchQuery(event.target.value))}
              maxLength={SEARCH_QUERY_MAX}
              aria-label="Search topics"
              placeholder="Search this kit"
              className="h-8 rounded-[8px] border-sidebar-border bg-background pl-7 text-xs shadow-none placeholder:text-muted-foreground focus-visible:border-sidebar-ring"
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
          <SidebarGroup className="px-2 py-2">
            <div className="px-0.5">
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
      <SidebarFooter className="bg-sidebar px-3 py-3 group-data-[collapsible=icon]:hidden">
        <ProgressPanel
          kit={activeKit}
          completedTopicCount={completedTopicCount}
          totalTopicCount={totalTopicCount}
          importantTopicCount={importantTopicCount}
          topicProgressById={topicProgressById}
          onSelectNav={handleSelectNav}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
