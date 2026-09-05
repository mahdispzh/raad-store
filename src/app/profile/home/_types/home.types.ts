// src/app/profile/home/_types/home.types.ts
export interface OrderStatusCounts {
  current: number;    // status 1,2,3,4,5
  delivered: number;  // status 6
  returned: number;   // status 7
}

export interface FrequentProduct {
  id: number;
  name: string;
  slug: string;
  images: string[];
  discount: number | null;
  price: number;
  totalQuantity: number;
  orderCount: number;
}