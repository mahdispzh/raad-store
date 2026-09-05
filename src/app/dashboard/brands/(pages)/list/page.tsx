// src/app/dashboard/brands/page.tsx
import { Suspense } from "react";
import { BrandsTable } from "@/src/app/dashboard/brands/_components/BrandsTable";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BrandsTable />
    </Suspense>
  );
}