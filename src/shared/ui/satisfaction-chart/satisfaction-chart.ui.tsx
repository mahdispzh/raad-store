"use client";

import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { Subtitle } from "../subtitle/subtitle.ui";
import { Text } from "../text/text.ui";
import type { SatisfactionChartProps } from "./satisfaction-chart.types";
import { useSatisfactionChart } from "./useSatisfactionChart";

export function SatisfactionChart({
  title = "",
  total = "80%",
  fromTotal = "",
  fromTotalValue = 1000,
  data,
  className = "",
  chartPercentage = 80,
}: SatisfactionChartProps) {
  const { getItemColor, chartData } = useSatisfactionChart(chartPercentage);

  // محدود کردن percentage به حداکثر 100
  const displayTotal = chartPercentage > 100 ? "100%" : total;

  return (
    <div className={`flex h-full w-full flex-col p-4 ${className}`}>
      {/* Header */}
      <div className="mb-2 flex-shrink-0">
        <Text color="secondary" size="lg" text={title || ""} weight="bold" />
      </div>

      {/* Radial Chart - افزایش ارتفاع */}
      <div className="relative flex h-[15vw] w-full items-center justify-center">
        <ResponsiveContainer height="100%" width="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            data={chartData}
            endAngle={0}
            innerRadius="60%"
            outerRadius="90%"
            startAngle={180}
          >
            <PolarAngleAxis domain={[0, 100]} tick={false} type="number" />
            <RadialBar
              background={{ fill: "var(--color-white)" }}
              cornerRadius={10}
              dataKey="value"
              fill="var(--color-success)"
              isAnimationActive={true}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* متن‌های وسط */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Subtitle
            color="success"
            size="3xl"
            text={displayTotal}
            weight="bold"
          />
          {fromTotal && (
            <Text
              color="secondary"
              size="sm"
              text={`${fromTotal} `}
              weight="medium"
            />
          )}
        </div>
      </div>

      {/* Legend List - با عرض بهتر */}
      <div className="-mt-16 flex-shrink-0 space-y-2">
        {data.map((item, index) => {
          const color = getItemColor(index);
          return (
            <div
              key={index}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex-1">
                <Text
                  color="secondary"
                  size="sm"
                  text={item.name}
                  weight="regular"
                />
              </div>

              <div className="w-[7.5vw]">
                <div
                  className="h-2 overflow-hidden rounded-full bg-gray-200"
                  dir="ltr"
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(item.value, 100)}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>

              <div className="w-14 text-right">
                <Text
                  color="secondary"
                  size="sm"
                  text={`%${item.percent}`}
                  weight="medium"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
