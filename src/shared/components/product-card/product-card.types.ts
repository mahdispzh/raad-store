// src/shared/ui/product-card/product-card.types.ts
export interface ProductCardProps {
  id: string | number;
  slug: string;
  title: string;
  imageSrc: string;
  price: number;
  discount?: number;
  rating?: number;
  isLiked?: boolean;
  onViewProduct?: () => void;
  onLikeToggle?: () => void;
}
