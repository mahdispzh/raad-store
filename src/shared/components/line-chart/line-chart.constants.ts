export const CHART_DIMENSIONS = {
  WIDTH: 760,
  HEIGHT: 340,

  AXIS_LEFT: 60,
  CHART_LEFT: 90,
  CHART_BOTTOM: 20,   // ← از 60 به 80 یا 90 افزایش دهید

  PADDING_RIGHT: 45,
  PADDING_BOTTOM: 10,  // ← از 36 به 50 افزایش دهید (برای عنوان "تاریخ")
  CHART_TOP: 20,
};

export const Y_TICK_COUNT = 5;
export const X_TICK_COUNT = 6;

export const DEFAULT_DAYS_IN_MONTH = 30;

export const GRID_COLOR = "#EAE7E4";

export const LINE_COLOR = "#8C6A55";
export const LINE_GRADIENT_ID = "line-chart-gradient";
export const AREA_GRADIENT_ID = "line-chart-area-gradient";

export const DOT = {
  radius: 5,
  haloRadius: 10,
  strokeWidth: 3,
} as const;

export const TOOLTIP_COLOR = "#3f3a37";
export const TOOLTIP_SIZE = {
  width: 150,
  height: 58,
  gap: 26,
} as const;

export const LINE_ANIMATION = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const TOOLTIP_ANIMATION = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1] as const,
};

