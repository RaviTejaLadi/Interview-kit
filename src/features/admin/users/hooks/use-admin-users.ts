import { useQuery } from '@tanstack/react-query';

import { adminUsersRequest } from '@/features/admin/users/apis/users.api';
import { adminUsersQueryKeys } from '@/features/admin/users/constants/users.constants';

export function useAdminUsers(enabled = true) {
  return useQuery({
    queryKey: adminUsersQueryKeys.list,
    queryFn: adminUsersRequest,
    enabled,
  });
}
