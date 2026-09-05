// src/app/profile/payment/_types/payment.types.ts

import { Step, ShippingMethodType, GatewayType } from "./common.types";
import { Address } from "./address.types";
import { Order } from "./order.types";

export interface PaymentState {
  step: Step;
  selectedShipping: ShippingMethodType;
  selectedGateway: GatewayType;
  orderId: number | null;
  refId: number | null;

  orderData: Order | null;
  isProcessing: boolean;
  discount: {
    code: string;
    amount: number;
    error: string | null;
    isOpen: boolean;
  };
  paymentStatus: "success" | "unsuccess" | "unknown" | "bank-error"; // ⬅️ اضافه شد
  isVerifying: boolean;
}
export interface CreateOrderParams {
  addressId: number;
  shippingMethod: ShippingMethodType;
  paymentMethod: GatewayType;
  discountCode?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentUrl?: string;
  message?: string;
  orderId?: number;
}

export type PaymentAction =
  | { type: "SET_STEP"; payload: Step }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_SHIPPING"; payload: ShippingMethodType }
  | { type: "SET_GATEWAY"; payload: GatewayType }
  | { type: "SET_ORDER"; payload: { orderId: number; orderData: Order } }
  | { type: "SET_PROCESSING"; payload: boolean }
  | { type: "SET_DISCOUNT_CODE"; payload: string }
  | { type: "SET_DISCOUNT_AMOUNT"; payload: number }
  | { type: "SET_DISCOUNT_ERROR"; payload: string | null }
  | { type: "TOGGLE_DISCOUNT" }
  | { type: "RESET_DISCOUNT" }
  | { type: "SET_PAYMENT_STATUS"; payload: "success" | "unsuccess" | "unknown" | "bank-error" } // ⬅️ اضافه شد
  | { type: "SET_VERIFYING"; payload: boolean }
    | { type: "SET_REF_ID"; payload: number | null }   // ⬅️ همین خط اضافه شد

  | { type: "RESET" };
  // اضافه شود به payment.types.ts

export interface PaymentGatewayProps {
  totalPrice: number;
  finalPrice: number;
  bankName: string;
  isProcessing: boolean;
  onPaymentComplete: () => void;
}

export interface PaymentOptionsProps {
  selectedGateway: GatewayType;
  onSelectGateway: (gateway: GatewayType) => void;
  onApplyDiscount: (code: string) => void;
  isDiscountOpen: boolean;
  toggleDiscount: () => void;
  discountCodeInput: string;
  setDiscountCodeInput: (value: string) => void;
  discountError: string;
}

export interface PaymentSummaryProps {
  productCount: number;
  totalProductPrice: number;
  shippingCost: number;
  totalPrice: number;
  finalPrice: number;
  onPay: () => void;
}

export interface PaymentMethodProps {
  productCount: number;
  totalProductPrice: number;
  shippingCost: number;
  totalPrice: number;
  finalPrice: number;
  onPay: () => void;
  selectedGateway: GatewayType;
  onSelectGateway: (gateway: GatewayType) => void;
  onApplyDiscount?: (code: string) => void;
  isDiscountOpen?: boolean;
  toggleDiscount?: () => void;
  discountCodeInput?: string;
  setDiscountCodeInput?: (value: string) => void;
  discountError?: string;
}

export interface PaymentSuccessInfoProps {
  trackingCode: string;
  dateTime: string;
  paymentStatus: string;
  totalPrice: number;
  receiverName: string;
  phone: string;
  address: string;
  shippingMethod: string;
  postalCode: string;
}

export interface PaymentSuccessItemProps {
  id: number;
  imageSrc: string;
  title: string;
  price: number;
  size?: string | undefined;
  color?: string | undefined;
  quantity: number;
}
 
// src/app/profile/payments/_types/payment.types.ts

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  paymentMethod: string;
  status: number;
  transactionCode?: string;
  paidAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentFilters {
  page?: number;
  limit?: number;
  status?: number | null;
  paymentMethod?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaymentsResponse {
  data: Payment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}