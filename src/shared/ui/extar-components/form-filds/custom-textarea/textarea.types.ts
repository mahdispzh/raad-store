export interface TextareaProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;

  placeholder?: string;

  disabled?: boolean;

  rows?: number;

  error: string | undefined;
}
