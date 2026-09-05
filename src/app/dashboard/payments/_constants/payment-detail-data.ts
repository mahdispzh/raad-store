import type { TransactionStatus } from "./transactions-table-data";

export interface PaymentDetailTimelineEvent {
  id: string;
  title: string;
  refLabel: string;
  refValue: string;
  date: string;
  time: string;
  variant: "success" | "neutral";
}

export interface PaymentDetailData {
  paymentId: string;
  status: TransactionStatus;
  amount: number;
  orderNumber: string;
  buyerName: string;
  referralNumber: string;
  transactionFee: number;
  paymentMethod: string;
  cardFee: number;
  authority: string;
  date: string;
  time: string;
  payer: {
    trackingId: string;
    cardNumber: string;
    issuingBank: string;
    mobile: string;
    email: string;
  };
  timeline: PaymentDetailTimelineEvent[];
}

// دیتای فیک؛ در حالت واقعی این‌ها از API با شناسه پرداخت (paymentId) میان
export function getFakePaymentDetail(paymentId: string): PaymentDetailData {
  return {
    paymentId,
    status: "success",
    amount: 6890000,
    orderNumber: "5454",
    buyerName: "مصطفی خورشیدی",
    referralNumber: "4354378",
    transactionFee: 14000,
    paymentMethod: "درگاه مستقیم",
    cardFee: 8000,
    authority: "vqhfudbz A000...",
    date: "1405/08/05",
    time: "23:54:05",
    payer: {
      trackingId: paymentId,
      cardNumber: "6614-38**-****-1414",
      issuingBank: "بانک شهر",
      mobile: "09214851044",
      email: "sh.m.reyhan@gamil.com",
    },
    timeline: [
      {
        id: "evt-1",
        title: "تسویه شده توسط شاپرک",
        refLabel: "شناسه تسویه",
        refValue: "6381414",
        date: "08 آبان 1405",
        time: "23:54:05",
        variant: "success",
      },
      {
        id: "evt-2",
        title: "ایجاد درخواست تسویه",
        refLabel: "",
        refValue: "",
        date: "05 آبان 1405",
        time: "23:54:05",
        variant: "success",
      },
      {
        id: "evt-3",
        title: "اعتبارسنجی از طرف پذیرنده",
        refLabel: "شناسه ارجاع",
        refValue: "6381414",
        date: "14 اسفند 1404",
        time: "23:54:05",
        variant: "neutral",
      },
      {
        id: "evt-4",
        title: "پرداخت موفق توسط کاربر",
        refLabel: "",
        refValue: "",
        date: "14 اسفند 1404",
        time: "23:54:05",
        variant: "success",
      },
    ],
  };
}