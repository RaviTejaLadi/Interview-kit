import { useCallback, useEffect, useMemo, useState } from 'react';

const GUIDE_PROGRESS_STORAGE_KEY = 'interview-kit-guide-progress-v1';

export type GuideProgressEntry = {
  read: boolean;
  starred: boolean;
};

export type GuideProgressMap = Record<string, GuideProgressEntry>;

const EMPTY_GUIDE_PROGRESS: GuideProgressEntry = Object.freeze({
  read: false,
  starred: false,
});

function sanitizeStoredProgress(value: unknown): GuideProgressMap {
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

function readStoredProgress(): GuideProgressMap {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(GUIDE_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    return sanitizeStoredProgress(JSON.parse(raw));
  } catch {
    return {};
  }
}

function writeStoredProgress(progress: GuideProgressMap) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(GUIDE_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

function updateGuideProgress(
  current: GuideProgressMap,
  guideId: string,
  patch: Partial<GuideProgressEntry>,
) {
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

export function useGuideProgress() {
  const [guideProgressById, setGuideProgressById] = useState<GuideProgressMap>(() =>
    readStoredProgress(),
  );

  useEffect(() => {
    writeStoredProgress(guideProgressById);
  }, [guideProgressById]);

  const setGuideRead = useCallback((guideId: string, read: boolean) => {
    setGuideProgressById((current) => updateGuideProgress(current, guideId, { read }));
  }, []);

  const setGuideStarred = useCallback((guideId: string, starred: boolean) => {
    setGuideProgressById((current) => updateGuideProgress(current, guideId, { starred }));
  }, []);

  const toggleGuideRead = useCallback((guideId: string) => {
    setGuideProgressById((current) =>
      updateGuideProgress(current, guideId, {
        read: !(current[guideId]?.read ?? false),
      }),
    );
  }, []);

  const toggleGuideStarred = useCallback((guideId: string) => {
    setGuideProgressById((current) =>
      updateGuideProgress(current, guideId, {
        starred: !(current[guideId]?.starred ?? false),
      }),
    );
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
