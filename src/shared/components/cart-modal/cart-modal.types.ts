// ==================== تایپ‌ها ====================
export interface CartModalProductItem {
  id: string | number;
  title: string;
  imageSrc: string;
  color: string;
  colorHex: string;
  size: string;
  price: number;
  discount?: number;
  quantity: number;
}

export interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartModalProductItem[];
  onIncrease: (id: string | number) => void;
  onDecrease: (id: string | number) => void;
  onRemove: (id: string | number) => void;
  onCheckout?: () => void;
}
