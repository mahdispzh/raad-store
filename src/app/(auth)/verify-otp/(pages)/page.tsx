"use client";

import VerifyForm from "../components/verify-form";
import { useCountdown } from "../hooks/useCountdown";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

export default function VerifyPage() {
  const { verifyOtpAction, code, changeCode, phone, inputStatus, loading } =
    useVerifyOtp();
  const { remainingTime, isExpired, resetTimer } = useCountdown(60);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8">
      <VerifyForm
        code={code}
        inputStatus={inputStatus}
        isExpired={isExpired}
        isLoading={loading}
        phoneNumber={phone}
        remainingTime={remainingTime}
        resetTimer={resetTimer}
        verifyOtpAction={verifyOtpAction}
        onChangeCode={changeCode}
      />
    </div>
  );
}
