// _types/textarea._types.ts
interface TextareaProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  rows?: number;
}
