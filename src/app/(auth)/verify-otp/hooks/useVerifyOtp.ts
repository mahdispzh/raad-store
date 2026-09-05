// hooks/useVerifyOtp.ts
"use client";

import { useAuthStore } from "@/src/shared/store/store"; // ✅ اضافه کن
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { verifyOtp } from "../services/verify-otp.api";

export function useVerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ گرفتن توابع از استور
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const phone = searchParams.get("phone") ?? "";
  const [code, setCode] = useState("");
  const [inputStatus, setInputStatus] = useState<
    "default" | "success" | "error"
  >("default");

  const verifyOtpMutation = useMutation({
    mutationFn: () => verifyOtp({ phone, code }),

    onSuccess: (data) => {
      setInputStatus("success");

      // ✅ ذخیره در localStorage
      // localStorage.setItem("accessToken", data.accessToken);

      // ✅ ذخیره در استور (zustand)
      setToken(data?.accessToken || null);
      setUser(data?.user);

      const target = data?.isNewUser
        ? `${data.redirectTo}/profile`
        : `${data?.redirectTo}/home`;

      router.replace(target);
    },

    onError: () => {
      setInputStatus("error");
    },
  });

  const changeCode = (value: string) => {
    setCode(value);
    setInputStatus("default");
  };

  return {
    code,
    changeCode,
    phone,
    inputStatus,
    loading: verifyOtpMutation.isPending,
    verifyOtpAction: verifyOtpMutation.mutate,
  };
}
