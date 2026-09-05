import { useQuery } from "@tanstack/react-query";
import { BlogsResponse, getProtectedBlogs } from "../_services/blog.api";
import { blogKeys } from "../_lib/blog-keys";

export const useDashboardBlogs = (
  page: number = 1,
  limit: number = 10,
  status?: string,
) => {
  const query = useQuery<BlogsResponse, Error>({
    queryKey: blogKeys.list(page, limit, status),
    queryFn: () => getProtectedBlogs({ page, limit, ...(status ? { status } : {}) }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};