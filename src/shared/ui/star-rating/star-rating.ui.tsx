import { OutlineStarIcon } from "@/src/shared/constants/icons/outline-star-icon";
import { SolidStarIcon } from "@/src/shared/constants/icons/solid-star-icon";
import type { StarRatingProps } from "./star-rating.types";
import { useStarRating } from "./useStarRating";

export function StarRating({ value, size = "sm", max = 5 }: StarRatingProps) {
  const { fullStars, emptyStars } = useStarRating(value, max);

  return (
    <div className="flex flex-row">
      {Array.from({ length: fullStars }).map((_, i) => (
        <SolidStarIcon key={`full-${i}`} size={size} />
      ))}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <OutlineStarIcon key={`empty-${i}`} size={size} />
      ))}
    </div>
  );
}
