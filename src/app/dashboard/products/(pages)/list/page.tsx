// page.tsx
import { Suspense } from "react";
import { ProductTable } from "@/src/app/dashboard/products/_components/product-table";

interface Props {}

export default function Page({}: Props) {
  return (
    <Suspense fallback={null}>
      <ProductTable />
    </Suspense>
  );
}