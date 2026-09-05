export type AddButtonProps = {
  text: string;
  className?: string;
  action?: () => void | Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
};

export type UseAddButtonReturn = {
  handleClick: () => Promise<void>;
  isPending: boolean;
};