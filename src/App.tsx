import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';

import { AppSidebar } from '@/components/app-sidebar';
import { KitGallery } from '@/components/kit-gallery';
import { MarkdownPreview } from '@/components/markdown-preview';
import { EditionDateline, GazetteBanner } from '@/components/newspaper-masthead';
import { TopicAccordion } from '@/components/topic-accordion';
import {
  FullscreenButton,
  ScrollToTopButton,
  ThemeToggle,
  TopicDock,
  TopicNavigator,
} from '@/components/topic-navigator';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { KIT_DESKS } from '@/lib/kit-meta';
import {
  useAdjacentTopics,
  useFooterInView,
  useReadingSession,
  useTopicHotkeys,
} from '@/hooks/use-topic-navigation';
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

let allTopics: Topic[] = [];
let groups: TopicGroup[] = [];

try {
  const topicIndex = buildTopicIndex();
  allTopics = topicIndex.allTopics;
  groups = topicIndex.groups;
} catch (error) {
  console.error('Failed to build topic index:', error);
}

function hasOwn(obj: Record<string, string>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

type Theme = 'light' | 'dark';

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

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedKitId, setSelectedKitId] = useState<string | null>(() => getKitIdFromHash());
  const [selectedNavId, setSelectedNavId] = useState<string | null>(null);
  const [focusedTopicId, setFocusedTopicId] = useState<string | null>(null);
  const [topicContentById, setTopicContentById] = useState<Record<string, string>>({});
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [topicLoadError, setTopicLoadError] = useState('');
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  const filteredGroups = useMemo<TopicGroup[]>(() => {
    if (!selectedKitId) {
      return [];
    }

    const kitGroups = groups.filter((group) => group.id === selectedKitId);
    const query = searchValue.trim().toLowerCase();

    if (!query) {
      return kitGroups;
    }

    return kitGroups.map((group) => ({
      ...group,
      topics: group.topics.filter((topic) => {
        const haystack =
          `${topic.title} ${topic.topicTitle ?? ''} ${topic.section} ${topic.kitLabel}`.toLowerCase();
        return haystack.includes(query);
      }),
    }));
  }, [searchValue, selectedKitId]);

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
  const { scrolled, scrollToTop } = useReadingSession(scrollRef, selectedNav?.id ?? null);
  const footerInView = useFooterInView(contentEndRef, scrollRef, selectedNav?.id ?? null);

  useTopicHotkeys({
    previousTopic,
    nextTopic,
    onSelect: handleSelectNav,
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
      setSelectedNavId(null);
      setFocusedTopicId(null);
      setSearchValue('');
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
      if (event.key !== 'Escape' || !selectedKitId) {
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

      event.preventDefault();
      closeKit();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeKit, selectedKitId]);

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
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const headerActions = (
    <>
      <FullscreenButton tone="ink" />
      <ThemeToggle
        theme={theme}
        tone="ink"
        onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
    </>
  );

  if (!selectedKitId) {
    return (
      <div className="theme paper-grain flex h-svh flex-col bg-background">
        <GazetteBanner theme={theme} actions={headerActions} />
        <ScrollArea className="min-h-0 flex-1">
          <KitGallery groups={groups} theme={theme} onSelectKit={(kitId) => openKit(kitId)} />
        </ScrollArea>
      </div>
    );
  }

  const kitDesk = selectedNav ? (KIT_DESKS[selectedNav.kitKey] ?? 'Special edition') : 'Inside';
  const editionSubtitle = selectedNav
    ? [
        selectedNav.section,
        selectedNav.title,
        selectedNav.kind === 'folder' ? getNavSubtitle(selectedNav) : null,
        currentIndex >= 0 && totalCount > 0 ? `Col. ${currentIndex + 1} / ${totalCount}` : null,
      ]
        .filter(Boolean)
        .join(' · ')
    : undefined;

  return (
    <SidebarProvider className="theme paper-grain bg-background">
      <AppSidebar
        groups={filteredGroups}
        searchValue={searchValue}
        selectedNavId={selectedNav?.id ?? null}
        onSearchChange={setSearchValue}
        onSelectNav={handleSelectNav}
        onBackToKits={closeKit}
      />
      <SidebarInset className="bg-background">
        <GazetteBanner
          theme={theme}
          sectionLabel={selectedNav?.kitLabel}
          actions={headerActions}
        />
        <EditionDateline
          kicker={kitDesk}
          title={selectedNav?.kitLabel ?? 'Interview Gazette'}
          subtitle={editionSubtitle}
          leading={
            <>
              <SidebarTrigger className="-ml-0.5 rounded-none border border-foreground bg-card hover:bg-muted sm:-ml-1" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={closeKit}
                className="h-7 rounded-none border-foreground bg-card px-2 text-xs uppercase"
              >
                <ArrowLeftIcon className="size-3.5" />
                <span className="hidden sm:inline">Front page</span>
                <span className="sm:hidden">Front</span>
              </Button>
              {selectedTopicIcon ? (
                <img
                  src={selectedTopicIcon}
                  alt=""
                  aria-hidden="true"
                  className="hidden size-5 shrink-0 border border-foreground bg-card object-contain p-0.5 sm:block"
                />
              ) : null}
            </>
          }
        />
        <ScrollArea
          className="group/reader min-h-0 flex-1"
          viewportRef={scrollRef}
          viewportClassName="[overflow-anchor:none]"
        >
          {!selectedNav ? (
            <div className="flex h-full items-center justify-center p-4 sm:p-6">
              <p className="border border-foreground bg-card p-4 text-sm text-foreground/80 sm:p-5">
                {searchValue.trim()
                  ? 'No copy matches this search in the current edition.'
                  : 'Select a column to read.'}
              </p>
            </div>
          ) : (
            <article className="newspaper-article mx-auto w-full min-w-0 max-w-5xl space-y-3 px-1 py-3 sm:space-y-4">
              <TopicNavigator
                previousTopic={previousTopic}
                nextTopic={nextTopic}
                onSelect={handleSelectNav}
              >
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
                    onInternalLink={handleInternalLink}
                  />
                ) : (
                  <div className="border border-foreground bg-card p-4 sm:p-5 lg:p-8">
                    {isLoadingTopic && !hasSelectedTopicContent ? (
                      <p className="text-sm text-foreground/70">Setting the type...</p>
                    ) : topicLoadError ? (
                      <p className="text-sm text-secondary">
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
