"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Text } from "../../ui";
import {
  TOOLTIP_COLOR,
  GRID_COLOR,
  LINE_COLOR,
  LINE_GRADIENT_ID,
  AREA_GRADIENT_ID,
  DOT,
  TOOLTIP_ANIMATION,
} from "./line-chart.constants";
import { useLineChart } from "./useLineChart";
import type { LineChartProps } from "./line-chart.types";
import { MonthDropdown } from "../../ui/month-dropdown/month-dropdown.ui";
import { PERSIAN_MONTHS } from "../../utils/analytics";

export function LineChart({
  title,
  subtitle,
  icon,
  data,
  monthName,
  valueSuffix ,
  onMonthChange,
  daysInMonth,
  axisTitle,
  metricLabel 
}: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const {
    width,
    height,
    chartTop,
    chartBottom,
    paddingLeft,
    paddingRight,
    linePath,
    areaPath,
    gridLines,
    yAxisLabels,
    xAxisLabels,
    dateLabel,
    lineVariants,
    monthName: resolvedMonthName,
    activePoint,
    tooltip,
    cursorLine,
    handlePointerMove,
    handlePointerLeave,
    dataKey,
    hasData,
    // ✅ ترتیب آرگومان‌ها با امضای جدید useLineChart (valueSuffix قبل از پارامترهای اختیاری) هماهنگ شد
  } = useLineChart(data, valueSuffix, monthName, daysInMonth);

  const [selectedMonth, setSelectedMonth] = useState(resolvedMonthName);

  // اگه از بیرون (prop) عوض بشه، دراپ‌داون رو باهاش هماهنگ نگه می‌داریم
  useEffect(() => {
    setSelectedMonth(resolvedMonthName);
  }, [resolvedMonthName]);

  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month);
    onMonthChange?.(month);
  };

  // مختصات کلاینت رو به مختصات viewBox تبدیل می‌کنیم چون svg با w-full اسکیل می‌شه
  const handleMouseMove = (event: PointerEvent<SVGRectElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = width / rect.width;
    const svgX = (event.clientX - rect.left) * scaleX;
    handlePointerMove(svgX);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-md bg-accent/50 p-5">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex h-[2.4vw] w-[2.4vw] items-center justify-center rounded-full bg-secondary/20">
              {icon}
            </div>
            <div className="flex flex-col">
              <Text text={title} size="lg" color="secondary" weight="regular" />
              <Text text={subtitle} size="sm" color="secondary" weight="light" />
            </div>
          </div>

          <MonthDropdown
            months={PERSIAN_MONTHS}
            selectedMonth={selectedMonth}
            onSelectMonth={handleSelectMonth}
          />
        </div>
      </div>

      {/* Y-axis title */}
 <div className="mt-3 flex justify-end">
        <div className="flex flex-col items-start">
          <Text text={axisTitle} size="sm" color="secondary" weight="light" />
          <Text
            text={`${metricLabel}(${valueSuffix})`}
            size="sm"
            color="secondary"
            weight="light"
          />
        </div>
      </div>
      {/* Chart */}
      <div className="mt-1">
        {hasData ? (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full overflow-visible"
        >
          <defs>
            <linearGradient id={LINE_GRADIENT_ID} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={LINE_COLOR} stopOpacity={0.85} />
              <stop offset="100%" stopColor={LINE_COLOR} stopOpacity={1} />
            </linearGradient>
            <linearGradient id={AREA_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LINE_COLOR} stopOpacity={0.16} />
              <stop offset="100%" stopColor={LINE_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid با fade + stagger */}
          {gridLines.map((line, i) => (
            <motion.line
              // ✅ پیشوند "grid-" برای جلوگیری از تصادف key با xAxisLabels
              key={`grid-${dataKey}-${line.key}`}
              x1={line.x1}
              x2={line.x2}
              y1={line.y}
              y2={line.y}
              stroke={GRID_COLOR}
              strokeWidth={1}
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            />
          ))}

          {yAxisLabels.map((label) => (
            <text
              // ✅ پیشوند "y-" برای جلوگیری از تصادف key
              key={`y-${dataKey}-${label.key}`}
              x={label.x}
              y={label.y}
              textAnchor="end"
              className="fill-secondary/60 text-regular text-md"
            >
              {label.text}
            </text>
          ))}

          {/* X-Axis Labels با fade + stagger ملایم */}
          {xAxisLabels.map((label, i) => (
            <motion.text
              // ✅ پیشوند "x-" برای جلوگیری از تصادف key با gridLines/yAxisLabels
              key={`x-${dataKey}-${label.key}`}
              x={label.x}
              y={label.y}
              textAnchor={label.textAnchor ?? "middle"}
              className="fill-secondary/60 text-regular text-md"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.02 }}
            >
              {label.text}
            </motion.text>
          ))}

          <text
            x={dateLabel.x}
            y={dateLabel.y}
            textAnchor="start"
            className="fill-secondary text-light text-md "
          >
            تاریخ
          </text>

          {/* ناحیه‌ی کم‌رنگ زیر خط */}
          <path d={areaPath} fill={`url(#${AREA_GRADIENT_ID})`} stroke="none" />

          {/* خط اصلی — با key جدید هر بار داده عوض بشه دوباره کشیده می‌شه */}
          <motion.path
            key={dataKey}
            d={linePath}
            fill="none"
            stroke={`url(#${LINE_GRADIENT_ID})`}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            variants={lineVariants}
          />

          {/* ناحیه زیر خط هم fade بشه هماهنگ با خط */}
          <motion.path
            key={`${dataKey}-area`}
            d={areaPath}
            fill={`url(#${AREA_GRADIENT_ID})`}
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* خط راهنمای عمودی، از سقف تا کف چارت */}
          {cursorLine && (
            <line
              x1={cursorLine.x}
              x2={cursorLine.x}
              y1={cursorLine.y1}
              y2={cursorLine.y2}
              stroke={TOOLTIP_COLOR}
              strokeOpacity={0.25}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              className="pointer-events-none"
            />
          )}

          {/* فقط نقطه‌ی فعال (هاور شده) با هاله نشون داده می‌شه */}
          {activePoint && (
            <g className="pointer-events-none">
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r={DOT.haloRadius}
                fill={LINE_COLOR}
                fillOpacity={0.15}
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r={DOT.radius}
                fill={LINE_COLOR}
                stroke={LINE_COLOR}
                strokeWidth={DOT.strokeWidth}
              />
            </g>
          )}

          {/* لایه‌ی نامرئی برای گرفتن موقعیت ماوس روی کل ناحیه‌ی چارت */}
          <rect
            x={paddingLeft}
            y={chartTop}
            width={width - paddingLeft - paddingRight}
            height={chartBottom - chartTop}
            fill="transparent"
            onPointerMove={handleMouseMove}
            onPointerLeave={handlePointerLeave}
            className="cursor-default"
          />

          {/* Tooltip، همیشه داخل viewBox کلمپ شده */}
          <AnimatePresence>
            {tooltip && activePoint && (
              <motion.g
                key="tooltip"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{
                  duration: TOOLTIP_ANIMATION.duration,
                  ease: TOOLTIP_ANIMATION.ease,
                }}
                className="pointer-events-none "
              >
                <path
                  d={`M ${activePoint.x - 7},${tooltip.bottom} L ${
                    activePoint.x + 7
                  },${tooltip.bottom} L ${activePoint.x},${
                    tooltip.bottom + 8
                  } Z`}
                  fill={TOOLTIP_COLOR}
                />
                <rect
                  x={tooltip.x}
                  y={tooltip.y}
                  width={tooltip.width}
                  height={tooltip.height}
                  rx={16}
                  fill={TOOLTIP_COLOR}
                />
                <text
                  x={tooltip.x + tooltip.width / 2}
                  y={tooltip.y + 22}
                  textAnchor="middle"
                  fill="white"
                  fillOpacity={0.65}
                  className="text-regular text-md"
                >
                  {tooltip.dayText}
                </text>
                <text
                  x={tooltip.x + tooltip.width / 2}
                  y={tooltip.y + 42}
                  textAnchor="middle"
                  fill="white"
                  className="text-regular text-md"
                >
                  {tooltip.valueText}
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
        ) : (
          <div
            className="flex w-full items-center justify-center"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            <Text
              text="داده‌ای برای نمایش در این بازه ثبت نشده است"
              size="sm"
              color="secondary"
              weight="light"
            />
          </div>
        )}
      </div>
    </div>
  );
}