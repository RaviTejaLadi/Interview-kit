import * as React from "react"
import {
  BookOpenTextIcon,
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  SearchIcon,
} from "lucide-react"

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

function toSectionLabel(value: string) {
  return value
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function buildKitMenus(groups: TopicGroup[]): KitMenu[] {
  return groups.map((group) => {
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

export function AppSidebar({
  groups,
  searchValue,
  selectedTopicId,
  onSearchChange,
  onSelectTopic,
  ...props
}: AppSidebarProps) {
  const totalTopics = groups.reduce((count, group) => count + group.topics.length, 0)
  const kitMenus = React.useMemo(() => buildKitMenus(groups), [groups])
  const hasSearchQuery = searchValue.trim().length > 0

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="gap-3 border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1">
          <BookOpenTextIcon className="size-4 shrink-0" />
          <div className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">Interview Kit Portal</span>
            <span className="truncate text-xs text-sidebar-foreground/70">Browse all kits</span>
          </div>
        </div>
        <div className="px-2 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-sidebar-foreground/70" />
            <SidebarInput
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              aria-label="Search topics"
              placeholder="Search topics..."
              className="pl-8"
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.length === 0 ? (
          <div className="p-4 text-sm text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
            No topics found.
          </div>
        ) : (
          <SidebarGroup className="py-1">
            <SidebarGroupLabel>Interview Kits</SidebarGroupLabel>
            <SidebarMenu>
              {kitMenus.map((kit) => {
                const kitHasSelectedTopic =
                  selectedTopicId !== null &&
                  (kit.rootTopics.some((topic) => topic.id === selectedTopicId) ||
                    kit.sections.some((section) =>
                      section.topics.some((topic) => topic.id === selectedTopicId),
                    ))

                return (
                  <Collapsible
                    key={`${kit.id}-${hasSearchQuery ? "search" : "browse"}`}
                    defaultOpen={kitHasSelectedTopic || hasSearchQuery}
                    className="group/collapsible"
                    render={<SidebarMenuItem />}
                  >
                    <CollapsibleTrigger
                      render={<SidebarMenuButton tooltip={kit.label} className="font-medium" />}
                    >
                      <FolderIcon />
                      <span>{kit.label}</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="space-y-2 pl-4 pr-2 pb-2 group-data-[collapsible=icon]:hidden">
                        {kit.rootTopics.length > 0 && (
                          <div className="space-y-1">
                            {kit.rootTopics.map((topic) => (
                              <SidebarMenuButton
                                key={topic.id}
                                size="sm"
                                isActive={selectedTopicId === topic.id}
                                onClick={() => onSelectTopic(topic.id)}
                                className="h-auto items-start py-1.5"
                              >
                                <FileTextIcon className="mt-0.5 shrink-0" />
                                <span className="line-clamp-2 leading-tight">{topic.title}</span>
                              </SidebarMenuButton>
                            ))}
                          </div>
                        )}

                        {kit.sections.map((section) => {
                          const sectionHasSelectedTopic =
                            selectedTopicId !== null &&
                            section.topics.some((topic) => topic.id === selectedTopicId)

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
                                    className="h-7 text-sidebar-foreground/80"
                                  />
                                }
                              >
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
                                      className="h-auto items-start py-1.5"
                                    >
                                      <FileTextIcon className="mt-0.5 shrink-0" />
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
      <SidebarFooter className="border-t border-sidebar-border px-4 py-3 group-data-[collapsible=icon]:hidden">
        <p className="text-xs text-sidebar-foreground/70">{totalTopics} topics loaded</p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
