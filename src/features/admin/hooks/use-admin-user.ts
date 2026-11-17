import { useQuery } from '@tanstack/react-query';

import { adminUserRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';

export function useAdminUser(userId: string | null) {
  return useQuery({
    queryKey: userId ? adminQueryKeys.user(userId) : ['admin', 'users', 'none'],
    queryFn: () => adminUserRequest(userId as string),
    enabled: Boolean(userId),
  });
}
