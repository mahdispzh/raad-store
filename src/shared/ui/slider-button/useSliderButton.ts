// _hooks/use-slider-button.ts
export function useSliderButton(activeIndex: number) {
  const getButtonClass = (index: number) => {
    const isActive = index === activeIndex;

    if (isActive) {
      return [
        "cursor-pointer rounded-full transition-all duration-300",
        "h-2.5 w-5", // موبایل: 10px × 20px
        "sm:h-3 sm:w-6", // تبلت: 12px × 24px
        "md:h-3.5 md:w-7", // تبلت بزرگ: 14px × 28px
        "lg:h-[0.63vw] lg:w-[1.35vw]", // دسکتاپ: ریسپانسیو
        "bg-primary",
        "hover:scale-110",
      ].join(" ");
    }
    
    return [
      "cursor-pointer rounded-full transition-all duration-300",
      "h-2.5 w-2.5", // موبایل: 10px × 10px
      "sm:h-3 sm:w-3", // تبلت: 12px × 12px
      "md:h-3.5 md:w-3.5", // تبلت بزرگ: 14px × 14px
      "lg:h-[0.63vw] lg:w-[0.63vw]", // دسکتاپ: ریسپانسیو
      "bg-accent opacity-50",
      "hover:opacity-100 hover:scale-110",
    ].join(" ");
  };

  return { getButtonClass };
}