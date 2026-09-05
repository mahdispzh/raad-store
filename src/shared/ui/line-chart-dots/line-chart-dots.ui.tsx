// _components/line-chart-dots.tsx
"use client";

import { useState } from "react";
import {
  CartesianGrid, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Text } from "@/src/shared/ui";
import { DropdownArrowIcon } from "../../constants/icons";
import { 
  ChartDataProps, 
  ChartDatum, 
  Period, 
  PERIOD_OPTIONS, 
  TooltipItem,
  PaymentsDashboardResponse 
} from "./line-chart-dots.types";
import { formatJalaliDate, formatPersianNumber } from "./line-chart-dots.utils";
import { CustomTooltip } from "./custom-tooltip";

// تابع برای ساخت داده‌های چارت
function buildChartData(
  period: Period,
  data: PaymentsDashboardResponse | undefined
): ChartDatum[] {
  if (!data?.charts) return [];

  const { charts } = data;
  
  if (period === "ماهانه") {
    const countMap = new Map(charts.monthlyPayments.map((d) => [d.month, d.count]));
    return charts.monthlyIncome
      .slice()
      .reverse()
      .map((d) => ({
        date: d.month,
        income: d.income,
        count: countMap.get(d.month) ?? 0,
      }));
  }

  const daily = fillDailyRange(charts.incomeLast30Days, charts.paymentsLast30Days);
  return period === "هفتگی" ? daily.slice(-7) : daily;
}

function fillDailyRange(
  incomeLast30Days: { date: string; income: number }[],
  paymentsLast30Days: { date: string; count: number }[],
): ChartDatum[] {
  const incomeMap = new Map(
    incomeLast30Days.map((d) => [toDateKey(new Date(d.date)), d.income]),
  );
  const countMap = new Map(
    paymentsLast30Days.map((d) => [toDateKey(new Date(d.date)), d.count]),
  );

  const allKeys = [...incomeMap.keys(), ...countMap.keys()];
  if (allKeys.length === 0) return [];

  const sortedKeys = allKeys.sort();
  const firstKey = sortedKeys[0];
  if (!firstKey) return [];

  const firstDate = new Date(firstKey);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result: ChartDatum[] = [];
  for (
    let cur = new Date(firstDate);
    cur <= today;
    cur.setDate(cur.getDate() + 1)
  ) {
    const key = toDateKey(cur);
    result.push({
      date: key,
      income: incomeMap.get(key) ?? 0,
      count: countMap.get(key) ?? 0,
    });
  }
  return result;
}

function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// کامپوننت اصلی
export function LineChartDots({ 
  data, 
  isLoading = false, 
  title = "وضعیت پرداخت",
  showLegend = true,
  height = 320,
  className = "",
}: ChartDataProps) {
  const [period, setPeriod] = useState<Period>(PERIOD_OPTIONS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const chartData: ChartDatum[] = buildChartData(period, data);

  return (
    <div className={`flex h-auto w-full flex-col rounded-sm bg-pure-white shadow-xl ${className}`}>
      {/* هدر */}
      <div className="flex flex-row items-center justify-between px-6 py-4">
        <Text text={title} size="lg" color="secondary" weight="bold" />
        <PeriodDropdown 
          period={period}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onSelect={(p) => { setPeriod(p); setIsOpen(false); }}
        />
      </div>

      <div className="border-b-2 border-accent" />

      {/* Legend */}
      {showLegend && <ChartLegend />}

      {/* چارت */}
      <div className={`w-full px-4 pb-6 pt-2`} style={{ height }}>
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Text text="در حال بارگذاری..." size="sm" color="secondary" weight="regular" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: 0, right: 0, top: 20, bottom: 0 }}>
              <CartesianGrid vertical horizontal={false} stroke="var(--color-gray)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fontSize: 11, fill: "var(--color-secondary)", style: { fontFamily: "var(--font-primary)" } }}
                tickFormatter={(value: string) => formatJalaliDate(value)}
              />
              <YAxis
                yAxisId="income"
                orientation="left"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={70}
                tick={{ fontSize: 11, fill: "var(--color-primary)", style: { fontFamily: "var(--font-primary)" } }}
                tickFormatter={(v: number) => formatPersianNumber(v)}
              />
              <YAxis
                yAxisId="count"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={40}
                tick={{ fontSize: 11, fill: "var(--color-primary)", style: { fontFamily: "var(--font-primary)" } }}
                tickFormatter={(v: number) => formatPersianNumber(v)}
              />
              <Tooltip
                cursor={false}
                content={(props) => (
                  <CustomTooltip
                    active={props.active}
                    label={props.label as string}
                    payload={props.payload as unknown as TooltipItem[]}
                  />
                )}
              />
              <Line
                yAxisId="income"
                dataKey="income"
                type="natural"
                stroke="var(--color-success)"
                strokeWidth={2}
                dot={{ fill: "var(--color-secondary)", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="count"
                dataKey="count"
                type="natural"
                stroke="var(--color-danger)"
                strokeWidth={2}
                dot={{ fill: "var(--color-secondary)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

// کامپوننت‌های فرعی
function PeriodDropdown({ period, isOpen, onToggle, onSelect }: { 
  period: Period; 
  isOpen: boolean; 
  onToggle: () => void; 
  onSelect: (p: Period) => void; 
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="flex flex-row items-center gap-2 rounded-sm border border-gray px-3 py-1.5 text-primary cursor-pointer"
      >
         <div  className={` transition-transform ${isOpen ? "rotate-180" : ""}`}>
 <DropdownArrowIcon 
          size="xs"  // استفاده از size به جای کلاس مستقیم
         
        />
        </div>
        <Text text={period} size="sm" color="primary" weight="regular" />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 w-full min-w-25 overflow-hidden rounded-sm bg-pure-white shadow-modal">
          {PERIOD_OPTIONS.map((option) => (
            <button 
              key={option} 
              type="button" 
              onClick={() => onSelect(option)} 
              className="block w-full px-3 py-2 text-right hover:bg-modal-item"
            >
              <Text text={option} size="sm" color="primary" weight="regular" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChartLegend() {
  return (
    <div className="flex flex-row items-center justify-start gap-5 px-6 pt-4">
      <div className="flex flex-row items-center gap-1.5">
        <span className="h-0.5 w-4 rounded-full bg-success" />
        <Text text="جمع کل درآمد" size="sm" color="secondary" weight="regular" />
      </div>
      <div className="flex flex-row items-center gap-1.5">
        <span className="h-0.5 w-4 rounded-full bg-danger" />
        <Text text="تعداد پرداخت" size="sm" color="secondary" weight="regular" />
      </div>
    </div>
  );
}