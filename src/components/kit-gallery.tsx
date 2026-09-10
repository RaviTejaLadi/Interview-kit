import { useMemo, useState } from "react"
import { ArrowRightIcon, BookOpenTextIcon, SearchIcon } from "lucide-react"

import type { TopicGroup } from "@/lib/content-index"
import {
  KIT_CARD_ACCENT,
  KIT_DESCRIPTIONS,
  KIT_ICON_BY_KEY,
  sortKitsByDisplayOrder,
} from "@/lib/kit-meta"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type KitGalleryProps = {
  groups: TopicGroup[]
  onSelectKit: (kitId: string) => void
}

function getKitSections(group: TopicGroup) {
  return Array.from(new Set(group.topics.map((topic) => topic.section))).filter(
    (section) => section !== "General",
  )
}

export function KitGallery({ groups, onSelectKit }: KitGalleryProps) {
  const [searchValue, setSearchValue] = useState("")
  const query = searchValue.trim().toLowerCase()

  const orderedGroups = useMemo(() => sortKitsByDisplayOrder(groups), [groups])
  const totalTopics = groups.reduce((count, group) => count + group.topics.length, 0)

  const visibleKits = useMemo(() => {
    if (!query) {
      return orderedGroups.map((group) => ({
        group,
        matchCount: 0,
      }))
    }

    return orderedGroups
      .map((group) => {
        const description = KIT_DESCRIPTIONS[group.id] ?? ""
        const kitMatches =
          group.label.toLowerCase().includes(query) || description.toLowerCase().includes(query)
        const matchCount = group.topics.filter((topic) => {
          const haystack =
            `${topic.title} ${topic.topicTitle ?? ""} ${topic.section} ${topic.kitLabel}`.toLowerCase()
          return haystack.includes(query)
        }).length

        if (!kitMatches && matchCount === 0) {
          return null
        }

        return { group, matchCount }
      })
      .filter((item): item is { group: TopicGroup; matchCount: number } => item !== null)
  }, [orderedGroups, query])

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-5 sm:space-y-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="space-y-2.5">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
          Interview prep
        </p>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Choose a kit to get started
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Pick a topic card, then browse questions for that kit only.{" "}
            {groups.length} kits · {totalTopics} questions.
          </p>
        </div>
        <div className="relative max-w-md">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            aria-label="Search kits"
            placeholder="Search kits or topics..."
            className="h-9 rounded-md border-border/70 bg-card/96 pl-9 shadow-[0_1px_2px_rgb(15_23_42/5%)] dark:border-border/35 dark:bg-card/90"
          />
        </div>
      </div>

      {visibleKits.length === 0 ? (
        <div className="rounded-lg border border-border/70 bg-card/96 p-4 text-sm text-muted-foreground shadow-[0_1px_2px_rgb(15_23_42/5%)] dark:border-border/35 dark:bg-card/90">
          No kits match “{searchValue.trim()}”. Try another topic name.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleKits.map(({ group, matchCount }) => {
            const icon = KIT_ICON_BY_KEY[group.id]
            const accent = KIT_CARD_ACCENT[group.id]
            const sections = getKitSections(group)
            const description = KIT_DESCRIPTIONS[group.id] ?? "Interview questions and practice topics."

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => onSelectKit(group.id)}
                className={cn(
                  "group flex cursor-pointer items-start gap-2.5 rounded-lg border border-border/70 bg-card/96 p-2.5 text-left shadow-[0_1px_2px_rgb(15_23_42/5%)] transition-all",
                  "hover:-translate-y-px hover:shadow-[0_6px_16px_rgb(15_23_42/8%)]",
                  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                  "dark:border-border/35 dark:bg-card/92 dark:shadow-none dark:hover:shadow-none",
                  accent?.hover,
                )}
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-white p-1.5 dark:border-border/30 dark:bg-white/10",
                    accent?.iconWrap,
                  )}
                >
                  {icon ? (
                    <img
                      src={icon}
                      alt=""
                      aria-hidden="true"
                      className="size-6 object-contain"
                    />
                  ) : (
                    <BookOpenTextIcon className="size-4 text-primary" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h2 className="truncate text-sm font-semibold tracking-tight text-foreground">
                      {group.label}
                    </h2>
                    <ArrowRightIcon className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs leading-snug text-muted-foreground">
                    {description}
                  </p>
                  <p className="mt-1 truncate text-[11px] text-muted-foreground">
                    <span className="font-medium text-foreground/75">
                      {query && matchCount > 0
                        ? `${matchCount} matching`
                        : `${group.topics.length} topics`}
                    </span>
                    {sections.length > 0 ? ` · ${sections.join(" · ")}` : ""}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
