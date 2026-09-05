// _constants/swiper-nav-button._constants.ts
// دریافت کلاس موقعیت بر اساس جهت
export const getDirectionClass = (direction: "left" | "right"): string => {
  return direction === "left" ? "left-4" : "right-4";
};

// کلاس‌های پایه دکمه
export const baseButtonClasses = `
  absolute top-1/2 -translate-y-1/2 z-20
  p-2 rounded-full
  transition-all duration-300
`;
