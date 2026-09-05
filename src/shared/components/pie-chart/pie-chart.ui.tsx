"use client";

import { Pie, PieChart, type PieLabelRenderProps } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Text } from "../../ui";
import { usePieChart, toPersianDigits } from "./usePieChart";
import type { PieChartProps } from "./pie-chart.types";
import {
  PIE_CHART_OUTER_RADIUS,
  PIE_CHART_LABEL_OFFSET,
  PIE_CHART_LABEL_LINE_OFFSET,
  PIE_CHART_MIN_LABEL_PERCENT,
  DEFAULT_PIE_CHART_UNIT,
} from "./pie-chart.constants";

function renderPercentLabel({
  cx = 0,
  cy = 0,
  midAngle = 0,
  outerRadius = 0,
  percent = 0,
}: PieLabelRenderProps) {
  // اسلایس‌های خیلی کوچیک لیبل نمی‌گیرن؛ مقدارشون توی legend پایین کارت هست
  if (Number(percent) < PIE_CHART_MIN_LABEL_PERCENT) return null;

  const RADIAN = Math.PI / 180;
  const radius = Number(outerRadius) + PIE_CHART_LABEL_OFFSET;
  const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className="fill-primary text-regular text-md"
    >
      {`٪${toPersianDigits(Math.round(Number(percent) * 100))}`}
    </text>
  );
}

function renderLabelLine({
  cx = 0,
  cy = 0,
  midAngle = 0,
  outerRadius = 0,
  percent = 0,
}: PieLabelRenderProps) {
  if (Number(percent) < PIE_CHART_MIN_LABEL_PERCENT) return <></>;

  const RADIAN = Math.PI / 180;
  const angle = -Number(midAngle) * RADIAN;
  const startRadius = Number(outerRadius);
  const endRadius = startRadius + PIE_CHART_LABEL_LINE_OFFSET;

  const x1 = Number(cx) + startRadius * Math.cos(angle);
  const y1 = Number(cy) + startRadius * Math.sin(angle);
  const x2 = Number(cx) + endRadius * Math.cos(angle);
  const y2 = Number(cy) + endRadius * Math.sin(angle);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--color-primary)"
      strokeWidth={1}
    />
  );
}

export function PieChartCard({
  icon,
  title,
  data,
  unit = DEFAULT_PIE_CHART_UNIT,
}: PieChartProps) {
  const { chartData, sortedData, chartConfig } = usePieChart(data);

  return (
    <div className="w-full min-w-0 rounded-md bg-accent/50 p-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20">
          {icon}
        </div>
        <Text text={title} size="lg" color="secondary" weight="regular" />
      </div>

      {/* Chart */}
      <ChartContainer
        config={chartConfig}
        className="mx-auto mt-2 aspect-square [&_.recharts-pie-label-text]:fill-primary"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              const item = payload?.[0];
              if (!active || !item) return null;

              const key = item.payload.key as string;

              return (
                <div className="rounded bg-secondary px-3 py-2 text-xs text-white text-light">
                  <div>{chartConfig[key]?.label}</div>
                  <div>
                    {toPersianDigits(Number(item.value))} {unit}
                  </div>
                </div>
              );
            }}
          />

          <Pie
            data={chartData}
            dataKey="count"
            nameKey="key"
            label={renderPercentLabel}
            labelLine={renderLabelLine}
            outerRadius={PIE_CHART_OUTER_RADIUS}
          />
        </PieChart>
      </ChartContainer>

      {/* Legend */}
      <div className="mt-4 flex justify-between px-2">
        {sortedData.map((item) => (
          <div key={item.key} className="flex flex-col items-center gap-1">
            <Text
              text={toPersianDigits(item.value)}
              size="lg"
              color="secondary"
              weight="bold"
            />
            <div className="flex items-center gap-1">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <Text text={item.label} size="sm" color="secondary" weight="regular" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}