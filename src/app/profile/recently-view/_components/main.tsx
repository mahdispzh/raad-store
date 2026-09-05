// components/recently-view/RecentlyViewedBody.tsx
"use client";

import { EmptyState } from "@/src/shared/components/empty-states/profile-empty-states";
import { ProductCard } from "@/src/shared/components/product-card/product-card";
import { useRecentlyViewed } from "../_hooks/useRecentlyViewed";

export function RecentlyViewedBody() {
  const { recentlyViewed, isLoading, error, isEmpty } = useRecentlyViewed();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-12">
        <div className="text-center">
          <div className="mb-2 text-4xl">⚠️</div>
          <p className="text-red-500">خطا در دریافت اطلاعات</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-blue-500 hover:underline"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        label="بازدید اخیر ندارید."
        text="محصولاتی که مشاهده می‌کنید در این قسمت ذخیره می‌شوند تا دوباره به آن‌ها دسترسی داشته باشید."
      />
    );
  }

  return (
    <div className="gap-layout grid grid-cols-[repeat(5,auto)] justify-between py-6">
      {recentlyViewed.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          title={item.title}
          imageSrc={item.imageSrc}
          price={item.price}
          // discountPercent={item.discountPercent ?? 0}
          rating={item.rating ?? 0}
          // variant="likeable"
        />
      ))}
    </div>
  );
}
