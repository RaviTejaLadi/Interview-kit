import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { logoutRequest } from '@/features/auth/apis/auth.api';
import { authQueryKeys } from '@/features/auth/constants/auth.constants';
import { clearSession } from '@/features/auth/utils/session';
import { paths } from '@/routes/paths';

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      clearSession();
      queryClient.removeQueries({ queryKey: authQueryKeys.me, exact: true });
      navigate(paths.login, { replace: true });
    },
  });
}
