import { customToast } from '@/components/customToast/customToast';
import { getApiErrorMessage } from '@/utils/axios';
import type { IHttpResponse } from '@/types/http-response';
import type { AxiosResponse } from 'axios';

type ApiBoundaryOptions = {
  silentSuccess?: boolean;
};
const notify = customToast();

export default async function withApiBoundary<T>(
  request: () => Promise<AxiosResponse<IHttpResponse<T>>>,
  fallbackError: string,
  options?: ApiBoundaryOptions,
) {
  try {
    const response = await request();
    const message = response.data.message?.trim();
    if (!options?.silentSuccess && message) {
      notify.success(message);
    }
    return response.data;
  } catch (error) {
    notify.error(getApiErrorMessage(error, fallbackError));
    throw error;
  }
}
