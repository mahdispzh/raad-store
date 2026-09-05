import { toPersianDigits } from "@/src/shared/utils/digits";

export const timeAgo = (date: Date | string): string => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  const intervals: [string, number][] = [
    ["سال", 31536000],
    ["ماه", 2592000],
    ["روز", 86400],
    ["ساعت", 3600],
    ["دقیقه", 60],
  ];

  for (const [label, sec] of intervals) {
    const count = Math.floor(seconds / sec);

    if (count >= 1) {
      return `${toPersianDigits(count)} ${label} پیش`;
    }
  }

  return "همین الان";
};
