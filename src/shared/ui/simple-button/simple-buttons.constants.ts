const BASE_CLASSES =
  "transition-all flex items-center justify-center gap-2 w-full h-full";
const FONT_CLASSES = "text-[clamp(0.5rem,3vw,1rem)] text-medium";

export const getSizeClasses = (): string =>
  "aspect-[4] h-[3.5vw] max-h-[45px] min-h-[40px] w-full";

export const getStateStyles = (disabled: boolean): string =>
  disabled
    ? "cursor-not-allowed pointer-events-none"
    : "cursor-pointer active:scale-[0.98]";

export const getVariantClasses = (variant: string = "primary", disabled: boolean = false): string => {
  const common = `${BASE_CLASSES} ${FONT_CLASSES}`;

  if (disabled) {
    return `${common} text-gray-400`;
  }

  const variants: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-green-500",
    danger: "text-red-500",
  };

  return `${common} ${variants[variant] || variants.primary}`;
};