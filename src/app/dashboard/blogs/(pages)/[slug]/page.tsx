"use client";

import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { ComposeIcon, TrashIcon } from "@/src/shared/constants/icons";
import { DefaultButton, Subtitle, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AddBlogModal } from "../../_components/add-blog-modal";
import { ConfirmModal } from "../../_components/confirm-modal";
import { useBlog } from "../../_hooks/useBlog";
import { deleteBlog, updateBlog } from "../../_services/blog.api";
import { formatDate } from "../../_utils/date.utils";
export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  // در BlogDetailPage
  const slug = decodeURIComponent(params.slug as string);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const { data: blog, isLoading, error, refetch } = useBlog(slug);
  const [isPublishing, setIsPublishing] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // ===== تغییر وضعیت انتشار =====
  const handleTogglePublish = async () => {
    if (!blog?.slug) return;
    // اگر منتشر شده، ببرش به عدم انتشار (3)، در غیر این صورت (پیش‌نویس/زمان‌بندی‌شده/عدم انتشار) ببرش به منتشر شده (1)
    const newStatus = blog.status === 1 ? 3 : 1;

    setIsPublishing(true);
    try {
      const formData = new FormData();
      formData.append("status", String(newStatus));
      await updateBlog(blog.slug, formData);
      await refetch();
    } catch (error: any) {
      console.error("❌ خطا در تغییر وضعیت بلاگ:", error);
      alert(error?.message || "خطا در تغییر وضعیت بلاگ");
    } finally {
      setIsPublishing(false);
    }
  };

  // ===== حذف بلاگ =====
  const handleDelete = async () => {
    if (!blog?.slug) {
      alert("اسلاگ بلاگ موجود نیست.");
      return;
    }
    setIsDeleting(true);
    try {
      await deleteBlog(blog.slug);
      router.push("/dashboard/blogs");
    } catch (error: any) {
      console.error("❌ خطا در حذف بلاگ:", error);
      alert(error?.message || "خطا در حذف بلاگ. لطفاً دوباره تلاش کنید.");
      setIsDeleting(false);
    }
  };

  // ===== ویرایش بلاگ =====
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  // ===== وضعیت‌های بارگذاری =====
  if (isLoading) {
    return (
      <DashboardContainer>
        <div className="flex h-40 w-full items-center justify-center">
          در حال بارگذاری...
        </div>
      </DashboardContainer>
    );
  }

  if (error || !blog) {
    return (
      <DashboardContainer>
        <div className="flex h-40 items-center justify-center text-red-500">
          خطا در دریافت بلاگ
        </div>
      </DashboardContainer>
    );
  }

  // ===== اطلاعات وضعیت =====
  const getStatusInfo = (status: number) => {
    const statusMap: Record<number, { label: string; color: string }> = {
      0: { label: "پیش‌نویس", color: "bg-gray-200 text-gray-700" },
      1: { label: "منتشر شده", color: "bg-green-100 text-green-700" },
      2: { label: "زمان بندی شده", color: "bg-blue-100 text-blue-700" },
      3: { label: "منتشر نشده", color: "bg-red-100 text-red-700" },
    };
    return (
      statusMap[status] || {
        label: "نامشخص",
        color: "bg-gray-100 text-gray-500",
      }
    );
  };

  const statusInfo = getStatusInfo(blog.status);

  return (
    <DashboardContainer>
      <div className="w-full pb-10">
        <div className="relative flex flex-row items-start gap-7 pt-7">
          {/* ===== بخش سمت چپ - Sticky ===== */}
          <div className="sticky top-25 flex w-full max-w-[400px] flex-1 flex-col gap-3 self-start">
            {/* تصویر بلاگ */}
            {blog.image && (
              <div className="mb-6 overflow-hidden rounded-lg shadow-2xl">
                <Image
                  alt={blog.title}
                  className="h-auto w-full object-cover"
                  height={100}
                  src={blog.image}
                  width={100}
                />
              </div>
            )}

            {/* عنوان */}
            <Subtitle
              color="secondary"
              size="2xl"
              text={blog.title}
              weight="bold"
            />

            {/* وضعیت */}
            <div className="mt-4 flex flex-row items-center gap-5">
              <Text size="lg" text="وضعیت :" weight="regular" />
              <div
                className={`rounded-full px-3 py-1 text-xs ${statusInfo.color}`}
              >
                <Text size="md" text={statusInfo.label} weight="regular" />
              </div>
            </div>
            {blog.status === 2 && (
              <div className="flex flex-row gap-3">
                <Text text="زمان انتشار :" size="lg" weight="regular" />
                <Text text={formatDate(blog.publish_at)} />
              </div>
            )}

            {/* نویسنده */}
            <div className="flex flex-row gap-3">
              <Text size="lg" text="نویسنده :" weight="regular" />
              <Text size="lg" text={blog.author} weight="regular" />
            </div>

            {/* بازدیدها */}
            <div className="flex flex-row gap-3">
              <Text size="lg" text="بازدیدها :" weight="regular" />
              <Text size="lg" text={blog.view} weight="regular" />
            </div>

            {/* زمان مطالعه */}
            <div className="flex flex-row gap-3">
              <Text size="lg" text="زمان مطالعه :" weight="regular" />
              <Text size="lg" text={blog.rading_time} weight="regular" />
            </div>

            {/* دکمه‌های عملیات */}
            <div className="flex w-full flex-row items-center justify-between gap-3">
              {(blog.status === 1 ||
                blog.status === 3 ||
                blog.status === 2) && (
                <DefaultButton
                  action={handleTogglePublish}
                  label={
                    isPublishing
                      ? "در حال تغییر..."
                      : blog.status === 3 || blog.status === 2
                        ? "انتشار"
                        : "عدم انتشار"
                  }
                  style="fill"
                  type={
                    blog.status === 3 || blog.status === 2
                      ? "primary"
                      : "secondary"
                  }
                  disabled={isPublishing}
                />
              )}
              <div className="flex flex-row gap-1">
                {/* دکمه ویرایش */}
                <div
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xs border-2 border-danger transition hover:bg-red-50"
                  onClick={handleEdit}
                >
                  <ComposeIcon color="text-danger" size="md" />
                </div>
                {/* دکمه حذف */}
                <div
                  className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xs border-2 border-danger transition ${
                    isDeleting
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-red-50"
                  }`}
                  onClick={() => setDeleteModalOpen(true)} // ✅ به‌جای handleDelete مستقیم
                >
                  <TrashIcon color="text-danger" size="md" />
                </div>
              </div>
            </div>
          </div>

          {/* ===== بخش سمت راست - محتوای بلاگ ===== */}
          <div className="w-full flex-4 flex-col">
            {/* خلاصه */}
            <div className="flex flex-col gap-2">
              <Text size="lg" text="خلاصه بلاگ : " weight="bold" />
              <Text size="lg" text={blog.summary} />
            </div>

            {/* متن اصلی */}
            <div className="mt-10">
              <Text size="lg" text="متن بلاگ : " weight="bold" />
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="prose prose-lg mt-4 max-w-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== مودال ویرایش ===== */}
      <AddBlogModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          refetch(); // به‌روزرسانی داده‌ها پس از بسته شدن مودال
        }}
        mode="update"
        blogSlug={slug}
        onUpdateBlog={() => {
          refetch(); // به‌روزرسانی داده‌ها پس از ویرایش موفق
          setEditModalOpen(false);
        }}
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        message={`آیا از حذف بلاگ "${blog.title}" مطمئن هستید؟`}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={async () => {
          await handleDelete();
          setDeleteModalOpen(false);
        }}
        isLoading={isDeleting}
      />
    </DashboardContainer>
  );
}
