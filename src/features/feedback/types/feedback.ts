export type FeedbackStatus = 'open' | 'in_progress' | 'resolved';

export type FeedbackItem = {
  id: string;
  user: string;
  title: string;
  description: string | null;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
};

export type SubmitFeedbackInput = {
  title: string;
  description: string;
};
