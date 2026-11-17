import { useQuery } from '@tanstack/react-query';

import { adminUserRequest } from '@/features/admin/users/apis/users.api';
import { adminUsersQueryKeys } from '@/features/admin/users/constants/users.constants';

export function useAdminUser(userId: string | null) {
  return useQuery({
    queryKey: userId ? adminUsersQueryKeys.detail(userId) : ['admin', 'users', 'none'],
    queryFn: () => adminUserRequest(userId as string),
    enabled: Boolean(userId),
  });
}
