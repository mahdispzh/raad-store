// کارت نمایش یک ویژگی محصول (عنوان و مقدار) در بخش ProductInfo.

import { Caption, Text } from "@/src/shared/ui";
import { FeatureCardProps } from "../_types/landing-product.types";

export function FeatureCard({ title, value }: FeatureCardProps) {
  return (
    <div className="flex h-auto min-h-15 w-full flex-col gap-1 rounded-sm bg-accent p-4 shadow-md md:gap-[0.3vw] md:p-[2vw] lg:p-[0.5vw]">
      <Caption text={title} size="xs" weight="medium" color="primary" />
      <Text text={value} size="sm" weight="medium" color="black" />
    </div>
  );
}
