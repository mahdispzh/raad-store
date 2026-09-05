/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/src/shared/api/client";
import { fetcher } from "@/src/shared/api/fetcher";

export type VerifyOtpDto = {
  phone: string;
  code: string;
};

export type VerifyOtpResponse = {
  accessToken: string;
  user: any;
  isNewUser: boolean;
  redirectTo: string;
};

export async function verifyOtp(data: VerifyOtpDto) {
  return fetcher<VerifyOtpResponse>(() =>
    apiClient.post("/auth/verify-otp", data),
  );
}
