import { type MutableRefObject, useEffect, useState } from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  Maximize2Icon,
  Minimize2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Topic } from "@/lib/content-index"
import { cn } from "@/lib/utils"

type AdjacentTopics = {
  previousTopic: Topic | null
  nextTopic: Topic | null
}

function TopicNavCard({
  topic,
  direction,
  onSelect,
}: {
  topic: Topic | null
  direction: "previous" | "next"
  onSelect: (topicId: string) => void
}) {
  const isPrevious = direction === "previous"
  const shortcut = isPrevious ? "←" : "→"

  if (!topic) {
    return (
      <div
        className={cn(
          "rounded-md border border-dashed border-border/60 px-4 py-3 text-sm text-muted-foreground/80 dark:border-border/30",
          isPrevious ? "text-left" : "text-right",
        )}
      >
        <p className="text-[11px] font-medium tracking-[0.08em] uppercase">
          {isPrevious ? "Previous" : "Next"}
        </p>
        <p className="mt-1">{isPrevious ? "First topic in this kit" : "Last topic in this kit"}</p>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(topic.id)}
      className={cn(
        "group rounded-md border border-border/70 bg-card/96 px-4 py-3 text-left shadow-[0_1px_2px_rgb(15_23_42/5%)] transition-colors",
        "hover:border-primary/35 hover:bg-muted/45 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        "dark:border-border/35 dark:bg-card/90 dark:shadow-none dark:hover:bg-muted/30",
        !isPrevious && "text-right",
      )}
      aria-label={`${isPrevious ? "Previous" : "Next"} topic: ${topic.title}`}
    >
      <span
        className={cn(
          "flex items-center gap-1 text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase",
          !isPrevious && "justify-end",
        )}
      >
        {isPrevious ? <ChevronLeftIcon className="size-3.5" /> : null}
        {isPrevious ? "Previous" : "Next"}
        {!isPrevious ? <ChevronRightIcon className="size-3.5" /> : null}
        <kbd className="ml-1 hidden rounded border border-border/70 px-1 py-px text-[10px] font-normal normal-case tracking-normal text-muted-foreground/90 sm:inline dark:border-border/40">
          {shortcut}
        </kbd>
      </span>
      <span className="mt-1 block truncate font-semibold text-foreground group-hover:text-primary">
        {topic.title}
      </span>
      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
        {topic.topicTitle ?? topic.section}
      </span>
    </button>
  )
}

export function TopicNavigator({
  previousTopic,
  nextTopic,
  onSelect,
  navRef,
}: AdjacentTopics & {
  onSelect: (topicId: string) => void
  navRef: MutableRefObject<HTMLElement | null>
}) {
  return (
    <nav
      ref={(node) => {
        navRef.current = node
      }}
      aria-label="Topic pagination"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      <TopicNavCard topic={previousTopic} direction="previous" onSelect={onSelect} />
      <TopicNavCard topic={nextTopic} direction="next" onSelect={onSelect} />
    </nav>
  )
}

export function TopicDock({
  previousTopic,
  nextTopic,
  currentTopic,
  currentIndex,
  totalCount,
  visible,
  onSelect,
  onBackToTop,
}: AdjacentTopics & {
  currentTopic: Topic
  currentIndex: number
  totalCount: number
  visible: boolean
  onSelect: (topicId: string) => void
  onBackToTop: () => void
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-10 p-2 sm:p-3 transition-all duration-200",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div
        className={cn(
          "pointer-events-auto mx-auto flex max-w-6xl items-center gap-2 rounded-md border border-border/70 bg-card/96 p-2 shadow-[0_8px_24px_rgb(15_23_42/12%)] backdrop-blur",
          "dark:border-border/35 dark:bg-card/92 dark:shadow-none",
          !visible && "pointer-events-none",
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-w-0 flex-1 justify-start rounded-md border-border/70 bg-card/96 dark:border-border/35 dark:bg-card/90"
          disabled={!previousTopic}
          onClick={() => previousTopic && onSelect(previousTopic.id)}
          aria-label={
            previousTopic ? `Previous topic: ${previousTopic.title}` : "No previous topic"
          }
        >
          <ChevronLeftIcon />
          <span className="min-w-0 truncate">{previousTopic?.title ?? "First topic"}</span>
        </Button>

        <button
          type="button"
          onClick={onBackToTop}
          className="hidden min-w-0 max-w-48 shrink-0 rounded-md px-2 py-1 text-center hover:bg-muted/50 md:block"
          aria-label="Back to top"
          title="Back to top"
        >
          <p className="truncate text-xs font-medium text-foreground">
            {currentIndex + 1} / {totalCount}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            {currentTopic.topicTitle ?? currentTopic.section}
          </p>
        </button>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-md border-border/70 bg-card/96 md:hidden dark:border-border/35 dark:bg-card/90"
          onClick={onBackToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUpIcon />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="min-w-0 flex-1 justify-end rounded-md border-border/70 bg-card/96 dark:border-border/35 dark:bg-card/90"
          disabled={!nextTopic}
          onClick={() => nextTopic && onSelect(nextTopic.id)}
          aria-label={nextTopic ? `Next topic: ${nextTopic.title}` : "No next topic"}
        >
          <span className="min-w-0 truncate">{nextTopic?.title ?? "Last topic"}</span>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}

export function ScrollToTopButton({
  visible,
  dockVisible,
  onClick,
}: {
  visible: boolean
  dockVisible: boolean
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn(
        "absolute z-20 size-9 rounded-full border-border/70 bg-card/96 shadow-[0_8px_24px_rgb(15_23_42/16%)] backdrop-blur transition-all duration-200",
        "hover:bg-muted/70 dark:border-border/35 dark:bg-card/92 dark:shadow-none",
        dockVisible ? "right-3 bottom-20 sm:right-5" : "right-3 bottom-3 sm:right-5 sm:bottom-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
      onClick={onClick}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ChevronUpIcon />
      <span className="sr-only">Scroll to top</span>
    </Button>
  )
}

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    onChange()
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className="rounded-md border-border/70 bg-card/96 shadow-[0_1px_2px_rgb(15_23_42/6%)] hover:bg-muted/60 dark:border-border/35 dark:bg-card/90 dark:shadow-none"
      onClick={async () => {
        try {
          if (document.fullscreenElement) {
            await document.exitFullscreen()
            return
          }

          await document.documentElement.requestFullscreen()
        } catch {
          // Fullscreen can be blocked by the browser or unsupported on some devices.
        }
      }}
      aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
      title={isFullscreen ? "Exit full screen" : "Full screen"}
    >
      {isFullscreen ? <Minimize2Icon /> : <Maximize2Icon />}
      <span className="sr-only">
        {isFullscreen ? "Exit full screen" : "Enter full screen"}
      </span>
    </Button>
  )
}
