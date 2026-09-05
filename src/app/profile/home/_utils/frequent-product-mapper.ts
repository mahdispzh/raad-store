// src/app/profile/home/_utils/frequent-product-mapper.ts
import type { ProductCardProps } from "@/src/shared/components/product-card/product-card.types";
import type { FrequentProduct } from "../_types/home.types";

export function mapFrequentProductToCard(
  product: FrequentProduct
): ProductCardProps {
  return {
    id: product.id,
    slug: `/product/${product.slug}`,
    title: product.name,
    imageSrc: product.images?.[0] ?? "",
    price: product.price,
    discount: product.discount ?? 0,
    rating: 0,
    isLiked: false,
  };
}