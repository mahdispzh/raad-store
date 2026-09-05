// src/app/profile/payments/_constants/payment.constants.ts

export const PAYMENT_STATUS = {
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
  REFUNDED: 3,
} as const;

export const PAYMENT_STATUS_LABEL: Record<number, { text: string; color: string }> = {
  [PAYMENT_STATUS.PENDING]: { text: "در انتظار پرداخت", color: "warning" },
  [PAYMENT_STATUS.SUCCESS]: { text: "پرداخت موفق", color: "success" },
  [PAYMENT_STATUS.FAILED]: { text: "پرداخت ناموفق", color: "danger" },
  [PAYMENT_STATUS.REFUNDED]: { text: "بازگشت وجه", color: "gray" },
};

export const PAYMENT_METHODS = [
  { value: "zarinpal", label: "زرین‌پال" },
  { value: "card", label: "کارت به کارت" },
  { value: "wallet", label: "کیف پول" },
] as const;