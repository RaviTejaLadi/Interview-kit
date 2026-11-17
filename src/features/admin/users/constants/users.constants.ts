export const adminUsersQueryKeys = {
  list: ['admin', 'users'] as const,
  detail: (id: string) => ['admin', 'users', id] as const,
};
