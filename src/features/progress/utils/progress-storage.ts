import {
  GUIDE_PROGRESS_STORAGE_KEY,
  TOPIC_PROGRESS_STORAGE_KEY,
} from '@/features/progress/constants/progress.constants';
import type {
  GuideProgressEntry,
  GuideProgressMap,
  TopicProgressEntry,
  TopicProgressMap,
} from '@/features/progress/types/progress';

export const EMPTY_TOPIC_PROGRESS: TopicProgressEntry = Object.freeze({
  completed: false,
  important: false,
});

export const EMPTY_GUIDE_PROGRESS: GuideProgressEntry = Object.freeze({
  read: false,
  starred: false,
});

export function sanitizeTopicProgress(value: unknown): TopicProgressMap {
  const cleaned: TopicProgressMap = {};

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return cleaned;
  }

  for (const [topicId, entry] of Object.entries(value as Record<string, unknown>)) {
    if (!topicId || !entry || typeof entry !== 'object' || Array.isArray(entry)) {
      continue;
    }

    const maybeEntry = entry as { completed?: unknown; important?: unknown };
    const completed = maybeEntry.completed === true;
    const important = maybeEntry.important === true;

    if (!completed && !important) {
      continue;
    }

    cleaned[topicId] = { completed, important };
  }

  return cleaned;
}

export function sanitizeGuideProgress(value: unknown): GuideProgressMap {
  const cleaned: GuideProgressMap = {};

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return cleaned;
  }

  for (const [guideId, entry] of Object.entries(value as Record<string, unknown>)) {
    if (!guideId || !entry || typeof entry !== 'object' || Array.isArray(entry)) {
      continue;
    }

    const maybeEntry = entry as { read?: unknown; starred?: unknown };
    const read = maybeEntry.read === true;
    const starred = maybeEntry.starred === true;

    if (!read && !starred) {
      continue;
    }

    cleaned[guideId] = { read, starred };
  }

  return cleaned;
}

export function readStoredTopicProgress(): TopicProgressMap {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(TOPIC_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return sanitizeTopicProgress(JSON.parse(raw));
  } catch {
    return {};
  }
}

export function writeStoredTopicProgress(progress: TopicProgressMap) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(TOPIC_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function readStoredGuideProgress(): GuideProgressMap {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(GUIDE_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return sanitizeGuideProgress(JSON.parse(raw));
  } catch {
    return {};
  }
}

export function writeStoredGuideProgress(progress: GuideProgressMap) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(GUIDE_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function updateTopicProgress(
  current: TopicProgressMap,
  topicId: string,
  patch: Partial<TopicProgressEntry>,
): TopicProgressMap {
  if (!topicId) {
    return current;
  }

  const existing = current[topicId] ?? EMPTY_TOPIC_PROGRESS;
  const nextEntry: TopicProgressEntry = {
    completed: patch.completed ?? existing.completed,
    important: patch.important ?? existing.important,
  };

  if (nextEntry.completed === existing.completed && nextEntry.important === existing.important) {
    return current;
  }

  if (!nextEntry.completed && !nextEntry.important) {
    if (!Object.prototype.hasOwnProperty.call(current, topicId)) {
      return current;
    }
    const rest = { ...current };
    delete rest[topicId];
    return rest;
  }

  return {
    ...current,
    [topicId]: nextEntry,
  };
}

export function updateGuideProgress(
  current: GuideProgressMap,
  guideId: string,
  patch: Partial<GuideProgressEntry>,
): GuideProgressMap {
  if (!guideId) {
    return current;
  }

  const existing = current[guideId] ?? EMPTY_GUIDE_PROGRESS;
  const nextEntry: GuideProgressEntry = {
    read: patch.read ?? existing.read,
    starred: patch.starred ?? existing.starred,
  };

  if (nextEntry.read === existing.read && nextEntry.starred === existing.starred) {
    return current;
  }

  if (!nextEntry.read && !nextEntry.starred) {
    if (!Object.prototype.hasOwnProperty.call(current, guideId)) {
      return current;
    }
    const rest = { ...current };
    delete rest[guideId];
    return rest;
  }

  return {
    ...current,
    [guideId]: nextEntry,
  };
}

export function mergeTopicProgressMaps(
  local: TopicProgressMap,
  remote: TopicProgressMap,
): TopicProgressMap {
  const ids = new Set([...Object.keys(local), ...Object.keys(remote)]);
  let next: TopicProgressMap = {};

  for (const id of ids) {
    const merged = {
      completed: Boolean(local[id]?.completed || remote[id]?.completed),
      important: Boolean(local[id]?.important || remote[id]?.important),
    };
    if (merged.completed || merged.important) {
      next[id] = merged;
    }
  }

  return next;
}

export function mergeGuideProgressMaps(
  local: GuideProgressMap,
  remote: GuideProgressMap,
): GuideProgressMap {
  const ids = new Set([...Object.keys(local), ...Object.keys(remote)]);
  let next: GuideProgressMap = {};

  for (const id of ids) {
    const merged = {
      read: Boolean(local[id]?.read || remote[id]?.read),
      starred: Boolean(local[id]?.starred || remote[id]?.starred),
    };
    if (merged.read || merged.starred) {
      next[id] = merged;
    }
  }

  return next;
}

export function topicMapsEqual(a: TopicProgressMap, b: TopicProgressMap) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(
    (key) => a[key]?.completed === b[key]?.completed && a[key]?.important === b[key]?.important,
  );
}

export function guideMapsEqual(a: GuideProgressMap, b: GuideProgressMap) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(
    (key) => a[key]?.read === b[key]?.read && a[key]?.starred === b[key]?.starred,
  );
}
