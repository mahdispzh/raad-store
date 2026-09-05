import { useAuthStore } from "@/src/shared/store/store";
import { useQuery } from "@tanstack/react-query";
import { getRecentlyBlogs } from "../_services/recently-blogs.api";

export const useRecentlyBlogs = (enabled: boolean) => {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: ["recently-blogs", userId],
    queryFn: () => getRecentlyBlogs(userId),
    enabled: enabled && !!userId,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });
};
