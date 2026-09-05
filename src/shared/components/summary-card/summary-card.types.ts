import type { ReactNode } from "react";

export type SummaryCardItem = {
  /** برای key یکتا (اختیاری - اگر ندهید از index استفاده می‌شود) */
  id?: string | number;
  /** آیکن کوچک کنار متن این آیتم */
  icon?: ReactNode;
  /** عدد بزرگی که بالای هر آیتم نمایش داده می‌شود */
  value: string | number;
  /** متنی که زیر عدد نمایش داده می‌شود */
  label: string;
};

export type SummaryCardProps = {
  /** عنوان کارت */
  title: string;
  /** آیکن کنار عنوان */
  titleIcon?: ReactNode;
  /** آیتم‌های خلاصه - هر چندتا که بخواهید، کامل داینامیک */
  items: SummaryCardItem[];
};