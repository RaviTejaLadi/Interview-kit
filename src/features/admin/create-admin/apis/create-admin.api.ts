import type { AdminCreateInput } from '@/features/admin/create-admin/types/create-admin';
import type { AdminUser } from '@/features/admin/users/types/users';
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
