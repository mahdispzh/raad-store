"use client";

import { TrashIcon } from "@/src/shared/constants/icons";
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
import { useDeleteUser, useUsersList } from "../_hooks/useUsers";
import { UserRow } from "../_types/user.type";
import { formatLastActivity } from "../_utils/format-date";

const LIMIT = 10;

export const UsersTable = () => {
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

  const { data } = useUsersList(page, LIMIT, sort);
  const users: UserRow[] = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const deleteMutation = useDeleteUser();
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleDeleteOne = async (user: UserRow) => {
    await deleteMutation.mutateAsync(user.id);
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

  const columns: TableColumn<UserRow>[] = [
    {
      key: "name",
      header: "نام",
      render: (user) => <TableText text={user.name ?? "بدون نام"} />,
    },
    {
      key: "id",
      header: "آیدی",
      render: (user) => <TableText text={String(user.id)} />,
    },
    {
      key: "phone",
      header: "شماره موبایل",
      render: (user) => <TableText text={user.phone ?? "-"} />,
    },
    {
      key: "role",
      header: "نقش",
      render: (user) => (
        <TableText
          text={user.role === 2 ? "ادمین" : "کاربر عادی"}
          color={user.role === 2 ? "success" : "secondary"}
          weight="medium"
        />
      ),
    },
    {
      key: "updated_at",
      header: "آخرین فعالیت",
      render: (user) => (
        <TableText text={formatLastActivity(user.updated_at)} />
      ),
    },
    {
      key: "actions",
      header: "عملیات",
      render: (user) => (
        <TableActions
          actions={[
            {
              icon: ComposeIcon,
              onClick: () => router.push(`/dashboard/users/${user.id}/edit`),
            },
            { icon: TrashIcon, onClick: () => handleDeleteOne(user) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={users}
        selectAllLabel="انتخاب همه کاربران"
        onSelectionChange={setSelectedIds}
        actions={[
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
    </>
  );
};
