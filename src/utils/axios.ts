import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import {
  clearSession,
  readAccessToken,
  readRefreshToken,
  writeSession,
} from '@/features/auth/utils/session';
import { apiUrls } from '@/utils/urls';

type RetryConfig = InternalAxiosRequestConfig & {
  skipAuth?: boolean;
  skipRefresh?: boolean;
  _retry?: boolean;
};

type ApiErrorBody = {
  message?: string;
};

declare module 'axios' {
  interface AxiosRequestConfig {
    skipAuth?: boolean;
    skipRefresh?: boolean;
  }
}

export const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

let refreshRequest: Promise<string | null> | null = null;

function refreshAccessToken() {
  const refreshToken = readRefreshToken();
  if (!refreshToken) {
    return Promise.resolve(null);
  }

  if (!refreshRequest) {
    refreshRequest = api
      .post(apiUrls.refresh, { refreshToken }, { skipAuth: true, skipRefresh: true })
      .then((response) => {
        const data = response.data?.data as
          { accessToken?: string; refreshToken?: string } | undefined;
        if (!data?.accessToken || !data.refreshToken) {
          clearSession();
          return null;
        }

        writeSession(data.accessToken, data.refreshToken);
        return data.accessToken;
      })
      .catch(() => {
        clearSession();
        return null;
      })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
}

api.interceptors.request.use((config: RetryConfig) => {
  if (!config.skipAuth) {
    const accessToken = readAccessToken();
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined;
    if (
      !config ||
      config.skipAuth ||
      config.skipRefresh ||
      config._retry ||
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }

    config._retry = true;
    const accessToken = await refreshAccessToken();
    if (!accessToken) {
      return Promise.reject(error);
    }

    config.headers.set('Authorization', `Bearer ${accessToken}`);
    return api(config);
  },
);

export function getApiErrorStatus(error: unknown) {
  return axios.isAxiosError(error) ? error.response?.status : undefined;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return fallback;
  }

  const message = error.response?.data?.message;
  if (typeof message === 'string' && message.trim()) {
    return message;
  }

  if (!error.response) {
    return 'Could not reach the API. Check your connection and try again.';
  }

  return fallback;
}
