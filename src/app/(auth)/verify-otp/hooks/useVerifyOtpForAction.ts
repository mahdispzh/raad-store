// hooks/useVerifyOtp.ts
"use client";

import { useAuthStore } from "@/src/shared/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { verifyOtp } from "../services/verify-otp.api";

interface VerifyOtpOptions {
  onSuccess?: () => void;
  redirect?: boolean; // اضافه شد
  phone?: string; // اضافه شد – برای مودال که شماره را مستقیم بفرستد
}

export function useVerifyOtpForAction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [code, setCode] = useState("");
  const [inputStatus, setInputStatus] = useState<
    "default" | "success" | "error"
  >("default");
  const [internalPhone, setInternalPhone] = useState("");

  const verifyOtpMutation = useMutation({
    mutationFn: (phone: string) => verifyOtp({ phone, code }),
    onSuccess: (data) => {
      setInputStatus("success");
      setToken(data?.accessToken || null);
      if (data?.user) setUser(data?.user);
    },
    onError: () => setInputStatus("error"),
  });

  const verifyOtpAction = (options?: VerifyOtpOptions) => {
    // اولویت با phone ای است که در options داده شده، در غیر این صورت از searchParams استفاده کن
    const phoneNumber = options?.phone ?? searchParams.get("phone") ?? "";
    setInternalPhone(phoneNumber);
    verifyOtpMutation.mutate(phoneNumber, {
      onSuccess: (data) => {
        if (options?.onSuccess) options.onSuccess();
        // اگر redirect === false، ریدایرکت نکن
        if (options?.redirect !== false) {
          const target = data?.isNewUser
            ? `${data.redirectTo}/profile`
            : `${data?.redirectTo}/home`;
          router.replace(target);
        }
      },
      onError: () => {},
    });
  };

  const changeCode = (value: string) => {
    setCode(value);
    setInputStatus("default");
  };

  return {
    code,
    changeCode,
    phone: internalPhone,
    inputStatus,
    loading: verifyOtpMutation.isPending,
    verifyOtpAction,
  };
}
