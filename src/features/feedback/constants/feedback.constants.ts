export const feedbackQueryKeys = {
  list: ['feedback', 'list'] as const,
};

export const FEEDBACK_FIELD_LIMITS = {
  titleMin: 3,
  titleMax: 60,
  descriptionMin: 2,
  descriptionMax: 250,
} as const;

export const FEEDBACK_STATUSES = ['open', 'in_progress', 'resolved'] as const;

export const FEEDBACK_STATUS_LABELS: Record<(typeof FEEDBACK_STATUSES)[number], string> = {
  open: 'Open',
  in_progress: 'In progress',
  resolved: 'Resolved',
};
