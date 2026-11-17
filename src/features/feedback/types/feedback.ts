export type FeedbackItem = {
  id: string;
  user: string;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SubmitFeedbackInput = {
  title: string;
  description: string;
};
