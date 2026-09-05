import { getPublicProducts } from "../_services/products.server";
import { ProductItem } from "../_types";

export const findProductBySlug = async (
  slug: string,
): Promise<ProductItem | null> => {
  try {
    // ✅ ۱. decode کردن slug دریافتی از URL
    const decodedSlug = decodeURIComponent(slug);

    // ✅ ۲. نرمال‌سازی: حذف فاصله‌های اضافی و یکسان‌سازی حروف
    const normalizedSlug = decodedSlug.trim();

    const response = await getPublicProducts({ limit: 1000 });

    // ✅ ۳. مقایسه با دقت (حساس به حروف بزرگ/کوچک نباشد)
    const product = response.data.find(
      (p: ProductItem) =>
        p.slug.trim().toLowerCase() === normalizedSlug.toLowerCase(),
    );

    return product || null;
  } catch (error) {
    console.error("Error finding product by slug:", error);
    return null;
  }
};
