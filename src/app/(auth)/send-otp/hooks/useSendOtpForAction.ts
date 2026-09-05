// hooks/useSendOtp.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendOtp } from "../services/send-otp.api";

interface SendOtpOptions {
  onSuccess?: () => void;
  redirect?: boolean;
}

export function useSendOtpForAction() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const sendOtpMutation = useMutation({
    mutationFn: (phone: string) => sendOtp({ phone }),
  });

  const sendOtpAction = (phoneNumber: string, options?: SendOtpOptions) => {
    setPhone(phoneNumber);
    sendOtpMutation.mutate(phoneNumber, {
      onSuccess: () => {
        if (options?.onSuccess) options.onSuccess();
        if (options?.redirect !== false) {
          router.push(`/verify-otp?phone=${encodeURIComponent(phoneNumber)}`);
        }
      },
    });
  };

  return {
    phone,
    changePhone: setPhone,
    sendOtpAction,
    isLoading: sendOtpMutation.isPending,
  };
}
