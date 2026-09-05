// _types/slider-button._types.ts
export interface SliderButtonProps {
  count: number;
  activeIndex: number;
  onChange: (index: number) => void;
}
