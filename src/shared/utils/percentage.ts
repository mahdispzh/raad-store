import { toPersianDigits } from "./digits";

export const formatPercentage = (value: number): string => {
  return `${toPersianDigits(value)}٪`;
};
