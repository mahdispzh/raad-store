//تایپ‌ها
export interface SelectOption {
  id: number;
  name: string;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: number;
  onChange?: (id: number) => void;
  searchable?: boolean;
  required?: boolean;
  maxVisibleItems?: number;
}
