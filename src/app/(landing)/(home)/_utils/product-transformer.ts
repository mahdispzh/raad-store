import type { ProductCardProps } from "../_types/landing.types";

export function transformProductToCard(product: any): ProductCardProps | null {
  if (!product.product_variants?.length) return null;

  const prices = product.product_variants.map((v: any) => v.price);
  const lowestPrice = Math.min(...prices);
  const totalStock = product.product_variants.reduce(
    (sum: number, v: any) => sum + (v.stock || 0),
    0,
  );

  return {
    id: product.id,
    slug: product.slug,
    image: product.images?.[0] || "/placeholder-image.jpg",
    title: product.name,
    price: lowestPrice,
    stock: totalStock,
    href: `/products/${product.slug || product.id}`,
    ...(product.discount > 0 && { discount: product.discount }),
    ...(product.isNew && { isNew: product.isNew }),
  };
}