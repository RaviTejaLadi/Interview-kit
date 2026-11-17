import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  batchTopicProgressRequest,
  upsertTopicProgressRequest,
} from '@/features/progress/apis/progress.api';
import type { TopicProgressEntry, TopicProgressMap } from '@/features/progress/types/progress';
import {
  hydrateProgressFromServer,
  subscribeProgressHydration,
} from '@/features/progress/utils/hydrate-progress';
import {
  EMPTY_TOPIC_PROGRESS,
  readStoredTopicProgress,
  updateTopicProgress,
  writeStoredTopicProgress,
} from '@/features/progress/utils/progress-storage';
import { hasStoredSession } from '@/features/auth/utils/session';

export type { TopicProgressEntry, TopicProgressMap };

export function useTopicProgress() {
  const [topicProgressById, setTopicProgressById] = useState<TopicProgressMap>(() =>
    readStoredTopicProgress(),
  );

  useEffect(() => {
    writeStoredTopicProgress(topicProgressById);
  }, [topicProgressById]);

  useEffect(() => {
    const unsubscribe = subscribeProgressHydration((progress) => {
      setTopicProgressById(progress.topics);
    });

    if (hasStoredSession()) {
      void hydrateProgressFromServer();
    }

    return unsubscribe;
  }, []);

  const setTopicCompleted = useCallback((topicId: string, completed: boolean) => {
    setTopicProgressById((current) => {
      const next = updateTopicProgress(current, topicId, { completed });
      if (next === current) {
        return current;
      }
      void upsertTopicProgressRequest({ id: topicId, completed });
      return next;
    });
  }, []);

  const setTopicImportant = useCallback((topicId: string, important: boolean) => {
    setTopicProgressById((current) => {
      const next = updateTopicProgress(current, topicId, { important });
      if (next === current) {
        return current;
      }
      void upsertTopicProgressRequest({ id: topicId, important });
      return next;
    });
  }, []);

  const toggleTopicCompleted = useCallback((topicId: string) => {
    setTopicProgressById((current) => {
      const completed = !(current[topicId]?.completed ?? false);
      const next = updateTopicProgress(current, topicId, { completed });
      if (next === current) {
        return current;
      }
      void upsertTopicProgressRequest({ id: topicId, completed });
      return next;
    });
  }, []);

  const toggleTopicImportant = useCallback((topicId: string) => {
    setTopicProgressById((current) => {
      const important = !(current[topicId]?.important ?? false);
      const next = updateTopicProgress(current, topicId, { important });
      if (next === current) {
        return current;
      }
      void upsertTopicProgressRequest({ id: topicId, important });
      return next;
    });
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

      if (!changed) {
        return current;
      }

      void batchTopicProgressRequest({ ids: topicIds, completed });
      return next;
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

      if (!changed) {
        return current;
      }

      void batchTopicProgressRequest({ ids: topicIds, important });
      return next;
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
