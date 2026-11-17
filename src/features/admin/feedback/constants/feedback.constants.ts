export const adminFeedbackQueryKeys = {
  list: ['admin', 'feedbacks'] as const,
  detail: (id: string) => ['admin', 'feedbacks', id] as const,
};
