import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface ToggleLikeProductResponse {
  liked: boolean;
  likesCount: number;
}

// ============ toggle لایک/آنلایک محصول ============
export const toggleLikeProduct = (slug: string) => {
  return fetcher<ToggleLikeProductResponse>(() =>
    apiClient.post(`/protected/products/${slug}/like`, {}),
  );
};
