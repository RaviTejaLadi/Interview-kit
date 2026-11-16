import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logoutRequest } from '@/features/auth/apis/auth.api';
import { authQueryKeys } from '@/features/auth/constants/auth.constants';
import { clearSession } from '@/features/auth/utils/session';
import { useInterviewAppStore } from '@/features/interview-app/store/use-interview-app-store';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      clearSession();
      queryClient.removeQueries({ queryKey: authQueryKeys.me, exact: true });
      useInterviewAppStore.getState().setIsProfileOpen(false);
    },
  });
}
