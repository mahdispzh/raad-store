// src/app/(landing)/_constants/landing.constants.ts

// ==================== Category Slider ====================
export const categorySliderBreakpoints = {
  0: { slidesPerView: 1.2, spaceBetween: 10 },
  380: { slidesPerView: 1.6, spaceBetween: 10 },
  480: { slidesPerView: 2, spaceBetween: 10 },
  640: { slidesPerView: 2.5, spaceBetween: 18 },
  768: { slidesPerView: 3.5, spaceBetween: 20 },
  1024: { slidesPerView: 5, spaceBetween: 24 },
  1280: { slidesPerView: 5, spaceBetween: 28 },
};

export const SECTION_TITLE = "خرید بر اساس دسته‌بندی";

// ==================== Custom Slider ====================
export const DEFAULT_INTERVAL = 5000;
export const TRANSITION_DURATION = 700;

// ==================== Product Slider ====================
export const productSliderBreakpoints = {
  320: { slidesPerView: 2, spaceBetween: 10 },
  480: { slidesPerView: 2.5, spaceBetween: 12 },
  640: { slidesPerView: 3, spaceBetween: 14 },
  768: { slidesPerView: 4, spaceBetween: 16 },
  1024: { slidesPerView: 5, spaceBetween: 20 },
  1280: { slidesPerView: 6, spaceBetween: 24 },
};

export const SPACE_BETWEEN = 16;

// ==================== Product Card ====================
export const DEFAULT_STOCK = 1;

// ==================== Category Card ====================
export const IMAGE_CONTAINER_CLASS =
  "w-[35vw] sm:w-[28vw] md:w-[22vw] lg:w-[15vw] h-[46vw] sm:h-[37vw] md:h-[29vw] lg:h-[20vw] rounded-md overflow-hidden relative mx-auto";

export const IMAGE_CLASS =
  "object-cover group-hover:scale-105 transition-transform duration-300";

// ==================== Product Section ====================
export const DEFAULT_SECTION_PADDING = "px-4 sm:px-10 md:px-16 lg:px-20";
export const DEFAULT_TITLE_VARIANT = "default";