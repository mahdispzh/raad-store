"use client";

import { PlusEmptyIcon, TrashIcon } from "@/src/shared/constants/icons";
import { ComposeIcon } from "@/src/shared/constants/icons/compose-icon";
import {
  DynamicTable,
  TableActions,
  TableColumn,
  TableImage,
  TableText,
} from "@/src/shared/ui/dynamic-table/dynamic-table.ui";
import { Pagination } from "@/src/shared/ui/pagination/pagination.ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useBrandsList } from "../_hooks/useBrands";
import { Brand } from "../_services/brands.api";
import { BrandDeleteModal } from "./brand-delete-modal";

const LIMIT = 10;

export const BrandsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const sort = searchParams.get("sort") ?? "id";

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

  const { data } = useBrandsList(page, LIMIT, sort);
  const brands: Brand[] = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteOne = (brand: Brand) => {
    setIdsToDelete([brand.id]);
    setDeleteModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    setIdsToDelete(Array.from(selectedIds));
    setDeleteModal(true);
  };

  const columns: TableColumn<Brand>[] = [
    {
      key: "image",
      header: "عکس",
      render: (brand) => (
        <TableImage
          src={brand.image || "/images/placeholder.jpg"}
          alt={brand.name}
        />
      ),
    },
    {
      key: "name",
      header: "نام برند",
      render: (brand) => <TableText text={brand.name} />,
    },
    {
      key: "actions",
      header: "عملیات",
      render: (brand) => (
        <TableActions
          actions={[
            {
              icon: ComposeIcon,
              onClick: () => router.push(`/dashboard/brands/${brand.id}/edit`),
            },
            { icon: TrashIcon, onClick: () => handleDeleteOne(brand) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={brands}
        selectAllLabel="انتخاب همه برندها"
        onSelectionChange={setSelectedIds}
        actions={[
          {
            icon: <PlusEmptyIcon size="xs" />,
            onClick: () => router.push("/dashboard/brands/create"),
          },
          {
            icon: <TrashIcon size="xs" color="text-secondary" />,
            onClick: handleBulkDelete,
          },
        ]}
        filterOptions={[
          { label: "پیش‌فرض", value: "id" },
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
        <BrandDeleteModal
          brandIds={idsToDelete}
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
