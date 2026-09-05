"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboardBlogs } from "../_hooks/useDashboardBlogs";
import { deleteBlog, updateBlog, Blog } from "../_services/blog.api";
import { ConfirmModal } from "./confirm-modal";
import { Pagination } from "@/src/shared/ui/pagination/pagination.ui";
import { PlusEmptyIcon, TrashIcon } from "@/src/shared/constants/icons";
import { ComposeIcon } from "@/src/shared/constants/icons/compose-icon";
import { PublishIcon } from "@/src/shared/constants/icons/publish-icon";
import { UnpublishIcon } from "@/src/shared/constants/icons/unpublish-icon";
import {
  DynamicTable,
  TableColumn,
  TableText,
  TableImage,
  TableActions,
} from "@/src/shared/ui/dynamic-table/dynamic-table.ui";

const LIMIT = 10;

const STATUS_MAP: Record<number, { label: string; color: "primary" | "danger" | "secondary" }> = {
  0: { label: "پیش‌نویس", color: "secondary" },
  1: { label: "منتشر شده", color: "primary" },
  2: { label: "زمان بندی شده", color: "secondary" },
  3: { label: "منتشر نشده", color: "danger" },
};

export const BlogsTable = () => {
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

  const { data, refetch } = useDashboardBlogs(page, LIMIT, status);
  const blogs: Blog[] = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);

  const handleDeleteOne = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteBlog(deleteTarget.slug);
      await refetch();
    } catch (error) {
      console.error("خطا در حذف بلاگ:", error);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setIsDeleting(true);
    try {
      const slugs = blogs.filter((b) => selectedIds.has(b.id)).map((b) => b.slug);
      const results = await Promise.allSettled(slugs.map((slug) => deleteBlog(slug)));
      const failed = results.filter((r) => r.status === "rejected");
      if (failed.length > 0) {
        console.error(`${failed.length} مورد حذف نشد`, failed);
      }
      setSelectedIds(new Set());
      await refetch();
    } finally {
      setIsDeleting(false);
      setBulkDeleteModal(false);
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    const newStatus = blog.status === 1 ? 3 : 1;
    setTogglingSlug(blog.slug);
    try {
      const formData = new FormData();
      formData.append("status", String(newStatus));
      await updateBlog(blog.slug, formData);
      await refetch();
    } catch (error) {
      console.error("خطا در تغییر وضعیت بلاگ:", error);
    } finally {
      setTogglingSlug(null);
    }
  };

  const columns: TableColumn<Blog>[] = [
    {
      key: "image",
      header: "عکس",
      render: (blog) => (
        <TableImage src={blog.image ?? null} alt={blog.title} href={`/blogs/${blog.slug}`} />
      ),
    },
    {
      key: "title",
      header: "عنوان",
      render: (blog) => <TableText text={blog.title} weight="medium" color="primary" />,
    },
    {
      key: "author",
      header: "نویسنده",
      render: (blog) => <TableText text={blog.author ?? "-"} />,
    },
    {
      key: "views",
      header: "بازدید",
      render: (blog) => <TableText text={`${blog.view ?? 0}`} />,
    },
    {
      key: "status",
      header: "وضعیت",
      render: (blog) => {
        const info = STATUS_MAP[blog.status] ?? { label: "نامشخص", color: "secondary" as const };
        return <TableText text={info.label} color={info.color} />;
      },
    },
    {
      key: "actions",
      header: "عملیات",
      render: (blog) => (
        <TableActions
          actions={[
            {
              icon: blog.status === 1 ? UnpublishIcon : PublishIcon,
              onClick: () => handleTogglePublish(blog),
            },
            { icon: ComposeIcon, onClick: () => router.push(`/dashboard/blogs/${blog.slug}/edit`) },
            { icon: TrashIcon, onClick: () => setDeleteTarget(blog) },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={blogs}
        selectAllLabel="انتخاب همه بلاگ‌ها"
        onSelectionChange={setSelectedIds}
        actions={[
          { icon: <PlusEmptyIcon size="xs" />, onClick: () => router.push("/dashboard/blogs/create") },
          { icon: <TrashIcon size="xs" color="text-secondary" />, onClick: () => setBulkDeleteModal(true) },
        ]}
        filterOptions={[
          { label: "همه", value: "all" },
          { label: "منتشر شده", value: "1" },
          { label: "پیش‌نویس", value: "0" },
          { label: "زمان بندی شده", value: "2" },
          { label: "منتشر نشده", value: "3" },
        ]}
        filterValue={status}
        onFilterChange={setStatus}
      />

      {meta && meta.total > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        message={`آیا از حذف بلاگ "${deleteTarget?.title}" مطمئن هستید؟`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteOne}
        isLoading={isDeleting}
      />

      <ConfirmModal
        isOpen={bulkDeleteModal}
        title="حذف گروهی"
        message={`آیا از حذف ${selectedIds.size} بلاگ انتخاب‌شده مطمئن هستید؟`}
        onCancel={() => setBulkDeleteModal(false)}
        onConfirm={handleBulkDelete}
        isLoading={isDeleting}
      />
    </>
  );
};