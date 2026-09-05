export interface SalesStatus {
  total_settled_amount: number;
  products_in_progress_amount: number;
}

export interface OrderStatus {
  new_orders: number;
  in_progress_orders: number;
  completed_orders: number;
}
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
