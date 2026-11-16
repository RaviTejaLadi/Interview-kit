import { useQuery } from '@tanstack/react-query';

import { currentUserRequest } from '@/features/auth/apis/auth.api';
import { authQueryKeys } from '@/features/auth/constants/auth.constants';
import { hasStoredSession } from '@/features/auth/utils/session';

export function useCurrentUser() {
  return useQuery({
    queryKey: authQueryKeys.me,
    queryFn: currentUserRequest,
    enabled: hasStoredSession(),
    retry: false,
  });
}
