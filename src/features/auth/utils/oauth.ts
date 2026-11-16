import { OAUTH_CALLBACK_PATH, OAUTH_ERROR_KEY } from '@/features/auth/constants/auth.constants';
import { writeSession } from '@/features/auth/utils/session';

function callbackPathname() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === OAUTH_CALLBACK_PATH;
}

export function consumeOAuthCallback() {
  if (!callbackPathname()) {
    return;
  }

  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const search = new URLSearchParams(window.location.search);
  const accessToken = hash.get('accessToken');
  const refreshToken = hash.get('refreshToken');
  const error = search.get('error')?.trim();

  if (accessToken && refreshToken) {
    writeSession(accessToken, refreshToken);
    window.sessionStorage.removeItem(OAUTH_ERROR_KEY);
  } else {
    window.sessionStorage.setItem(
      OAUTH_ERROR_KEY,
      error || 'Google or GitHub sign-in could not be completed. Try again.',
    );
  }

  window.history.replaceState(null, '', '/kits');
}

export function readOAuthError() {
  return window.sessionStorage.getItem(OAUTH_ERROR_KEY) ?? '';
}

export function clearOAuthError() {
  window.sessionStorage.removeItem(OAUTH_ERROR_KEY);
}
