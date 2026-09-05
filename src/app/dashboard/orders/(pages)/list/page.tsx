// page.tsx
"use client";

import { Pagination } from "@/src/shared/ui/pagination/pagination.ui";
import { useState } from "react";
import { FactorsTable } from "../../_components/factor-table.ui";
import { DEFAULT_PAGE_SIZE } from "../../_constants/factors.constants";
import { useDashboardFactors } from "../../_hooks/useDashboardFactors";

export default function DashboardFactors() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useDashboardFactors(
    page,
    DEFAULT_PAGE_SIZE,
  );

  const factors = data?.data || [];
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center text-red-500">
        خطا در دریافت فاکتورها: {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="h-auto w-full overflow-x-auto rounded-xs">
        <FactorsTable factors={factors} />
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </>
  );
}
