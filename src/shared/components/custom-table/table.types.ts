import type { ReactNode } from "react";

export type TableColumn<T> = {
  /** کلید یکتای ستون - برای key و پیدا کردن ستون استفاده می‌شود */
  key: string;
  /** متنی که در هدر جدول نمایش داده می‌شود */
  header: string;
  /** چیدمان متن ستون - پیش‌فرض راست‌چین است */
  align?: "right" | "left" | "center";
  /**
   * نحوه‌ی رندر هر سلول این ستون.
   * اگر ندهید، مقدار row[key] به صورت ساده نمایش داده می‌شود.
   */
  render?: (row: T, rowIndex: number) => ReactNode;
};

export type TableProps<T> = {
  /** عنوان جدول */
  title?: string | undefined;
  /** آیکن کنار عنوان (اختیاری) */
  titleIcon?: ReactNode | undefined;
  /** تعریف ستون‌های جدول */
  columns: TableColumn<T>[];
  /** داده‌های ردیف‌ها - همینجا بعدا دیتای API پاس داده می‌شود */
  rows: T[];
  /** ساخت key یکتا برای هر ردیف (پیش‌فرض: index) */
  getRowKey?: ((row: T, index: number) => string) | undefined;
  /** متن دکمه‌ی مشاهده همه */
  viewAllLabel?: string | undefined;
  /** اکشن کلیک روی «مشاهده همه» - می‌تواند مسیر متفاوتی برای هر جدول باشد */
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