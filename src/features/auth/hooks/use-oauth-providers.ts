import { useQuery } from '@tanstack/react-query';

import { oauthProvidersRequest } from '@/features/auth/apis/auth.api';
import { authQueryKeys } from '@/features/auth/constants/auth.constants';

export function useOAuthProviders() {
  return useQuery({
    queryKey: authQueryKeys.oauthProviders,
    queryFn: oauthProvidersRequest,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
