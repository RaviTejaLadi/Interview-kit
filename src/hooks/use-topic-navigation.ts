import { useEffect, useState } from "react"

import type { Topic } from "@/lib/content-index"

type AdjacentTopics = {
  previousTopic: Topic | null
  nextTopic: Topic | null
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"))
}

export function useAdjacentTopics(
  topics: Topic[],
  selectedTopicId: string | null,
): AdjacentTopics & { currentIndex: number; totalCount: number } {
  const currentIndex = selectedTopicId
    ? topics.findIndex((topic) => topic.id === selectedTopicId)
    : -1

  return {
    previousTopic: currentIndex > 0 ? (topics[currentIndex - 1] ?? null) : null,
    nextTopic:
      currentIndex >= 0 && currentIndex < topics.length - 1
        ? (topics[currentIndex + 1] ?? null)
        : null,
    currentIndex,
    totalCount: topics.length,
  }
}

export function useTopicHotkeys({
  previousTopic,
  nextTopic,
  onSelect,
}: AdjacentTopics & { onSelect: (topicId: string) => void }) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      if (event.key === "ArrowLeft" && previousTopic) {
        event.preventDefault()
        onSelect(previousTopic.id)
      }

      if (event.key === "ArrowRight" && nextTopic) {
        event.preventDefault()
        onSelect(nextTopic.id)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [nextTopic, onSelect, previousTopic])
}

export function useReadingSession(
  scrollRef: { current: HTMLElement | null },
  topicId: string | null,
) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const element = scrollRef.current
    if (!element) {
      return
    }

    element.scrollTo({ top: 0 })
    setScrolled(false)

    const update = () => {
      setScrolled(element.scrollTop > 120)
    }

    update()
    element.addEventListener("scroll", update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(element)

    return () => {
      element.removeEventListener("scroll", update)
      observer.disconnect()
    }
  }, [scrollRef, topicId])

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  return { scrolled, scrollToTop }
}

export function useFooterInView(
  footerRef: { current: HTMLElement | null },
  scrollRef: { current: HTMLElement | null },
  topicId: string | null,
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const footer = footerRef.current
    const root = scrollRef.current
    if (!footer) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting))
      },
      {
        root,
        threshold: 0.35,
      },
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [footerRef, scrollRef, topicId])

  return inView
}
