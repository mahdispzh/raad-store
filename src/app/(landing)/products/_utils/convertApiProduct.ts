// _utils/convertApiProduct.ts
import { Product, ProductItem } from "../_types";

export function convertApiProductToProduct(apiProduct: ProductItem): Product {
  return {
    id: String(apiProduct.id),
    name: apiProduct.name,
    price: apiProduct.variants?.[0]?.price ?? 0,
    rate: 0, // از API نمیاد، بعداً اصلاح کن
    ratingsCount: 0,
    reviewsCount: 0,
    colors: (apiProduct.variants || []).map((v) => ({
      name: v.color?.name || "",
      value: v.color?.hex_code || "#000000",
    })),
    sizes: (apiProduct.variants || []).map((v) => v.size?.name).filter(Boolean),
    features: [],
    description: apiProduct.description || "",
    galleryImages: apiProduct.images || [],
    comments: [],
  };
}
