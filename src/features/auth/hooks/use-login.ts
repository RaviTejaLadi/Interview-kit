import { useMutation, useQueryClient } from '@tanstack/react-query';

import { loginRequest } from '@/features/auth/apis/auth.api';
import { authQueryKeys } from '@/features/auth/constants/auth.constants';
import type { LoginInput } from '@/features/auth/types/auth';
import { writeSession } from '@/features/auth/utils/session';

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LoginInput) => loginRequest(input),
    onSuccess: (session) => {
      writeSession(session.accessToken, session.refreshToken);
      queryClient.setQueryData(authQueryKeys.me, session.user);
    },
  });
}
