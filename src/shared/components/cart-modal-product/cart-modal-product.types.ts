// ==================== تایپ‌ها ====================
export interface CartModalProductProps {
  id: string | number;
  title: string;
  imageSrc: string;
  color: string;
  colorHex: string;
  size: string;
  price: number;
  discount?: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}
