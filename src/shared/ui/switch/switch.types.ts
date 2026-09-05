// _types/switch._types.ts
export type SwitchSize = "large" | "small";

export interface SwitchProps {
  size?: SwitchSize;
  disabled?: boolean;
  label?: string;
}
