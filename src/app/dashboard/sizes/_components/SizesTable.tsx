"use client";

import { PlusEmptyIcon, TrashIcon } from "@/src/shared/constants/icons";
import { ComposeIcon } from "@/src/shared/constants/icons/compose-icon";
import {
  DynamicTable,
  TableActions,
  TableColumn,
  TableText,
} from "@/src/shared/ui/dynamic-table/dynamic-table.ui";
import { Pagination } from "@/src/shared/ui/pagination/pagination.ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSizesList } from "../_hooks/useSizes";
import { Size } from "../_services/sizes.api";
import { SizeDeleteModal } from "./size-delete-modal";

const LIMIT = 10;

export const SizesTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const sort = searchParams.get("sort") ?? "sort_order";

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  const setSort = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const { data } = useSizesList(page, LIMIT, sort);
  const sizes: Size[] = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteOne = (size: Size) => {
    setIdsToDelete([size.id]);
    setDeleteModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    setIdsToDelete(Array.from(selectedIds));
    setDeleteModal(true);
  };

  const columns: TableColumn<Size>[] = [
    {
      key: "name",
      header: "نام سایز",
      render: (size) => <TableText text={size.name} />,
    },
    {
      key: "sort_order",
      header: "ترتیب",
      render: (size) => <TableText text={String(size.sort_order)} />,
    },
    {
      key: "actions",
      header: "عملیات",
      render: (size) => (
        <TableActions
          actions={[
            {
              icon: ComposeIcon,
              onClick: () => router.push(`/dashboard/sizes/${size.id}/edit`),
            },
            { icon: TrashIcon, onClick: () => handleDeleteOne(size) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={sizes}
        selectAllLabel="انتخاب همه سایزها"
        onSelectionChange={setSelectedIds}
        actions={[
          {
            icon: <PlusEmptyIcon size="xs" />,
            onClick: () => router.push("/dashboard/sizes/create"),
          },
          {
            icon: <TrashIcon size="xs" color="text-secondary" />,
            onClick: handleBulkDelete,
          },
        ]}
        filterOptions={[
          { label: "بر اساس ترتیب", value: "sort_order" },
          { label: "بر اساس نام", value: "name" },
          { label: "جدیدترین", value: "newest" },
          { label: "قدیمی‌ترین", value: "oldest" },
        ]}
        filterValue={sort}
        onFilterChange={setSort}
      />

      {meta && meta.total > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {deleteModal && idsToDelete.length > 0 && (
        <SizeDeleteModal
          sizeIds={idsToDelete}
          onClose={() => {
            setDeleteModal(false);
            setIdsToDelete([]);
          }}
          onSuccess={() => setSelectedIds(new Set())}
        />
      )}
    </>
  );
};
