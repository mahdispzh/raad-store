// _constants/default-button.constants.ts

import { ButtonStyle, ButtonType } from "./default-button.types";
const BASE_CLASSES =
  "flex items-center justify-center gap-2 w-full h-full select-none transition-[background-color,border-color,color,transform,opacity] duration-200 ease-out will-change-transform";
const FONT_CLASSES = "text-[clamp(0.5rem,3vw,1rem)] text-medium";

/***دریافت کلاس‌های سایز*/
export const getSizeClasses = (): string =>
  "aspect-[4] h-[2.5vw] max-h-[45px] min-h-[40px] w-full";

/***دریافت کلاس rounded*/
export const getRoundedClass = (rounded: boolean = false): string =>
  rounded ? "rounded-full" : "rounded-[10px]";

/*** دریافت کلاس‌های state (cursor / active scale)*/
export const getStateStyles = (
  disabled: boolean,
  isLoading: boolean,
): string =>
  disabled || isLoading
    ? "cursor-not-allowed pointer-events-none opacity-60"
    : "cursor-pointer active:scale-[0.97]";
/*** دریافت کلاس‌های واریانت (رنگ‌ها بر اساس type/style/disabled/loading)*/
export const getVariantClasses = (
  type: ButtonType = "primary",
  style: ButtonStyle = "fill",
  isLoading: boolean = false,
  disabled: boolean = false,
): string => {
  const common = `${BASE_CLASSES} ${FONT_CLASSES}`;

  if (disabled) {
    return style === "fill"
      ? `${common} bg-gray text-white cursor-not-allowed`
      : `${common} bg-transparent border-2 border-gray text-gray cursor-not-allowed`;
  }

  const hoverFill = isLoading ? "" : " hover:bg-primary/90";

  const variants: Record<ButtonType, Record<ButtonStyle, string>> = {
    primary: {
      fill: `${common} bg-primary text-accent${hoverFill}`,
      outline: `${common} bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-accent`,
    },
    secondary: {
      fill: `${common}
bg-danger
text-white
border-2
border-danger
hover:bg-danger/90
`,

      outline: `${common}
    bg-transparent
    border-2
    border-danger
    text-danger
    hover:bg-danger/10
    hover:border-danger
    hover:text-danger
   `,
    },
  };

  return variants[type][style];
};
