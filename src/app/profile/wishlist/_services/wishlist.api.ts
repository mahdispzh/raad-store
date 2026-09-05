import { apiClient, fetcher } from "@/src/shared/api/fetcher";
import {
  RemoveFromWishlistResponse,
  WishlistResponse,
} from "../_types/wishlist.types";

/**
 * دریافت لیست علاقه‌مندی‌ها
 */
export const getWishlist = async (): Promise<WishlistResponse> => {
  const data = await fetcher<any[]>(() =>
    apiClient.get("protected/wishlist"),
  );

  // تبدیل داده‌ها به فرمت مورد انتظار
  return {
    items: data.map((item: any) => ({
      id: item.id,
      product_id: item.product_id,
      slug: item.products.slug, // یا item.slug
      user_id: item.user_id,
      created_at: item.created_at,
      product: {
        id: item.products.id,
        name: item.products.name,
        price: item.products.product_variants?.[0]?.price || 0,
        discount: item.products.discount,
        images: item.products.images || [],
        rating: item.products.rating,
      },
    })),
    total: data.length,
  };
};

/**
 * حذف محصول از علاقه‌مندی‌ها (unlike)
 */
export const removeFromWishlist = async (
  slug: string,
): Promise<RemoveFromWishlistResponse> => {
  return fetcher<RemoveFromWishlistResponse>(() =>
    apiClient.post(`protected/products/${slug}/like`),
  );
};