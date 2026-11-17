export type TopicProgressEntry = {
  completed: boolean;
  important: boolean;
};

export type GuideProgressEntry = {
  read: boolean;
  starred: boolean;
};

export type TopicProgressMap = Record<string, TopicProgressEntry>;
export type GuideProgressMap = Record<string, GuideProgressEntry>;

export type ProgressSnapshot = {
  topics: TopicProgressMap;
  guides: GuideProgressMap;
  updatedAt?: string;
};

export type UpsertTopicProgressInput = {
  id: string;
  completed?: boolean;
  important?: boolean;
};

export type BatchTopicProgressInput = {
  ids: string[];
  completed?: boolean;
  important?: boolean;
};

export type UpsertGuideProgressInput = {
  id: string;
  read?: boolean;
  starred?: boolean;
};

export type SyncProgressInput = {
  topics?: TopicProgressMap;
  guides?: GuideProgressMap;
};
