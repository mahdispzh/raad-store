// _types/checkbox._types.ts
export type CheckboxVariant = "primary" | "secondary" | "danger";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  variant?: CheckboxVariant;
  disabled?: boolean;
}
