"use client";

import text from "@/src/shared/constants/texts/texts.json";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { CloseModalIcon } from "../../constants/icons";
import { DefaultButton, Modal, Text } from "../../ui";
import { logoutService } from "../logout/logout.api";

interface LogoutProps {
  trigger?: ReactNode;
}

export function Logout({ trigger }: LogoutProps) {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      console.log("✅ در حال ارسال درخواست خروج...");

      // فراخوانی سرویس خروج کامل (شامل پاک کردن store و توکن‌ها)
      await logoutService.fullLogout();

      console.log("✅ خروج با موفقیت انجام شد");

      // بستن مودال
      setIsShow(false);

      // هدایت به صفحه اصلی
      router.push("/home");
    } catch (error) {
      console.error("❌ خطا در خروج:", error);
      // می‌توانید یک پیام خطا به کاربر نشان دهید
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* تریگر باز کردن مودال */}
      {trigger ? (
        <div onClick={() => setIsShow(true)}>{trigger}</div>
      ) : (
        <button onClick={() => setIsShow(true)}>خروج از حساب</button>
      )}

      <Modal isOpen={isShow} onClose={() => setIsShow(false)}>
        <div className="flex h-auto w-[30vw] flex-col items-center justify-center gap-[3.5vw] rounded-sm bg-white px-[1vw] py-[1.5vw] text-center">
          <div className="flex w-full flex-col gap-[1.7vw]">
            <div className="flex w-full justify-between border-b border-gray pb-[0.7vw]">
              <Text
                color="primary"
                size="lg"
                text={text.dashboard.logout.title}
                weight="bold"
              />
              <div onClick={() => setIsShow(false)} className="cursor-pointer">
                <CloseModalIcon size="md" />
              </div>
            </div>

            <Text
              color="primary"
              size="md"
              text={text.dashboard.logout.description}
              weight="regular"
            />
          </div>

          <div className="flex flex-row gap-[0.5vw]">
            <DefaultButton
              label={text.dashboard.logout.cancel}
              style="outline"
              type="primary"
              action={() => setIsShow(false)}
              disabled={isLoading}
            />

            <DefaultButton
              label={
                isLoading ? "در حال خروج..." : text.dashboard.logout.submit
              }
              style="fill"
              type="primary"
              action={handleLogout}
              disabled={isLoading}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
