import type { AuthSession, AuthUser, LoginInput, RegisterInput } from '@/features/auth/types/auth';
import { api } from '@/utils/axios';
import type { IHttpResponse } from '@/types/http-response';
import withApiBoundary from '@/utils/apiErrorBoundary';
import { apiUrls } from '@/utils/urls';

export async function loginRequest(input: LoginInput) {
  const body = await withApiBoundary(
    () => api.post<IHttpResponse<AuthSession>>(apiUrls.login, input, { skipAuth: true }),
    'Could not sign in. Try again.',
  );
  return body.data;
}

export async function registerRequest(input: RegisterInput) {
  const body = await withApiBoundary(
    () => api.post<IHttpResponse<AuthSession>>(apiUrls.register, input, { skipAuth: true }),
    'Could not create the account. Try again.',
  );
  return body.data;
}

export async function forgotPasswordRequest(email: string) {
  return withApiBoundary(
    () =>
      api.post<IHttpResponse<{ email: string }>>(
        apiUrls.forgotPassword,
        { email },
        { skipAuth: true },
      ),
    'Could not start password reset. Try again.',
  );
}

export async function currentUserRequest() {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<{ user: AuthUser }>>(apiUrls.me),
    'Could not load your account.',
    { silentSuccess: true },
  );
  return body.data.user;
}

export async function logoutRequest() {
  await withApiBoundary(
    () => api.post<IHttpResponse<null>>(apiUrls.logout, {}),
    'Could not sign out. Try again.',
  );
}
