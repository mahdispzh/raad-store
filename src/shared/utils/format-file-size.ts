import { toPersianDigits } from "@/src/shared/utils/digits";

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return "۰ بایت";
  }

  const k = 1024;

  const sizes = ["بایت", "کیلوبایت", "مگابایت", "گیگابایت"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(1));

  return `${toPersianDigits(size)} ${sizes[i]}`;
};
