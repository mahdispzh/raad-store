// _components/all-transactions-table.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBadge } from "@/src/shared/ui";
import { Pagination } from "@/src/shared/ui/pagination/pagination.ui";
import {
  DynamicTable,
  TableColumn,
  TableText,
} from "@/src/shared/ui/dynamic-table/dynamic-table.ui";
import { usePaymentsList } from "../_hooks/usePayments";
import { PaymentRow, PaymentsFilters } from "../_services/payments.api";
import {
  TransactionsFilterModal,
  type TransactionsFilters,
} from "./transactions-filter-modal.ui";

const LIMIT = 10;

const STATUS_MAP: Record<
  number,
  { label: string; color: "success" | "danger" | "warning" | "gray" }
> = {
  0: { label: "در انتظار", color: "warning" },
  1: { label: "پرداخت موفق", color: "success" },
  2: { label: "پرداخت ناموفق", color: "danger" },
  3: { label: "نامشخص", color: "gray" },
};

const STATUS_VALUE_MAP: Record<
  Exclude<TransactionsFilters["status"], "all">,
  number
> = {
  success: 1,
  failed: 2,
  pending: 0,
  unknown: 3,
};

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function AllTransactionsTable() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [apiFilters, setApiFilters] = useState<
    Omit<PaymentsFilters, "page" | "limit">
  >({});

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  const { data, isLoading } = usePaymentsList({
    ...apiFilters,
    page,
    limit: LIMIT,
  });

  const rows = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const handleRowClick = (row: PaymentRow) => {
    router.push(`/dashboard/payments/${row.id}`);
  };

  const handleApplyFilters = (nextFilters: TransactionsFilters) => {
    const newApiFilters: Omit<PaymentsFilters, "page" | "limit"> = {};

    if (nextFilters.statusEnabled && nextFilters.status !== "all") {
      const mapped = STATUS_VALUE_MAP[nextFilters.status];
      if (mapped != null) newApiFilters.status = mapped;
    }

    if (nextFilters.dateEnabled) {
      if (nextFilters.fromDate) newApiFilters.fromDate = nextFilters.fromDate;
      if (nextFilters.toDate) newApiFilters.toDate = nextFilters.toDate;
    }

    if (nextFilters.amountEnabled) {
      if (nextFilters.amountFrom.trim()) {
        const num = Number(nextFilters.amountFrom.replace(/,/g, ""));
        if (!isNaN(num)) newApiFilters.minAmount = num;
      }
      if (nextFilters.amountTo.trim()) {
        const num = Number(nextFilters.amountTo.replace(/,/g, ""));
        if (!isNaN(num)) newApiFilters.maxAmount = num;
      }
    }

    setApiFilters(newApiFilters);
    setPage(1);
  };

  const columns: TableColumn<PaymentRow>[] = [
    {
      key: "id",
      header: "شناسه پرداخت",
      render: (row) => <TableText text={`#${row.id}`} />,
    },
    {
      key: "amount",
      header: "مبلغ (ریال)",
      render: (row) => (
        <TableText text={row.amount.toLocaleString("fa-IR")} />
      ),
    },
    {
      key: "description",
      header: "توضیحات",
      render: (row) => (
        <div className="flex flex-col items-center gap-1">
          <TableText text="خرید" />
          <TableText
            text={`به شماره سفارش: ${row.order_id}`}
            size="sm"
            color="secondary"
          />
        </div>
      ),
    },
    {
      key: "date",
      header: "تاریخ و ساعت",
      render: (row) => {
        const date = new Date(row.created_at).toLocaleDateString("fa-IR");
        const time = new Date(row.created_at).toLocaleTimeString("fa-IR");
        return (
          <div className="flex flex-col items-center gap-1">
            <TableText text={date} />
            <TableText text={time} size="sm" color="secondary" />
          </div>
        );
      },
    },
    {
      key: "status",
      header: "وضعیت",
      render: (row) => {
        const s = STATUS_MAP[row.status] ?? STATUS_MAP[3]!;
        return <StatusBadge text={s.label} color={s.color} />;
      },
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={rows}
        selectable={false}
        onRowClick={handleRowClick}
        actions={[
          {
            icon: <FilterIcon className="h-4 w-4" />,
            onClick: () => setIsFilterOpen(true),
          },
        ]}
      />

      {!isLoading && meta && meta.total > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      <TransactionsFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />
    </>
  );
}