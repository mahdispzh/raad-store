import { buttonVariants } from "./button-variants";
import type { ButtonProps } from "./button-types";

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}