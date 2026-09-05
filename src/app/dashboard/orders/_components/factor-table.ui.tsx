"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Text } from "@/src/shared/ui";
import { Factor } from "../_types/factors.types";
import { formatDate, formatAmount } from "../_utils/factors.utils";
import { getStatusInfo } from "../_constants/status-icons";
import { DynamicTable, TableColumn } from "@/src/shared/ui/dynamic-table/dynamic-table.ui";

interface FactorsTableProps {
  factors: Factor[];
}

export function FactorsTable({ factors }: FactorsTableProps) {
  const router = useRouter();

  const columns: TableColumn<Factor>[] = [
    {
      key: "image",
      header: "عکس",
      render: (factor) => (
        <div className="relative mx-auto h-20 w-18 overflow-hidden rounded-sm bg-gray-100">
          <Image
            src={factor.image || "/images/image32.svg"}
            alt={factor.title}
            fill
            sizes="70px"
            className="object-cover"
          />
        </div>
      ),
    },
    {
      key: "factor_number",
      header: "فاکتور",
      render: (factor) => <Text text={`${factor.factor_number}`} size="sm" weight="medium" align="center" />,
    },
    {
      key: "amount",
      header: "مبلغ",
      render: (factor) => <Text text={formatAmount(factor.amount)} size="sm" weight="medium" align="center" />,
    },
    {
      key: "discounted_amount",
      header: "مبلغ بعد از تخفیف",
      render: (factor) => (
        <Text text={formatAmount(factor.discounted_amount)} size="sm" weight="medium" color="primary" align="center" />
      ),
    },
    {
      key: "description",
      header: "توضیحات",
      render: (factor) => (
        <div className="flex flex-col items-center gap-1">
          <Text text={factor.title} size="sm" weight="medium" align="center" />
          <Text text={factor.description || "-"} size="sm" weight="regular" color="secondary" align="center" />
        </div>
      ),
    },
    {
      key: "created_at",
      header: "تاریخ",
      render: (factor) => (
        <Text text={factor.created_at ? formatDate(factor.created_at) : "-"} size="sm" weight="medium" align="center" />
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      render: (factor) => {
        const statusInfo = getStatusInfo(factor.status);
        return (
          <div className={`flex flex-row items-center justify-center gap-1.5 whitespace-nowrap ${statusInfo.color}`}>
            {statusInfo.icon}
            <Text text={statusInfo.label} size="sm" weight="regular" />
          </div>
        );
      },
    },
  ];

  return (
    <DynamicTable
      columns={columns}
      rows={factors}
      onRowClick={(factor) => router.push(`/dashboard/orders/${factor.id}`)}
    />
  );
}