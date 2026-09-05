import { CommentsTable } from "@/src/app/dashboard/comments/_components/comments-table";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CommentsTable />
    </Suspense>
  );
}
