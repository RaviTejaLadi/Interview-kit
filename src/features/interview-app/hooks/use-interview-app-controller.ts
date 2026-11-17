import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router';

import { interviewCatalog } from '@/features/interview-app/catalog';
import {
  countProgressByGuideIds,
  countProgressByTopicIds,
  hasOwn,
} from '@/features/interview-app/lib/helpers';
import type { HomeView } from '@/features/interview-app/lib/navigation';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';
import { guidePath, kitPath, paths } from '@/routes/paths';
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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const homeView: HomeView = pathname.startsWith('/guides') ? 'guides' : 'kits';
  const selectedKitId = params.kitId ?? null;
  const selectedGuideId = params.guideId ?? null;
  const topicParam = searchParams.get('topic');
  const {
    searchValue,
    selectedNavId,
    focusedTopicId,
    topicContentById,
    guideContentById,
    isLoadingTopic,
    isLoadingGuide,
    topicLoadError,
    guideLoadError,
    theme,
    setSearchValue,
    setSelectedNavId,
    setFocusedTopicId,
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
  const { guideProgressById, getGuideProgress, toggleGuideRead, toggleGuideStarred } =
    useGuideProgress();

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
    setSelectedNavId(null);
    setFocusedTopicId(null);
    setSearchValue('');
    navigate(paths.kits);
  }, [navigate, setFocusedTopicId, setSearchValue, setSelectedNavId]);

  const openKit = useCallback(
    (kitId: string, topicId?: string) => {
      navigate(kitPath(kitId, topicId));
    },
    [navigate],
  );

  const openGuide = useCallback(
    (guideId: string) => {
      navigate(guidePath(guideId));
    },
    [navigate],
  );

  const closeGuide = useCallback(() => {
    navigate(paths.guides);
  }, [navigate]);

  const navigateHomeView = useCallback(
    (view: HomeView) => {
      setSelectedNavId(null);
      setFocusedTopicId(null);
      setSearchValue('');
      navigate(view === 'guides' ? paths.guides : paths.kits);
    },
    [navigate, setFocusedTopicId, setSearchValue, setSelectedNavId],
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
  const { previousTopic: previousGuide, nextTopic: nextGuide } = useAdjacentTopics(
    guideNavItems,
    selectedGuideId,
  );
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

  const previousKitIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const kitChanged = previousKitIdRef.current !== selectedKitId;
    previousKitIdRef.current = selectedKitId;

    if (!selectedKitId) {
      return;
    }

    if (kitChanged) {
      setSearchValue('');
      setSelectedNavId(null);
      if (!topicParam) {
        setFocusedTopicId(null);
      }
    }

    if (topicParam) {
      setSelectedNavId(null);
      setFocusedTopicId(topicParam);
    }
  }, [selectedKitId, setFocusedTopicId, setSearchValue, setSelectedNavId, topicParam]);

  useEffect(() => {
    if (selectedNav && selectedNav.id !== selectedNavId) {
      setSelectedNavId(selectedNav.id);
    }
  }, [selectedNav, selectedNavId, setSelectedNavId]);

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
  }, [selectedNav, setIsLoadingTopic, setTopicContentById, setTopicLoadError, topicContentById]);

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
  }, [guideContentById, selectedGuide, setGuideContentById, setGuideLoadError, setIsLoadingGuide]);

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
    navigationItems,
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
