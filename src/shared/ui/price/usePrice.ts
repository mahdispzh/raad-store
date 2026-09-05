// _hooks/use-price.ts

import {
  getMainIconSize,
  getStrikethroughIconSize,
  getStrikethroughTextClass,
  sizeToTextClass,
} from "./price.constants";
import { SizeType } from "./price.types";

// هوک مدیریت منطق قیمت
export function usePrice(
  price?: number,
  discount?: number,
  size: SizeType = "md",
) {
  const format = (value: number) => value.toLocaleString("fa-IR");

  const hasDiscount = discount !== undefined;
  const discountedPrice = hasDiscount
    ? price! - price! * ((discount ?? 0) / 100)
    : 0;

  const mainTextClass = `${sizeToTextClass[size]} text-medium`;
  const mainIconSize = getMainIconSize(size);
  const strikethroughTextClass = getStrikethroughTextClass(size);
  const strikethroughIconSize = getStrikethroughIconSize(size);

  return {
    format,
    hasDiscount,
    discountedPrice,
    mainTextClass,
    mainIconSize,
    strikethroughTextClass,
    strikethroughIconSize,
  };
}
