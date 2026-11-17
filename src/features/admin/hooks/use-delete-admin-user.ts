import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteAdminUserRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteAdminUserRequest(userId),
    onSuccess: (_value, userId) => {
      queryClient.removeQueries({ queryKey: adminQueryKeys.user(userId), exact: true });
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.users });
    },
  });
}
