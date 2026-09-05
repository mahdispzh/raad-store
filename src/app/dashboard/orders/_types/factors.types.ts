// _types/factors.types.ts

// ===== نوع فاکتور برای جدول =====
export interface Factor {
  id: number;
  factor_number: number;
  image?: string;
  title: string;
  description: string; // اسم آیتم‌های خریداری‌شده (کوتاه‌شده با ...)
  amount: number;
  discounted_amount: number;
  status: number;
  created_at: string;
}

// ===== پاسخ API برای لیست فاکتورها =====
export interface FactorsResponse {
  data: Factor[];
  total: number;
  page: number;
  limit: number;
}

// ===== نوع خام سفارش از API (مطابق schema.prisma) =====
export interface RawBrand {
  id: number;
  name: string;
}

export interface RawColor {
  id: number;
  name: string;
  hex_code: string;
}

export interface RawSize {
  id: number;
  name: string;
}

// ===== واریانت محصول (رنگ/سایز/قیمت فعلی از اینجا میاد) =====
export interface RawProductVariant {
  id: number;
  sku: string;
  price?: number | null;
  stock: number;
  colors?: RawColor;
  sizes?: RawSize;
}
export interface RawProduct {
  id: number;
  name: string;
  description?: string;
  images: string[];
  discount?: number |null;
  brands?: RawBrand | null;
  features?: RawFeature[];
}
export interface RawOrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: number;
  quantity: number;
  unit_price: number;
  // از include: { order_items: { include: { products: { include: { brands: true } }, product_variants: { include: { colors: true, sizes: true } } } } }
  products?: RawProduct;
  product_variants?: RawProductVariant;
}


export interface RawOrderUser {
  id: number;
  name?: string | null;
  mail?: string | null;
  phone?: string | null;
}

// ===== آدرس خام سفارش (از include: user_addresses) =====
export interface RawUserAddress {
  id: number;
  title?: string | null;
  province?: string | null;
  city?: string | null;
  address?: string | null;
  postal_code?: string | null;
  receiver_name?: string | null;
  receiver_phone?: string | null;
  default?: boolean | null;
}

export interface RawOrder {
  id: number;
  user_id: number;
  address_id: number;
  total_price: number;
  status: number;
  payment_status: number;
  created_at: string;
  order_items?: RawOrderItem[];
  users?: RawOrderUser;
  user_addresses?: RawUserAddress | null;
}

export interface RawOrdersResponse {
  data: RawOrder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

// ===== نوع محصول در جزئیات فاکتور =====
export interface ProductDetail {
  id: number;
  image: string;
  name: string;
  price: string;
  currentPrice: string;
  quantity: string;
  size?: string; // ✅ optional
  color?: string; // ✅ optional
  brand: string;
  features: string;
  code: string;
  description: string;
}

// ===== جزئیات کامل سفارش، ساخته‌شده از RawOrder برای صفحه جزئیات =====
export interface OrderDetailData {
  id: number;
  status: number;
  trackingCode: string;
  orderDate: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  postalCode: string;
  totalAmount: string;
  products: ProductDetail[];
}
export interface RawFeature {
  id: number;
  name?: string | null;
  value?: string | null;
}
// ===== نوع داده‌های سایدبار =====
export interface SalesStatus {
  total_settled_amount: number;
  products_in_progress_amount: number;
}

export interface OrderStatus {
  new_orders: number;
  in_progress_orders: number;
  completed_orders: number;
}