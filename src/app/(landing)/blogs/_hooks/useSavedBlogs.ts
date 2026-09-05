import { useQuery } from "@tanstack/react-query";
import { getSavedBlogs } from "../_services/saved-blogs.api";

export const useSavedBlogs = (
  enabled: boolean,
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: ["saved-blogs", { page, limit }],
    queryFn: () => getSavedBlogs({ page, limit }),
    enabled,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};
