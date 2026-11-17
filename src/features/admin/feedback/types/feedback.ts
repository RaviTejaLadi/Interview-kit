import type { FeedbackItem, FeedbackStatus } from '@/features/feedback/types/feedback';

export type { FeedbackStatus };

export type AdminFeedback = FeedbackItem;

export type AdminUpdateFeedbackInput = {
  status: FeedbackStatus;
};
