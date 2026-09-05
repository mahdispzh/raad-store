// stat-card.hook.ts
import { useMemo } from "react";
import {
  StatCardComparePeriod,
  StatCardProps,
  StatCardValueType,
  UseStatCardReturn,
} from "./stat-card.types";

const COMPARE_TEXT: Record<
  StatCardComparePeriod,
  { more: string; less: string }
> = {
  day: { more: "بیشتر از روز قبل", less: "کمتر از روز قبل" },
  week: { more: "بیشتر از هفته قبل", less: "کمتر از هفته قبل" },
  month: { more: "بیشتر از ماه قبل", less: "کمتر از ماه قبل" },
  year: { more: "بیشتر از سال قبل", less: "کمتر از سال قبل" },
};

const formatValue = (value: number, valueType: StatCardValueType): string => {
  if (valueType === "price") return new Intl.NumberFormat("fa-IR").format(value);
  if (valueType === "percent") return `%${value.toFixed(1)}`;
  return `${value}`;
};

type UseStatCardArgs = Pick<StatCardProps, "value" | "percent"> & {
  valueType: StatCardValueType;
  comparePeriod: StatCardComparePeriod;
};

export const useStatCard = ({
  value,
  percent,
  valueType,
  comparePeriod,
}: UseStatCardArgs): UseStatCardReturn => {
  const isPositive = useMemo(() => percent >= 0, [percent]);

  const formattedValue = useMemo(
    () => formatValue(value, valueType),
    [value, valueType]
  );

  const absolutePercent = useMemo(
    () => Math.abs(percent).toFixed(1),
    [percent]
  );

  const compareText = useMemo(
    () =>
      isPositive
        ? COMPARE_TEXT[comparePeriod].more
        : COMPARE_TEXT[comparePeriod].less,
    [isPositive, comparePeriod]
  );

  return { isPositive, formattedValue, absolutePercent, compareText };
};