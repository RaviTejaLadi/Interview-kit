import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import cssKitIcon from "../assets/kits-svgs/css.svg"
import gitKitIcon from "../assets/kits-svgs/git.svg"
import hrKitIcon from "../assets/kits-svgs/hr.svg"
import htmlKitIcon from "../assets/kits-svgs/html.svg"
import javascriptKitIcon from "../assets/kits-svgs/javascript.svg"
import mongodbKitIcon from "../assets/kits-svgs/mongodb.svg"
import nextjsKitIcon from "../assets/kits-svgs/nextjs.svg"
import nodejsKitIcon from "../assets/kits-svgs/nodejs.svg"
import reactKitIcon from "../assets/kits-svgs/react.svg"
import tailwindKitIcon from "../assets/kits-svgs/tailwind.svg"

import { AppSidebar } from "@/components/app-sidebar"
import { MarkdownPreview } from "@/components/markdown-preview"
import {
  FullscreenButton,
  ReadingProgressBar,
  ScrollToTopButton,
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

const KIT_ICON_BY_KEY: Record<string, string> = {
  "javascript-interview-kit": javascriptKitIcon,
  "react-interview-kit": reactKitIcon,
  "html-interview-kit": htmlKitIcon,
  "css-interview-kit": cssKitIcon,
  "tailwind-interview-kit": tailwindKitIcon,
  "next-js-interview-kit": nextjsKitIcon,
  "node-js-interview-kit": nodejsKitIcon,
  "mongo-db-interview-kit": mongodbKitIcon,
  "git-interview-kit": gitKitIcon,
  "hr-interview-kit": hrKitIcon,
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
  const [selectedTopicId, setSelectedTopicId] = useState(allTopics[0]?.id ?? null);
  const [topicContentById, setTopicContentById] = useState<Record<string, string>>({});
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [topicLoadError, setTopicLoadError] = useState("");
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  const filteredGroups = useMemo<TopicGroup[]>(() => {
    const query = searchValue.trim().toLowerCase()

    if (!query) {
      return groups
    }

    return groups
      .map((group) => ({
        ...group,
        topics: group.topics.filter((topic) => {
            const haystack = `${topic.title} ${topic.topicTitle ?? ""} ${topic.section} ${topic.kitLabel}`.toLowerCase()
          return haystack.includes(query)
        }),
      }))
      .filter((group) => group.topics.length > 0)
  }, [searchValue])

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
    if (selectedTopicId && filteredTopicIds.has(selectedTopicId)) {
      return topicsById.get(selectedTopicId) ?? null
    }
    return filteredGroups[0]?.topics[0] ?? null
  }, [filteredGroups, filteredTopicIds, selectedTopicId])
  const selectedTopicIcon = selectedTopic ? KIT_ICON_BY_KEY[selectedTopic.kitKey] : null

  const handleInternalLink = useCallback(
    (href: string) => {
      if (!selectedTopic) {
        return false
      }

      const target = resolveTopicFromHref(selectedTopic.path, href, allTopics)
      if (!target) {
        return false
      }

      setSearchValue("")
      setSelectedTopicId(target.id)
      return true
    },
    [selectedTopic],
  )

  const selectedTopicContent = selectedTopic ? (topicContentById[selectedTopic.id] ?? "") : ""
  const hasSelectedTopicContent = selectedTopic ? hasOwn(topicContentById, selectedTopic.id) : false;

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const footerNavRef = useRef<HTMLElement | null>(null)

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
  const { progress, scrolled, scrollToTop } = useReadingSession(
    scrollRef,
    selectedTopic?.id ?? null,
  )
  const footerInView = useFooterInView(footerNavRef, scrollRef, selectedTopic?.id ?? null)

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

  return (
    <SidebarProvider className="theme bg-background">
      <AppSidebar
        groups={filteredGroups}
        searchValue={searchValue}
        selectedTopicId={selectedTopic?.id ?? null}
        onSearchChange={setSearchValue}
        onSelectTopic={setSelectedTopicId}
      />
      <SidebarInset className="bg-linear-to-b from-background via-background to-secondary/8">
        <header className="sticky top-0 z-20 flex min-h-14 shrink-0 items-center gap-2 border-b border-border/70 bg-card/94 px-2 py-2 backdrop-blur supports-backdrop-filter:bg-card/82 sm:min-h-16 sm:gap-3 sm:px-4 dark:border-border/35">
          <SidebarTrigger className="-ml-0.5 rounded-md border border-border/70 bg-card/96 shadow-[0_1px_2px_rgb(15_23_42/6%)] hover:bg-muted/60 sm:-ml-1 dark:border-border/35 dark:bg-card/90 dark:shadow-none" />
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
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <FullscreenButton />
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="rounded-md border-border/70 bg-card/96 shadow-[0_1px_2px_rgb(15_23_42/6%)] hover:bg-muted/60 dark:border-border/35 dark:bg-card/90 dark:shadow-none"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span className="sr-only">
                Switch to {theme === "dark" ? "light" : "dark"} mode
              </span>
            </Button>
          </div>
          {selectedTopic ? <ReadingProgressBar value={progress} /> : null}
        </header>
        <ScrollArea className="min-h-0 flex-1" viewportRef={scrollRef}>
        {!selectedTopic ? (
            <div className="flex h-full items-center justify-center p-4 sm:p-6">
            <p className="rounded-md border border-border/70 bg-card/96 p-4 text-sm text-foreground/75 shadow-[0_1px_2px_rgb(15_23_42/5%)] sm:p-5 dark:border-border/35 dark:bg-card/90 dark:shadow-none">
              Select a topic to view content.
            </p>
          </div>
        ) : (
            <article className="mx-auto w-full min-w-0 max-w-6xl space-y-3 p-3 sm:space-y-4 sm:p-5 md:p-8">
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
            <TopicNavigator
              previousTopic={previousTopic}
              nextTopic={nextTopic}
              onSelect={setSelectedTopicId}
              navRef={footerNavRef}
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
