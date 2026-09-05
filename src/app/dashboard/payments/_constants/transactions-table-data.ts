export type TransactionStatus = "success" | "failed";

export interface TransactionRow {
  id: string;
  paymentId: string;
  amount: number;
  orderNumber: string;
  date: string;
  time: string;
  status: TransactionStatus;
}

function buildFakeTransactions(count: number): TransactionRow[] {
  return Array.from({ length: count }, (_, index) => {
    const isFailed = index % 4 === 1;

    return {
      id: `txn-${index + 1}`,
      paymentId: "6543782",
      amount: 6890000,
      orderNumber: "5454",
      date: "1405/05/05",
      time: "23:54:05",
      status: isFailed ? "failed" : "success",
    } satisfies TransactionRow;
  });
}

// دیتای فیک؛ در حالت واقعی این آرایه از سرور (صفحه‌بندی‌شده) میاد
export const FAKE_TRANSACTIONS: TransactionRow[] = buildFakeTransactions(47);