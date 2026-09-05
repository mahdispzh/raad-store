import {
  CommentDetailResponse,
  commentsApi,
} from "@/src/app/dashboard/comments/_services/comments.api";
import { useEffect, useState } from "react";

export function useCommentDetail(commentId?: string | number) {
  const [data, setData] = useState<CommentDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const id = commentId ? Number(commentId) : undefined;

  useEffect(() => {
    // اگر شناسه وجود نداشت، کاری نکن
    if (!id) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true; // برای جلوگیری از آپدیت state بعد از unmount

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await commentsApi.getById(id);
        if (isMounted) {
          setData(result);
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

    // Cleanup: جلوگیری از آپدیت state بعد از unmount
    return () => {
      isMounted = false;
    };
  }, [id]); // هر بار که id تغییر کند، دوباره اجرا می‌شود

  return {
    comment: data?.comment || null,
    product: data?.product || null,
    isLoading,
    error,
    // در صورت نیاز، تابعی برای ری‌فرش دستی
    refetch: () => {
      // می‌توانید یک state trigger اضافه کنید
      // یا به سادگی useEffect دوباره اجرا می‌شود اگر id تغییر کند
    },
  };
}
