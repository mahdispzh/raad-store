"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sendOtp } from "../services/send-otp.api";

export function useSendOtp() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const sendOtpMutation = useMutation({
    mutationFn: (phone: string) => sendOtp({ phone }),

    onSuccess: () => {
      router.push(`/verify-otp?phone=${encodeURIComponent(phone)}`);
    },
  });

  return {
    phone,
    changePhone: setPhone,
    sendOtpAction: sendOtpMutation.mutate,
    isLoading: sendOtpMutation.isPending,
  };
}
