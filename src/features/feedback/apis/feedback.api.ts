import type { FeedbackItem, SubmitFeedbackInput } from '@/features/feedback/types/feedback';
import type { IHttpResponse } from '@/types/http-response';
import withApiBoundary from '@/utils/apiErrorBoundary';
import { api } from '@/utils/axios';
import { apiUrls } from '@/utils/urls';

export async function submitFeedbackRequest(input: SubmitFeedbackInput) {
  const body = await withApiBoundary(
    () => api.post<IHttpResponse<{ feedback: FeedbackItem }>>(apiUrls.feedback, input),
    'Could not submit feedback. Try again.',
  );
  return body.data.feedback;
}

export async function feedbackListRequest() {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<{ feedbacks: FeedbackItem[] }>>(apiUrls.feedback),
    'Could not load your feedback right now.',
    { silentSuccess: true },
  );
  return body.data.feedbacks;
}

export async function deleteFeedbackRequest(feedbackId: string) {
  await withApiBoundary(
    () => api.delete<IHttpResponse<null>>(`${apiUrls.feedback}/${feedbackId}`),
    'Could not delete this feedback. Try again.',
  );
}
