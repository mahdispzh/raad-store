import { apiClient } from "@/src/shared/api/client";
import { fetcher } from "@/src/shared/api/fetcher";

export type SendOtpDto = {
  phone: string;
};

export type SendOtpResponse = {
  success: boolean;
  debugCode?: string;
};

export async function sendOtp(data: SendOtpDto) {
  return fetcher<SendOtpResponse>(() =>
    apiClient.post("auth/send-otp", { phone: data.phone }),
  );
}
