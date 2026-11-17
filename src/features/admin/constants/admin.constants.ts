export const adminQueryKeys = {
  users: ['admin', 'users'] as const,
  user: (id: string) => ['admin', 'users', id] as const,
  feedbacks: ['admin', 'feedbacks'] as const,
  feedback: (id: string) => ['admin', 'feedbacks', id] as const,
};
