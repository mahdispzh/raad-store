import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { CommentsResponse } from "../types/comment.types";

export const getMyComments = async (): Promise<CommentsResponse> => {
  return fetcher<CommentsResponse>(() =>
    apiClient.get("protected/comments?limit=50"),
  );
};