"use client";

import { useSendOtpForAction } from "@/src/app/(auth)/send-otp/hooks/useSendOtpForAction";
import { useCountdown } from "@/src/app/(auth)/verify-otp/hooks/useCountdown";
import { useVerifyOtpForAction } from "@/src/app/(auth)/verify-otp/hooks/useVerifyOtpForAction";
import text from "@/src/shared/constants/texts/texts.json";
import { Modal, OtpInput, Subtitle, Text } from "@/src/shared/ui";
import { Rules } from "@/src/shared/validations/rules";
import { useValidation } from "@/src/shared/validations/use-validation";
import Image from "next/image";
import { useState } from "react";

type Step = "phone" | "verify";

interface LoginFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginFlowModal({
  isOpen,
  onClose,
  onSuccess,
}: LoginFlowModalProps) {
  const [step, setStep] = useState<Step>("phone");
  const [tempPhone, setTempPhone] = useState("");
  const { sendOtpAction, isLoading: sendLoading } = useSendOtpForAction();
  const {
    verifyOtpAction,
    code,
    changeCode,
    inputStatus,
    loading: verifyLoading,
  } = useVerifyOtpForAction();
  const { remainingTime, isExpired, resetTimer } = useCountdown(60);
  const phoneValidation = useValidation(Rules.phone);

  const handleSendOtp = () => {
    if (!phoneValidation.validate()) return;
    const rawPhone = phoneValidation.value;
    setTempPhone(rawPhone);
    sendOtpAction(rawPhone, {
      onSuccess: () => setStep("verify"),
      redirect: false,
    });
  };

  const handleVerifyOtp = () => {
    if (code.length !== 4) return;
    // دیگر 98 اضافه نکن، دقیقاً همان tempPhone (10 رقمی) را بفرست
    verifyOtpAction({
      phone: tempPhone, // ← بدون 98
      onSuccess: () => {
        onClose();
        if (onSuccess) onSuccess();
        window.location.reload();
      },
      redirect: false,
    });
  };

  const resetToPhoneStep = () => {
    setStep("phone");
    phoneValidation.onChange("");
    setTempPhone("");
    changeCode("");
  };

  const formatPhoneDisplay = (phone: string) =>
    phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex w-[30vw] flex-col rounded-lg bg-white p-[2.5vw] shadow-danger">
        <div className="flex flex-col items-center gap-[6vh]">
          <Image
            alt="logo"
            className="h-auto w-[18vw]"
            height={80}
            src="/images/logo.svg"
            width={200}
          />

          {step === "phone" && (
            <div className="flex w-full flex-col gap-[3vh] px-[2vw]">
              <div className="flex flex-col gap-[1vh] pb-[1vw]">
                <Text
                  color="primary"
                  size="lg"
                  text={text.dashboard.login.title}
                  weight="bold"
                />
                <Text
                  color="primary"
                  size="lg"
                  text={text.dashboard.login.description}
                  weight="bold"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-[0.2vw]">
                  <input
                    type="tel"
                    value={phoneValidation.value}
                    onChange={(e) =>
                      phoneValidation.onChange(
                        e.target.value.replace(/\D/g, ""),
                      )
                    }
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                    placeholder="9176202911"
                    className="w-full rounded-r-sm border px-4 py-3 text-lg outline-none focus:border-primary"
                  />
                  <div className="flex w-15 items-center justify-center rounded-l-sm border border-gray bg-white py-3">
                    <p className="text-lg">98+</p>
                  </div>
                </div>
                {phoneValidation.error && (
                  <span className="text-sm text-danger">
                    {phoneValidation.error}
                  </span>
                )}
              </div>
              <button
                onClick={handleSendOtp}
                disabled={sendLoading}
                className="w-full rounded-sm bg-secondary py-3 text-white hover:bg-primary disabled:opacity-50"
              >
                <Subtitle
                  text={text.dashboard.login.submit}
                  size="2xl"
                  color="white"
                  weight="medium"
                />
              </button>
              <div className="flex justify-center">
                <Text
                  color="secondary"
                  size="md"
                  text={text.dashboard.login.terms}
                  weight="regular"
                />
              </div>
            </div>
          )}

          {step === "verify" && (
            <div className="flex w-full flex-col gap-[2vh] px-[2vw]">
              <div className="flex flex-col gap-[2vh] pb-[1vw]">
                <Text
                  color="primary"
                  size="lg"
                  text={text.dashboard.login.verifyCode}
                  weight="bold"
                />
                <Text
                  color="secondary"
                  size="sm"
                  text={`کد تأیید برای شماره ${formatPhoneDisplay(tempPhone)} ارسال شد.`}
                  weight="bold"
                />
                <div className="flex justify-center">
                  <OtpInput
                    length={4}
                    value={code}
                    onChange={changeCode}
                    status={inputStatus}
                    onEnter={() =>
                      code.length === 4 && !verifyLoading && handleVerifyOtp()
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center">
                {isExpired ? (
                  <button onClick={resetTimer} className="cursor-pointer">
                    <Text
                      color="secondary"
                      size="lg"
                      text={text.dashboard.login.resendCode}
                      weight="regular"
                    />
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <Text
                      text={remainingTime.toString()}
                      size="lg"
                      weight="bold"
                      color="secondary"
                    />
                    <Text
                      color="secondary"
                      size="lg"
                      text={text.dashboard.login.remainingTime}
                      weight="regular"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleVerifyOtp}
                disabled={code.length !== 4 || verifyLoading}
                className="w-full rounded-sm bg-secondary py-3 text-white hover:bg-primary disabled:opacity-50"
              >
                <Subtitle
                  text={text.dashboard.login.submit}
                  size="2xl"
                  color="white"
                  weight="medium"
                />
              </button>
              <div
                onClick={resetToPhoneStep}
                className="flex w-full cursor-pointer justify-center pt-2"
              >
                <Text
                  color="secondary"
                  size="md"
                  text="تغییر شماره و دریافت مجدد کد"
                  weight="regular"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
