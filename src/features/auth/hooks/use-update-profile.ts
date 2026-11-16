import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfileRequest } from '@/features/auth/apis/auth.api';
import { authQueryKeys } from '@/features/auth/constants/auth.constants';
import type { UpdateProfileInput } from '@/features/auth/types/auth';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfileRequest(input),
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.me, user);
    },
  });
}
