import type { AdminUpdateUserInput, AdminUser } from '@/features/admin/users/types/users';
import type { IHttpResponse } from '@/types/http-response';
import withApiBoundary from '@/utils/apiErrorBoundary';
import { api } from '@/utils/axios';
import { apiUrls } from '@/utils/urls';

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
