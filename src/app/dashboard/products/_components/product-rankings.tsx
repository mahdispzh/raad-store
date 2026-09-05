
"use client";

import { RankingCard } from "@/src/shared/components/ranking-card/ranking-card.ui";
import { TimelineIcon } from "@/src/shared/constants/icons";
import {
  getCurrentJalaliYear,
  getJalaliMonthNumber,
  PERSIAN_MONTHS,
} from "@/src/shared/utils/analytics";

import { useState } from "react";
import { useProductsOverview } from "../_hooks/Useproductsoverview";

function getCurrentPersianMonthName(): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    month: "long",
  }).format(new Date());
}

const rankingPeriodOptions = PERSIAN_MONTHS.map((m) => ({
  value: m,
  label: m,
}));

export function ProductRankings() {
  const selectedYear = getCurrentJalaliYear();

  const [topMonthName, setTopMonthName] = useState(
    getCurrentPersianMonthName(),
  );
  const [bottomMonthName, setBottomMonthName] = useState(
    getCurrentPersianMonthName(),
  );

  const topMonthNumber = getJalaliMonthNumber(topMonthName);
  const bottomMonthNumber = getJalaliMonthNumber(bottomMonthName);

  const { data: topOverview } = useProductsOverview(
    selectedYear,
    topMonthNumber,
  );
  const { data: bottomOverview } = useProductsOverview(
    selectedYear,
    bottomMonthNumber,
  );

  const topItems =
    topOverview?.topSellingMonthly?.items.map((item) => ({
      id: item.id,
      name: item.name,
      count: item.count,
      image: item.image,
    })) ?? [];

  const bottomItems =
    bottomOverview?.bottomSellingMonthly?.items.map((item) => ({
      id: item.id,
      name: item.name,
      count: item.count,
      image: item.image,
    })) ?? [];

  return (
    <div className="flex items-stretch gap-10">
      <div className="flex w-[35%]">
        <RankingCard
          icon={<TimelineIcon size="sm" color="text-secondary" />}
          title="۱۰ محصول پرفروش اخیر"
          periodLabel={topMonthName}
          periodOptions={rankingPeriodOptions}
          onPeriodChange={setTopMonthName}
          unit="عدد"
          items={topItems}
          itemsPerPage={2}
        />
      </div>
      <div className="flex w-[65%]">
        <RankingCard
          icon={<TimelineIcon size="sm" color="text-secondary" />}
          title="۱۰ محصول با کمترین میزان فروش"
          periodLabel={bottomMonthName}
          periodOptions={rankingPeriodOptions}
          onPeriodChange={setBottomMonthName}
          unit="عدد"
          items={bottomItems}
          itemsPerPage={4}
        />
      </div>
    </div>
  );
}