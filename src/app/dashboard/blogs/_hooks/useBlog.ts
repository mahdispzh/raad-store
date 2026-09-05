import { useQuery } from "@tanstack/react-query";
import { getPublicBlogBySlug } from "../_services/blog.api";

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getPublicBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
