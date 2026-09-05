"use client";

import { useRouter } from "next/navigation";
import { ProductCardProps } from "./product-card.types";

export function useProductCard(props: ProductCardProps) {
  const { slug, onViewProduct } = props;
  const router = useRouter();

  const handleViewProduct = () => {
    if (onViewProduct) {
      onViewProduct();
    } else {
      router.push(`/products/${slug}`);
    }
  };

  return {
    handleViewProduct,
  };
}
