// _types/swiper-slider._types.ts
import { SwiperProps } from "swiper/react";

export interface SwiperSliderProps extends SwiperProps {
  sliderId: string;
  children: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
    compact?: boolean; // ✅ اضافه کن

}
