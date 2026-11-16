import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/features/auth/constants/auth.constants';

export function readAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function readRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function writeSession(accessToken: string, refreshToken: string) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearSession() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function hasStoredSession() {
  return Boolean(readAccessToken() || readRefreshToken());
}
