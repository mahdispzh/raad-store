import type { ReactNode } from "react";

export interface RankingItem {
  id: number | string;
  name: string;
  count: number;
  image: string;
  href?: string;}

export interface RankingPeriodOption {
  value: string;
  label: string;
}

export interface RankingCardProps {
  icon: ReactNode;
  title: string;
  periodLabel: string; // برچسب دوره (مثلاً ماه) — مقدار فعلی انتخاب‌شده
  periodOptions?: RankingPeriodOption[] | undefined; // اگه پاس بشه، به‌جای متن ثابت یک select نمایش داده می‌شود
  onPeriodChange?: ((value: string) => void) | undefined; // فراخوانی هنگام تغییر دوره در select
  items: RankingItem[];
  itemsPerPage?: number | undefined;
  unit?: string | undefined; // واحد شمارش
}