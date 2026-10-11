import { cva } from "class-variance-authority";

export const sectionTitleVariants = cva("flex flex-col border-s-4 pe-4", {
  variants: {
    variant: {
      primary: "border-primary",
      dark: "border-foreground",
    },
    size: {
      sm: "gap-3",
      md: "gap-5",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export const sectionTitleHeadingVariants = cva("font-bold text-foreground", {
  variants: {
    size: {
      sm: "text-base",
      md: "text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const sectionTitleDescriptionVariants = cva("text-grey", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});