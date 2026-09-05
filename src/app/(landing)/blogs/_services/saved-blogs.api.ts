import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { BlogsResponse } from "./blog.api";

// ============ toggle ذخیره/حذف بلاگ ============
export const toggleSaveBlog = (slug: string) => {
  return fetcher<{ saved: boolean }>(() =>
    apiClient.post("/protected/blogs/saved", { slug }),
  );
};

// ============ گرفتن لیست بلاگ‌های ذخیره‌شده‌ی کاربر ============
export const getSavedBlogs = (params?: {
  page?: number;
  limit?: number;
}): Promise<BlogsResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const url = `/protected/blogs/saved${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;

  return fetcher<BlogsResponse>(() => apiClient.get(url));
};
