import { tabVariants } from "./tab-variants";
import type { TabProps } from "./tab-types";

export function Tab({
  active,
  icon,
  className,
  children,
  type = "button",
  ...props
}: TabProps) {
  return (
    <button
      type={type}
      role="tab"
      aria-selected={!!active}
      className={tabVariants({ active, className })}
      {...props}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </button>
  );
}