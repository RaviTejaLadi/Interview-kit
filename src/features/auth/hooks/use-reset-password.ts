import { useMutation } from '@tanstack/react-query';

import { resetPasswordRequest } from '@/features/auth/apis/auth.api';
import type { ResetPasswordInput } from '@/features/auth/types/auth';

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: ResetPasswordInput) => resetPasswordRequest(input),
  });
}
