import { useEffect, useMemo, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import rehypeRaw from "rehype-raw"
import ReactMarkdown, { type Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
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
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { buildTopicIndex, type Topic, type TopicGroup } from "@/lib/content-index"
import { cn } from "@/lib/utils"

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

const markdownHierarchy = {
  section: "pl-3 md:pl-4",
  subsection: "pl-5 md:pl-6",
  body: "pl-7 md:pl-8",
  nestedList: "pl-11 md:pl-12",
}

function createMarkdownComponents(theme: Theme): Components {
  const isDarkTheme = theme === "dark"

  return {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "mt-1 mb-6 scroll-m-20 border-b border-border/80 pb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl",
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-10 mb-4 scroll-m-20 border-l-4 border-primary/55 text-2xl font-semibold tracking-tight text-foreground first:mt-0",
          markdownHierarchy.section,
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-8 mb-3 scroll-m-20 border-l-2 border-primary/45 text-xl font-semibold tracking-tight text-foreground",
          markdownHierarchy.subsection,
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          "mt-6 mb-2 scroll-m-20 border-l border-border/60 text-lg font-semibold text-foreground",
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p className={cn("not-first:mt-4 leading-7 text-foreground/90", markdownHierarchy.body, className)} {...props} />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "my-4 list-disc space-y-2 text-foreground/90 marker:text-primary",
          markdownHierarchy.nestedList,
          "[&_ul]:mt-2 [&_ul]:list-[circle] [&_ul]:pl-6 [&_ul]:md:pl-7 [&_ol]:mt-2 [&_ol]:pl-6 [&_ol]:md:pl-7",
          className,
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "my-4 list-decimal space-y-2 text-foreground/90 marker:text-primary",
          markdownHierarchy.nestedList,
          "[&_ol]:mt-2 [&_ol]:pl-6 [&_ol]:md:pl-7 [&_ul]:mt-2 [&_ul]:list-[circle] [&_ul]:pl-6 [&_ul]:md:pl-7",
          className,
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("pl-1 text-foreground/90 [&>p]:mt-0 [&>p]:pl-0", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "my-6 rounded-r-md border-l-4 border-primary/65 bg-muted/35 px-4 py-3 text-foreground/85 italic",
          markdownHierarchy.body,
          className,
        )}
        {...props}
      />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn("my-8 border-border/70", markdownHierarchy.body, className)} {...props} />
    ),
    a: ({ className, href, rel, target, ...props }) => {
      const isAnchorLink = href?.startsWith("#")

      return (
        <a
          href={href}
          target={isAnchorLink ? target : target ?? "_blank"}
          rel={isAnchorLink ? rel : rel ?? "noreferrer noopener"}
          className={cn(
            "font-medium text-primary underline decoration-primary/45 underline-offset-4 transition-colors hover:text-primary/80",
            className,
          )}
          {...props}
        />
      )
    },
    table: ({ className, ...props }) => (
      <div
        className={cn("my-6 overflow-x-auto rounded-md border border-border/70 bg-card/70", markdownHierarchy.body)}
      >
        <table className={cn("w-full min-w-xl border-collapse text-sm", className)} {...props} />
      </div>
    ),
    thead: ({ className, ...props }) => <thead className={cn("bg-muted/60", className)} {...props} />,
    tbody: ({ className, ...props }) => (
      <tbody className={cn("divide-y divide-border/60", className)} {...props} />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn("border-b border-border/75 px-4 py-2.5 text-left font-semibold text-foreground", className)}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td className={cn("px-4 py-2.5 align-top text-foreground/88", className)} {...props} />
    ),
    img: ({ className, alt, ...props }) => (
      <img
        className={cn("my-6 rounded-md border border-border/70 shadow-sm", markdownHierarchy.body, className)}
        alt={alt ?? "Markdown image"}
        loading="lazy"
        {...props}
      />
    ),
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children, ...props }) => {
      const codeText = String(children).replace(/\n$/, "")
      const languageMatch = /language-([\w-]+)/.exec(className ?? "")
      const language = languageMatch?.[1]
      const isBlock = Boolean(language || codeText.includes("\n"))

      if (isBlock) {
        return (
          <div className={cn("my-6", markdownHierarchy.body)}>
            <SyntaxHighlighter
              language={language ?? "text"}
              PreTag="div"
              style={isDarkTheme ? oneDark : oneLight}
              wrapLongLines
              customStyle={{
                margin: 0,
                borderRadius: "0.375rem",
                padding: "1rem 1.1rem",
                fontSize: "13px",
                lineHeight: "1.65",
                background: isDarkTheme ? "#0f172a" : "#f8fafc",
                border: isDarkTheme
                  ? "1px solid rgba(148, 163, 184, 0.28)"
                  : "1px solid rgba(148, 163, 184, 0.35)",
                boxShadow: isDarkTheme
                  ? "inset 0 1px 0 rgba(255,255,255,0.04)"
                  : "inset 0 1px 0 rgba(255,255,255,0.7)",
              }}
              codeTagProps={{
                style: {
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
                },
              }}
            >
              {codeText}
            </SyntaxHighlighter>
          </div>
        )
      }

      return (
        <code
          className={cn(
            "rounded-md border border-border/60 bg-muted/65 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
            className,
          )}
          {...props}
        >
          {children}
        </code>
      )
    },
  }
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
  const markdownComponents = useMemo(() => createMarkdownComponents(theme), [theme])

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
                <div className="markdown-body markdown-preview max-w-none">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
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
