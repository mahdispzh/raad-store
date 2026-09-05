// _types/select-select-_types.ts
export type UnitType = "toman" | "percent";

export interface SelectInputProps {
  value?: number;
  unit?: UnitType;
  onChange?: (data: { amount: number; unit: UnitType }) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

// گزینه‌های واحد پول/درصد
export const unitOptions: { label: string; value: UnitType }[] = [
  { label: "تومان", value: "toman" },
  { label: "درصد", value: "percent" },
];
