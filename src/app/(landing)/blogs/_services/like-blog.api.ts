import { apiClient, fetcher } from "@/src/shared/api/fetcher";

// ============ toggle لایک/آنلایک بلاگ ============
export const toggleLikeBlog = (slug: string) => {
  return fetcher<{ liked: boolean }>(() =>
    apiClient.post("/protected/blogs/like", { slug }),
  );
};
