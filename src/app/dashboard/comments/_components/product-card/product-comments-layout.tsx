// صفحه: dashboard/profile/comments/AddProductModal.tsx

import {
  CommentedProductType,
  ProductCommentType,
} from "@/src/app/dashboard/comments/_types/product-comments.types";
import { CommentedProductCard } from "./commented-product-card";
import { ProductCommentsList } from "./product-comments-list";

interface ProductCommentsLayoutProps {
  comments: ProductCommentType[];
  product: CommentedProductType;
}

export function ProductCommentsLayout({
  comments,
  product,
}: ProductCommentsLayoutProps) {
  return (
    <div className="menu-item-padding menu-item-border flex overflow-hidden">
      <div className="gap-layout flex h-full min-h-0 w-full items-start">
        {/* comments */}
        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-auto border-l-2 border-gray px-4">
          <ProductCommentsList comments={comments} />
        </div>

        {/* product */}
        <CommentedProductCard product={product} />
      </div>
    </div>
  );
}
