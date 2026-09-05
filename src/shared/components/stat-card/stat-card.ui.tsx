"use client";

import {
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  TomanIcon,
} from "../../constants/icons";
import { Caption, Subtitle, Text } from "../../ui";
import { StatCardProps } from "./stat-card.types";
import { useStatCard } from "./useStatCard";

export function StatCard({
  title,
  value,
  valueType = "custom",
  unit,
  percent,
  comparePeriod = "day",
}: StatCardProps) {
  const {
    isPositive,
    formattedValue,
    absolutePercent,
    compareText,
  } = useStatCard({
    value,
    percent,
    valueType,
    comparePeriod,
  });

  return (
    <div className="relative w-full aspect-[138/118]">

      {/* Background */}
      <svg
        viewBox="0 0 138 118"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity=".5"
          d="M138 13.3585L138 104.642C138 106.396 137.643 108.133 136.95 109.754C136.256 111.374 135.24 112.847 133.958 114.087C132.677 115.328 131.155 116.312 129.481 116.983C127.807 117.654 126.012 118 124.2 118L62.1 118C56.61 118 51.3449 115.889 47.4629 112.131C43.5809 108.373 41.4 103.277 41.4 97.9623C41.4 92.6479 39.2191 87.5512 35.3371 83.7934C31.4551 80.0356 26.19 77.9245 20.7 77.9245C15.21 77.9245 9.9449 75.8134 6.0629 72.0556C2.18089 68.2978 0 63.2011 0 57.8868V13.3585C0 9.8156 1.45393 6.41781 4.04193 3.91261C6.62993 1.40741 10.14 0 13.8 0L124.2 0C127.86 0 131.37 1.40741 133.958 3.91261C136.546 6.41781 138 9.8156 138 13.3585Z"
          fill="currentColor"
          className="text-accent"
        />

        <circle
          opacity=".5"
          cx="17.5"
          cy="17.5"
          r="17.5"
          transform="matrix(0 -1 -1 0 35 118)"
          fill="currentColor"
          className="text-accent"
        />
      </svg>

      {/* Overlay */}
      <div className="absolute inset-0">

        {/* Header */}
        <div className="absolute top-[10%] left-[8%] right-[8%]">
          <Text
            text={title}
            size="md"
            color="secondary"
          />

          <div className="mt-[15%] flex items-center gap-1">
            <Subtitle
              text={formattedValue}
              size="2xl"
              weight="bold"
              color="secondary"
            />

            {valueType === "price" && (
              <TomanIcon
                size="sm"
                color="text-secondary"
              />
            )}

            {valueType === "custom" && unit && (
              <Text
                text={unit}
                size="sm"
                color="secondary"
              />
            )}
          </div>
        </div>

        {/* Bottom Left */}
        <div className="absolute left-[8%] bottom-[8%] flex items-center justify-center">
          {isPositive ? (
            <ArrowUpwardIcon
              size="sm"
              color="text-success"
            />
          ) : (
            <ArrowDownwardIcon
              size="sm"
              color="text-danger"
            />
          )}
        </div>

        {/* Bottom Right */}
        <div className="absolute right-[8%] bottom-[5%] flex items-center gap-1">
          <Caption
            text={`%${absolutePercent}`}
            size="xs"
            weight="bold"
            color={isPositive ? "success" : "danger"}
          />

          <Caption
            text={compareText}
            size="xs"
            color="secondary"
          />
        </div>

      </div>
    </div>
  );
}