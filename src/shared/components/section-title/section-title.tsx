import {
  sectionTitleVariants,
  sectionTitleHeadingVariants,
  sectionTitleDescriptionVariants,
} from "./section-title-variants";

import {SectionTitleProps} from "./section-title-types"

export function SectionTitle({
  title,
  description,
  variant,
  size,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={sectionTitleVariants({ variant, size, className })}
      {...props}
    >
      <h2 className={sectionTitleHeadingVariants({ size })}>{title}</h2>
      <p className={sectionTitleDescriptionVariants({ size })}>{description}</p>
    </div>
  );
}