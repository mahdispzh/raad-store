// /dashboard/colors/page.tsx
import { Suspense } from "react";
import { ColorsTable } from "@/src/app/dashboard/colors/_components/colors-table";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ColorsTable />
    </Suspense>
  );
}