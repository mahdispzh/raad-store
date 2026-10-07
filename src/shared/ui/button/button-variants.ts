import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-foreground hover:bg-primary-hover",
        dark: "bg-foreground text-background hover:bg-grey",
        outline: "border border-foreground bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-8 text-base",
        lg: "h-16 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);