import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2Icon, CircleIcon, StarIcon } from 'lucide-react';

import { AppSidebar } from '@/components/app-sidebar';
import { GuideReader } from '@/components/guide-reader';
import { GuidesGallery } from '@/components/guides-gallery';
import { KitGallery } from '@/components/kit-gallery';
import { MarkdownPreview } from '@/components/markdown-preview';
import { SiteHeader } from '@/components/newspaper-masthead';
import { TopicAccordion } from '@/components/topic-accordion';
import {
  FullscreenButton,
  ScrollToTopButton,
  ThemeToggle,
  TopicDock,
  TopicNavigator,
  TopicStepButtons,
} from '@/components/topic-navigator';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useGuideProgress, type GuideProgressMap } from '@/hooks/use-guide-progress';
import {
  useAdjacentTopics,
  useFooterInView,
  useReadingSession,
  useTopicHotkeys,
} from '@/hooks/use-topic-navigation';
import { useTopicProgress, type TopicProgressMap } from '@/hooks/use-topic-progress';
import { buildGuidesIndex, type Guide } from '@/lib/guides-index';
import { KIT_ICON_BY_KEY } from '@/lib/kit-meta';
import {
  buildKitMenus,
  findNavItemForTopic,
  findNavItemForTopicInGroups,
  getKitNavItems,
  type KitNavItem,
} from '@/lib/kit-menu';
import {
  buildTopicIndex,
  resolveTopicFromHref,
  type Topic,
  type TopicGroup,
} from '@/lib/content-index';
import { cn } from '@/lib/utils';

let allTopics: Topic[] = [];
let groups: TopicGroup[] = [];
let allGuides: Guide[] = [];

try {
  const topicIndex = buildTopicIndex();
  allTopics = topicIndex.allTopics;
  groups = topicIndex.groups;
} catch (error) {
  console.error('Failed to build topic index:', error);
}

try {
  allGuides = buildGuidesIndex();
} catch (error) {
  console.error('Failed to build guides index:', error);
}

