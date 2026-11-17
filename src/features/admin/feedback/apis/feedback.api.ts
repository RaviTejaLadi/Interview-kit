import type {
  AdminFeedback,
  AdminUpdateFeedbackInput,
} from '@/features/admin/feedback/types/feedback';
import type { IHttpResponse } from '@/types/http-response';
import withApiBoundary from '@/utils/apiErrorBoundary';
import { api } from '@/utils/axios';
import { apiUrls } from '@/utils/urls';

export async function adminFeedbacksRequest() {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<{ feedbacks: AdminFeedback[] }>>(apiUrls.adminFeedback),
    'Could not load feedback right now.',
    { silentSuccess: true },
  );
  return body.data.feedbacks;
}

export async function adminFeedbackRequest(feedbackId: string) {
  const body = await withApiBoundary(
    () =>
      api.get<IHttpResponse<{ feedback: AdminFeedback }>>(`${apiUrls.adminFeedback}/${feedbackId}`),
    'Could not load this feedback right now.',
    { silentSuccess: true },
  );
  return body.data.feedback;
}

export async function updateAdminFeedbackRequest(
  feedbackId: string,
  input: AdminUpdateFeedbackInput,
) {
  const body = await withApiBoundary(
    () =>
      api.patch<IHttpResponse<{ feedback: AdminFeedback }>>(
        `${apiUrls.adminFeedback}/${feedbackId}`,
        input,
      ),
    'Could not update this feedback status. Try again.',
  );
  return body.data.feedback;
}

export async function deleteAdminFeedbackRequest(feedbackId: string) {
  await withApiBoundary(
    () => api.delete<IHttpResponse<null>>(`${apiUrls.adminFeedback}/${feedbackId}`),
    'Could not delete this feedback. Try again.',
  );
}
