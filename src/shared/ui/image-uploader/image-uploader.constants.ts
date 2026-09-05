// _constants/image-uploader._constants.ts

import { Size } from "./image-uploader.types";

// نگاشت سایز به استایل CSS
export const sizeMap: Record<Size, React.CSSProperties> = {
  large: {
    width: "372px",
    height: "175px",
  },
  small: {
    width: "88px",
    height: "110px",
  },
};

// دریافت رنگ border بر اساس state
export const getBorderColor = (state: string): string => {
  return state === "error" ? "var(--color-danger)" : "var(--color-gray)";
};

// دریافت استایل پس‌زمینه بر اساس state
export const getBackground = (state: string): string => {
  return state === "error" ? "#fff5f5" : "var(--color-white)";
};
