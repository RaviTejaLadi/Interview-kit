import {
  getProgressRequest,
  syncProgressRequest,
} from '@/features/progress/apis/progress.api';
import type {
  GuideProgressMap,
  ProgressSnapshot,
  TopicProgressMap,
} from '@/features/progress/types/progress';
import {
  guideMapsEqual,
  mergeGuideProgressMaps,
  mergeTopicProgressMaps,
  readStoredGuideProgress,
  readStoredTopicProgress,
  sanitizeGuideProgress,
  sanitizeTopicProgress,
  topicMapsEqual,
  writeStoredGuideProgress,
  writeStoredTopicProgress,
} from '@/features/progress/utils/progress-storage';
import { hasStoredSession } from '@/features/auth/utils/session';

type HydratedProgress = {
  topics: TopicProgressMap;
  guides: GuideProgressMap;
};

type HydrateListener = (progress: HydratedProgress) => void;

let hydratePromise: Promise<HydratedProgress | null> | null = null;
let lastHydrated: HydratedProgress | null = null;
const listeners = new Set<HydrateListener>();

export function subscribeProgressHydration(listener: HydrateListener) {
  listeners.add(listener);
  if (lastHydrated) {
    listener(lastHydrated);
  }
  return () => {
    listeners.delete(listener);
  };
}

function notify(progress: HydratedProgress) {
  lastHydrated = progress;
  for (const listener of listeners) {
    listener(progress);
  }
}

async function runHydration(): Promise<HydratedProgress | null> {
  if (!hasStoredSession()) {
    return null;
  }

  const remote = await getProgressRequest();
  const localTopics = readStoredTopicProgress();
  const localGuides = readStoredGuideProgress();
  const remoteTopics = sanitizeTopicProgress(remote.topics);
  const remoteGuides = sanitizeGuideProgress(remote.guides);

  const mergedTopics = mergeTopicProgressMaps(localTopics, remoteTopics);
  const mergedGuides = mergeGuideProgressMaps(localGuides, remoteGuides);

  const topicsNeedSync = !topicMapsEqual(mergedTopics, remoteTopics);
  const guidesNeedSync = !guideMapsEqual(mergedGuides, remoteGuides);

  let snapshot: ProgressSnapshot = {
    topics: mergedTopics,
    guides: mergedGuides,
  };

  if (topicsNeedSync || guidesNeedSync) {
    snapshot = await syncProgressRequest({
      ...(topicsNeedSync ? { topics: mergedTopics } : {}),
      ...(guidesNeedSync ? { guides: mergedGuides } : {}),
    });
  }

  const topics = sanitizeTopicProgress(snapshot.topics);
  const guides = sanitizeGuideProgress(snapshot.guides);
  writeStoredTopicProgress(topics);
  writeStoredGuideProgress(guides);

  const hydrated = { topics, guides };
  notify(hydrated);
  return hydrated;
}

export function hydrateProgressFromServer() {
  if (!hydratePromise) {
    hydratePromise = runHydration().catch(() => null);
  }
  return hydratePromise;
}
