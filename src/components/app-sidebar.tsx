import * as React from "react"
import {
  BookIcon,
  BookOpenTextIcon,
  ChevronRightIcon,
  Code2Icon,
  FolderIcon,
  ListTreeIcon,
  SparklesIcon,
  SearchIcon,
} from "lucide-react"
import cssKitIcon from "../../assets/kits-svgs/css.svg"
import gitKitIcon from "../../assets/kits-svgs/git.svg"
import htmlKitIcon from "../../assets/kits-svgs/html.svg"
import javascriptKitIcon from "../../assets/kits-svgs/javascript.svg"
import mongodbKitIcon from "../../assets/kits-svgs/mongodb.svg"
import nextjsKitIcon from "../../assets/kits-svgs/nextjs.svg"
import nodejsKitIcon from "../../assets/kits-svgs/nodejs.svg"
import reactKitIcon from "../../assets/kits-svgs/react.svg"
import tailwindKitIcon from "../../assets/kits-svgs/tailwind.svg"
import hrKitIcon from "../../assets/kits-svgs/hr.svg"

import type { TopicGroup } from "@/lib/content-index"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  groups: TopicGroup[]
  searchValue: string
  selectedTopicId: string | null
  onSearchChange: (value: string) => void
  onSelectTopic: (topicId: string) => void
}

type KitSection = {
  id: string
  label: string
  topics: TopicGroup["topics"]
}

type KitMenu = {
  id: string
  label: string
  rootTopics: TopicGroup["topics"]
  sections: KitSection[]
}

const KIT_DISPLAY_ORDER = [
  "html-interview-kit",
  "css-interview-kit",
  "tailwind-interview-kit",
  "javascript-interview-kit",
  "react-interview-kit",
  "next-js-interview-kit",
  "node-js-interview-kit",
  "mongo-db-interview-kit",
  "git-interview-kit",
  "hr-interview-kit",
]

