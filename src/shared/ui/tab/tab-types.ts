import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { tabVariants } from "./tab-variants";

export interface TabProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabVariants> {
  icon?: ReactNode;
}