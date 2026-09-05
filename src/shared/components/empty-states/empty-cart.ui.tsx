"use client";

import { DefaultButton, Subtitle, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4">
      <Image
        src="http://localhost:3006/images/empty-cart.svg"
        alt="404"
        width={300}
        height={225}
        className="h-auto w-[250px] object-cover transition-transform hover:scale-105"
      />

      <div className="flex w-[350px] flex-col items-center justify-center gap-6">
        <Subtitle text="سبد خرید شما خالی است." size="xl" weight="medium" />

        <Text
          text="هنوز محصولی به سبد خرید خود اضافه نکرده‌اید. از محصولات ما دیدن کنید و خرید خود را آغاز کنید."
          size="md"
          weight="regular"
        />

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
