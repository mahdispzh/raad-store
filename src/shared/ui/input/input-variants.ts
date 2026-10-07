import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex items-center gap-3 rounded-full border border-primary bg-foreground/40 text-background transition-colors focus-within:ring-1 focus-within:ring-primary has-[:disabled]:opacity-50",
  {
    variants: {
      size: {
        md: "h-[35px] px-4 text-sm",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);