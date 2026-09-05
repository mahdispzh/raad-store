"use client";

import { StatusPage } from "@/src/shared/components/status-page/status-page";
import { DefaultButton } from "@/src/shared/ui";
import { useRouter } from "next/navigation";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  const router = useRouter();

  return (
    <StatusPage
      image="/images/internal-server-Error.svg"
      title="مشکلی پیش آمده است."
      description="متأسفانه در پردازش درخواست شما مشکلی رخ داده است. لطفاً چند دقیقه دیگر دوباره تلاش کنید."
      imageWidth={300}
      imageHeight={225}
    >
      <DefaultButton
        type="primary"
        style="fill"
        label="تلاش مجدد"
        action={reset}
      />

      <DefaultButton
        type="primary"
        style="outline"
        label="بازگشت به صفحه اصلی"
        action={() => router.push("/")}
      />
    </StatusPage>
  );
}
