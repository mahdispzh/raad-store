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
import { hexToHslString, hexToRgbString } from "@/src/shared/utils/hex-color";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useColorsList } from "../_hooks/useColors";
import { ColorDeleteModal } from "./color-delete-modal";

type ColorRow = {
  id: number;
  name: string;
  hex_code: string;
};

const LIMIT = 10;

export const ColorsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const sort = searchParams.get("sort") ?? "newest";

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

  const { data } = useColorsList(page, LIMIT, sort);
  const colors: ColorRow[] = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [idsToDelete, setIdsToDelete] = useState<number[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteOne = (color: ColorRow) => {
    setIdsToDelete([color.id]);
    setDeleteModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    setIdsToDelete(Array.from(selectedIds));
    setDeleteModal(true);
  };

  const columns: TableColumn<ColorRow>[] = [
    {
      key: "swatch",
      header: "رنگ",
      render: (color) => (
        <div
          className="mx-auto h-9 w-9 rounded-sm"
          style={{ backgroundColor: color.hex_code }}
        />
      ),
    },
    {
      key: "name",
      header: "نام رنگ",
      render: (color) => <TableText text={color.name} />,
    },
    {
      key: "hex",
      header: "HEX",
      render: (color) => <TableText text={color.hex_code.toUpperCase()} />,
    },
    {
      key: "rgb",
      header: "RGB",
      render: (color) => <TableText text={hexToRgbString(color.hex_code)} />,
    },
    {
      key: "hsl",
      header: "HSL",
      render: (color) => <TableText text={hexToHslString(color.hex_code)} />,
    },
    {
      key: "actions",
      header: "عملیات",
      render: (color) => (
        <TableActions
          actions={[
            {
              icon: ComposeIcon,
              onClick: () => router.push(`/dashboard/colors/${color.id}/edit`),
            },
            { icon: TrashIcon, onClick: () => handleDeleteOne(color) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={colors}
        selectAllLabel="انتخاب همه رنگ‌ها"
        onSelectionChange={setSelectedIds}
        actions={[
          {
            icon: <PlusEmptyIcon size="xs" />,
            onClick: () => router.push("/dashboard/colors/create"),
          },
          {
            icon: <TrashIcon size="xs" color="text-secondary" />,
            onClick: handleBulkDelete,
          },
        ]}
        filterOptions={[
          { label: "جدیدترین", value: "newest" },
          { label: "قدیمی‌ترین", value: "oldest" },
          { label: "بر اساس نام", value: "name" },
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
        <ColorDeleteModal
          colorIds={idsToDelete}
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
