/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./client";
import { normalizeApiError } from "./error-handler";

export async function fetcher<T>(
  fn: () => Promise<{ data: T }>,
  options?: { ignore401?: boolean },
): Promise<T> {
  try {
    const response = await fn();
    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 401 && options?.ignore401) {
      return null as unknown as T;
    }

    throw normalizeApiError(error);
  }
}

export { apiClient };
