"use client";

import { useMemo } from "react";
import type { Variants } from "motion/react";
import { BAR_ANIMATION } from "./bar-chart.constants";
import type { BarChartItem, DayReport } from "./bar-chart.types";

const MIN_BAR_HEIGHT = 12;
const MAX_BAR_HEIGHT = 100;

export function useBarChart(data: DayReport[]) {
  const bars: BarChartItem[] = useMemo(() => {
    if (!data.length) return [];

    const maxValue = Math.max(...data.map((item) => item.value));

    return data.map((item, index) => {
      let height = MIN_BAR_HEIGHT;

      if (maxValue > 0) {
        const ratio = item.value / maxValue;

        // نرم‌تر کردن اختلاف‌ها
        const normalized = Math.sqrt(ratio);

        height =
          MIN_BAR_HEIGHT +
          normalized * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);
      }

      return {
        ...item,
        height,
        delay: index * BAR_ANIMATION.staggerDelay,
        active: item.value === maxValue && maxValue > 0,
      };
    });
  }, [data]);

  const barVariants: Variants = {
    hidden: {
      height: 0,
    },
    visible: (item: BarChartItem) => ({
      height: `${item.height}%`,
      transition: {
        duration: BAR_ANIMATION.duration,
        delay: item.delay,
        ease: BAR_ANIMATION.ease,
      },
    }),
  };

  return {
    bars,
    barVariants,
  };
}