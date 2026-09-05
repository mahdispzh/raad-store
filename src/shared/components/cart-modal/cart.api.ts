// src/shared/services/cart.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

// ==================== تایپ‌ها ====================
export interface CartVariantProduct {
  id: number;
  name: string;
  images: string[];
  slug: string;
  // در صورت نیاز فیلدهای دیگر
}

export interface CartVariant {
  id: number;
  product_id: number;
  color_id: number;
  size_id: number;
  sku: string;
  price: number;
  stock: number;
  products: CartVariantProduct;
  sizes: {
    id: number;
    name: string;
  };
  colors: {
    id: number;
    name: string;
    hex_code: string;
  };
}

export interface CartItem {
  id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  product_variants: CartVariant;
}

export interface CartResponse {
  id: number;
  user_id: number;
  created_at: string;
  cart_items: CartItem[];
}

// ==================== توابع API ====================

// دریافت سبد خرید کاربر
export const getCart = (): Promise<CartResponse> => {
  return fetcher<CartResponse>(() => apiClient.get("/protected/carts"));
};

// به‌روزرسانی تعداد آیتم (افزایش/کاهش)
export const updateCartItem = (
  itemId: number,
  quantity: number,
): Promise<CartItem> => {
  return fetcher<CartItem>(() =>
    apiClient.put(`/protected/carts/items/${itemId}`, { quantity }),
  );
};

// حذف آیتم از سبد خرید
export const deleteCartItem = (
  itemId: number,
): Promise<{ success: boolean }> => {
  return fetcher(() => apiClient.delete(`/protected/carts/items/${itemId}`));
};
