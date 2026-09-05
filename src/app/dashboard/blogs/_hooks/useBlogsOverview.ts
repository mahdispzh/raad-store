import { useQuery } from "@tanstack/react-query";
import { getBlogsOverview } from "../_services/blogs-overview.api";

export function useBlogsOverview() {
  return useQuery({
    queryKey: ["blogsOverview"],
    queryFn: getBlogsOverview,
    staleTime: 5 * 60 * 1000,
  });
}