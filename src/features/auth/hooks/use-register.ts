import { useMutation, useQueryClient } from '@tanstack/react-query';

import { registerRequest } from '@/features/auth/apis/auth.api';
import { authQueryKeys } from '@/features/auth/constants/auth.constants';
import type { RegisterInput } from '@/features/auth/types/auth';
import { writeSession } from '@/features/auth/utils/session';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RegisterInput) => registerRequest(input),
    onSuccess: (session) => {
      writeSession(session.accessToken, session.refreshToken);
      queryClient.setQueryData(authQueryKeys.me, session.user);
    },
  });
}
