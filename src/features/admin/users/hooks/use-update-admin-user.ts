import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAdminUserRequest } from '@/features/admin/users/apis/users.api';
import { adminUsersQueryKeys } from '@/features/admin/users/constants/users.constants';
import type { AdminUpdateUserInput } from '@/features/admin/users/types/users';

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, input }: { userId: string; input: AdminUpdateUserInput }) =>
      updateAdminUserRequest(userId, input),
    onSuccess: (user) => {
      queryClient.setQueryData(adminUsersQueryKeys.detail(user.id), user);
      void queryClient.invalidateQueries({ queryKey: adminUsersQueryKeys.list });
    },
  });
}
