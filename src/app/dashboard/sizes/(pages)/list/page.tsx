// src/app/dashboard/sizes/page.tsx
import { Suspense } from "react";
import { SizesTable } from "@/src/app/dashboard/sizes/_components/SizesTable";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SizesTable />
    </Suspense>
  );
}