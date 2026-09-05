// src/app/(landing)/blogs/loading.tsx
import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { BlogsListSkeleton } from "../_components/skeleton/blogs-list-skeleton.ui";

export default function Loading() {
  return (
    <DashboardContainer>
      <BlogsListSkeleton />
    </DashboardContainer>
  );
}
