"use client";

import { LeftArrowCircledIcon } from "@/src/shared/constants/icons/left-arrow-circled-icon";
import { RightArrowCircledIcon } from "@/src/shared/constants/icons/right-arrow-circled-icon";
import { SliderButton } from "@/src/shared/ui";
import { SwiperNavButton } from "@/src/shared/ui/swiper-nav-button/swiper-nav-button.ui";
import { useEffect, useRef, useState } from "react";
import { TRANSITION_DURATION } from "../_constants/landing.constants";
import { useCustomSlider } from "../_hooks/useLanding";
import { CustomSliderProps, Slide } from "../_types/landing.types";

export function CustomSlider({
  slides,
  autoPlay = true,
  interval = 5000,
}: CustomSliderProps) {
  const { activeIndex, goToSlide, nextSlide, prevSlide } = useCustomSlider(
    slides,
    autoPlay,
    interval,
  );
  console.log("bbbbaner", slides);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX: number;
    if ("touches" in e) {
      const touch = e.touches[0];
      if (!touch) return;
      clientX = touch.clientX;
    } else {
      clientX = e.clientX;
    }
    setDragStart(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (dragStart === null) return;
    let clientX: number;
    if ("changedTouches" in e) {
      const touch = e.changedTouches[0];
      if (!touch) return;
      clientX = touch.clientX;
    } else {
      clientX = e.clientX;
    }
    const diff = clientX - dragStart;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setDragStart(null);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div
      className={`relative w-full transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } `}
    >
      <div
        ref={sliderRef}
        className="relative mx-auto h-[35vw] w-full cursor-grab overflow-hidden active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {slides.map((slide: Slide, idx: number) => (
          <div
            key={slide.id}
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
              idx === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              zIndex: idx === activeIndex ? 10 : 1,
              transitionDuration: `${TRANSITION_DURATION}ms`,
            }}
          >
            <img
              src={slide.image}
              alt={slide.alt || `اسلاید ${slide.id}`}
              className="pointer-events-auto absolute inset-0 h-full w-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}

        <div className="hidden lg:block">
          <SwiperNavButton
            direction="left"
            onClick={nextSlide}
            icon={<LeftArrowCircledIcon size="xl" />}
          />
        </div>

        <div className="hidden lg:block">
          <SwiperNavButton
            direction="right"
            onClick={prevSlide}
            icon={<RightArrowCircledIcon size="xl" />}
          />
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center py-2 sm:py-3 md:py-4">
        <SliderButton
          count={slides.length}
          activeIndex={activeIndex}
          onChange={(index: number) => goToSlide(index)}
        />
      </div>
    </div>
  );
}
