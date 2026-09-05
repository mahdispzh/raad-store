"use client";

import { EmptyState } from "@/src/shared/components/empty-states/profile-empty-states";
import { WishlistCard } from "@/src/shared/components/wishlist-card/wishlist-card";
import { useWishlist } from "../_hooks/useWishlist";

interface WishlistBodyProps {
  onRemoveFromWishlist?: (slug: string) => void;
}

export function WishlistBody({ onRemoveFromWishlist }: WishlistBodyProps) {
  const { favorites, isLoading, error, removeFromWishlist } = useWishlist();

  const handleRemove = async (slug: string) => {
    try {
      await removeFromWishlist(slug);
      onRemoveFromWishlist?.(slug);
    } catch (error) {
      console.error("خطا در حذف:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div>در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-12 text-danger">
        خطا در دریافت اطلاعات
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <EmptyState
        label="لیست علاقه‌مندی‌های شما خالی است."
        text="هنوز محصولی به علاقه‌مندی‌های خود اضافه نکرده‌اید. محصولات موردعلاقه‌تان را به علاقه‌مندی‌ها اضافه کنید تا بعداً راحت‌تر به آن‌ها دسترسی داشته باشید."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 py-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {favorites.map((item) => (
        <div key={item.id} className="min-w-0">
          <WishlistCard
            id={item.id}
            slug={item.slug}
            title={item.title}
            imageSrc={item.imageSrc}
            price={item.price}
            onRemoveFromWishlist={() => handleRemove(item.slug)}
          />
        </div>
      ))}
    </div>
  );
}
