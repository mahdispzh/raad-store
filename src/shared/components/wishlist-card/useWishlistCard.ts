"use client";

import { useRouter } from "next/navigation";
import { WishlistCardProps } from "./wishlist-card.types";

export function useWishlistCard(props: WishlistCardProps) {
  const { slug, onViewProduct } = props;
  const router = useRouter();

  const handleViewProduct = () => {
    if (onViewProduct) {
      onViewProduct();
    } else {
      router.push(`/products/${slug}`); // ← استفاده از slug
    }
  };

  return {
    handleViewProduct,
  };
}
