// src/app/dashboard/blogs/page.tsx
import { Suspense } from "react";
import { BlogsTable } from "../../_components/blogs-table";

export default function DashboardBlog() {
  return (
    <Suspense fallback={null}>
      <BlogsTable />
    </Suspense>
  );
}