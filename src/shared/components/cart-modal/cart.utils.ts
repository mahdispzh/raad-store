import { CartModalProductItem } from "./cart-modal.types";

// تایپ داده خام از API
export interface CartItemApi {
  id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  product_variants: {
    id: number;
    price: number;
    products: {
      id: number;
      name: string;
      images: string[];
      slug: string;
      discount?: number | null;
    };
    colors: {
      id: number;
      name: string;
      hex_code: string;
    };
    sizes: {
      id: number;
      name: string;
    };
  };
}

// ✅ تابع تبدیل اصلاح‌شده
export const mapCartApiToModalItems = (
  cartItems: CartItemApi[] = [],
): CartModalProductItem[] => {
  return cartItems.map((item) => {
    // آبجکت پایه (بدون discount)
    const base = {
      id: item.id,
      title: item.product_variants?.products?.name || "بدون عنوان",
      imageSrc:
        item.product_variants?.products?.images?.[0] ||
        "/images/placeholder.jpg",
      color: item.product_variants?.colors?.name || "نامشخص",
      colorHex: item.product_variants?.colors?.hex_code || "#CCCCCC",
      size: item.product_variants?.sizes?.name || "نامشخص",
      price: item.product_variants?.price || 0,
      quantity: item.quantity,
    };

    // استخراج مقدار تخفیف
    const discountValue = item.product_variants?.products?.discount;

    // ✅ فقط در صورت وجود مقدار (نه null و نه undefined) آن را اضافه کن
    if (discountValue !== null && discountValue !== undefined) {
      return { ...base, discount: discountValue };
    }

    return base;
  });
};
