import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAdminUserRequest } from '@/features/admin/users/apis/users.api';
import { adminUsersQueryKeys } from '@/features/admin/users/constants/users.constants';

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteAdminUserRequest(userId),
    onSuccess: (_value, userId) => {
      queryClient.removeQueries({ queryKey: adminUsersQueryKeys.detail(userId), exact: true });
      void queryClient.invalidateQueries({ queryKey: adminUsersQueryKeys.list });
    },
  });
}
