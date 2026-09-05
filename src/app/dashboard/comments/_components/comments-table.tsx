"use client";

import {
  PublishIcon,
  TrashIcon,
  UnpublishIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
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
import { formatLastActivity } from "../../users/_utils/format-date";
import {
  useCommentsList,
  useDeleteComment,
  useUpdateCommentStatus,
} from "../_hooks/useComments"; // اضافه کردن useUpdateCommentStatus
import { CommentRow } from "../_types/comment.type";

const LIMIT = 10;

const STATUS_MAP: Record<
  number,
  { label: string; color: "success" | "danger" | "secondary" }
> = {
  0: { label: "در انتظار بررسی", color: "secondary" },
  1: { label: "تایید شده", color: "success" },
  2: { label: "رد شده", color: "danger" },
};

export const CommentsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = searchParams.get("status") ?? "all";

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  const setStatus = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", newStatus);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const { data } = useCommentsList(page, LIMIT, status);
  const comments: CommentRow[] = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination ? Math.max(1, pagination.totalPages) : 1;

  const deleteMutation = useDeleteComment();
  const updateStatusMutation = useUpdateCommentStatus(); // ✅ هوک جدید

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const handleDeleteOne = async (comment: CommentRow) => {
    await deleteMutation.mutateAsync(comment.id);
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

  // ✅ تابع تغییر وضعیت
  const handleUpdateStatus = async (commentId: number, newStatus: number) => {
    await updateStatusMutation.mutateAsync({
      id: commentId,
      status: newStatus,
    });
  };

  const columns: TableColumn<CommentRow>[] = [
    {
      key: "product_image",
      header: "عکس محصول",
      render: (comment) => (
        <TableImage
          src={comment.products?.images?.[0]}
          alt={comment.products?.name ?? "محصول"}
          slug={comment.products?.slug}
        />
      ),
    },
    {
      key: "user_name",
      header: "نام کاربر",
      render: (comment) => (
        <TableText
          text={
            comment.isUnknown ? "ناشناس" : (comment.users?.name ?? "بدون نام")
          }
        />
      ),
    },
    {
      key: "text",
      header: "متن کامنت",
      render: (comment) => (
        <button
          type="button"
          onClick={() => router.push(`/dashboard/comments/${comment.id}`)}
          className="cursor-pointer"
        >
          <Text
            text={
              comment.text.length > 40
                ? `${comment.text.slice(0, 40)}...`
                : comment.text
            }
            size="sm"
            weight="regular"
            color="secondary"
            align="center"
          />
        </button>
      ),
    },
    {
      key: "isUnknown",
      header: "ناشناس",
      render: (comment) => (
        <TableText
          text={comment.isUnknown ? "بله" : "خیر"}
          color={comment.isUnknown ? "danger" : "secondary"}
        />
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      render: (comment) => {
        const s = STATUS_MAP[comment.status] ?? STATUS_MAP[0];
        return <TableText text={s.label} color={s.color} weight="medium" />;
      },
    },
    {
      key: "created_at",
      header: "تاریخ",
      render: (comment) => (
        <TableText text={formatLastActivity(comment.created_at)} />
      ),
    },
    {
      key: "actions",
      header: "عملیات",
      render: (comment) => {
        const actions = [];

        // بر اساس وضعیت، دکمه‌ها را می‌سازیم
        if (comment.status === 0) {
          // در انتظار بررسی → تایید و رد
          actions.push({
            icon: PublishIcon,
            onClick: () => handleUpdateStatus(comment.id, 1),
          });
          actions.push({
            icon: UnpublishIcon,
            onClick: () => handleUpdateStatus(comment.id, 2),
          });
        } else if (comment.status === 1) {
          // تایید شده → فقط رد
          actions.push({
            icon: UnpublishIcon,
            onClick: () => handleUpdateStatus(comment.id, 2),
          });
        } else if (comment.status === 2) {
          // رد شده → فقط تایید
          actions.push({
            icon: PublishIcon,
            onClick: () => handleUpdateStatus(comment.id, 1),
          });
        }

        // دکمه حذف همیشه هست
        actions.push({
          icon: TrashIcon,
          onClick: () => handleDeleteOne(comment),
        });

        return <TableActions actions={actions} />;
      },
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={comments}
        selectAllLabel="انتخاب همه کامنت‌ها"
        onSelectionChange={setSelectedIds}
        actions={[
          {
            icon: <TrashIcon size="xs" color="text-secondary" />,
            onClick: handleBulkDelete,
          },
        ]}
        filterOptions={[
          { label: "همه", value: "all" },
          { label: "در انتظار بررسی", value: "0" },
          { label: "تایید شده", value: "1" },
          { label: "رد شده", value: "2" },
        ]}
        filterValue={status}
        onFilterChange={setStatus}
      />

      {pagination && pagination.total > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};
