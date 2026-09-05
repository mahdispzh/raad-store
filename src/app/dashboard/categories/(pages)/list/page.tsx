// src/app/dashboard/categories/(pages)/page.tsx
import { Suspense } from "react";
import { CategoryTable } from "@/src/app/dashboard/categories/_components/category-table";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CategoryTable />
    </Suspense>
  );
}