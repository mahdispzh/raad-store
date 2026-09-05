// src/app/profile/orders/_components/types/order.types.ts

// ============ Order Types ============
export interface ProductColumn {
  key: string;
  label: string;
}

export interface OrderItem {
  row: number;
  productId: string;
  description: string;
  seller: string;
  quantity: number;
  unit: string;
  amount: number;
  discount: number;
  total: number;
}

export interface OrderInvoiceFields {
  invoiceNumber: string;
  economicCode: string;
  registrationNumber: string;
  nationalId: string;
  nationalCode: string;
  seller: string;
  date: string;
  postalCode: string;
  identifier: string;
  buyer: string;
  tracking: string;
  taxNumber: string;
  phoneNumber: string;
  taxMemorySerial: string;
  posSerial: string;
}

export interface OrderInvoice {
  title: string;
  button: string;
  fields: OrderInvoiceFields;
  values: OrderInvoiceFields;
}

export interface OrderSummary {
  total: number;
  label: string;
}

export interface OrderSignatures {
  buyerSignature: string;
  deliveryDate: string;
  sellerSignature: string;
}

export interface OrderData {
  order: {
    invoice: OrderInvoice;
    productColumns: ProductColumn[];
    items: OrderItem[];
    summary: OrderSummary;
    signatures: OrderSignatures;
    deliveryDate: string;
    currency: string;
    emptyValue: string;
  };
}

// ============ API Order Types ============
export interface OrderAPIItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: number | null;
  unit_price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  products?: {
    id: number;
    name: string;
    slug: string;
    images: string[];
    brands?: { id: number; name: string };
    features?: any;
  };
  product_variants?: {
    id: number;
    colors?: { id: number; name: string };
    sizes?: { id: number; name: string };
  };
}

export interface OrderAPI {
  id: number;
  user_id: number;
  cart_id: number | null;
  address_id: number;
  total_price: number;
  status: number;
  payment_status: number;
  created_at: string;
  updated_at: string;
  order_items: OrderAPIItem[];
  payments?: any[];
  user_addresses?: {
    id: number;
    title: string;
    province: string;
    city: string;
    address: string;
    postal_code: string;
    receiver_name: string;
    receiver_phone: string;
  };
}

export interface OrdersResponse {
  data: OrderAPI[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface OrderStatusCounts {
  current: number;
  delivered: number;
  returned: number;
}

// ============ Component Props Types ============
export interface OrderCardCurrentProps {
  date?: string;
  totalPrice?: string;
  discount?: string;
  orderCode?: string;
  currentStep?: number;
  orderItems?: OrderAPIItem[];
  orderData?: OrderAPI;
}

// ✅ اصلاح شده - productSlug به صورت اختیاری (optional)
export interface OrderShipmentItemProps {
  isLast?: boolean;
  shipmentNumber?: number;
  totalShipments?: number;
  shippingMethod?: string;
  deliveryRange?: string;
  productImage?: string;
  productName?: string;
  productFeatures?: string;
  productSlug?: string; // ✅ اختیاری شد
}

export interface OrderCardDeliveredProps {
  status?: string;
  statusIcon?: React.ElementType;
  date?: string;
  orderCode?: string;
  totalPrice?: string;
  discount?: string;
  productImages?: string[];
  orderId?: string;
  orderData?: OrderAPI;
}

export interface OrderCardReturnedProps {
  date?: string;
  orderCode?: string;
  totalPrice?: string;
  discount?: string;
  productImages?: string[];
  orderId?: string;
  orderData?: OrderAPI;
}

export interface OrderDetailsHeaderProps {
  orderId?: string;
  trackingCode?: string;
  orderDate?: string;
  recipient?: string;
  phone?: string;
  totalPrice?: number;
  address?: string;
  deliveryDate?: string;
  shippingMethod?: string;
  currentStep?: string;
}

export interface OrderDetailsCardProps {
  shipmentNumber?: number;
  totalShipments?: number;
  productImage?: string;
  quantity?: number;
  productName?: string;
  purchasedPrice?: string;
  currentPrice?: string;
  productSlug?: string; // ✅ اضافه شد
}

export interface OrderDetailsMainProps {
  products?: Array<{ id: string | number }>;
  orderId?: string;
  orderData?: OrderAPI;
}

export interface OrderHeaderItemProps {
  icon: React.ElementType;
  text: string;
}

export interface ProfileTabProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export interface TabsSectionProps {
  tabs?: TabItem[];
  currentOrders?: Partial<OrderCardCurrentProps>[];
  deliveredOrders?: Partial<OrderCardDeliveredProps>[];
  returnedOrders?: Partial<OrderCardReturnedProps>[];
}

export interface TabItem {
  key: string;
  label: string;
  count: number;
}

// ============ Hook Return Type ============
export interface UseOrderDataReturn {
  order: OrderData["order"];
  sellerInfo: Array<{ label: string; value: string }>;
  sellerAddress: Array<{ label: string; value: string }>;
  invoiceInfo: Array<{ label: string; value: string }>;
  buyerInfo: Array<{ label: string; value: string }>;
  buyerAddress: Array<{ label: string; value: string }>;
  taxInfo: Array<{ label: string; value: string }>;
  totalSum: number;
  formatNumber: (num: number) => string;
}