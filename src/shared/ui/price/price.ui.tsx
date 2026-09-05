// ui/price.ui.tsx
import { TomanIcon } from "@/src/shared/constants/icons/toman-icon";
import { sizeToTextClass } from "./price.constants";
import type { PriceProps } from "./price.types";
import { usePrice } from "./usePrice";

export function Price({ price, discount, size = "md" }: PriceProps) {
  const {
    format,
    hasDiscount,
    discountedPrice,
    mainTextClass,
    mainIconSize,
    strikethroughTextClass,
    strikethroughIconSize,
  } = usePrice(price, discount, size);

  // حالت ناموجود
  if (price === undefined || price === null) {
    return (
      <div className="flex items-center justify-end gap-1">
        <span
          className={`${sizeToTextClass[size]} text-medium mt-2 text-danger`}
        >
          ناموجود
        </span>
      </div>
    );
  }

  // حالت بدون تخفیف
  if (!hasDiscount) {
    return (
      <div className="flex items-center justify-end gap-1">
        <span className={`${mainTextClass} mt-2 text-primary`}>
          {format(price)}
        </span>
        <TomanIcon size={mainIconSize} />
      </div>
    );
  }

  // حالت با تخفیف
  return (
    <div className="flex flex-col items-end gap-0">
      <div className="flex items-center gap-1">
        <span className={`${mainTextClass} mt-2 text-primary`}>
          {format(discountedPrice)}
        </span>
        <TomanIcon size={mainIconSize} />
      </div>

      <div className="relative flex w-fit items-center gap-1">
        <div className="absolute top-1/2 right-0 left-0 h-px bg-gray-400" />
        <span className={`${strikethroughTextClass} text-medium text-gray`}>
          {format(price)}
        </span>
        <TomanIcon size={strikethroughIconSize} color="text-gray" />
      </div>
    </div>
  );
}
