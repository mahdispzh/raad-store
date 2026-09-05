import type { ReactNode } from "react";
import type { TableColumn } from "./table.types";

export type CustomTableProps<T> = {
    viewAllIcon?: ReactNode | undefined;

  /** عنوان جدول */
  title?: string | undefined;
  /** آیکن کنار عنوان (اختیاری) */
  titleIcon?: ReactNode | undefined;
  /** تعریف ستون‌های جدول */
  columns: TableColumn<T>[];
  /** داده‌های ردیف‌ها */
  rows: T[];
  /** ساخت key یکتا برای هر ردیف (پیش‌فرض: index) */
  getRowKey?: ((row: T, index: number) => string) | undefined;
  /** متن دکمه‌ی مشاهده همه */
  viewAllLabel?: string | undefined;
  /** اکشن کلیک روی «مشاهده همه» */
  onViewAll?: (() => void) | undefined;
  /** نمایش/عدم نمایش دکمه‌ی مشاهده همه */
  showViewAll?: boolean | undefined;
  /** متنی که وقتی rows خالی است نمایش داده می‌شود */
  emptyText?: string | undefined;

  /** نمایش/عدم نمایش دکمه‌ی افزودن (پیش‌فرض: false / غیرفعال) */
  showAddButton?: boolean | undefined;
  /** متن دکمه‌ی افزودن (پیش‌فرض: «افزودن محصول») */
  addButtonLabel?: string | undefined;
  /** آیکن دکمه‌ی افزودن (پیش‌فرض: آیکن +) */
  addButtonIcon?: ReactNode | undefined;
  /** اکشن کلیک روی دکمه‌ی افزودن */
  onAddClick?: (() => void) | undefined;
};