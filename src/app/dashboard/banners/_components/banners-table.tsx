"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBannersList, useDeleteBanner } from "../_hooks/useBanner";
import { PlusEmptyIcon, TrashIcon } from "@/src/shared/constants/icons";
import { ComposeIcon } from "@/src/shared/constants/icons/compose-icon";
import {
  DynamicTable,
  TableColumn,
  TableText,
  TableImage,
  TableActions,
} from "@/src/shared/ui/dynamic-table/dynamic-table.ui";
import { Banner } from "../_services/banners.api";

export const BannersTable = () => {
  const router = useRouter();

  const { data: banners = [] } = useBannersList();
  const deleteMutation = useDeleteBanner();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleDeleteOne = async (banner: Banner) => {
    await deleteMutation.mutateAsync(banner.id);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    const results = await Promise.allSettled(
      Array.from(selectedIds).map((id) => deleteMutation.mutateAsync(id)),
    );
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      console.error(`${failed.length} مورد حذف نشد`, failed);
    }
    setSelectedIds(new Set());
  };

  const columns: TableColumn<Banner>[] = [
    {
      key: "image",
      header: "عکس",
      render: (banner) => <TableImage src={banner.image} alt={banner.alt ?? "بنر"} />,
    },
    {
      key: "alt",
      header: "متن جایگزین",
      render: (banner) => <TableText text={banner.alt ?? "-"} />,
    },
    {
      key: "sort_order",
      header: "ترتیب",
      render: (banner) => <TableText text={banner.sort_order != null ? String(banner.sort_order) : "-"} />,
    },{
  key: "status",
  header: "وضعیت",
  render: (banner) => (
    <TableText
      text={banner.is_active ? "فعال" : "غیرفعال"}
      color={banner.is_active ? "success" : "danger"}
    />
  ),
},
    {
      key: "actions",
      header: "عملیات",
      render: (banner) => (
        <TableActions
          actions={[
            { icon: ComposeIcon, onClick: () => router.push(`/dashboard/banners/${banner.id}/edit`) },
            { icon: TrashIcon, onClick: () => handleDeleteOne(banner) },
          ]}
        />
      ),
    },
  ];

  return (
    <DynamicTable
      columns={columns}
      rows={banners}
      selectAllLabel="انتخاب همه بنرها"
      onSelectionChange={setSelectedIds}
      actions={[
        { icon: <PlusEmptyIcon size="xs" />, onClick: () => router.push("/dashboard/banners/create") },
        { icon: <TrashIcon size="xs" color="text-secondary" />, onClick: handleBulkDelete },
      ]}
    />
  );
};