import { useCallback, useEffect, useMemo, useState } from 'react';

const TOPIC_PROGRESS_STORAGE_KEY = 'interview-kit-topic-progress-v1';

export type TopicProgressEntry = {
  completed: boolean;
  important: boolean;
};

export type TopicProgressMap = Record<string, TopicProgressEntry>;

const EMPTY_TOPIC_PROGRESS: TopicProgressEntry = Object.freeze({
  completed: false,
  important: false,
});

function sanitizeStoredProgress(value: unknown): TopicProgressMap {
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

function readStoredProgress(): TopicProgressMap {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(TOPIC_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    return sanitizeStoredProgress(JSON.parse(raw));
  } catch {
    return {};
  }
}

function writeStoredProgress(progress: TopicProgressMap) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(TOPIC_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function updateTopicProgress(
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

  if (
    nextEntry.completed === existing.completed &&
    nextEntry.important === existing.important
  ) {
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

export function useTopicProgress() {
  const [topicProgressById, setTopicProgressById] = useState<TopicProgressMap>(() =>
    readStoredProgress(),
  );

  useEffect(() => {
    writeStoredProgress(topicProgressById);
  }, [topicProgressById]);

  const setTopicCompleted = useCallback((topicId: string, completed: boolean) => {
    setTopicProgressById((current) => updateTopicProgress(current, topicId, { completed }));
  }, []);

  const setTopicImportant = useCallback((topicId: string, important: boolean) => {
    setTopicProgressById((current) => updateTopicProgress(current, topicId, { important }));
  }, []);

  const toggleTopicCompleted = useCallback((topicId: string) => {
    setTopicProgressById((current) =>
      updateTopicProgress(current, topicId, {
        completed: !(current[topicId]?.completed ?? false),
      }),
    );
  }, []);

  const toggleTopicImportant = useCallback((topicId: string) => {
    setTopicProgressById((current) =>
      updateTopicProgress(current, topicId, {
        important: !(current[topicId]?.important ?? false),
      }),
    );
  }, []);

  const setManyTopicsCompleted = useCallback((topicIds: string[], completed: boolean) => {
    setTopicProgressById((current) => {
      let next = current;
      let changed = false;

      for (const topicId of topicIds) {
        const updated = updateTopicProgress(next, topicId, { completed });
        if (updated !== next) {
          next = updated;
          changed = true;
        }
      }

      return changed ? next : current;
    });
  }, []);

  const setManyTopicsImportant = useCallback((topicIds: string[], important: boolean) => {
    setTopicProgressById((current) => {
      let next = current;
      let changed = false;

      for (const topicId of topicIds) {
        const updated = updateTopicProgress(next, topicId, { important });
        if (updated !== next) {
          next = updated;
          changed = true;
        }
      }

      return changed ? next : current;
    });
  }, []);

  const completedTopicIds = useMemo(
    () =>
      new Set(
        Object.entries(topicProgressById)
          .filter(([, entry]) => entry.completed)
          .map(([topicId]) => topicId),
      ),
    [topicProgressById],
  );

  const importantTopicIds = useMemo(
    () =>
      new Set(
        Object.entries(topicProgressById)
          .filter(([, entry]) => entry.important)
          .map(([topicId]) => topicId),
      ),
    [topicProgressById],
  );

  const getTopicProgress = useCallback(
    (topicId: string): TopicProgressEntry => topicProgressById[topicId] ?? EMPTY_TOPIC_PROGRESS,
    [topicProgressById],
  );

  return {
    topicProgressById,
    completedTopicIds,
    importantTopicIds,
    getTopicProgress,
    setTopicCompleted,
    setTopicImportant,
    toggleTopicCompleted,
    toggleTopicImportant,
    setManyTopicsCompleted,
    setManyTopicsImportant,
  };
}
