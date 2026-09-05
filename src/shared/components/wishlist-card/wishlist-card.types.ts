export interface WishlistCardProps {
  id: string | number;
  slug: string;
  title: string;
  imageSrc: string;
  price: number;
  discount?: number;
  onViewProduct?: () => void;
  onRemoveFromWishlist?: () => void;
}
