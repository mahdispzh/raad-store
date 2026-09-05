import { apiClient, fetcher } from "@/src/shared/api/fetcher";

// ============ تایپ‌ها ============
export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  image?: string;
  status: number;
  user_id: number;
  author?: string;
  keywords?: string[];
  tags?: string[];
  publish_at?: string | null;
  rading_time?: string | null;
  created_at: string | null;
  updated_at: string | null;
  comments: number;
  likes: number;
  view: number;
  _count?: {
    liked_blogs: number;
    saved_blogs: number;
  };
}

export interface BlogsResponse {
  data: Blog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

// ============ دریافت بلاگ‌های محافظت‌شده ============
// اصلاح تابع موجود؛ بقیه‌ی فایل دست‌نخورده می‌مونه
export const getProtectedBlogs = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
}): Promise<BlogsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.status && params.status !== "all") queryParams.append("status", params.status);

  const url = `/protected/blogs${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  return fetcher<BlogsResponse>(() => apiClient.get(url));
};
// ============ ✅ اضافه کردن تابع ایجاد بلاگ جدید ============
export const createBlog = (formData: FormData) => {
  return fetcher<Blog>(() => apiClient.post("/protected/blogs", formData));
};

// ============ دریافت یک بلاگ با slug ============
export const getPublicBlogBySlug = async (slug: string) => {
  return fetcher<any>(() => apiClient.get(`/public/blogs/${slug}`));
};

// ============ حذف بلاگ ============
export const deleteBlog = (slug: string) => {
  return fetcher<any>(() => apiClient.delete(`/protected/blogs/${slug}`));
};

// ============ ویرایش بلاگ ============
export const updateBlog = (slug: string, formData: FormData) => {
  return fetcher<Blog>(() =>
    apiClient.put(`/protected/blogs/${slug}`, formData),
  );
};
