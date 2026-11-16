import { useMutation } from '@tanstack/react-query';

import { changePasswordRequest } from '@/features/auth/apis/auth.api';
import type { ChangePasswordInput } from '@/features/auth/types/auth';

export function useChangePassword() {
  return useMutation({
    mutationFn: (input: ChangePasswordInput) => changePasswordRequest(input),
  });
}