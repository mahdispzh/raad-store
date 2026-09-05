// services/recently-view.api.ts
"use client";

import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import { useAuthStore } from "@/src/shared/store/store";
import { RecentlyViewedResponse, RecentlyViewedProduct } from "../_types/recently-view.types";

// ============================================
// Types
// ============================================

export interface UserWithRecentlyViewed {
  id: number;
  name: string | null;
  phone: string | null;
  mail: string | null;
  recently_viewed: number[] | null;
}

// ============================================
// Recently Viewed APIs
// ============================================

// دریافت اطلاعات کاربر (شامل بازدیدهای اخیر)
export const getUserWithRecentlyViewed = async (userId: number): Promise<UserWithRecentlyViewed> => {
  try {
    const response = await fetcher<UserWithRecentlyViewed>(() => 
      apiClient.get(`/protected/users/${userId}`)
    );
    return response;
  } catch (error) {
    console.error("Error fetching user data with recently viewed:", error);
    return {
      id: userId,
      name: null,
      phone: null,
      mail: null,
      recently_viewed: []
    };
  }
};

// دریافت لیست کامل بازدیدهای اخیر با اطلاعات محصولات
export const getRecentlyViewedProducts = async (): Promise<RecentlyViewedResponse> => {
  try {
    console.log('🔵 Starting getRecentlyViewedProducts...');
    
    // 1. دریافت userId از استور
    const { user } = useAuthStore.getState();
    const userId = user?.id;

    console.log('🟡 User from store:', user);
    console.log('🟡 User ID:', userId);

    if (!userId) {
      console.warn("User not authenticated");
      return { items: [], total: 0 };
    }

    // 2. دریافت اطلاعات کاربر با recently_viewed
    const userData = await getUserWithRecentlyViewed(userId);
    console.log('🟢 User data received:', userData);
    
    if (!userData.recently_viewed || userData.recently_viewed.length === 0) {
      console.log('🟡 No recently_viewed found or empty');
      return { items: [], total: 0 };
    }

    // 3. دریافت اطلاعات کامل هر محصول
    const productIds = userData.recently_viewed;
    console.log('🟡 Product IDs to fetch:', productIds);

    const productsPromises = productIds.map(async (productId: number) => {
      try {
        const product = await fetcher<RecentlyViewedProduct>(() =>
          apiClient.get(`/protected/products/${productId}`)
        );
        console.log(`🟢 Product ${productId} data received:`, product.name);
        return product;
      } catch (error) {
        console.error(`🔴 Error fetching product ${productId}:`, error);
        return null;
      }
    });

    const productsData = await Promise.all(productsPromises);
    const validProducts = productsData.filter(p => p !== null) as RecentlyViewedProduct[];

    console.log('🟢 Valid products count:', validProducts.length);

    // 4. ساخت خروجی
    const result = {
      items: validProducts.map((product, index) => ({
        id: index + 1,
        product_id: product.id,
        user_id: userId,
        viewed_at: new Date().toISOString(),
        product: {
          id: product.id,
          name: product.name,
          price: product.product_variants?.[0]?.price || 0,
          discount: product.discount || 0,
          images: product.images || [],
          rating: product.rating || 0,
          likesCount: product.likesCount || 0,
        },
      })),
      total: validProducts.length,
    };

    console.log('✅ Final result:', result);
    return result;
  } catch (error) {
    console.error('🔴 Error in getRecentlyViewedProducts:', error);
    return { items: [], total: 0 };
  }
};

// اضافه کردن یک محصول به بازدیدهای اخیر
export const addToRecentlyViewed = async (productId: number): Promise<void> => {
  try {
    const { user } = useAuthStore.getState();
    const userId = user?.id;

    if (!userId) {
      console.warn("User not authenticated");
      return;
    }

    // دریافت لیست فعلی
    const userData = await getUserWithRecentlyViewed(userId);
    let recentList = userData.recently_viewed || [];

    // حذف productId اگر قبلاً وجود داشت
    recentList = recentList.filter(id => id !== productId);
    
    // اضافه کردن به ابتدای لیست
    recentList = [productId, ...recentList];

    // محدود کردن به 20 آیتم آخر
    if (recentList.length > 20) {
      recentList = recentList.slice(0, 20);
    }

    // به‌روزرسانی در سرور
    await fetcher<{ success: boolean }>(() =>
      apiClient.put(`/protected/users/${userId}`, {
        recentlyViewed: recentList,
      })
    );
  } catch (error) {
    console.error("Error adding to recently viewed:", error);
  }
};

// حذف یک محصول از بازدیدهای اخیر
export const removeFromRecentlyViewed = async (productId: number): Promise<void> => {
  try {
    const { user } = useAuthStore.getState();
    const userId = user?.id;

    if (!userId) {
      console.warn("User not authenticated");
      return;
    }

    const userData = await getUserWithRecentlyViewed(userId);
    let recentList = userData.recently_viewed || [];

    recentList = recentList.filter(id => id !== productId);

    await fetcher<{ success: boolean }>(() =>
      apiClient.put(`/protected/users/${userId}`, {
        recentlyViewed: recentList,
      })
    );
  } catch (error) {
    console.error("Error removing from recently viewed:", error);
  }
};

// پاک کردن تمام بازدیدهای اخیر
export const clearRecentlyViewed = async (): Promise<void> => {
  try {
    const { user } = useAuthStore.getState();
    const userId = user?.id;

    if (!userId) {
      console.warn("User not authenticated");
      return;
    }

    await fetcher<{ success: boolean }>(() =>
      apiClient.put(`/protected/users/${userId}`, {
        recentlyViewed: [],
      })
    );
  } catch (error) {
    console.error("Error clearing recently viewed:", error);
  }
};