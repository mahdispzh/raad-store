import type { OrderStatus } from "@/src/shared/ui/order-status-badge/order-status-badge.types";

export type OrderTableRow = {
  id: number;
  orderNumber: string;
  date: string;
  amount: string;
  status: OrderStatus; // ← به‌جای number
};

type RawOrder = {
  id: number;
  created_at: string | Date | null;
  total_price: number | null;
  status: number;
  users?: { name?: string | null; phone?: string | null } | null;
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

function formatAmount(amount: number | null): string {
  return (amount ?? 0).toLocaleString("fa-IR");
}

// ورودی خام status (number) رو به OrderStatus معتبر تبدیل می‌کنه
// اگه مقدار خارج از بازه بود، fallback می‌زنه رو 0 که خطا نده
function toOrderStatus(status: number): OrderStatus {
  if (status >= 0 && status <= 7) {
    return status as OrderStatus;
  }
  return 0;
}

export function mapLatestOrdersToTableRows(
  orders: RawOrder[] | undefined | null,
  limit?: number,
): OrderTableRow[] {
  if (!orders) return [];

  const sliced = limit ? orders.slice(0, limit) : orders;

  return sliced.map((order) => ({
    id: order.id,
    orderNumber: `#${order.id}`,
    date: formatJalaliDate(order.created_at),
    amount: formatAmount(order.total_price),
    status: toOrderStatus(order.status),
  }));
}