import { useMutation } from '@tanstack/react-query';

import { verifyOtpRequest } from '@/features/auth/apis/auth.api';
import type { VerifyOtpInput } from '@/features/auth/types/auth';

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (input: VerifyOtpInput) => verifyOtpRequest(input),
  });
}
