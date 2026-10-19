import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-foreground hover:bg-primary-hover",
        dark: "bg-foreground text-background hover:bg-grey",
        outline: "border border-foreground bg-transparent text-foreground hover:bg-muted",
        primaryOutline: "border border-primary bg-transparent text-primary hover:bg-primary/10",
         darkPrimary: "bg-foreground text-primary",

      },
      size: {
        mobileSize:
           "h-5 px-1 text-[9px] [&_svg]:size-3 md:h-10 md:px-5 md:text-sm md:[&_svg]:size-6",
        xs: "h-8 px-3 text-sm [&_svg]:size-3.5",
        sm: "h-10 px-2 text-sm [&_svg]:size-4",
        md: "h-12 px-8 text-base [&_svg]:size-5",
        lg: "h-16 px-10 text-lg [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);