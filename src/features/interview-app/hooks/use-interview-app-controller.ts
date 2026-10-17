import { useCallback, useEffect, useMemo, useRef } from 'react';

import { interviewCatalog } from '@/features/interview-app/catalog';
import {
  countProgressByGuideIds,
  countProgressByTopicIds,
  hasOwn,
} from '@/features/interview-app/lib/helpers';
import {
  THEME_STORAGE_KEY,
  getHomePathForView,
  getHomeViewFromLocation,
  getKitIdFromHash,
} from '@/features/interview-app/lib/navigation';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';
import { useGuideProgress } from '@/hooks/use-guide-progress';
import {
  useAdjacentTopics,
  useFooterInView,
  useReadingSession,
  useTopicHotkeys,
} from '@/hooks/use-topic-navigation';
import { useTopicProgress } from '@/hooks/use-topic-progress';
import { resolveTopicFromHref } from '@/lib/content-index';
import { KIT_ICON_BY_KEY } from '@/lib/kit-meta';
import {
  buildKitMenus,
  findNavItemForTopic,
  findNavItemForTopicInGroups,
  getKitNavItems,
} from '@/lib/kit-menu';

const { allTopics, groups, allGuides } = interviewCatalog;

export function useInterviewAppController() {
  const {
    searchValue,
    homeView,
    selectedKitId,
    selectedNavId,
    focusedTopicId,
    selectedGuideId,
    topicContentById,
    guideContentById,
    isLoadingTopic,
    isLoadingGuide,
    topicLoadError,
    guideLoadError,
    theme,
    setSearchValue,
    setHomeView,
    setSelectedKitId,
    setSelectedNavId,
    setFocusedTopicId,
    setSelectedGuideId,
    setTopicContentById,
    setGuideContentById,
    setIsLoadingTopic,
    setIsLoadingGuide,
    setTopicLoadError,
    setGuideLoadError,
    setTheme,
  } = useInterviewAppStore((state) => state);

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

  const selectedKitGroups = useMemo(
    () => (selectedKitId ? groups.filter((group) => group.id === selectedKitId) : []),
    [selectedKitId],
  );

  const filteredGroups = useMemo(() => {
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

  const navigationItems = useMemo(
    () => buildKitMenus(filteredGroups).flatMap(getKitNavItems),
    [filteredGroups],
  );

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

    const kitsPath = getHomePathForView('kits');
    if (window.location.pathname !== kitsPath || window.location.hash) {
      window.history.pushState({}, '', kitsPath);
    }
  }, [setFocusedTopicId, setSearchValue, setSelectedKitId, setSelectedNavId]);

  const openKit = useCallback(
    (kitId: string, topicId?: string) => {
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

      const kitsPath = getHomePathForView('kits');
      const targetUrl = `${kitsPath}#${kitId}`;
      if (`${window.location.pathname}${window.location.hash}` !== targetUrl) {
        window.history.pushState({ kitId }, '', targetUrl);
      }
    },
    [
      setFocusedTopicId,
      setHomeView,
      setSearchValue,
      setSelectedGuideId,
      setSelectedKitId,
      setSelectedNavId,
    ],
  );

  const openGuide = useCallback(
    (guideId: string) => {
      setHomeView('guides');
      setSelectedKitId(null);
      setSelectedNavId(null);
      setFocusedTopicId(null);
      setSearchValue('');
      setSelectedGuideId(guideId);

      const guidesPath = getHomePathForView('guides');
      if (window.location.pathname !== guidesPath || window.location.hash) {
        window.history.pushState({}, '', guidesPath);
      }
    },
    [
      setFocusedTopicId,
      setHomeView,
      setSearchValue,
      setSelectedGuideId,
      setSelectedKitId,
      setSelectedNavId,
    ],
  );

  const closeGuide = useCallback(() => {
    setSelectedGuideId(null);
    setHomeView('guides');
    const guidesPath = getHomePathForView('guides');
    if (window.location.pathname !== guidesPath || window.location.hash) {
      window.history.pushState({}, '', guidesPath);
    }
  }, [setHomeView, setSelectedGuideId]);

  const navigateHomeView = useCallback(
    (view: 'kits' | 'guides') => {
      setHomeView(view);
      setSelectedGuideId(null);
      setSelectedKitId(null);
      setSelectedNavId(null);
      setFocusedTopicId(null);
      setSearchValue('');

      const targetPath = getHomePathForView(view);
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState({}, '', targetPath);
      }
    },
    [
      setFocusedTopicId,
      setHomeView,
      setSearchValue,
      setSelectedGuideId,
      setSelectedKitId,
      setSelectedNavId,
    ],
  );

  const handleSelectNav = useCallback(
    (navId: string) => {
      setSelectedNavId(navId);
      setFocusedTopicId(null);
    },
    [setFocusedTopicId, setSelectedNavId],
  );

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
  }, [selectedNav, selectedNavId, setSelectedNavId]);

  useEffect(() => {
    function syncKitFromLocation() {
      const nextHomeView = getHomeViewFromLocation();
      setHomeView(nextHomeView);

      if (nextHomeView === 'guides') {
        setSelectedKitId(null);
        setSelectedGuideId(null);
        setSelectedNavId(null);
        setFocusedTopicId(null);
        setSearchValue('');
        return;
      }

      const kitId = getKitIdFromHash(groups);
      setSelectedKitId(kitId);
      setSelectedGuideId(null);
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
  }, [
    setFocusedTopicId,
    setHomeView,
    setSearchValue,
    setSelectedGuideId,
    setSelectedKitId,
    setSelectedNavId,
  ]);

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
  }, [
    selectedNav,
    setIsLoadingTopic,
    setTopicContentById,
    setTopicLoadError,
    topicContentById,
  ]);

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
  }, [
    guideContentById,
    selectedGuide,
    setGuideContentById,
    setGuideLoadError,
    setIsLoadingGuide,
  ]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  return {
    allGuides,
    groups,
    homeView,
    selectedKitId,
    searchValue,
    selectedNav,
    focusedTopicId,
    selectedGuide,
    selectedGuideProgress,
    selectedGuideContent,
    selectedSingleTopic,
    selectedSingleTopicProgress,
    selectedTopicContent,
    hasSelectedTopicContent,
    selectedTopicIcon,
    filteredGroups,
    topicContentById,
    topicProgressById,
    guideProgressById,
    selectedKitTopicIds,
    selectedKitCompletedCount,
    selectedKitImportantCount,
    guidesReadCount,
    guidesStarredCount,
    previousTopic,
    nextTopic,
    previousGuide,
    nextGuide,
    currentIndex,
    totalCount,
    isLoadingTopic,
    isLoadingGuide,
    topicLoadError,
    guideLoadError,
    theme,
    scrolled,
    footerInView,
    scrollRef,
    contentEndRef,
    closeKit,
    openKit,
    openGuide,
    closeGuide,
    navigateHomeView,
    handleSelectNav,
    handleInternalLink,
    setSearchValue,
    toggleTheme,
    scrollToTop,
    toggleTopicCompleted,
    toggleTopicImportant,
    setManyTopicsCompleted,
    setManyTopicsImportant,
    toggleGuideRead,
    toggleGuideStarred,
  };
}
