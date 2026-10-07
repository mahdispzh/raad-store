import { inputVariants } from "./input-variants";
import type { InputProps } from "./input-types";

export function Input({ size, icon, className, ...props }: InputProps) {
  return (
    <div className={inputVariants({ size, className })}>
      {icon && <span className="shrink-0 text-base text-primary">{icon}</span>}
      <input
        className="w-full bg-transparent outline-none placeholder:text-background/70"
        {...props}
      />
    </div>
  );
}