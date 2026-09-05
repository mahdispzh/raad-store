// _hooks/useCartItemCard.ts

import { useState } from "react";
import { getImageUrl } from "./cart-item-card.constants";

export function useCartItemCard(imageSrc: string) {
  const [imgError, setImgError] = useState(false);

  const imageUrl = getImageUrl(imageSrc, imgError);

  const handleImageError = () => {
    setImgError(true);
  };

  return {
    imageUrl,
    handleImageError,
  };
}