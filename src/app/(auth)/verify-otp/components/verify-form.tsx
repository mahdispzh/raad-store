"use client";

import { EASY_LOGIN } from "@/src/shared/config/auth.config";
import { ExclamationMarkIcon } from "@/src/shared/constants/icons";
import text from "@/src/shared/constants/texts/texts.json";
import { DefaultButton, OtpInput, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface VerifyFormProps {
  code: string;
  onChangeCode: (value: string) => void;
  phoneNumber?: string;
  remainingTime?: string;
  isExpired?: boolean;
  resetTimer: () => void;
  verifyOtpAction: () => void;
  inputStatus: "default" | "success" | "error";
  isLoading?: boolean;
}

export default function VerifyForm({
  code,
  onChangeCode,
  phoneNumber = "********",
  remainingTime = "1:00",
  isExpired = false,
  resetTimer,
  verifyOtpAction,
  inputStatus,
  isLoading,
}: VerifyFormProps) {
  const router = useRouter();
  const isComplete = code.length === 4;

  return (
    <div className="flex w-full max-w-md flex-col rounded-lg bg-white p-6 pb-6 shadow-danger sm:max-w-lg sm:p-8 md:w-[50vw] md:p-[2.5vw] md:pb-[2vw] lg:w-[40vw] xl:w-[30vw]">
      <div className="flex flex-col items-center gap-8 md:gap-[10vh]">
        <Image
          alt=""
          className="h-auto w-32 sm:w-40 md:w-[18vw]"
          height={80}
          src="/images/logo.svg"
          width={80}
        />{" "}
        <div className="flex w-full flex-col gap-4 md:gap-[2vh] md:px-[2vw]">
          <div className="flex flex-col gap-3 pb-2 md:gap-[2vh] md:pb-[1vw]">
            <Text
              color="primary"
              size="lg"
              text={text.dashboard.login.verifyCode}
              weight="bold"
            />

            {!EASY_LOGIN && (
              <Text
                color="secondary"
                size="sm"
                text={`${text.dashboard.login.codeSent} ${phoneNumber} ${text.dashboard.login.sent}`}
                weight="bold"
              />
            )}
            {EASY_LOGIN && (
              <div className="flex flex-row gap-2 rounded-sm border border-warning bg-warning/20 px-3 py-3">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-warning">
                  <ExclamationMarkIcon size="2xs" color="text-warning" />
                </span>
                <Text
                  color="secondary"
                  size="sm"
                  text="کد ورود، ۴ رقم آخر شماره موبایل شماست"
                  weight="bold"
                />
              </div>
            )}
            <div className="flex justify-center">
              <OtpInput
                length={4}
                value={code}
                onChange={onChangeCode}
                status={inputStatus}
                onEnter={() => {
                  if (isComplete && !isLoading) {
                    verifyOtpAction();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {isExpired ? (
              <button className="cursor-pointer" onClick={resetTimer}>
                <Text
                  color="secondary"
                  size="lg"
                  text={text.dashboard.login.resendCode}
                  weight="regular"
                />
              </button>
            ) : (
              <div className="flex flex-row gap-1 md:gap-[0.3vw]">
                <Text
                  text={remainingTime}
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
          <div className="flex justify-center pt-3 md:pt-[1.5vh]">
            <DefaultButton
              type="primary"
              style="fill"
              label={text.dashboard.login.submit}
              action={verifyOtpAction}
            />
          </div>
          <div
            className="flex w-full cursor-pointer items-center justify-center pt-4 text-center md:pt-[1vw]"
            onClick={() => router.push("/send-otp")}
          >
            <Text
              color="secondary"
              size="md"
              text="تغییر شماره و دریافت مجدد کد"
              weight="regular"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
