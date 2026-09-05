"use client";

import { motion } from "motion/react";
import { Text } from "../../ui";
import { useBarChart } from "./useBarChart";
import type { BarChartProps } from "./bar-chart.types";



export function BarChart({
  title,
  subtitle,
  icon,
  data,
    valueSuffix = "", // ✅
}: BarChartProps) {
  const { bars, barVariants } = useBarChart(data);

  return (
    <div className="flex h-full w-full flex-col rounded-md bg-accent/50 p-5">
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="flex h-[2.4vw] w-[2.4vw] items-center justify-center rounded-full bg-secondary/20">
            {icon}
          </div>
         <div className="flex flex-col">
    <Text text={title} size="lg" color="secondary" weight="regular" />
                      <Text text={subtitle} size="sm" color="secondary" weight="light" />
            </div>

        </div>

       
      </div>

      {/* Chart */}
      <div className="pt-4 flex flex-1 justify-between px-[1vw] overflow-visible">
        {bars.map((item) => (
        <div
  key={item.day}
  className="group relative flex h-full flex-col justify-end items-center gap-2"
>
  <motion.div
    custom={item}
    initial="hidden"
    animate="visible"
    variants={barVariants}
    whileHover={{ opacity: 0.9 }}
    className={`relative w-[1.2vw] rounded-xs ${
      item.active ? "bg-secondary" : "bg-gray/75"
    }`}
  >
    <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-regular rounded bg-secondary px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {item.value.toLocaleString("fa-IR")}{valueSuffix ? ` ${valueSuffix}` : ""}
            </div>
  </motion.div>

  <Text text={item.day} size="sm" color="secondary" />
</div>
        ))}
      </div>

  
    </div>
  );
}