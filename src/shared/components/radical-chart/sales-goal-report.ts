export type CategoryKey = "shalvar" | "shomiz" | "kif" | "kafsh";

export type CategoryReport = {
  key: CategoryKey;
  label: string;
  // Share of total revenue this category represents — drives the ring.
  revenueSharePercent: number;
  // Units sold — shown in the legend row, independent of the ring split.
  unitsSold: number;
};

export const CATEGORY_SALES_REPORT: CategoryReport[] = [
  { key: "shalvar", label: "شلوار", revenueSharePercent: 25, unitsSold: 110 },
  { key: "shomiz", label: "شومیز", revenueSharePercent: 23, unitsSold: 673 },
  { key: "kif", label: "کیف", revenueSharePercent: 24, unitsSold: 54 },
  { key: "kafsh", label: "کفش", revenueSharePercent: 28, unitsSold: 89 },
];

export const TOTAL_SALES_TOMAN = 37_000_000;
export const MONTH_NAME = "اردیبهشت";