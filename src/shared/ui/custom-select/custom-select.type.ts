export type SelectOption<T = string | number> = {
  label: string;
  value: T;
  className?: string;
};

export type Props<T = string | number> = {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
  optionClassName?: string;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  // اگه true باشه، پس‌زمینه‌ی دکمه‌ی اصلی (حالت بسته) transparent می‌شه
  // پیش‌فرض false — یعنی همون بک‌گراند pure-white فعلی بدون تغییر باقی می‌مونه
  // این prop فقط روی خود دکمه اثر داره و روی پنل باز شده‌ی dropdown تاثیری نداره
  transparent?: boolean;
};