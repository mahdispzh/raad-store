import { useQuery } from "@tanstack/react-query";
import { getMyComments } from "../services/comment.api";

export const COMMENTS_QUERY_KEY = ["my-comments"];

export const useComments = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: COMMENTS_QUERY_KEY,
    queryFn: getMyComments,
    staleTime: 5 * 60 * 1000,
  });

  return {
    comments: data?.data || [],
    isLoading,
    error,
  };
};