"use client";

import { Fragment } from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Text } from "../../ui";
import { useRadialChart, toPersianDigits, formatToman } from "./useRadialChart";
import type { RadialChartProps } from "./radial-chart.types";
import {
  RADIAL_CHART_INNER_RADIUS,
  RADIAL_CHART_OUTER_RADIUS,
  RADIAL_CHART_CORNER_RADIUS,
  DEFAULT_RADIAL_CHART_CENTER_UNIT,
} from "./radial-chart.constants";

export function RadialChart({
  icon,
  title,
  periodLabel,
  data,
  centerValue,
  centerUnit = DEFAULT_RADIAL_CHART_CENTER_UNIT,
}: RadialChartProps) {
  const { resolvedData, chartConfig, chartData, stackTotal, reversedData } =
    useRadialChart(data);

  return (
    <div className="w-[32vw] min-w-0 rounded-md bg-accent/50 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-[2.3vw] w-[2.3vw] flex-shrink-0 items-center justify-center rounded-full bg-secondary/20">
            {icon}
          </div>
          <Text text={title} size="lg" color="secondary" weight="regular" />
        </div>
        <div className="rounded-xs border-1 border-secondary px-6 py-2">
          <Text
            text={periodLabel}
            size="sm"
            color="secondary"
            weight="regular"
          />
        </div>
      </div>

      {/* Chart */}
      <div className="relative mx-auto mt-4 aspect-square max-h-[240px]">
<ChartContainer
  config={chartConfig}
  className="relative z-10 h-full w-full"
>          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={-270}
            innerRadius={RADIAL_CHART_INNER_RADIUS}
            outerRadius={RADIAL_CHART_OUTER_RADIUS}
          >
            <ChartTooltip
              cursor={false}
              content={({ active }) => {
                if (!active) return null;

                return (
                  <div className="rounded-xs bg-secondary px-3 py-2 ">
                    {resolvedData.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-6 py-1"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs text-white text-regular">
                            {item.label}
                          </span>
                        </div>

                        <span className="text-medium text-xs text-white">
                          ٪{toPersianDigits(Math.round(item.value))}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              }}
            />

            <PolarAngleAxis
              type="number"
              domain={[0, stackTotal]}
              angleAxisId={0}
              tick={false}
            />

            {resolvedData.map((item, index) => (
              <Fragment key={item.key}>
                <RadialBar
                  dataKey={item.key}
                  stackId="a"
                  cornerRadius={RADIAL_CHART_CORNER_RADIUS}
                  fill={item.color}
                  className="stroke-transparent stroke-2"
                />

                {index < resolvedData.length - 1 && (
                  <RadialBar
                    dataKey={`gap${index}`}
                    stackId="a"
                    fill="transparent"
                    legendType="none"
                  />
                )}
              </Fragment>
            ))}
          </RadialBarChart>
        </ChartContainer>

      <div
  className="
    pointer-events-none
    absolute
    left-1/2
    top-1/2
    z-0
    -translate-x-1/2
    -translate-y-1/2
  "
>
  <div className="flex h-[135px] w-[135px] flex-col items-center justify-center rounded-full border-6 border-secondary/30 bg-transparent">
    <Text
      text={formatToman(centerValue)}
      size="lg"
      color="secondary"
      weight="bold"
    />
    <Text
      text={centerUnit}
      size="sm"
      color="secondary"
      weight="light"
    />
  </div>
</div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-between px-14">
        {reversedData.map((item) => (
          <div key={item.key} className="flex flex-col items-center gap-1">
            <Text
              text={toPersianDigits(item.unitsSold)}
              size="lg"
              color="secondary"
              weight="bold"
            />
            <div className="flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <Text
                text={item.label}
                size="sm"
                color="secondary"
                weight="regular"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}