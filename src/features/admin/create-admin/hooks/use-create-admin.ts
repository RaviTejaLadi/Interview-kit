import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAdminRequest } from '@/features/admin/create-admin/apis/create-admin.api';
import type { AdminCreateInput } from '@/features/admin/create-admin/types/create-admin';
import { adminUsersQueryKeys } from '@/features/admin/users/constants/users.constants';

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AdminCreateInput) => createAdminRequest(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminUsersQueryKeys.list });
    },
  });
}
