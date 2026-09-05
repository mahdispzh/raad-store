// _types/action-button._types.ts
export interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  className?: string;
}
