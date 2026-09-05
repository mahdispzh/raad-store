// _components/transactions-table.tsx
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge, Subtitle, Text } from "@/src/shared/ui";
import { SimpleButton } from "@/src/shared/ui/simple-button/simple-button.ui";
import {
  DynamicTable,
  TableColumn,
  TableText,
} from "@/src/shared/ui/dynamic-table/dynamic-table.ui";
import { usePaymentsList } from "../_hooks/usePayments";
import { PaymentRow } from "../_services/payments.api";

function ChevronLeftIcon({ className }: { className?: string }) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

const STATUS_MAP: Record<
  number,
  { label: string; color: "success" | "danger" | "warning" | "gray" }
> = {
  0: { label: "در انتظار", color: "warning" },
  1: { label: "پرداخت موفق", color: "success" },
  2: { label: "پرداخت ناموفق", color: "danger" },
  3: { label: "نامشخص", color: "gray" },
};

export function TransactionsTable() {
  const router = useRouter();
  const { data, isLoading } = usePaymentsList({ page: 1, limit: 10 });
  const rows = data?.data ?? [];

  const handleNavigateToAll = useCallback(() => {
    router.push("/dashboard/payments/all");
  }, [router]);

  const handleRowClick = useCallback(
    (row: PaymentRow) => router.push(`/dashboard/payments/${row.id}`),
    [router],
  );

  const columns: TableColumn<PaymentRow>[] = [
    {
      key: "id",
      header: "شناسه پرداخت",
      render: (row) => <TableText text={String(row.id)} />,
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
    <div className="flex h-auto w-full flex-col gap-4 rounded-sm bg-pure-white p-4 shadow-xl">
      <div className="flex flex-row items-start justify-between px-2 pt-2">
        <div className="text-right">
          <Subtitle text="تراکنش‌ها" size="2xl" color="primary" weight="bold" />
          <div className="pt-1">
            <Text
              text="تراکنش‌های اخیر شما"
              size="sm"
              color="secondary"
              weight="regular"
            />
          </div>
        </div>
        <div className="flex items-end">
          <SimpleButton
            label="مشاهده همه تراکنش‌ها"
            icon={<ChevronLeftIcon className="h-4 w-4" />}
            iconPosition="right"
            variant="secondary"
            action={handleNavigateToAll}
          />
        </div>
      </div>

      {!isLoading && rows.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Text
            text="تراکنشی یافت نشد"
            size="sm"
            color="secondary"
            weight="regular"
          />
        </div>
      ) : (
        <DynamicTable
          columns={columns}
          rows={rows}
          selectable={false}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
}