import { formatPaymentTime } from "./format-payment-time";

export type PaymentTableRow = {
  id: number;
  rowNumber: string;
  paymentNumber: string;
  date: string;
  time: string;
  amount: string;
  method: string;
  status: number;
};
type RawPayment = {
  id: number;
  amount: number | null;
  status: number;
  payment_method: string | null;
  sending_method: string | null;
  created_at: string | Date | null;
};
function formatJalaliDate(date: string | Date | null): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}
const GATEWAY_NAMES: Record<string, string> = {
  pasargad: "پاسارگاد",
  saman: "سامان",
};
function formatAmount(amount: number | null): string {
  return (amount ?? 0).toLocaleString("fa-IR");
}

function formatMethod(method: string | null): string {
  if (!method) return "-";

  return GATEWAY_NAMES[method.toLowerCase()] ?? method;
}
export function mapLatestPaymentsToTableRows(
  payments: RawPayment[] | undefined | null,
  limit?: number,
): PaymentTableRow[] {
  if (!payments) return [];

  const sliced = limit ? payments.slice(0, limit) : payments;

return sliced.map((payment, index) => ({    id: payment.id,
  rowNumber: String(index + 1).padStart(2, "0"),
    paymentNumber: `#${payment.id}`,
    date: formatJalaliDate(payment.created_at),
    time: formatPaymentTime(payment.created_at),
    amount: formatAmount(payment.amount),
    method: formatMethod(payment.payment_method),
    status: payment.status,
  }));
}