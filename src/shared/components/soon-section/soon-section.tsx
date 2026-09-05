"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { DefaultButton } from "@/src/shared/ui/default-button/default-button.ui";
import { Subtitle } from "../../ui";

export function ComingSoonSection() {
  const router = useRouter();

  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center justify-center px-6 py-12">
      {/* Illustration */}
      <div className="relative w-full max-w-[450px]">
        <Image
          src="/images/503.svg"
          alt="Coming Soon"
          width={500}
          height={400}
          priority
          className="h-auto w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="mt-8 flex max-w-[600px] flex-col items-center text-center">
        <Subtitle
          text="  به زودی در دسترس قرار میگیرد."
          size="3xl"
          color="primary"
          weight="bold"
        />
        <p className="text-bold mt-4 text-lg leading-relaxed text-secondary"></p>
        <Subtitle
          text=" در حال آماده‌سازی این بخش هستیم تا تجربه‌ای بهتر و کامل‌تر برای شما
          فراهم کنیم."
          size="xl"
          color="secondary"
          weight="medium"
        />
        <div className="mt-8 w-[220px]">
          <DefaultButton
            label="بازگشت به فروشگاه"
            type="secondary"
            style="fill"
            action={() => router.push("/")}
          />
        </div>
      </div>
    </section>
  );
}
