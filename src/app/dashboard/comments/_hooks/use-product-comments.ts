import {
  COMMENTED_PRODUCT_DATA,
  PRODUCT_COMMENTS_DATA,
  PRODUCT_COMMENTS_SUMMARY_DATA,
} from "@/src/app/dashboard/comments/_constants/product-comments.constants";

export function useProductComments() {
  return {
    comments: PRODUCT_COMMENTS_DATA,
    product: COMMENTED_PRODUCT_DATA,
    summary: PRODUCT_COMMENTS_SUMMARY_DATA,
  };
}
