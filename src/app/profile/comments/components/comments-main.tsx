"use client";
import { CommentCard } from "@/src/app/profile/comments/components/comment-card";
import { EmptyState } from "@/src/shared/components/empty-states/profile-empty-states";
import { useComments } from "../hooks/useComments";

export function CommentsMain() {
  const { comments, isLoading, error } = useComments();

  if (isLoading) {
    return <div className="flex justify-center py-12">در حال بارگذاری...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center py-12 text-danger">
        خطا در دریافت دیدگاه‌ها
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <EmptyState
        label="هنوز دیدگاهی ثبت نکرده‌اید."
        text="پس از ثبت نظر برای محصولات، همه دیدگاه‌های شما در این بخش نمایش داده می‌شود."
      />
    );
  }

  return (
    <div className="pb-6">
      {comments.map((c) => (
        <CommentCard
          key={c.id}
          productName={c.products.name}
          productImage={c.products.images?.[0] || "/images/image34.svg"}
          productSlug={c.products.slug}
          comment={c.text}
          date={c.created_at}
          status={c.status}
          rating={c.products.ratings?.[0]?.rating || 0}
        />
      ))}
    </div>
  );
}
