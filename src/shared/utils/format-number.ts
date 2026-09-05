import { toEnglishDigits, toPersianDigits } from "./digits";

export const formatNumber = (
  value: string | number,
  persian = true,
): string => {
  const en = toEnglishDigits(String(value));

  const formatted = Number(en).toLocaleString("en-US");

  return persian ? toPersianDigits(formatted) : formatted;
};