function hasOwn(obj: Record<string, string>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

type Theme = 'light' | 'dark';
type HomeView = 'kits' | 'guides';

const THEME_STORAGE_KEY = 'interview-kit-theme';

function getKitIdFromHash() {
  if (typeof window === 'undefined') {
    return null;
  }

  const kitId = decodeURIComponent(window.location.hash.replace(/^#/, '')).trim();
  return groups.some((group) => group.id === kitId) ? kitId : null;
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getNavSubtitle(nav: KitNavItem) {
  if (nav.kind === 'folder') {
    return `${nav.topics.length} question${nav.topics.length === 1 ? '' : 's'}`;
  }

  return nav.section;
}

function countProgressByTopicIds(
  topicIds: string[],
  topicProgressById: TopicProgressMap,
  field: keyof TopicProgressMap[string],
) {
  return topicIds.reduce(
    (count, topicId) => count + (topicProgressById[topicId]?.[field] ? 1 : 0),
    0,
  );
}

function countProgressByGuideIds(
  guideIds: string[],
  guideProgressById: GuideProgressMap,
  field: keyof GuideProgressMap[string],
) {
  return guideIds.reduce(
    (count, guideId) => count + (guideProgressById[guideId]?.[field] ? 1 : 0),
    0,
  );
}

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [homeView, setHomeView] = useState<HomeView>('kits');
  const [selectedKitId, setSelectedKitId] = useState<string | null>(() => getKitIdFromHash());
  const [selectedNavId, setSelectedNavId] = useState<string | null>(null);
  const [focusedTopicId, setFocusedTopicId] = useState<string | null>(null);
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [topicContentById, setTopicContentById] = useState<Record<string, string>>({});
  const [guideContentById, setGuideContentById] = useState<Record<string, string>>({});
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [isLoadingGuide, setIsLoadingGuide] = useState(false);
  const [topicLoadError, setTopicLoadError] = useState('');
  const [guideLoadError, setGuideLoadError] = useState('');
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const {
    topicProgressById,
    getTopicProgress,
    toggleTopicCompleted,
    toggleTopicImportant,
    setManyTopicsCompleted,
    setManyTopicsImportant,
  } = useTopicProgress();
  const {
    guideProgressById,
    getGuideProgress,
    toggleGuideRead,
    toggleGuideStarred,
  } = useGuideProgress();

  const selectedGuide = useMemo(
    () => allGuides.find((guide) => guide.id === selectedGuideId) ?? null,
    [selectedGuideId],
  );
  const selectedGuideProgress = selectedGuide ? getGuideProgress(selectedGuide.id) : null;
  const selectedGuideContent = selectedGuide ? (guideContentById[selectedGuide.id] ?? '') : '';

  const selectedKitGroups = useMemo<TopicGroup[]>(
    () => (selectedKitId ? groups.filter((group) => group.id === selectedKitId) : []),
    [selectedKitId],
  );

  const filteredGroups = useMemo<TopicGroup[]>(() => {
    if (selectedKitGroups.length === 0) {
      return [];
    }

    const query = searchValue.trim().toLowerCase();
    if (!query) {
      return selectedKitGroups;
    }

    return selectedKitGroups.map((group) => ({
      ...group,
      topics: group.topics.filter((topic) => {
        const haystack =
          `${topic.title} ${topic.topicTitle ?? ''} ${topic.section} ${topic.kitLabel}`.toLowerCase();
        return haystack.includes(query);
      }),
    }));
  }, [searchValue, selectedKitGroups]);

  const selectedKitTopicIds = useMemo(
    () => selectedKitGroups.flatMap((group) => group.topics.map((topic) => topic.id)),
    [selectedKitGroups],
  );
  const selectedKitCompletedCount = useMemo(
    () => countProgressByTopicIds(selectedKitTopicIds, topicProgressById, 'completed'),
    [selectedKitTopicIds, topicProgressById],
  );
  const selectedKitImportantCount = useMemo(
    () => countProgressByTopicIds(selectedKitTopicIds, topicProgressById, 'important'),
    [selectedKitTopicIds, topicProgressById],
  );

  const guideIds = useMemo(() => allGuides.map((guide) => guide.id), []);
  const guidesReadCount = useMemo(
    () => countProgressByGuideIds(guideIds, guideProgressById, 'read'),
    [guideIds, guideProgressById],
  );
  const guidesStarredCount = useMemo(
    () => countProgressByGuideIds(guideIds, guideProgressById, 'starred'),
    [guideIds, guideProgressById],
  );
  const guideNavItems = useMemo(
    () => allGuides.map((guide) => ({ id: guide.id, title: guide.title })),
    [],
  );

  const navigationItems = useMemo(() => {
    return buildKitMenus(filteredGroups).flatMap(getKitNavItems);
  }, [filteredGroups]);

  const selectedNav = useMemo(() => {
    if (!selectedKitId) {
      return null;
    }

    if (selectedNavId) {
      const exact = navigationItems.find((item) => item.id === selectedNavId);
      if (exact) {
        return exact;
      }
    }

    if (focusedTopicId && !searchValue.trim()) {
      return findNavItemForTopicInGroups(
        groups.filter((group) => group.id === selectedKitId),
        focusedTopicId,
      );
    }

    if (focusedTopicId) {
      return findNavItemForTopic(navigationItems, focusedTopicId);
    }

    return navigationItems[0] ?? null;
  }, [focusedTopicId, navigationItems, searchValue, selectedKitId, selectedNavId]);

  const selectedTopicIcon = selectedNav ? KIT_ICON_BY_KEY[selectedNav.kitKey] : null;
  const selectedSingleTopic =
    selectedNav?.kind === 'topic' ? (selectedNav.topics[0] ?? null) : null;
  const selectedSingleTopicProgress = selectedSingleTopic
    ? getTopicProgress(selectedSingleTopic.id)
    : null;

  const closeKit = useCallback(() => {
    setSelectedKitId(null);
    setSelectedNavId(null);
    setFocusedTopicId(null);
    setSearchValue('');

    if (window.location.hash) {
      window.history.pushState({}, '', `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  const openKit = useCallback((kitId: string, topicId?: string) => {
    setHomeView('kits');
    setSelectedGuideId(null);
    setSelectedKitId(kitId);
    setSearchValue('');

    if (topicId) {
      const nav = findNavItemForTopicInGroups(
        groups.filter((group) => group.id === kitId),
        topicId,
      );
      setSelectedNavId(nav?.id ?? null);
      setFocusedTopicId(topicId);
    } else {
      setSelectedNavId(null);
      setFocusedTopicId(null);
    }

    if (window.location.hash !== `#${kitId}`) {
      window.history.pushState({ kitId }, '', `#${kitId}`);
    }
  }, []);

  const openGuide = useCallback((guideId: string) => {
    setHomeView('guides');
    setSelectedKitId(null);
    setSelectedNavId(null);
    setFocusedTopicId(null);
    setSearchValue('');
    setSelectedGuideId(guideId);

    if (window.location.hash) {
      window.history.pushState({}, '', `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  const closeGuide = useCallback(() => {
    setSelectedGuideId(null);
    setHomeView('guides');
  }, []);

  const handleSelectNav = useCallback((navId: string) => {
    setSelectedNavId(navId);
    setFocusedTopicId(null);
  }, []);

  const handleInternalLink = useCallback(
    (fromPath: string, href: string) => {
      const target = resolveTopicFromHref(fromPath, href, allTopics);
      if (!target) {
        return false;
      }

      openKit(target.kitKey, target.id);
      return true;
    },
    [openKit],
  );

  const selectedTopicContent = selectedSingleTopic
    ? (topicContentById[selectedSingleTopic.id] ?? '')
    : '';
  const hasSelectedTopicContent = selectedSingleTopic
    ? hasOwn(topicContentById, selectedSingleTopic.id)
    : false;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const contentEndRef = useRef<HTMLDivElement | null>(null);

  const { previousTopic, nextTopic, currentIndex, totalCount } = useAdjacentTopics(
    navigationItems,
    selectedNav?.id ?? null,
  );
  const {
    previousTopic: previousGuide,
    nextTopic: nextGuide,
  } = useAdjacentTopics(guideNavItems, selectedGuideId);
  const { scrolled, scrollToTop } = useReadingSession(scrollRef, selectedNav?.id ?? null);
  const footerInView = useFooterInView(contentEndRef, scrollRef, selectedNav?.id ?? null);

  useTopicHotkeys({
    previousTopic,
    nextTopic,
    onSelect: handleSelectNav,
  });
  useTopicHotkeys({
    previousTopic: selectedGuide ? previousGuide : null,
    nextTopic: selectedGuide ? nextGuide : null,
    onSelect: openGuide,
  });

  useEffect(() => {
    if (selectedNav && selectedNav.id !== selectedNavId) {
      setSelectedNavId(selectedNav.id);
    }
  }, [selectedNav, selectedNavId]);

  useEffect(() => {
    function syncKitFromLocation() {
      const kitId = getKitIdFromHash();
      setSelectedKitId(kitId);
      setSelectedGuideId(null);
      setSelectedNavId(null);
      setFocusedTopicId(null);
      setSearchValue('');
      setHomeView('kits');
    }

    window.addEventListener('popstate', syncKitFromLocation);
    window.addEventListener('hashchange', syncKitFromLocation);
    return () => {
      window.removeEventListener('popstate', syncKitFromLocation);
      window.removeEventListener('hashchange', syncKitFromLocation);
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') {
        return;
      }

      if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select, [contenteditable='true']")
      ) {
        return;
      }

      if (selectedKitId) {
        event.preventDefault();
        closeKit();
        return;
      }

      if (selectedGuideId) {
        event.preventDefault();
        closeGuide();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeGuide, closeKit, selectedGuideId, selectedKitId]);

  useEffect(() => {
    let ignore = false;

    async function loadTopicContent() {
      if (!selectedNav) {
        return;
      }

      const missingTopics = selectedNav.topics.filter(
        (topic) => !hasOwn(topicContentById, topic.id),
      );
      if (missingTopics.length === 0) {
        return;
      }

      setIsLoadingTopic(true);
      setTopicLoadError('');

      const results = await Promise.allSettled(
        missingTopics.map(async (topic) => {
          const markdown = await topic.loadContent();
          return [topic.id, markdown] as const;
        }),
      );

      if (ignore) {
        return;
      }

      const nextContent: Record<string, string> = {};
      let failedCount = 0;

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          nextContent[result.value[0]] = result.value[1];
          return;
        }

        failedCount += 1;
      });

      if (Object.keys(nextContent).length > 0) {
        setTopicContentById((current) => ({
          ...current,
          ...nextContent,
        }));
      }

      if (failedCount > 0 && Object.keys(nextContent).length === 0) {
        setTopicLoadError('Failed to load markdown');
      }

      setIsLoadingTopic(false);
    }

    loadTopicContent();
    return () => {
      ignore = true;
    };
  }, [selectedNav, topicContentById]);

  useEffect(() => {
    let ignore = false;

    async function loadGuideContent() {
      if (!selectedGuide) {
        return;
      }

      if (hasOwn(guideContentById, selectedGuide.id)) {
        return;
      }

      setIsLoadingGuide(true);
      setGuideLoadError('');

      try {
        const markdown = await selectedGuide.loadContent();
        if (ignore) {
          return;
        }

        setGuideContentById((current) => ({
          ...current,
          [selectedGuide.id]: markdown,
        }));
      } catch {
        if (!ignore) {
          setGuideLoadError('Could not load this guide.');
        }
      } finally {
        if (!ignore) {
          setIsLoadingGuide(false);
        }
      }
    }

    loadGuideContent();
    return () => {
      ignore = true;
    };
  }, [guideContentById, selectedGuide]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const relatedGuides = useMemo(() => {
    if (!selectedGuide) {
      return [];
    }

    return allGuides
      .filter(
        (guide) =>
          guide.id !== selectedGuide.id &&
          (guide.topic === selectedGuide.topic ||
            guide.tags.some((tag) => selectedGuide.tags.includes(tag))),
      )
      .slice(0, 2);
  }, [selectedGuide]);

  const headerActions = (
    <>
      <FullscreenButton />
      <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
    </>
  );

  if (selectedGuide && selectedGuideProgress) {
    return (
      <div className="theme flex h-svh flex-col bg-background">
        <SiteHeader
          actions={headerActions}
          onBrandClick={closeGuide}
          kitLabel="Guides"
          detail={`${guidesReadCount}/${allGuides.length} read · ${guidesStarredCount} starred`}
        />
        <ScrollArea className="min-h-0 flex-1">
          <GuideReader
            guide={selectedGuide}
            content={selectedGuideContent}
            isLoading={isLoadingGuide}
            loadError={guideLoadError}
            theme={theme}
            progress={selectedGuideProgress}
            previousGuide={previousGuide}
            nextGuide={nextGuide}
            onBack={closeGuide}
            onOpenGuide={openGuide}
            onToggleRead={() => toggleGuideRead(selectedGuide.id)}
            onToggleStarred={() => toggleGuideStarred(selectedGuide.id)}
            relatedGuides={relatedGuides}
          />
        </ScrollArea>
      </div>
    );
  }

  if (!selectedKitId) {
    return (
      <div className="theme flex h-svh flex-col bg-background">
        <SiteHeader actions={headerActions} />
        <ScrollArea className="min-h-0 flex-1">
          <div className="border-b border-border bg-background px-5 py-3 sm:px-8">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 border border-border bg-card p-1">
                <Button
                  type="button"
                  variant={homeView === 'kits' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setHomeView('kits')}
                >
                  Interview Kits
                </Button>
                <Button
                  type="button"
                  variant={homeView === 'guides' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setHomeView('guides')}
                >
                  Guides
                </Button>
              </div>
              <p className="hud-label text-faint hidden sm:block">
                {homeView === 'kits'
                  ? `${groups.length} kits available`
                  : `${guidesReadCount}/${allGuides.length} guides read · ${guidesStarredCount} starred`}
              </p>
            </div>
          </div>
          {homeView === 'kits' ? (
            <KitGallery
              groups={groups}
              topicProgressById={topicProgressById}
              onSelectKit={(kitId) => openKit(kitId)}
            />
          ) : (
            <GuidesGallery
              guides={allGuides}
              guideProgressById={guideProgressById}
              readGuideCount={guidesReadCount}
              starredGuideCount={guidesStarredCount}
              onOpenGuide={openGuide}
              onToggleGuideRead={toggleGuideRead}
              onToggleGuideStarred={toggleGuideStarred}
            />
          )}
        </ScrollArea>
      </div>
    );
  }

  const editionSubtitle = selectedNav
    ? [
        selectedNav.section,
        selectedNav.title === selectedNav.kitLabel ? null : selectedNav.title,
        selectedNav.kind === 'folder' ? getNavSubtitle(selectedNav) : null,
        currentIndex >= 0 && totalCount > 0 ? `${currentIndex + 1} / ${totalCount}` : null,
      ]
        .filter(Boolean)
        .join(' · ')
    : undefined;

  return (
    <SidebarProvider className="theme bg-background">
      <AppSidebar
        groups={filteredGroups}
        searchValue={searchValue}
        selectedNavId={selectedNav?.id ?? null}
        topicProgressById={topicProgressById}
        totalTopicCount={selectedKitTopicIds.length}
        completedTopicCount={selectedKitCompletedCount}
        importantTopicCount={selectedKitImportantCount}
        onSearchChange={setSearchValue}
        onSelectNav={handleSelectNav}
        onBackToKits={closeKit}
      />
      <SidebarInset className="bg-background">
        <SiteHeader
          actions={headerActions}
          onBrandClick={closeKit}
          kitLabel={selectedNav?.kitLabel}
          kitKey={selectedNav?.kitKey}
          kitIcon={selectedTopicIcon}
          detail={editionSubtitle}
          leading={
            <SidebarTrigger className="-ml-0.5 border border-border bg-background hover:bg-muted sm:-ml-1" />
          }
        />
        <ScrollArea
          className="group/reader min-h-0 flex-1"
          viewportRef={scrollRef}
          viewportClassName="[overflow-anchor:none]"
        >
          {!selectedNav ? (
            <div className="flex h-full items-center justify-center p-4 sm:p-6">
              <p className="border border-border bg-card p-4 text-sm text-muted-foreground sm:p-5">
                {searchValue.trim()
                  ? 'No topics match this search in the current kit.'
                  : 'Select a topic to read.'}
              </p>
            </div>
          ) : (
            <article className="w-full min-w-0 space-y-3">
              <TopicNavigator>
                {selectedNav.kind === 'folder' ? (
                  <TopicAccordion
                    key={selectedNav.id}
                    title={selectedNav.title}
                    section={selectedNav.section}
                    topics={selectedNav.topics}
                    contentById={topicContentById}
                    isLoading={isLoadingTopic}
                    theme={theme}
                    focusedTopicId={focusedTopicId}
                    topicProgressById={topicProgressById}
                    previousTopic={previousTopic}
                    nextTopic={nextTopic}
                    onToggleTopicCompleted={toggleTopicCompleted}
                    onToggleTopicImportant={toggleTopicImportant}
                    onSetAllTopicsCompleted={setManyTopicsCompleted}
                    onSetAllTopicsImportant={setManyTopicsImportant}
                    onSelectTopic={handleSelectNav}
                    onInternalLink={handleInternalLink}
                  />
                ) : (
                  <div className="border border-border bg-card p-4 sm:p-5 lg:p-8">
                    <div className="mb-4 flex items-center justify-end gap-2">
                      {selectedSingleTopic && selectedSingleTopicProgress ? (
                        <div className="flex items-center gap-1 border border-border bg-background p-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => toggleTopicCompleted(selectedSingleTopic.id)}
                            aria-pressed={selectedSingleTopicProgress.completed}
                            aria-label={
                              selectedSingleTopicProgress.completed
                                ? 'Mark topic as unread'
                                : 'Mark topic as read'
                            }
                            title={selectedSingleTopicProgress.completed ? 'Read' : 'Mark as read'}
                          >
                            {selectedSingleTopicProgress.completed ? (
                              <CheckCircle2Icon className="size-3.5 text-emerald-500" />
                            ) : (
                              <CircleIcon className="size-3.5 text-muted-foreground" />
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => toggleTopicImportant(selectedSingleTopic.id)}
                            aria-pressed={selectedSingleTopicProgress.important}
                            aria-label={
                              selectedSingleTopicProgress.important
                                ? 'Remove topic from important'
                                : 'Mark topic as important'
                            }
                            title={
                              selectedSingleTopicProgress.important
                                ? 'Marked important'
                                : 'Mark as important'
                            }
                          >
                            <StarIcon
                              className={cn(
                                'size-3.5',
                                selectedSingleTopicProgress.important
                                  ? 'fill-amber-400 text-amber-500'
                                  : 'text-muted-foreground',
                              )}
                            />
                          </Button>
                        </div>
                      ) : null}
                      <TopicStepButtons
                        previousTopic={previousTopic}
                        nextTopic={nextTopic}
                        onSelect={handleSelectNav}
                      />
                    </div>
                    {isLoadingTopic && !hasSelectedTopicContent ? (
                      <p className="text-sm text-muted-foreground">Loading...</p>
                    ) : topicLoadError ? (
                      <p className="text-sm text-destructive">
                        Could not load this file. {topicLoadError}
                      </p>
                    ) : (
                      <MarkdownPreview
                        content={selectedTopicContent}
                        theme={theme}
                        onInternalLink={(href) =>
                          handleInternalLink(selectedSingleTopic?.path ?? '', href)
                        }
                      />
                    )}
                  </div>
                )}
              </TopicNavigator>
              <div ref={contentEndRef} aria-hidden="true" className="h-px w-full" />
            </article>
          )}
        </ScrollArea>
        {selectedNav ? (
          <>
            <TopicDock
              previousTopic={previousTopic}
              nextTopic={nextTopic}
              currentTitle={selectedNav.title}
              currentSubtitle={getNavSubtitle(selectedNav)}
              currentIndex={Math.max(currentIndex, 0)}
              totalCount={totalCount}
              visible={scrolled && !footerInView}
              onSelect={handleSelectNav}
              onBackToTop={scrollToTop}
            />
            <ScrollToTopButton
              visible={scrolled}
              dockVisible={scrolled && !footerInView}
              onClick={scrollToTop}
            />
          </>
        ) : null}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
