// _hooks/useSidebarCounts.ts
"use client";

import { useQuery } from "@tanstack/react-query";
// ⚠️ مسیرهای زیر حدسی‌ان بر اساس چیزی که تا الان از ساختار پروژه دیدیم.
// اگه مسیر واقعی این سرویس‌ها فرق داره، فقط همین importها رو اصلاح کن.
import { getMyComments } from "@/src/app/profile/comments/services/comment.api";
import { getAddresses } from "@/src/app/profile/addresses/services/address.api";
import { getOrderStatusCounts } from "@/src/app/profile/orders/_services/orders.api";
import { getWishlist } from "@/src/app/profile/wishlist/_services/wishlist.api";

export interface SidebarCounts {
  order: number;
  like: number;
  comment: number;
  location: number;
}

const STALE_TIME = 60 * 1000; // ۱ دقیقه

export function useSidebarCounts(): SidebarCounts {
  const { data: orderCounts } = useQuery({
    queryKey: ["sidebar", "order-counts"],
    queryFn: getOrderStatusCounts,
    staleTime: STALE_TIME,
  });

  const { data: wishlist } = useQuery({
    queryKey: ["sidebar", "wishlist-count"],
    queryFn: getWishlist,
    staleTime: STALE_TIME,
  });

  const { data: comments } = useQuery({
    queryKey: ["sidebar", "comments-count"],
    queryFn: getMyComments,
    staleTime: STALE_TIME,
  });

  const { data: addresses } = useQuery({
    // limit: 1 چون فقط به meta.total نیاز داریم، نه خود لیست
    queryKey: ["sidebar", "addresses-count"],
    queryFn: () => getAddresses(1, 1),
    staleTime: STALE_TIME,
  });

  const orderTotal = orderCounts
    ? orderCounts.current + orderCounts.delivered + orderCounts.returned
    : 0;

  return {
    order: orderTotal,
    like: wishlist?.total ?? 0,
    comment: comments?.data?.length ?? 0,
    location: addresses?.meta?.total ?? 0,
  };
}

// عدد بج رو برای نمایش آماده می‌کنه: بیشتر از ۹ => "9+"
export function formatBadgeCount(count: number): string {
  return count > 9 ? "9+" : String(count);
}