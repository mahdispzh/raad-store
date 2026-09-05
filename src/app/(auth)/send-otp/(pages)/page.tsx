"use client";
import LoginForm from "../components/login-form";
import { useSendOtp } from "../hooks/useSendOtp";

export default function SendOtp() {
  const { sendOtpAction, phone, changePhone } = useSendOtp();
  console.log("send-otp loaded!");
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white px-4 py-8">
      <LoginForm
        changePhone={changePhone}
        phone={phone}
        sendOtpAction={sendOtpAction}
      />
    </div>
  );
}
