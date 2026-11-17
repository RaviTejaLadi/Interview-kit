import type {
  AdminCreateInput,
  AdminFeedback,
  AdminUpdateUserInput,
  AdminUser,
} from '@/features/admin/types/admin';
import type { IHttpResponse } from '@/types/http-response';
import withApiBoundary from '@/utils/apiErrorBoundary';
import { api } from '@/utils/axios';
import { apiUrls } from '@/utils/urls';

export async function createAdminRequest(input: AdminCreateInput) {
  const body = await withApiBoundary(
    () => api.post<IHttpResponse<{ user: AdminUser }>>(apiUrls.adminRegister, input),
    'Could not create the admin account. Try again.',
  );
  return body.data.user;
}

export async function adminUsersRequest() {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<{ users: AdminUser[] }>>(apiUrls.adminUsers),
    'Could not load users right now.',
    { silentSuccess: true },
  );
  return body.data.users;
}

export async function adminUserRequest(userId: string) {
  const body = await withApiBoundary(
    () => api.get<IHttpResponse<{ user: AdminUser }>>(`${apiUrls.adminUsers}/${userId}`),
    'Could not load this user right now.',
    { silentSuccess: true },
  );
  return body.data.user;
}

export async function updateAdminUserRequest(userId: string, input: AdminUpdateUserInput) {
  const body = await withApiBoundary(
    () => api.patch<IHttpResponse<{ user: AdminUser }>>(`${apiUrls.adminUsers}/${userId}`, input),
    'Could not update this user. Try again.',
  );
  return body.data.user;
}

export async function deleteAdminUserRequest(userId: string) {
  await withApiBoundary(
    () => api.delete<IHttpResponse<null>>(`${apiUrls.adminUsers}/${userId}`),
    'Could not delete this user. Try again.',
  );
}

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

export async function deleteAdminFeedbackRequest(feedbackId: string) {
  await withApiBoundary(
    () => api.delete<IHttpResponse<null>>(`${apiUrls.adminFeedback}/${feedbackId}`),
    'Could not delete this feedback. Try again.',
  );
}
