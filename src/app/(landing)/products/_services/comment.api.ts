import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface AddCommentPayload {
  product_id: number;
  text: string;
  parent_id?: number | null;
  isUnknown?: boolean;
}

export interface CommentResponse {
  success: boolean;
  data: {
    id: number;
    product_id: number;
    parent_id: number | null;
    text: string;
    user_id: number;
    isUnknown: boolean;
    status: number;
    created_at: string;
    users: {
      id: number;
      name: string | null;
    };
  };
}

export const addComment = async (
  payload: AddCommentPayload,
): Promise<CommentResponse> => {
  return fetcher<CommentResponse>(() =>
    apiClient.post("/protected/comments", payload),
  );
};
