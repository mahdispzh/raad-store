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
import { useMemo, useState } from "react";
import { useCategories } from "../_hooks/useCategories";
import { useCategoryLevels } from "../_hooks/useCategoryLevels";
import { CategoryWithDepth } from "../_utils/category-tree.utils";
import { CategoryDeleteModal } from "./category-delete-modal";

const LIMIT = 10;
const FETCH_ALL_LIMIT = 1000;

export const CategoryTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  const { data, isLoading } = useCategories(1, FETCH_ALL_LIMIT);
  const allCategories = data?.data ?? [];
  const { categoriesWithDepth } = useCategoryLevels(allCategories);

  const total = allCategories.length;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagedCategories = useMemo(() => {
    const start = (page - 1) * LIMIT;
    return categoriesWithDepth.slice(start, start + LIMIT);
  }, [categoriesWithDepth, page]);

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleEdit = (category: CategoryWithDepth) => {
    router.push(`/dashboard/categories/${category.id}/edit`);
  };

  const handleDeleteOne = (category: CategoryWithDepth) => {
    setIdsToDelete([category.id]);
    setDeleteModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    setIdsToDelete(Array.from(selectedIds));
    setDeleteModal(true);
  };

  const columns: TableColumn<CategoryWithDepth>[] = [
    {
      key: "image",
      header: "عکس",
      render: (category) => (
        <TableImage src={category.image} alt={category.name} />
      ),
    },
    {
      key: "name",
      header: "نام",
      render: (category) => <TableText text={category.name} />,
    },
    {
      key: "path",
      header: "دسته‌بندی والد",
      render: (category) => (
        <TableText
          text={category.depth > 1 ? category.path : "دسته بندی اصلی"}
          color="secondary"
        />
      ),
    },
    {
      key: "actions",
      header: "عملیات",
      render: (category) => (
        <TableActions
          actions={[
            { icon: ComposeIcon, onClick: () => handleEdit(category) },
            { icon: TrashIcon, onClick: () => handleDeleteOne(category) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={pagedCategories}
        selectAllLabel="انتخاب همه دسته‌بندی‌ها"
        onSelectionChange={setSelectedIds}
        actions={[
          {
            icon: <PlusEmptyIcon size="xs" />,
            onClick: () => router.push("/dashboard/categories/create"),
          },
          {
            icon: <TrashIcon size="xs" color="text-secondary" />,
            onClick: handleBulkDelete,
          },
        ]}
      />

      {!isLoading && total > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {deleteModal && idsToDelete.length > 0 && (
        <CategoryDeleteModal
          categoryIds={idsToDelete}
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
