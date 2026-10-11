import { cva } from "class-variance-authority";

export const tabVariants = cva(
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-foreground px-5 text-sm font-medium transition-colors cursor-pointer",
  {
    variants: {
      active: {
        true: "bg-foreground text-primary",
        false: "bg-background text-foreground hover:bg-muted",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);