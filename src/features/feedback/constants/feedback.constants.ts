export const feedbackQueryKeys = {
  list: ['feedback', 'list'] as const,
};

export const FEEDBACK_FIELD_LIMITS = {
  titleMin: 3,
  titleMax: 60,
  descriptionMin: 2,
  descriptionMax: 250,
} as const;
