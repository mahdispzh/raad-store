"use client";

import { DefaultButton, Subtitle, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

type EmptyStateProps = {
  label: string;
  text: string;
};

export function EmptyState({ label, text }: EmptyStateProps) {
  const router = useRouter();

  const isNotification = label === "هنوز پیامی دریافت نکرده‌اید.";

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isNotification ? "mt-20 gap-4" : "mt-6 gap-8"
      }`}
    >
      <Image
        src={
          isNotification
            ? "/images/empty-tickets.svg"
            : "/images/empty-wishlist.svg"
        }
        alt="empty-state"
        width={300}
        height={225}
        className={`h-auto object-cover transition-transform hover:scale-105 ${
          isNotification ? "w-[400px]" : "w-[250px]"
        }`}
      />

      <div
        className={`flex flex-col items-center justify-center gap-6 ${
          isNotification ? "w-[310px]" : "w-[400px]"
        }`}
      >
        <Subtitle text={label} size="xl" weight="medium" />

        <Text text={text} size="md" weight="regular" />

        <div className="flex w-full flex-row gap-2">
          <DefaultButton
            type="primary"
            style="fill"
            label="بازگشت به صفحه اصلی"
            action={() => router.push("/")}
          />

          <DefaultButton
            type="primary"
            style="outline"
            label="مشاهده محصولات"
            action={() => router.push("/products")}
          />
        </div>
      </div>
    </div>
  );
}
