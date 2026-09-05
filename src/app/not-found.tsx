"use client";

import { StatusPage } from "@/src/shared/components/status-page/status-page";
import { DefaultButton } from "@/src/shared/ui";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <StatusPage
      image="/images/page-not-found.svg"
      title="صفحه پیدا نشد."
      description="متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده یا آدرس آن تغییر کرده است."
      imageWidth={300}
      imageHeight={225}
    >
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
    </StatusPage>
  );
}
