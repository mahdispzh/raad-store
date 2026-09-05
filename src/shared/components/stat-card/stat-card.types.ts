// stat-card.types.ts
export type StatCardValueType = "price" | "percent" | "custom";
export type StatCardComparePeriod = "day" | "week" | "month" | "year";

export type StatCardProps = {
  title: string;
  value: number;
  valueType?: StatCardValueType | undefined;
  unit?: string | undefined; // فقط وقتی valueType بصورت "custom" باشه کنار عدد نشون داده می‌شه
  percent: number;
  comparePeriod?: StatCardComparePeriod | undefined;
};

export type UseStatCardReturn = {
  isPositive: boolean;
  formattedValue: string;
  absolutePercent: string;
  compareText: string;
};