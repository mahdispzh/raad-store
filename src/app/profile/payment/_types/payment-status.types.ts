// src/app/profile/payment/_types/payment-status.types.ts

import { PaymentSuccessInfoProps, PaymentSuccessItemProps } from "./payment.types";

export interface PaymentDetailRow {
  gateway: string;
  trackingCode: string;
  date: string;
  statusColor?: "danger" | "success" | "warning";
}

export interface PaymentFailedLikeProps {
  orderNumber: string;
  refundNote?: string;
  details: PaymentDetailRow[];
  onRetryPayment: () => void;
  onChangePaymentMethod: () => void;
}

export interface PaymentSuccessProps {
  info: PaymentSuccessInfoProps;
  products: PaymentSuccessItemProps[];
}

export type PaymentStatusProps = 
  | { type: "success"; success: PaymentSuccessProps }
  | { type: "unsuccess"; failed: PaymentFailedLikeProps }
  | { type: "unknown"; failed: PaymentFailedLikeProps }
  | { type: "bank-error"; failed: PaymentFailedLikeProps }; // ⬅️ اضافه شد