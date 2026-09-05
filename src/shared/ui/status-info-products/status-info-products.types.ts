// _types/status-info-products._types.ts
export type StatusInfoProductsVariant =
  | "success"
  | "danger"
  | "warning"
  | "refresh";

export interface StatusInfoProductsProps {
  value?: string | number;
  valueSize?: "sm" | "md" | "lg";
  label?: string;
  variant: StatusInfoProductsVariant;
}
