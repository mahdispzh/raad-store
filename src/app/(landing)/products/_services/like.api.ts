// src/app/(landing)/products/_services/like.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface LikeResponse {
  liked: boolean;
  likesCount: number;
}

export const toggleLike = async (productId: number): Promise<LikeResponse> => {
  return fetcher<LikeResponse>(() =>
    apiClient.post(`/protected/products/${productId}/like`),
  );
};
