import type { GuideProgressMap } from '@/hooks/use-guide-progress';
import type { TopicProgressMap } from '@/hooks/use-topic-progress';
import type { KitNavItem } from '@/lib/kit-menu';

export function hasOwn(obj: Record<string, string>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function getNavSubtitle(nav: KitNavItem) {
  if (nav.kind === 'folder') {
    return `${nav.topics.length} question${nav.topics.length === 1 ? '' : 's'}`;
  }

  return nav.section;
}

export function countProgressByTopicIds(
  topicIds: string[],
  topicProgressById: TopicProgressMap,
  field: keyof TopicProgressMap[string],
) {
  return topicIds.reduce(
    (count, topicId) => count + (topicProgressById[topicId]?.[field] ? 1 : 0),
    0,
  );
}

export function countProgressByGuideIds(
  guideIds: string[],
  guideProgressById: GuideProgressMap,
  field: keyof GuideProgressMap[string],
) {
  return guideIds.reduce(
    (count, guideId) => count + (guideProgressById[guideId]?.[field] ? 1 : 0),
    0,
  );
}
