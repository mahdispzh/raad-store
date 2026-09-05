export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  status?: "default" | "success" | "error";
  disabled?: boolean;
  onEnter?: () => void;
}