const KIT_ICON_BY_ID: Record<string, string> = {
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

function toSectionLabel(value: string) {
  return value
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function buildKitMenus(groups: TopicGroup[]): KitMenu[] {
  const orderedGroups = [...groups].sort((a, b) => {
    const indexA = KIT_DISPLAY_ORDER.indexOf(a.id)
    const indexB = KIT_DISPLAY_ORDER.indexOf(b.id)
    const orderA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA
    const orderB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB
    return orderA - orderB || a.label.localeCompare(b.label)
  })

  return orderedGroups.map((group) => {
    const rootTopics: TopicGroup["topics"] = []
    const sectionsByKey = new Map<string, KitSection>()

    for (const topic of group.topics) {
      const pathParts = topic.path.split("/")
      const sectionKey = pathParts[1]

      if (!sectionKey || pathParts.length <= 2) {
        rootTopics.push(topic)
        continue
      }

      if (!sectionsByKey.has(sectionKey)) {
        sectionsByKey.set(sectionKey, {
          id: sectionKey,
          label: toSectionLabel(sectionKey),
          topics: [],
        })
      }

      const section = sectionsByKey.get(sectionKey)
      if (section) {
        section.topics.push(topic)
      }
    }

    return {
      id: group.id,
      label: group.label,
      rootTopics,
      sections: Array.from(sectionsByKey.values()),
    }
  })
}

function getRootTopicIcon(title: string) {
  const normalizedTitle = title.trim().toLowerCase()

  if (normalizedTitle === "overview") {
    return BookIcon
  }

  if (normalizedTitle === "topics") {
    return ListTreeIcon
  }

  return null
}

function getSectionIcon(section: KitSection) {
  const normalizedKey = `${section.id} ${section.label}`.toLowerCase()

  if (normalizedKey.includes("theory")) {
    return BookOpenTextIcon
  }

  if (normalizedKey.includes("coding") || normalizedKey.includes("code")) {
    return Code2Icon
  }

  if (normalizedKey.includes("advanced")) {
    return SparklesIcon
  }

  return FolderIcon
}

export function AppSidebar({
  groups,
  searchValue,
  selectedTopicId,
  onSearchChange,
  onSelectTopic,
  className,
  ...props
}: AppSidebarProps) {
  const totalTopics = groups.reduce((count, group) => count + group.topics.length, 0)
  const kitMenus = React.useMemo(() => buildKitMenus(groups), [groups])
  const hasSearchQuery = searchValue.trim().length > 0

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r border-sidebar-border/70 bg-sidebar/94 backdrop-blur supports-backdrop-filter:bg-sidebar/84 dark:border-sidebar-border/35",
        className,
      )}
      {...props}
    >
      <SidebarHeader className="gap-3 border-b border-sidebar-border/70 bg-sidebar/92 px-2 pb-3 pt-2 backdrop-blur dark:border-sidebar-border/35">
        <div className="flex items-center gap-2 rounded-md border border-sidebar-border/65 bg-sidebar-accent/24 px-2.5 py-2 dark:border-sidebar-border/30">
          <BookOpenTextIcon className="size-4 shrink-0 text-sidebar-primary" />
          <div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">Interview Kit Portal</span>
            <span className="truncate text-xs text-sidebar-foreground/82">Browse all kits</span>
          </div>
        </div>
        <div className="px-2 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-sidebar-foreground/75" />
            <SidebarInput
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              aria-label="Search topics"
              placeholder="Search topics..."
              className="h-9 rounded-md border-sidebar-border/70 bg-sidebar-accent/22 pl-8 shadow-none placeholder:text-sidebar-foreground/66 focus-visible:border-sidebar-ring dark:border-sidebar-border/35 dark:bg-sidebar-accent/40"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-linear-to-b from-sidebar via-sidebar to-sidebar-accent/10">
        {groups.length === 0 ? (
          <div className="p-4 text-sm text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
            No topics found.
          </div>
        ) : (
          <SidebarGroup className="py-1.5">
            <SidebarGroupLabel className="px-2 text-[11px] tracking-[0.08em] uppercase text-sidebar-foreground/78">
              Interview Kits
            </SidebarGroupLabel>
            <SidebarMenu>
              {kitMenus.map((kit) => {
                const kitHasSelectedTopic =
                  selectedTopicId !== null &&
                  (kit.rootTopics.some((topic) => topic.id === selectedTopicId) ||
                    kit.sections.some((section) =>
                      section.topics.some((topic) => topic.id === selectedTopicId),
                    ))
                const kitIcon = KIT_ICON_BY_ID[kit.id]

                return (
                  <Collapsible
                    key={`${kit.id}-${hasSearchQuery ? "search" : "browse"}`}
                    defaultOpen={kitHasSelectedTopic || hasSearchQuery}
                    className="group/collapsible mb-1.5"
                    render={<SidebarMenuItem />}
                  >
                    <CollapsibleTrigger
                      render={
                        <SidebarMenuButton
                          tooltip={kit.label}
                          isActive={kitHasSelectedTopic}
                          className="h-9 rounded-md border border-sidebar-border/65 bg-sidebar-accent/24 font-semibold text-sidebar-foreground data-[active=true]:border-sidebar-primary/40 data-[active=true]:bg-sidebar-primary/16 data-[active=true]:text-sidebar-primary dark:border-sidebar-border/30 dark:bg-sidebar-accent/35 dark:data-[active=true]:border-sidebar-primary/45 dark:data-[active=true]:bg-sidebar-primary/25"
                        />
                      }
                    >
                      {kitIcon ? (
                        <img
                          src={kitIcon}
                          alt=""
                          aria-hidden="true"
                          className="size-4 shrink-0 rounded-sm bg-white/75 p-0.5 object-contain dark:bg-white/15"
                        />
                      ) : (
                        <FolderIcon />
                      )}
                      <span>{kit.label}</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="space-y-2 border-l border-sidebar-border/55 pl-4 pr-2 pb-2 pt-1 group-data-[collapsible=icon]:hidden dark:border-sidebar-border/28">
                        {kit.rootTopics.length > 0 && (
                          <div className="space-y-1">
                            {kit.rootTopics.map((topic) => {
                              const RootTopicIcon = getRootTopicIcon(topic.title)

                              return (
                                <SidebarMenuButton
                                  key={topic.id}
                                  size="sm"
                                  isActive={selectedTopicId === topic.id}
                                  onClick={() => onSelectTopic(topic.id)}
                                  className="h-auto rounded-md py-1.5 text-[13px] text-sidebar-foreground/95 data-[active=true]:bg-sidebar-primary/15 data-[active=true]:text-sidebar-primary"
                                >
                                  {RootTopicIcon ? <RootTopicIcon className="mt-0.5 shrink-0" /> : null}
                                  <span className="line-clamp-2 leading-tight">{topic.title}</span>
                                </SidebarMenuButton>
                              )
                            })}
                          </div>
                        )}

                        {kit.sections.map((section) => {
                          const sectionHasSelectedTopic =
                            selectedTopicId !== null &&
                            section.topics.some((topic) => topic.id === selectedTopicId)
                          const SectionIcon = getSectionIcon(section)

                          return (
                            <Collapsible
                              key={`${kit.id}-${section.id}-${hasSearchQuery ? "search" : "browse"}`}
                              defaultOpen={sectionHasSelectedTopic || hasSearchQuery}
                              className="group/section-collapsible space-y-1"
                            >
                              <CollapsibleTrigger
                                render={
                                  <SidebarMenuButton
                                    size="sm"
                                    tooltip={section.label}
                                    isActive={sectionHasSelectedTopic}
                                    className="h-7 rounded-md text-[11px] font-semibold tracking-[0.06em] uppercase text-sidebar-foreground/80 data-[active=true]:bg-sidebar-primary/12 data-[active=true]:text-sidebar-primary dark:data-[active=true]:bg-sidebar-primary/20"
                                  />
                                }
                              >
                                <SectionIcon className="size-3.5 shrink-0" />
                                <span>{section.label}</span>
                                <ChevronRightIcon className="ml-auto size-3.5 transition-transform duration-200 group-data-open/section-collapsible:rotate-90" />
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="space-y-1 pl-3">
                                  {section.topics.map((topic) => (
                                    <SidebarMenuButton
                                      key={topic.id}
                                      size="sm"
                                      isActive={selectedTopicId === topic.id}
                                      onClick={() => onSelectTopic(topic.id)}
                                      className="h-auto rounded-md py-1.5 text-[13px] text-sidebar-foreground/95 data-[active=true]:bg-sidebar-primary/15 data-[active=true]:text-sidebar-primary"
                                    >
                                      <span className="line-clamp-2 leading-tight">{topic.title}</span>
                                    </SidebarMenuButton>
                                  ))}
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          )
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/70 bg-sidebar/92 px-4 py-3 group-data-[collapsible=icon]:hidden dark:border-sidebar-border/35">
        <p className="text-xs font-medium text-sidebar-foreground/80">{totalTopics} topics loaded</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
