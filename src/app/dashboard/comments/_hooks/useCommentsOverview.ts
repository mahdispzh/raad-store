// src/app/dashboard/comments/_hooks/useCommentsOverview.ts
import { useQuery } from "@tanstack/react-query";
import { getCommentsOverview } from "../_services/comments-overview.api";

export function useCommentsOverview() {
  return useQuery({
    queryKey: ["commentsOverview"],
    queryFn: getCommentsOverview,
    staleTime: 5 * 60 * 1000,
  });
}