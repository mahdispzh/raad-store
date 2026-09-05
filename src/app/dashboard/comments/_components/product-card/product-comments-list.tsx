// صفحه: dashboard/profile/comments/AddProductModal.tsx

import { Text } from "@/src/shared/ui";

import { ProductCommentType } from "@/src/app/dashboard/comments/_types/product-comments.types";
import { ProductCommentCard } from "./product-comment-card";

interface ProductCommentsListProps {
  comments: ProductCommentType[];
}

export function ProductCommentsList({ comments }: ProductCommentsListProps) {
  if (!comments.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <Text
          text="هنوز دیدگاهی برای این محصول ثبت نشده است"
          size="sm"
          color="secondary"
        />
      </div>
    );
  }

  return (
    <>
      {comments.map((comment, index) => (
        <ProductCommentCard
          key={comment.id}
          comment={comment}
          isLast={index === comments.length - 1}
        />
      ))}
    </>
  );
}
