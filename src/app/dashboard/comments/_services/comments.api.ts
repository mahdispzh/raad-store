import { apiClient } from "@/src/shared/api/client";
import { fetcher } from "@/src/shared/api/fetcher";
import { CommentsListResponse } from "../_types/comment.type";
// comment.type.ts
export interface CommentUser {
  id: number;
  name: string | null;
}

export interface CommentDetail {
  id: number;
  product_id: number;
  parent_id: number | null;
  text: string;
  created_at: string;
  user_id: number;
  isUnknown: boolean | null;
  status: number | null;
  users: CommentUser;
  products: {
    id: number;
    slug: string;
    name: string;
    description: string;
    images: string[];
    // سایر فیلدهای مورد نیاز
  };
}
// این تایپ برای پاسخ API محصولاته (هرچیزی که API products برمیگردونه)
export interface ProductDetailResponse {
  id: number;
  name: string;
  slug: string;
  description: string;
  images: string[];
  // هر فیلد دیگه‌ای که API محصولات برمیگردونه رو اینجا اضافه کن
  // مثلاً:
  price?: number;
  status?: number;
  comments?: Array<{
    id: number;
    text: string;
    created_at: string;
    users: { id: number; name: string | null };
    // ...
  }>;
  ratings?: Array<{ rating: number }>;
  likesCount?: number;
  // ...
}
export interface CommentDetailResponse {
  comment: CommentDetail;
  product: CommentDetail["products"];
}

export const commentsApi = {
  getAll: (page: number, limit: number, status?: string) =>
    fetcher<CommentsListResponse>(() =>
      apiClient.get("protected/comments", {
        params: {
          page,
          limit,
          ...(status && status !== "all" ? { status } : {}),
        },
      }),
    ),

  // ✅ متد جدید برای دریافت جزئیات کامنت با شناسه
  getById: (commentId: number) =>
    fetcher<CommentDetailResponse>(() =>
      apiClient.get(`protected/comments/${commentId}`),
    ),

  getProductBySlug: (slug: string) =>
    fetcher<ProductDetailResponse>(
      () => apiClient.get(`protected/products/${slug}`), // ← مسیر API محصولات
    ),
  updateStatus: (commentId: number, status: number) =>
    fetcher<{ success: boolean }>(() =>
      apiClient.put("protected/comments", { commentId, status }),
    ),

  remove: (id: number) =>
    fetcher<{ success: boolean }>(() =>
      apiClient.delete(`protected/comments/${id}`),
    ),
};
