import { formatNumber } from "./format-number";

export const formatPrice = (
  price: number | string,
  withToman = true,
): string => {
  const formatted = formatNumber(price);

  return withToman ? `${formatted} تومان` : formatted;
};
