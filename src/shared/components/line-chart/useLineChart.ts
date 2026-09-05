"use client";

import { useMemo, useState, useCallback } from "react";
import type { Variants } from "motion/react";
import {
  CHART_DIMENSIONS,
  Y_TICK_COUNT,
  TOOLTIP_SIZE,
  LINE_ANIMATION,

} from "./line-chart.constants";
import type {
  ChartPoint,
  AxisLabel,
  GridLine,
  TooltipBox,
  MonthlyPoint,
} from "./line-chart.types";
import { getDaysInJalaliMonth } from "../../utils/analytics";

const {
  WIDTH,
  HEIGHT,
  AXIS_LEFT,
  CHART_LEFT,
  CHART_BOTTOM: CHART_BOTTOM_OFFSET, // ✅ استفاده از مقدار جدید
  PADDING_RIGHT,
  PADDING_BOTTOM,
  CHART_TOP,
} = CHART_DIMENSIONS;

// موقعیت Y پایین نمودار (از بالا)
const CHART_BOTTOM_Y = HEIGHT - CHART_BOTTOM_OFFSET;

const TOOLTIP_MARGIN = 6;

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]!);
}

function formatValue(value: number, suffix: string): string {
  return `${toPersianDigits(value.toLocaleString("en-US"))} ${suffix}`;
}

function formatCompact(tick: number): string {
  if (tick === 0) return "۰";
  const abs = Math.abs(tick);

  if (abs >= 1_000_000) {
    const short = trimTrailingZero(tick / 1_000_000);
    return `${toPersianDigits(short)}M`;
  }
  if (abs >= 1_000) {
    const short = trimTrailingZero(tick / 1_000);
    return `${toPersianDigits(short)}K`;
  }
  return toPersianDigits(tick);
}

function trimTrailingZero(value: number): string {
  return value % 1 === 0 ? String(value) : value.toFixed(1);
}

function getNiceMax(rawMax: number): number {
  if (rawMax <= 0) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rawMax)));
  const normalized = rawMax / magnitude;
  const niceNormalized =
    normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return niceNormalized * magnitude;
}

function getCurrentPersianMonthName(): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { month: "long" }).format(
    new Date()
  );
}

