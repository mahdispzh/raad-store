// src/app/(landing)/_hooks/useLanding.ts
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_INTERVAL } from "../_constants/landing.constants";
import type { Slide } from "../_types/landing.types";

export function useCustomSlider(
  slides: Slide[],
  autoPlay: boolean = true,
  interval: number = DEFAULT_INTERVAL,
) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (!slides.length) return;
    const newIndex = (index + slides.length) % slides.length;
    setActiveIndex(newIndex);
  }, [slides.length]);

  const nextSlide = useCallback(() => goToSlide(activeIndex + 1), [activeIndex, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(activeIndex - 1), [activeIndex, goToSlide]);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide, slides.length]);

  return { activeIndex, goToSlide, nextSlide, prevSlide };
}

export function useProductCard() {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => setImageError(true);
  const resetImageError = () => setImageError(false);
  return { imageError, handleImageError, resetImageError };
}