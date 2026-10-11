import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { sectionTitleVariants } from "./section-title-variants";

export interface SectionTitleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof sectionTitleVariants> {
  title: string;
  description: string;
}