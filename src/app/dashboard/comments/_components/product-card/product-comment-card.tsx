// صفحه: dashboard/profile/comments/AddProductModal.tsx

import { TrashIcon } from "@/src/shared/constants/icons/trash-icon";

import { RatingStars } from "@/src/shared/utils/rating-stars";

import { Caption, Text } from "@/src/shared/ui";

import { ProductCommentType } from "@/src/app/dashboard/comments/_types/product-comments.types";
import { Dot } from "@/src/shared/ui/dot/dot.ui";

interface ProductCommentCardProps {
  comment: ProductCommentType;
  isLast?: boolean;
}

export function ProductCommentCard({
  comment,
  isLast,
}: ProductCommentCardProps) {
  return (
    <div className={`shrink-0 py-5 ${!isLast ? "border-b-2 border-gray" : ""}`}>
      <div className="gap-layout flex flex-col">
        <div className="flex w-full justify-between gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Text text={comment.username} size="md" weight="bold" />

            <Dot size="sm" />
          </div>

          <Caption text={comment.date} size="xs" color="primary" />
        </div>

        <div className="flex items-center gap-2">
          <RatingStars rating={comment.rating} />

          <Dot size="sm" />
        </div>

        <Text text={comment.text} size="md" weight="regular" />

        <div className="gap-layout flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center gap-1">
              <RulerIcon size="md" />

              <Caption text={comment.size} size="xs" />
            </div>

            <div className="flex items-center gap-1">
              <Dot size="md" />

              <Caption text={comment.color} size="xs" />
            </div> */}
          </div>

          <button>
            <TrashIcon size="md" />
          </button>
        </div>
      </div>
    </div>
  );
}
