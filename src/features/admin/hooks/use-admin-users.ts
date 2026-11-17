import { useQuery } from '@tanstack/react-query';

import { adminUsersRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';

export function useAdminUsers(enabled = true) {
  return useQuery({
    queryKey: adminQueryKeys.users,
    queryFn: adminUsersRequest,
    enabled,
  });
}
