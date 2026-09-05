// _hooks/use-swiper-slider.ts
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

// هوک مدیریت منطق اسلایدر و وضعیت دکمه‌ها
export function useSwiperSlider() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return {
    isBeginning,
    isEnd,
    swiperRef,
    handleSwiper,
    handleSlideChange,
  };
}
