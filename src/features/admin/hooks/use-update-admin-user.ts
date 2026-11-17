import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAdminUserRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';
import type { AdminUpdateUserInput } from '@/features/admin/types/admin';

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, input }: { userId: string; input: AdminUpdateUserInput }) =>
      updateAdminUserRequest(userId, input),
    onSuccess: (user) => {
      queryClient.setQueryData(adminQueryKeys.user(user.id), user);
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.users });
    },
  });
}
