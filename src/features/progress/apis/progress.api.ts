import type {
  BatchTopicProgressInput,
  ProgressSnapshot,
  SyncProgressInput,
  UpsertGuideProgressInput,
  UpsertTopicProgressInput,
} from '@/features/progress/types/progress';
import type { IHttpResponse } from '@/types/http-response';
import withApiBoundary from '@/utils/apiErrorBoundary';
import { api } from '@/utils/axios';
import { apiUrls } from '@/utils/urls';

export async function getProgressRequest() {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<ProgressSnapshot>>(apiUrls.progress),
    'Could not load your progress.',
    { silentSuccess: true, silentError: true },
  );
  return body.data;
}

export async function upsertTopicProgressRequest(input: UpsertTopicProgressInput) {
  const body = await withApiBoundary(
    () => api.put<IHttpResponse<ProgressSnapshot>>(apiUrls.progressTopics, input),
    'Could not save topic progress.',
    { silentSuccess: true, silentError: true },
  );
  return body.data;
}

export async function batchTopicProgressRequest(input: BatchTopicProgressInput) {
  const body = await withApiBoundary(
    () => api.put<IHttpResponse<ProgressSnapshot>>(apiUrls.progressTopicsBatch, input),
    'Could not update topic progress.',
    { silentSuccess: true, silentError: true },
  );
  return body.data;
}

export async function upsertGuideProgressRequest(input: UpsertGuideProgressInput) {
  const body = await withApiBoundary(
    () => api.put<IHttpResponse<ProgressSnapshot>>(apiUrls.progressGuides, input),
    'Could not save guide progress.',
    { silentSuccess: true, silentError: true },
  );
  return body.data;
}

export async function syncProgressRequest(input: SyncProgressInput) {
  const body = await withApiBoundary(
    () => api.put<IHttpResponse<ProgressSnapshot>>(apiUrls.progressSync, input),
    'Could not sync progress.',
    { silentSuccess: true, silentError: true },
  );
  return body.data;
}
