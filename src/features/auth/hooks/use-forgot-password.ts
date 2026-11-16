import { useMutation } from '@tanstack/react-query';

import { forgotPasswordRequest } from '@/features/auth/apis/auth.api';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPasswordRequest(email),
  });
}
