"use client";

import { useRouter } from "next/navigation";

import { Caption, Subtitle, Text } from "@/src/shared/ui";
import { getFakePaymentDetail } from "../_constants/payment-detail-data";

export const description =
  "محتوای اصلی صفحه جزئیات یک تراکنش/پرداخت (بدون تاریخچه؛ تاریخچه در SideDetails جداست)";

interface PaymentDetailProps {
  paymentId: string;
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function StatusBadge({ status }: { status: "success" | "failed" }) {
  const isSuccess = status === "success";

  return (
    <span
      className={`inline-flex flex-row items-center gap-1.5 rounded-md px-3 py-1.5 ${
        isSuccess ? "bg-success/15" : "bg-danger/15"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isSuccess ? "bg-success" : "bg-danger"}`} />
      <Text
        text={isSuccess ? "پرداخت موفق" : "پرداخت ناموفق"}
        size="sm"
        weight="regular"
        color={isSuccess ? "success" : "danger"}
      />
    </span>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-row items-start gap-1.5 pt-2">
            <Text text={label} size="md" color="secondary" weight="medium" />

      <Text text={value} size="md" color="primary" weight="medium" />
    </div>
  );
}

export function PaymentDetail({ paymentId }: PaymentDetailProps) {
  const router = useRouter();
  const detail = getFakePaymentDetail(paymentId);

  return (
    <div className="flex h-auto w-full flex-col gap-4">
      {/* دکمه بازگشت */}
      <div className="flex flex-row justify-start ">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-primary cursor-pointer"
          aria-label="بازگشت"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-col rounded-sm bg-pure-white shadow-xl">
        {/* وضعیت + مبلغ + شناسه پرداخت */}
        <div className="flex flex-row items-start justify-between px-6 py-5">
          <div className="text-right">
            <div className="flex flex-row items-baseline gap-1">
              <Subtitle
                text={detail.amount.toLocaleString("fa-IR")}
                size="3xl"
                color="primary"
                weight="bold"
              />
              <Text text="تومان" size="md" color="primary" weight="bold" />
              
            </div>
            <Text
              text={`شناسه پرداخت  ${detail.paymentId}`}
              size="md"
              color="secondary"
              weight="regular"
            />
          </div>
                    <StatusBadge status={detail.status} />

        </div>

        {/* جزئیات تراکنش */}
        <div className="mx-6 mb-5 rounded-sm border border-accent">
                      <div className="flex flex-row items-start justify-start  px-4 pt-3 gap-5">

                      <Text text="جزئیات تراکنش" size="md" color="primary" weight="bold" />
</div>
            <div className="flex flex-row items-start justify-start  px-4 py-3 gap-5">
              
            <Text text={`خریدار: ${detail.buyerName}`} size="sm" color="primary" weight="regular" />
            <Text
              text={`خرید به شماره سفارش : ${detail.orderNumber}`}
              size="sm"
              color="primary"
              weight="regular"
            />
          </div>
          <div className="border-b border-accent px-4 py-3">
          </div>

        

          <div className="grid grid-cols-3 gap-4 px-4 pb-4 ">
            <InfoField label="شناسه پرداخت" value={detail.paymentId} />
            <InfoField label="مبلغ تراکنش" value={`${detail.amount.toLocaleString("fa-IR")} تومان`} />
            <InfoField label="شماره ارجاع" value={detail.referralNumber} />

            <InfoField label="روش پرداخت" value={detail.paymentMethod} />
            <InfoField label="کارمزد تراکنش" value={`${detail.transactionFee.toLocaleString("fa-IR")} تومان`} />
            <InfoField label="تاریخ و ساعت" value={`${detail.date}, ${detail.time}`} />

            <InfoField label="پذیرنده" value={`${detail.cardFee.toLocaleString("fa-IR")} تومان`} />
            <InfoField label="آتوریتی" value={detail.authority} />
          </div>
        </div>

        {/* مشخصات پرداخت کننده */}
        <div className="mx-6 mb-6 rounded-sm border border-accent">
          <div className="border-b border-accent px-4 py-3">
            <Text text="مشخصات پرداخت کننده" size="md" color="primary" weight="bold" />
          </div>

          <div className="grid grid-cols-3 gap-4 p-4">
            <InfoField label="آی‌پی پرداخت کننده" value={detail.paymentId} />
            <InfoField label="بانک صادرکننده" value={detail.payer.issuingBank} />
            <InfoField label="شماره کارت" value={detail.payer.cardNumber} />

            <InfoField label="ایمیل" value={detail.payer.email} />
            <InfoField label="شماره موبایل" value={detail.payer.mobile} />
            <InfoField label="شماره ارجاع بانکی" value={detail.referralNumber} />
          </div>
        </div>
      </div>
    </div>
  );
}