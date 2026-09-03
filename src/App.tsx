import { useEffect, useMemo, useState } from "react"
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
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { buildTopicIndex, type Topic, type TopicGroup } from "@/lib/content-index"

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
          const haystack = `${topic.title} ${topic.section} ${topic.kitLabel}`.toLowerCase()
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

  const selectedTopicContent = selectedTopic ? (topicContentById[selectedTopic.id] ?? "") : ""
  const hasSelectedTopicContent = selectedTopic ? hasOwn(topicContentById, selectedTopic.id) : false;

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
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-border/70 bg-card/94 px-4 backdrop-blur supports-backdrop-filter:bg-card/82 dark:border-border/35">
          <SidebarTrigger className="-ml-1 rounded-md border border-border/70 bg-card/96 shadow-[0_1px_2px_rgb(15_23_42/6%)] hover:bg-muted/60 dark:border-border/35 dark:bg-card/90 dark:shadow-none" />
          <div className="h-4 w-px bg-border/70 dark:bg-border/40" />
          <div className="flex min-w-0 items-center gap-2 px-1 py-0.5">
            {selectedTopicIcon ? (
              <img
                src={selectedTopicIcon}
                alt=""
                aria-hidden="true"
                className="size-5 shrink-0 rounded-sm bg-card p-0.5 object-contain"
              />
            ) : null}
            <p className="truncate text-base font-semibold tracking-tight text-foreground/95 md:text-lg">
              {selectedTopic?.kitLabel ?? "Interview Kits"}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="ml-auto rounded-md border-border/70 bg-card/96 shadow-[0_1px_2px_rgb(15_23_42/6%)] hover:bg-muted/60 dark:border-border/35 dark:bg-card/90 dark:shadow-none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            <span className="sr-only">
              Switch to {theme === "dark" ? "light" : "dark"} mode
            </span>
          </Button>
        </header>
        <div className="flex-1 overflow-y-auto">
        {!selectedTopic ? (
            <div className="flex h-full items-center justify-center p-6">
            <p className="rounded-md border border-border/70 bg-card/96 p-5 text-sm text-foreground/75 shadow-[0_1px_2px_rgb(15_23_42/5%)] dark:border-border/35 dark:bg-card/90 dark:shadow-none">
              Select a topic to view content.
            </p>
          </div>
        ) : (
            <article className="mx-auto w-full max-w-6xl space-y-4 p-4 md:p-8">
            <div className="rounded-md border border-border/70 bg-card/96 p-5 shadow-[0_2px_10px_rgb(15_23_42/5%)] backdrop-blur md:p-7 dark:border-border/35 dark:bg-card/92 dark:shadow-none">
              {isLoadingTopic && !hasSelectedTopicContent ? (
                <p className="text-sm text-foreground/70">Loading markdown...</p>
              ) : topicLoadError ? (
                <p className="text-sm text-red-600">
                  Could not load this file. {topicLoadError}
                </p>
              ) : (
                <MarkdownPreview content={selectedTopicContent} theme={theme} />
              )}
            </div>
          </article>
        )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App;
