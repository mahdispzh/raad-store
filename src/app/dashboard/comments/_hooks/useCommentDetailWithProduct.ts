import { useEffect, useState } from "react";
import {
  CommentDetail,
  commentsApi,
  ProductDetailResponse,
} from "../_services/comments.api";

export function useCommentDetailWithProduct(commentId?: string | number) {
  const [comment, setComment] = useState<CommentDetail | null>(null);
  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const id = commentId ? Number(commentId) : undefined;

  useEffect(() => {
    if (!id) {
      setComment(null);
      setProduct(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // مرحله 1: دریافت کامنت و گرفتن slug محصول
        const commentData = await commentsApi.getById(id);

        if (!isMounted) return;
        setComment(commentData.comment);

        // مرحله 2: اگر slug وجود داشت، برو اطلاعات کامل محصول رو بگیر
        if (commentData.product?.slug) {
          const productData = await commentsApi.getProductBySlug(
            commentData.product.slug,
          );
          if (isMounted) {
            setProduct(productData);
          }
        } else {
          throw new Error("slug محصول پیدا نشد");
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("خطای ناشناخته"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return {
    comment,
    product, // ← اینجا اطلاعات کامل محصول هست (با لیست کامنت‌ها و ...)
    isLoading,
    error,
  };
}
