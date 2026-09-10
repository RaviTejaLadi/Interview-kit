import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeftIcon } from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { KitGallery } from "@/components/kit-gallery"
import { MarkdownPreview } from "@/components/markdown-preview"
import {
  FullscreenButton,
  ScrollToTopButton,
  ThemeToggle,
  TopicDock,
  TopicNavigator,
} from "@/components/topic-navigator"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  useAdjacentTopics,
  useFooterInView,
  useReadingSession,
  useTopicHotkeys,
} from "@/hooks/use-topic-navigation"
import { KIT_ICON_BY_KEY } from "@/lib/kit-meta"
import { buildTopicIndex, resolveTopicFromHref, type Topic, type TopicGroup } from "@/lib/content-index"

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

const topicsById = new Map(allTopics.map((topic) => [topic.id, topic] as const));

type Theme = "light" | "dark"

const THEME_STORAGE_KEY = "interview-kit-theme"

function getKitIdFromHash() {
  if (typeof window === "undefined") {
    return null
  }

  const kitId = decodeURIComponent(window.location.hash.replace(/^#/, "")).trim()
  return groups.some((group) => group.id === kitId) ? kitId : null
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light"
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedKitId, setSelectedKitId] = useState<string | null>(() => getKitIdFromHash());
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [topicContentById, setTopicContentById] = useState<Record<string, string>>({});
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [topicLoadError, setTopicLoadError] = useState("");
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  const filteredGroups = useMemo<TopicGroup[]>(() => {
    if (!selectedKitId) {
      return []
    }

    const kitGroups = groups.filter((group) => group.id === selectedKitId)
    const query = searchValue.trim().toLowerCase()

    if (!query) {
      return kitGroups
    }

    return kitGroups.map((group) => ({
      ...group,
      topics: group.topics.filter((topic) => {
        const haystack = `${topic.title} ${topic.topicTitle ?? ""} ${topic.section} ${topic.kitLabel}`.toLowerCase()
        return haystack.includes(query)
      }),
    }))
  }, [searchValue, selectedKitId])

  const filteredTopicIds = useMemo(() => {
    const topicIds = new Set<string>()
    for (const group of filteredGroups) {
      for (const topic of group.topics) {
        topicIds.add(topic.id)
      }
    }
    return topicIds
  }, [filteredGroups])

  const selectedTopic = useMemo(() => {
    if (!selectedKitId) {
      return null
    }

    if (selectedTopicId && filteredTopicIds.has(selectedTopicId)) {
      return topicsById.get(selectedTopicId) ?? null
    }

    if (selectedTopicId && !searchValue.trim()) {
      const topic = topicsById.get(selectedTopicId)
      if (topic?.kitKey === selectedKitId) {
        return topic
      }
    }

    return filteredGroups[0]?.topics[0] ?? null
  }, [filteredGroups, filteredTopicIds, searchValue, selectedKitId, selectedTopicId])
  const selectedTopicIcon = selectedTopic ? KIT_ICON_BY_KEY[selectedTopic.kitKey] : null

  const closeKit = useCallback(() => {
    setSelectedKitId(null)
    setSelectedTopicId(null)
    setSearchValue("")

    if (window.location.hash) {
      window.history.pushState({}, "", `${window.location.pathname}${window.location.search}`)
    }
  }, [])

  const openKit = useCallback((kitId: string, topicId?: string) => {
    setSelectedKitId(kitId)
    setSelectedTopicId(topicId ?? null)
    setSearchValue("")

    if (window.location.hash !== `#${kitId}`) {
      window.history.pushState({ kitId }, "", `#${kitId}`)
    }
  }, [])

  const handleInternalLink = useCallback(
    (href: string) => {
      if (!selectedTopic) {
        return false
      }

      const target = resolveTopicFromHref(selectedTopic.path, href, allTopics)
      if (!target) {
        return false
      }

      openKit(target.kitKey, target.id)
      return true
    },
    [openKit, selectedTopic],
  )

  const selectedTopicContent = selectedTopic ? (topicContentById[selectedTopic.id] ?? "") : ""
  const hasSelectedTopicContent = selectedTopic ? hasOwn(topicContentById, selectedTopic.id) : false;

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const contentEndRef = useRef<HTMLDivElement | null>(null)

  const navigationTopics = useMemo(() => {
    if (searchValue.trim()) {
      return filteredGroups.flatMap((group) => group.topics)
    }

    if (!selectedTopic) {
      return []
    }

    const kitGroup = filteredGroups.find((group) => group.id === selectedTopic.kitKey)
    return kitGroup?.topics ?? []
  }, [filteredGroups, searchValue, selectedTopic])

  const { previousTopic, nextTopic, currentIndex, totalCount } = useAdjacentTopics(
    navigationTopics,
    selectedTopic?.id ?? null,
  )
  const { scrolled, scrollToTop } = useReadingSession(
    scrollRef,
    selectedTopic?.id ?? null,
  )
  const footerInView = useFooterInView(contentEndRef, scrollRef, selectedTopic?.id ?? null)

  useTopicHotkeys({
    previousTopic,
    nextTopic,
    onSelect: setSelectedTopicId,
  })

  useEffect(() => {
    if (selectedTopic && selectedTopic.id !== selectedTopicId) {
      setSelectedTopicId(selectedTopic.id)
    }
  }, [selectedTopic, selectedTopicId])

  useEffect(() => {
    function syncKitFromLocation() {
      const kitId = getKitIdFromHash()
      setSelectedKitId(kitId)
      setSelectedTopicId(null)
      setSearchValue("")
    }

    window.addEventListener("popstate", syncKitFromLocation)
    window.addEventListener("hashchange", syncKitFromLocation)
    return () => {
      window.removeEventListener("popstate", syncKitFromLocation)
      window.removeEventListener("hashchange", syncKitFromLocation)
    }
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || !selectedKitId) {
        return
      }

      if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) {
        return
      }

      const target = event.target
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select, [contenteditable='true']")
      ) {
        return
      }

      event.preventDefault()
      closeKit()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [closeKit, selectedKitId])

  useEffect(() => {
    let ignore = false

    async function loadTopicContent() {
      if (!selectedTopic) {
        return
      }

      if (hasOwn(topicContentById, selectedTopic.id)) {
        return
      }

      setIsLoadingTopic(true)
      setTopicLoadError("")

      try {
        const markdown = await selectedTopic.loadContent()
        if (!ignore) {
          setTopicContentById((current) => ({
            ...current,
            [selectedTopic.id]: markdown,
          }))
        }
      } catch (error) {
        if (!ignore) {
          setTopicLoadError(error instanceof Error ? error.message : "Failed to load markdown")
        }
      } finally {
        if (!ignore) {
          setIsLoadingTopic(false)
        }
      }
    }

    loadTopicContent()
    return () => {
      ignore = true
    }
  }, [selectedTopic, topicContentById])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.style.colorScheme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const headerActions = (
    <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
      <FullscreenButton />
      <ThemeToggle
        theme={theme}
        onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  )

  if (!selectedKitId) {
    return (
      <div className="theme flex h-svh flex-col bg-background">
        <header className="sticky top-0 z-20 flex min-h-14 shrink-0 items-center gap-2 border-b border-border/70 bg-card/94 px-3 py-2 backdrop-blur supports-backdrop-filter:bg-card/82 sm:min-h-16 sm:px-5 dark:border-border/35">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-foreground/95 sm:text-base md:text-lg">
              Interview Kits
            </p>
            <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
              Browse kits as cards, then open one to study
            </p>
          </div>
          {headerActions}
        </header>
        <ScrollArea className="min-h-0 flex-1">
          <KitGallery groups={groups} onSelectKit={(kitId) => openKit(kitId)} />
        </ScrollArea>
      </div>
    )
  }

  return (
    <SidebarProvider className="theme bg-background">
      <AppSidebar
        groups={filteredGroups}
        searchValue={searchValue}
        selectedTopicId={selectedTopic?.id ?? null}
        onSearchChange={setSearchValue}
        onSelectTopic={setSelectedTopicId}
        onBackToKits={closeKit}
      />
      <SidebarInset className="bg-linear-to-b from-background via-background to-secondary/8">
        <header className="sticky top-0 z-20 flex min-h-14 shrink-0 items-center gap-2 border-b border-border/70 bg-card/94 px-2 py-2 backdrop-blur supports-backdrop-filter:bg-card/82 sm:min-h-16 sm:gap-3 sm:px-4 dark:border-border/35">
          <SidebarTrigger className="-ml-0.5 rounded-md border border-border/70 bg-card/96 shadow-[0_1px_2px_rgb(15_23_42/6%)] hover:bg-muted/60 sm:-ml-1 dark:border-border/35 dark:bg-card/90 dark:shadow-none" />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={closeKit}
            className="h-7 rounded-md border-border/70 bg-card/96 px-2 text-xs shadow-[0_1px_2px_rgb(15_23_42/6%)] dark:border-border/35 dark:bg-card/90 dark:shadow-none"
          >
            <ArrowLeftIcon className="size-3.5" />
            <span className="hidden sm:inline">All kits</span>
            <span className="sm:hidden">Kits</span>
          </Button>
          <div className="hidden h-4 w-px bg-border/70 sm:block dark:bg-border/40" />
          <div className="flex min-w-0 items-center gap-2 px-0.5 py-0.5 sm:px-1">
            {selectedTopicIcon ? (
              <img
                src={selectedTopicIcon}
                alt=""
                aria-hidden="true"
                className="size-4 shrink-0 rounded-sm bg-card p-0.5 object-contain sm:size-5"
              />
            ) : null}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-foreground/95 sm:text-base md:text-lg">
                {selectedTopic?.kitLabel ?? "Interview Kits"}
              </p>
              {selectedTopic ? (
                <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
                  {selectedTopic.section}
                  {selectedTopic.topicTitle ? ` · ${selectedTopic.topicTitle}` : ""}
                  {" · "}
                  {selectedTopic.title}
                  {currentIndex >= 0 && totalCount > 0 ? ` · ${currentIndex + 1}/${totalCount}` : ""}
                </p>
              ) : null}
            </div>
          </div>
          {headerActions}
        </header>
        <ScrollArea className="min-h-0 flex-1" viewportRef={scrollRef}>
        {!selectedTopic ? (
            <div className="flex h-full items-center justify-center p-4 sm:p-6">
            <p className="rounded-md border border-border/70 bg-card/96 p-4 text-sm text-foreground/75 shadow-[0_1px_2px_rgb(15_23_42/5%)] sm:p-5 dark:border-border/35 dark:bg-card/90 dark:shadow-none">
              {searchValue.trim()
                ? "No topics match this search in the current kit."
                : "Select a topic to view content."}
            </p>
          </div>
        ) : (
            <article className="mx-auto w-full min-w-0 max-w-6xl space-y-3 px-1 py-3 sm:space-y-4 ">
            <TopicNavigator
              previousTopic={previousTopic}
              nextTopic={nextTopic}
              onSelect={setSelectedTopicId}
            >
              <div className="rounded-md border border-border/70 bg-card/96 p-4 shadow-[0_2px_10px_rgb(15_23_42/5%)] backdrop-blur sm:p-5 md:p-7 dark:border-border/35 dark:bg-card/92 dark:shadow-none">
                {isLoadingTopic && !hasSelectedTopicContent ? (
                  <p className="text-sm text-foreground/70">Loading markdown...</p>
                ) : topicLoadError ? (
                  <p className="text-sm text-red-600">
                    Could not load this file. {topicLoadError}
                  </p>
                ) : (
                  <MarkdownPreview
                    content={selectedTopicContent}
                    theme={theme}
                    onInternalLink={handleInternalLink}
                  />
                )}
              </div>
            </TopicNavigator>
            <div
              ref={contentEndRef}
              aria-hidden="true"
              className="h-px w-full"
            />
          </article>
        )}
        </ScrollArea>
        {selectedTopic ? (
          <>
            <TopicDock
              previousTopic={previousTopic}
              nextTopic={nextTopic}
              currentTopic={selectedTopic}
              currentIndex={Math.max(currentIndex, 0)}
              totalCount={totalCount}
              visible={scrolled && !footerInView}
              onSelect={setSelectedTopicId}
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
  )
}

export default App;
