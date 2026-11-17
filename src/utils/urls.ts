export const BASE_URL = 'https://interview-kit-backend-pzqt.onrender.com/api/v1';

export const apiUrls = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  forgotPassword: `${BASE_URL}/auth/forgot-password`,
  verifyOtp: `${BASE_URL}/auth/verify-otp`,
  resetPassword: `${BASE_URL}/auth/reset-password`,
  changePassword: `${BASE_URL}/auth/change-password`,
  oauthProviders: `${BASE_URL}/auth/oauth/providers`,
  refresh: `${BASE_URL}/auth/refresh`,
  me: `${BASE_URL}/auth/me`,
  logout: `${BASE_URL}/auth/logout`,
  feedback: `${BASE_URL}/feedback`,
  adminRegister: `${BASE_URL}/admin/register`,
  adminUsers: `${BASE_URL}/admin/users`,
  adminFeedback: `${BASE_URL}/admin/feedback`,
  chat: `${BASE_URL}/chat`,
  chatUsage: `${BASE_URL}/chat/usage`,
} as const;
