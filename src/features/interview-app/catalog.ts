import { buildTopicIndex, type Topic, type TopicGroup } from '@/lib/content-index';
import { buildGuidesIndex, type Guide } from '@/lib/guides-index';

let allTopics: Topic[] = [];
let groups: TopicGroup[] = [];
let allGuides: Guide[] = [];

try {
  const topicIndex = buildTopicIndex();
  allTopics = topicIndex.allTopics;
  groups = topicIndex.groups;
} catch (error) {
  console.error('Failed to build topic index:', error);
}

try {
  allGuides = buildGuidesIndex();
} catch (error) {
  console.error('Failed to build guides index:', error);
}

export const interviewCatalog = {
  allTopics,
  groups,
  allGuides,
};
