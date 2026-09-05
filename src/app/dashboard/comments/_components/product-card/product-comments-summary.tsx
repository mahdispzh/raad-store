// صفحه: dashboard/profile/comments/AddProductModal.tsx

import { Caption, Subtitle, Text } from "@/src/shared/ui";

import { ProductCommentsSummaryType } from "@/src/app/dashboard/comments/_types/product-comments.types";
import { RatingStars } from "@/src/shared/utils/rating-stars";

interface ProductCommentsSummaryProps {
  summary: ProductCommentsSummaryType;
}

export function ProductCommentsSummary({
  summary,
}: ProductCommentsSummaryProps) {
  return (
    <div className="gap-layout flex w-fit flex-col">
      <div className="border-b-2 border-danger">
        <Text text="امتیاز و دیدگاه کاربران" size="lg" weight="medium" />
      </div>

      <div className="flex items-start justify-between gap-10">
        {/* score */}
        <div className="flex items-center gap-1">
          <Subtitle text={String(summary.score)} size="2xl" weight="bold" />

          <Caption text="از 5" size="xs" weight="medium" />
        </div>

        {/* stars */}
        <div className="flex flex-col gap-3">
          <RatingStars rating={summary.rating} />

          <Caption
            text={`از مجموع ${summary.totalVotes} امتیاز`}
            size="xs"
            weight="medium"
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
}
