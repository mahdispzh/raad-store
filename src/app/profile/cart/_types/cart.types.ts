// src/app/profile/card/_types/cart.types.ts

export interface Product {
  id: number;
  variantId: number;
  productId: number;
  imageSrc: string;
  productName: string;
  rate: number;
  discount?: number | null;
  price: number;
  quantity: number;
  finalPrice: number;
  colorName?: string;
  colorHex?: string;
  sizeName?: string;
  stock: number;
  shippingMethod?: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  color_id: number;
  size_id: number;
  sku: string;
  price: number | null;
  stock: number;
  shipping_method?: string;
  products?: {
    id: number;
    name: string;
    images: string[];
    price: number;
    discount?: number | null;
  };
  colors?: {
    id: number;
    name: string;
    hex_code: string;
  };
  sizes?: {
    id: number;
    name: string;
    sort_order: number;
  };
}

export interface CartItem {
  id: number;
  cart_id: number;
  variant_id: number;
  quantity: number;
  product_variants: ProductVariant;
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  cart_items: CartItem[];
}

export interface CartSectionProps {
  parcelCount: number;
  totalPrice: number;
  totalItemsCount: number;
  totalCartPrice: number;
  userProfit: number;
  products: Product[];
  onConfirmOrder: () => void;
  onProductIncrease: (id: number) => void;
  onProductDecrease: (id: number) => void;
  onProductRemove: (id: number) => void;
  onClearCart?: () => void;
}

export interface CartSummaryProps {
  totalPrice: number;
  totalItemsCount: number;
  totalCartPrice: number;
  userProfit: number;
  onConfirmOrder: () => void;
}

export interface NextBuySectionProps {
  parcelCount: number;
  itemCount: number;
  onTransferAll: () => void;
}

export interface CheckoutStepperProps {
  currentStep: 1 | 2 | 3 | 4 | 5;
}

export interface UseCartReturn {
  activeTab: "cart" | "next";
  setActiveTab: (tab: "cart" | "next") => void;
  products: Product[];
  parcelCount: number;
  totalPrice: number;
  totalItemsCount: number;
  totalCartPrice: number;
  userProfit: number;
  nextBuyParcelCount: number;
  nextBuyItemCount: number;
  handleTransferAll: () => void;
  handleConfirmOrder: () => void;
  handleProductIncrease: (id: number) => void;
  handleProductDecrease: (id: number) => void;
  handleProductRemove: (id: number) => void;
    clearCartItems: () => Promise<void>; // ✅ اضافه کردن

  currentStep: 1 | 2 | 3 | 4 | 5;
  isLoading: boolean;
  error: Error | null;
  cartId?: number; // ✅ اضافه کردن ? برای اختیاری بودن
}
export interface CartData {
  id: number;
  products: Product[];
  totalItemsCount: number;
  totalCartPrice: number;
}

export interface AddToCartData {
  productId: number;
  variantId: number;
  quantity: number;
}