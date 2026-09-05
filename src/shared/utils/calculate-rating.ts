import { toPersianDigits } from "@/src/shared/utils/digits";

export const calculateRating = (rating: number, totalReviews = 0): string => {
  const rounded = rating.toFixed(1);

  return totalReviews
    ? `${toPersianDigits(rounded)} (${toPersianDigits(totalReviews)} نظر)`
    : toPersianDigits(rounded);
};
