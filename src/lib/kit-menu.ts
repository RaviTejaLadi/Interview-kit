import type { Topic, TopicGroup } from "@/lib/content-index"
import { sortKitsByDisplayOrder } from "@/lib/kit-meta"

export type KitTopicFolder = {
  id: string
  label: string
  starRating: number | null
  questions: Topic[]
}

export type KitSection = {
  id: string
  label: string
  topics: Topic[]
  folders: KitTopicFolder[]
}

export type KitMenu = {
  id: string
  label: string
  rootTopics: Topic[]
  sections: KitSection[]
}

export type KitNavItem = {
  id: string
  kind: "topic" | "folder"
  title: string
  section: string
  kitKey: string
  kitLabel: string
  starRating: number | null
  topics: Topic[]
}

function toSectionLabel(value: string) {
  return value
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function getTopicNavId(topicId: string) {
  return `topic:${topicId}`
}

export function getFolderNavId(kitId: string, sectionId: string, folderId: string) {
  return `folder:${kitId}/${sectionId}/${folderId}`
}

export function buildKitMenus(groups: TopicGroup[]): KitMenu[] {
  const orderedGroups = sortKitsByDisplayOrder(groups)

  return orderedGroups.map((group) => {
    const rootTopics: Topic[] = []
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
          folders: [],
        })
      }

      const section = sectionsByKey.get(sectionKey)
      if (!section) {
        continue
      }

      const folderKey = pathParts[2]
      if (pathParts.length >= 4 && folderKey) {
        let folder = section.folders.find((item) => item.id === folderKey)
        if (!folder) {
          folder = {
            id: folderKey,
            label: topic.topicTitle ?? toSectionLabel(folderKey),
            starRating: topic.starRating,
            questions: [],
          }
          section.folders.push(folder)
        }
        folder.questions.push(topic)
        continue
      }

      section.topics.push(topic)
    }

    return {
      id: group.id,
      label: group.label,
      rootTopics,
      sections: Array.from(sectionsByKey.values())
        .map((section) => ({
          ...section,
          folders: section.folders.filter((folder) => folder.questions.length > 0),
        }))
        .filter((section) => section.topics.length > 0 || section.folders.length > 0),
    }
  })
}

export function getKitNavItems(menu: KitMenu): KitNavItem[] {
  const items: KitNavItem[] = []

  for (const topic of menu.rootTopics) {
    items.push({
      id: getTopicNavId(topic.id),
      kind: "topic",
      title: topic.title,
      section: topic.section,
      kitKey: menu.id,
      kitLabel: menu.label,
      starRating: topic.starRating,
      topics: [topic],
    })
  }

  for (const section of menu.sections) {
    for (const topic of section.topics) {
      items.push({
        id: getTopicNavId(topic.id),
        kind: "topic",
        title: topic.title,
        section: section.label,
        kitKey: menu.id,
        kitLabel: menu.label,
        starRating: topic.starRating,
        topics: [topic],
      })
    }

    for (const folder of section.folders) {
      items.push({
        id: getFolderNavId(menu.id, section.id, folder.id),
        kind: "folder",
        title: folder.label,
        section: section.label,
        kitKey: menu.id,
        kitLabel: menu.label,
        starRating: folder.starRating,
        topics: folder.questions,
      })
    }
  }

  return items
}

export function findNavItemForTopic(items: KitNavItem[], topicId: string) {
  return items.find((item) => item.topics.some((topic) => topic.id === topicId)) ?? null
}

export function findNavItemForTopicInGroups(groups: TopicGroup[], topicId: string) {
  const items = buildKitMenus(groups).flatMap(getKitNavItems)
  return findNavItemForTopic(items, topicId)
}
