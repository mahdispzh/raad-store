import { TagIcon } from "@/src/shared/constants/icons/tag-icon";
import type { TitleProps } from "./title.types";
import { useTitle } from "./useTitle";

export function Title({
  text,
  size = "3xl",
  variant = "default",
  as: Component = "h2",
}: TitleProps) {
  const {
    isUnderlined,
    isFeatured,
    isSecondaryUnderline,
    sizeClass,
    iconSize,
  } = useTitle({ variant, size });

  return (
    <Component
      className={`${sizeClass} text-medium inline-block text-primary ${
        isUnderlined
          ? `relative after:absolute after:-bottom-1 after:left-1/2 after:h-[2.5px] after:w-[calc(100%+30px)] after:-translate-x-1/2 after:rounded-full ${
              isSecondaryUnderline ? "after:bg-secondary" : "after:bg-danger"
            }`
          : ""
      }`}
    >
      <span className="flex items-center gap-2">
        {isFeatured && <TagIcon size={iconSize} />}
        {text}
      </span>
    </Component>
  );
}
