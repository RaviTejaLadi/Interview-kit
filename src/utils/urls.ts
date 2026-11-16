export const BASE_URL = 'https://interview-kit-backend-pzqt.onrender.com/api/v1';

export const apiUrls = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  forgotPassword: `${BASE_URL}/auth/forgot-password`,
  refresh: `${BASE_URL}/auth/refresh`,
  me: `${BASE_URL}/auth/me`,
  logout: `${BASE_URL}/auth/logout`,
} as const;
