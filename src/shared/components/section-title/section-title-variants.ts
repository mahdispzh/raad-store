import { cva } from "class-variance-authority";

export const sectionTitleVariants = cva("flex flex-col border-s-2 ps-2", {
  variants: {
    variant: {
      primary: "border-primary",
      dark: "border-foreground",
    },
    size: {
      mobileSize : "gap-2 md:gap-3 md:border-s-2 md:ps-4",
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
      mobileSize : "text-sm md:text-base",
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
      mobileSize : "text-[10px] md:text-xs",
      sm: "text-xs",
      md: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});