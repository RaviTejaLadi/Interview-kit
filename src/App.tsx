import { Fragment, useEffect, useMemo, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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

function toBreadcrumbLabel(segment: string) {
  return segment
    .replace(/\.md$/i, "")
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
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
    <SidebarProvider>
      <AppSidebar
        groups={filteredGroups}
        searchValue={searchValue}
        selectedTopicId={selectedTopic?.id ?? null}
        onSearchChange={setSearchValue}
        onSelectTopic={setSelectedTopicId}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-border" />
          <div className="min-w-0">
            <p className="truncate text-xs text-muted-foreground">
              {selectedTopic?.kitLabel ?? "Interview Kits"}
            </p>
            <h1 className="truncate text-sm font-semibold">
              {selectedTopic?.title ?? "Select a topic"}
            </h1>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="ml-auto"
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
            <p className="rounded-md border bg-card p-4 text-sm text-muted-foreground">
              Select a topic to view content.
            </p>
          </div>
        ) : (
            <article className="mx-auto w-full max-w-5xl space-y-4 p-6 md:p-8">
            <div className="rounded-md border bg-background p-4 shadow-sm md:p-6">
              <Breadcrumb className="mb-4 overflow-x-auto">
                <BreadcrumbList className="flex-nowrap text-xs md:text-sm">
                  {selectedTopic.path.split("/").map((segment, index, parts) => {
                    const isLast = index === parts.length - 1
                    const label = toBreadcrumbLabel(segment)

                    return (
                      <Fragment key={`${segment}-${index}`}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{label}</BreadcrumbPage>
                          ) : (
                            <span>{label}</span>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
              {isLoadingTopic && !hasSelectedTopicContent ? (
                <p className="text-sm text-muted-foreground">Loading markdown...</p>
              ) : topicLoadError ? (
                <p className="text-sm text-red-600">
                  Could not load this file. {topicLoadError}
                </p>
              ) : (
                <div className="markdown-body prose prose-slate max-w-none dark:prose-invert">
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                    {selectedTopicContent}
                  </ReactMarkdown>
                </div>
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
