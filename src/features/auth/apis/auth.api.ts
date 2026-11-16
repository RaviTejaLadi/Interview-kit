import type {
  AuthSession,
  AuthUser,
  ChangePasswordInput,
  LoginInput,
  OAuthProviders,
  RegisterInput,
  ResetPasswordInput,
  UpdateProfileInput,
  VerifyOtpInput,
} from '@/features/auth/types/auth';
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
  const body = await withApiBoundary(
    () =>
      api.post<IHttpResponse<{ otp?: string } | null>>(
        apiUrls.forgotPassword,
        { email },
        { skipAuth: true },
      ),
    'Could not send the reset code. Try again.',
  );
  const otp = body.data && typeof body.data.otp === 'string' ? body.data.otp : undefined;
  return { message: body.message, otp };
}

export async function verifyOtpRequest(input: VerifyOtpInput) {
  const body = await withApiBoundary(
    () =>
      api.post<IHttpResponse<{ resetToken: string }>>(apiUrls.verifyOtp, input, { skipAuth: true }),
    'Could not verify the code. Try again.',
  );
  return body.data;
}

export async function resetPasswordRequest(input: ResetPasswordInput) {
  return withApiBoundary(
    () => api.post<IHttpResponse<null>>(apiUrls.resetPassword, input, { skipAuth: true }),
    'Could not reset the password. Try again.',
  );
}

export async function oauthProvidersRequest() {
  const response = await api.get<IHttpResponse<OAuthProviders>>(apiUrls.oauthProviders, {
    skipAuth: true,
  });
  return response.data.data;
}

export async function currentUserRequest() {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<{ user: AuthUser }>>(apiUrls.me),
    'Could not load your account.',
    { silentSuccess: true },
  );
  return body.data.user;
}

export async function updateProfileRequest(input: UpdateProfileInput) {
  const body = await withApiBoundary(
    () => api.patch<IHttpResponse<{ user: AuthUser }>>(apiUrls.me, input),
    'Could not update your profile. Try again.',
  );
  return body.data.user;
}

export async function changePasswordRequest(input: ChangePasswordInput) {
  return withApiBoundary(
    () => api.put<IHttpResponse<null>>(apiUrls.changePassword, input),
    'Could not change your password. Try again.',
  );
}

export async function logoutRequest() {
  await withApiBoundary(
    () => api.post<IHttpResponse<null>>(apiUrls.logout, {}),
    'Could not sign out. Try again.',
  );
}
