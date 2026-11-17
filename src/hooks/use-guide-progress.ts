import { useCallback, useEffect, useMemo, useState } from 'react';

import { upsertGuideProgressRequest } from '@/features/progress/apis/progress.api';
import type { GuideProgressEntry, GuideProgressMap } from '@/features/progress/types/progress';
import { hydrateProgressFromServer, subscribeProgressHydration } from '@/features/progress/utils/hydrate-progress';
import {
  EMPTY_GUIDE_PROGRESS,
  readStoredGuideProgress,
  updateGuideProgress,
  writeStoredGuideProgress,
} from '@/features/progress/utils/progress-storage';
import { hasStoredSession } from '@/features/auth/utils/session';

export type { GuideProgressEntry, GuideProgressMap };

export function useGuideProgress() {
  const [guideProgressById, setGuideProgressById] = useState<GuideProgressMap>(() =>
    readStoredGuideProgress(),
  );

  useEffect(() => {
    writeStoredGuideProgress(guideProgressById);
  }, [guideProgressById]);

  useEffect(() => {
    const unsubscribe = subscribeProgressHydration((progress) => {
      setGuideProgressById(progress.guides);
    });

    if (hasStoredSession()) {
      void hydrateProgressFromServer();
    }

    return unsubscribe;
  }, []);

  const setGuideRead = useCallback((guideId: string, read: boolean) => {
    setGuideProgressById((current) => {
      const next = updateGuideProgress(current, guideId, { read });
      if (next === current) {
        return current;
      }
      void upsertGuideProgressRequest({ id: guideId, read });
      return next;
    });
  }, []);

  const setGuideStarred = useCallback((guideId: string, starred: boolean) => {
    setGuideProgressById((current) => {
      const next = updateGuideProgress(current, guideId, { starred });
      if (next === current) {
        return current;
      }
      void upsertGuideProgressRequest({ id: guideId, starred });
      return next;
    });
  }, []);

  const toggleGuideRead = useCallback((guideId: string) => {
    setGuideProgressById((current) => {
      const read = !(current[guideId]?.read ?? false);
      const next = updateGuideProgress(current, guideId, { read });
      if (next === current) {
        return current;
      }
      void upsertGuideProgressRequest({ id: guideId, read });
      return next;
    });
  }, []);

  const toggleGuideStarred = useCallback((guideId: string) => {
    setGuideProgressById((current) => {
      const starred = !(current[guideId]?.starred ?? false);
      const next = updateGuideProgress(current, guideId, { starred });
      if (next === current) {
        return current;
      }
      void upsertGuideProgressRequest({ id: guideId, starred });
      return next;
    });
  }, []);

  const getGuideProgress = useCallback(
    (guideId: string): GuideProgressEntry => guideProgressById[guideId] ?? EMPTY_GUIDE_PROGRESS,
    [guideProgressById],
  );

  const readGuideCount = useMemo(
    () => Object.values(guideProgressById).filter((entry) => entry.read).length,
    [guideProgressById],
  );
  const starredGuideCount = useMemo(
    () => Object.values(guideProgressById).filter((entry) => entry.starred).length,
    [guideProgressById],
  );

  return {
    guideProgressById,
    getGuideProgress,
    setGuideRead,
    setGuideStarred,
    toggleGuideRead,
    toggleGuideStarred,
    readGuideCount,
    starredGuideCount,
  };
}
