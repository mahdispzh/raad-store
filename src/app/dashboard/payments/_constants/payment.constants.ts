import { Factor, OrderStatus, SalesStatus } from "../_types/payments.types";

// ===== دیتای فیک فاکتورها =====
export const FAKE_FACTORS: Factor[] = [
  {
    id: 1,
    factor_number: 18,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 0,
    created_at: "2026-10-27",
  },
  {
    id: 2,
    factor_number: 80,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 1,
    created_at: "2026-10-27",
  },
  {
    id: 3,
    factor_number: 13,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 2,
    created_at: "2026-10-27",
  },
  {
    id: 4,
    factor_number: 83,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 1,
    created_at: "2026-10-27",
  },
  {
    id: 5,
    factor_number: 1803,
    image: "/images/image32.svg",
    title: "اورال زنانه",
    description: "لباس لباس لباس",
    amount: 2380000,
    discounted_amount: 2380000,
    status: 1,
    created_at: "2026-10-27",
  },
  {
    id: 6,
    factor_number: 22,
    image: "/images/image32.svg",
    title: "پیراهن مجلسی",
    description: "پیراهن بلند مجلسی زنانه",
    amount: 4200000,
    discounted_amount: 3800000,
    status: 0,
    created_at: "2026-10-26",
  },
  {
    id: 7,
    factor_number: 45,
    image: "/images/image32.svg",
    title: "کت اسپرت",
    description: "کت اسپرت مردانه",
    amount: 3100000,
    discounted_amount: 3100000,
    status: 3,
    created_at: "2026-10-25",
  },
];

// ===== آمار فیک سایدبار =====
export const FAKE_SALES_STATUS: SalesStatus = {
  total_settled_amount: 238000000,
  products_in_progress_amount: 300000000,
};

export const FAKE_ORDER_STATUS: OrderStatus = {
  new_orders: 62,
  in_progress_orders: 367,
  completed_orders: 8359,
};
