// src/app/profile/card/_components/cart-item-card/cart-item-card.types.ts

export interface CartItemCardProps {
  id: number;
  title: string;
  imageSrc: string;
  color: string;
  colorHex: string;
  size: string;
  shippingMethod: string;
  price: number;
  discount?: number | undefined; 
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}