function getMonotonePath(points: ChartPoint[]): string {
  const n = points.length;
  if (n === 0) return "";
  if (n === 1) return `M ${points[0]!.x},${points[0]!.y}`;

  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i]!;
    const p1 = points[i + 1]!;
    dx[i] = p1.x - p0.x;
    slope[i] = (p1.y - p0.y) / dx[i]!;
  }

  const tangents: number[] = new Array(n).fill(0);
  tangents[0] = slope[0]!;
  tangents[n - 1] = slope[n - 2]!;
  for (let i = 1; i < n - 1; i++) {
    tangents[i] =
      slope[i - 1]! * slope[i]! <= 0 ? 0 : (slope[i - 1]! + slope[i]!) / 2;
  }

  for (let i = 0; i < n - 1; i++) {
    if (slope[i] === 0) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i]! / slope[i]!;
    const b = tangents[i + 1]! / slope[i]!;
    const h = Math.hypot(a, b);
    if (h > 3) {
      const t = 3 / h;
      tangents[i] = t * a * slope[i]!;
      tangents[i + 1] = t * b * slope[i]!;
    }
  }

  let d = `M ${points[0]!.x},${points[0]!.y}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i]!;
    const p1 = points[i + 1]!;
    const step = dx[i]! / 3;
    d += ` C ${p0.x + step},${p0.y + tangents[i]! * step} ${
      p1.x - step
    },${p1.y - tangents[i + 1]! * step} ${p1.x},${p1.y}`;
  }

  return d;
}

// ✅ تابع اصلاح‌شده برای حذف تیک ۳۰ در ماه‌های ۳۱ روزه
function getNiceDayTicks(daysInMonth: number): number[] {
  const step = 5;
  const ticks = [1];
  for (let day = step; day < daysInMonth; day += step) {
    ticks.push(day);
  }

  const lastTick = ticks[ticks.length - 1];

  // اگر آخرین روز مضرب 5 نباشد و آخرین تیک فعلی مضرب 5 باشد
  if (daysInMonth % step !== 0 && lastTick === daysInMonth - (daysInMonth % step)) {
    ticks.pop(); // حذف تیک قبلی (مثلاً 30)
  }

  if (ticks[ticks.length - 1] !== daysInMonth) {
    ticks.push(daysInMonth); // اضافه کردن آخرین روز (مثلاً 31)
  }

  return ticks;
}

// ✅ ترتیب پارامترها اصلاح شد: پارامتر اجباری (valueSuffix) قبل از پارامترهای
// اختیاری (monthNameProp, daysInMonthProp) اومده. در TS پارامتر اجباری
// نمی‌تونه بعد از پارامتر اختیاری بیاد (خطای TS1016).
export function useLineChart(
  data: MonthlyPoint[],
  valueSuffix: string,
  monthNameProp?: string,
  daysInMonthProp?: number
) {
  const monthName = monthNameProp ?? getCurrentPersianMonthName();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // اگر اصلاً رکوردی برای این بازه نیومده، یا همه‌ی مقادیر صفرن، یعنی کامنتی
  // ثبت نشده — این رو قبل از zero-fill کردن روزها چک می‌کنیم، وگرنه بعد از
  // fill همیشه یه آرایه‌ی پر با value:0 داریم و تشخیص «خالی بودن» ممکن نیست.
  const hasData = data.length > 0 && data.some((point) => point.value > 0);

  const xMin = 1;
  const xMax = daysInMonthProp ?? getDaysInJalaliMonth(monthName);
  const filledData: MonthlyPoint[] = useMemo(() => {
    const valueByDay = new Map(data.map((d) => [d.day, d.value]));
    const filled: MonthlyPoint[] = [];
    for (let day = xMin; day <= xMax; day++) {
      filled.push({ day, value: valueByDay.get(day) ?? 0 });
    }
    return filled;
  }, [data, xMax]);

  const rawYMax = useMemo(
    () =>
      filledData.length ? Math.max(...filledData.map((d) => d.value)) : 0,
    [filledData]
  );
  const yMax = useMemo(() => getNiceMax(rawYMax), [rawYMax]);

  const xScale = (day: number): number => {
    const innerWidth = WIDTH - CHART_LEFT - PADDING_RIGHT;
    return CHART_LEFT + ((day - xMin) / (xMax - xMin)) * innerWidth;
  };

  const yScale = (value: number): number => {
    const innerHeight = CHART_BOTTOM_Y - CHART_TOP;
    return CHART_BOTTOM_Y - (value / yMax) * innerHeight;
  };

  const points: ChartPoint[] = useMemo(
    () => filledData.map((p) => ({ ...p, x: xScale(p.day), y: yScale(p.value) })),
    [filledData, xMin, xMax, yMax]
  );

  const linePath = useMemo(() => getMonotonePath(points), [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const first = points[0]!;
    const last = points[points.length - 1]!;
    return `${linePath} L ${last.x},${CHART_BOTTOM_Y} L ${first.x},${CHART_BOTTOM_Y} Z`;
  }, [linePath, points]);

  // ✅ کلید = ایندکس حلقه (i)، نه مقدار گرد شده‌ی تیک.
  // وقتی yMax کوچیکه (مثلاً ۳ یا ۶)، چند تیک بعد از Math.round می‌تونن به یک
  // عدد یکسان گرد بشن (مثلاً تیک سوم و چهارم هر دو بشن 2) و چون key قبلاً
  // همون مقدار گرد شده بود، این باعث تصادف key بین اعضای خودِ همین آرایه می‌شد.
  const gridLines: GridLine[] = useMemo(
    () =>
      Array.from({ length: Y_TICK_COUNT }, (_, i) => {
        const tick = Math.round((yMax * i) / (Y_TICK_COUNT - 1));
        return {
          key: i,
          x1: CHART_LEFT,
          x2: WIDTH - PADDING_RIGHT,
          y: yScale(tick),
        };
      }),
    [yMax]
  );

  const yAxisLabels: AxisLabel[] = useMemo(
    () =>
      Array.from({ length: Y_TICK_COUNT }, (_, i) => {
        const tick = Math.round((yMax * i) / (Y_TICK_COUNT - 1));
        return {
          key: i,
          x: AXIS_LEFT - 14,
          y: yScale(tick) + 5,
          text: formatCompact(tick),
        };
      }),
    [yMax]
  );

  const xTicks = useMemo(() => getNiceDayTicks(xMax), [xMax]);

  const xAxisLabels: AxisLabel[] = useMemo(
    () =>
      xTicks.map((tick, index) => ({
        key: tick,
        x: xScale(tick),
        y: CHART_BOTTOM_Y + 20, // ← از 5 به 20 یا بیشتر افزایش دهید
        text: toPersianDigits(tick),
        textAnchor: index === xTicks.length - 1 ? "end" : "middle",
      })),
    [xTicks]
  );
  const dateLabel = {
    x: WIDTH - PADDING_RIGHT + 50, // ← ۳۰ پیکسل از لبه‌ی راست فاصله بگیرد
    y: CHART_BOTTOM_Y + PADDING_BOTTOM + 8,
    textAnchor: "start", // ← چپ‌چین (همانند قبل)
  };
  const lineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: LINE_ANIMATION.duration, ease: LINE_ANIMATION.ease },
    },
  };

  const handlePointerMove = useCallback(
    (svgX: number) => {
      if (points.length === 0) return;
      let nearestIndex = 0;
      let nearestDistance = Infinity;
      for (let i = 0; i < points.length; i++) {
        const distance = Math.abs(points[i]!.x - svgX);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }
      setActiveIndex(nearestIndex);
    },
    [points]
  );

  const handlePointerLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const activePoint = activeIndex !== null ? points[activeIndex] ?? null : null;

  const tooltip: TooltipBox | null = useMemo(() => {
    if (!activePoint) return null;
    const { width, height, gap } = TOOLTIP_SIZE;

    const bottom = activePoint.y - gap;
    const rawX = activePoint.x - width / 2;
    const clampedX = Math.min(
      Math.max(rawX, TOOLTIP_MARGIN),
      WIDTH - width - TOOLTIP_MARGIN
    );
    const rawY = bottom - height;
    const clampedY = Math.max(rawY, TOOLTIP_MARGIN);

    return {
      x: clampedX,
      y: clampedY,
      width,
      height,
      bottom,
      dayText: `روز ${toPersianDigits(activePoint.day)}`,
      valueText: formatValue(activePoint.value, valueSuffix),
    };
  }, [activePoint, valueSuffix]);

  const cursorLine = activePoint
    ? { x: activePoint.x, y1: CHART_TOP, y2: CHART_BOTTOM_Y }
    : null;
  const dataKey = `${monthName}-${xMax}-${filledData.map((d) => d.value).join(",").length}`;
  return {
    width: WIDTH,
    height: HEIGHT,
    chartTop: CHART_TOP,
    chartBottom: CHART_BOTTOM_Y,
    paddingLeft: CHART_LEFT,
    paddingRight: PADDING_RIGHT,
    points,
    linePath,
    areaPath,
    gridLines,
    yAxisLabels,
    xAxisLabels,
    dateLabel,
    lineVariants,
    monthName,
    activeIndex,
    activePoint,
    tooltip,
    cursorLine,
    handlePointerMove,
    handlePointerLeave,
    dataKey,
    hasData,
  };
}