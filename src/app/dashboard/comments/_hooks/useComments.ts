import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentKeys } from "../_lib/comment-keys";
import { commentsApi } from "../_services/comments.api";

export function useCommentsList(page = 1, limit = 10, status?: string) {
  return useQuery({
    queryKey: commentKeys.list(page, limit, status),
    queryFn: () => commentsApi.getAll(page, limit, status),
  });
}

export function useUpdateCommentStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) =>
      commentsApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => commentsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.all });
    },
  });
}
