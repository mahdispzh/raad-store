// _types/swiper-nav-button._types.ts
export interface SwiperNavButtonProps {
  direction: "left" | "right";
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
