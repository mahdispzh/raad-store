// RatingStars.tsx
import { OutlineStarIcon } from "@/src/shared/constants/icons/outline-star-icon";
import { SolidStarIcon } from "@/src/shared/constants/icons/solid-star-icon";

type RatingStarsProps = {
  rating: number; // 0 تا 5
  size?: "sm" | "md" | "lg";
};

export const RatingStars = ({ rating, size = "sm" }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className={"flex gap-1"}>
      {[...Array(fullStars)].map((_, index) => (
        <SolidStarIcon key={`full-${index}`} size={size} />
      ))}
      {hasHalfStar && <HalfStarIcon size={size} />}
      {[...Array(emptyStars)].map((_, index) => (
        <OutlineStarIcon key={`empty-${index}`} size={size} />
      ))}
    </div>
  );
};
