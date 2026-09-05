/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError } from "axios";

type NormalizedError = {
  message: string;
  status?: number | undefined;
  code?: string;
};

export function normalizeApiError(error: AxiosError<any>): NormalizedError {
  return {
    message:
      error.response?.data?.message || error.message || "Something went wrong",

    status: error.response?.status,

    code: error.response?.data?.code,
  };
}
