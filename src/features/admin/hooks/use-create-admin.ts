import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAdminRequest } from '@/features/admin/apis/admin.api';
import { adminQueryKeys } from '@/features/admin/constants/admin.constants';
import type { AdminCreateInput } from '@/features/admin/types/admin';

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AdminCreateInput) => createAdminRequest(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.users });
    },
  });
}
