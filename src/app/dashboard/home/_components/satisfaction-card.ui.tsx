// satisfaction-card.ui.tsx
"use client";

import { SatisfactionChart } from "@/src/shared/ui/satisfaction-chart/satisfaction-chart.ui";
import texts from "../../../../shared/constants/texts/texts.json";
import type { SatisfactionCardProps } from "../_types/dashboard-home.types";

// Customer satisfaction card component
export default function SatisfactionCard({
  title = texts.dashboard.customerSatisfaction.title,
  total = "0%",
  fromTotal = texts.dashboard.customerSatisfaction.fromVotes,
  fromTotalValue = 0,
  data,
  className = "",
  chartPercentage = 80,
}: SatisfactionCardProps) {
  return (
    // Card wrapper
    <div
      className={`h-full overflow-hidden rounded-sm bg-pure-white shadow-xl ${className}`}
    >
      {/* Satisfaction chart */}
      <SatisfactionChart
        chartPercentage={chartPercentage}
        data={data}
        fromTotal={fromTotal}
        fromTotalValue={fromTotalValue}
        title={title}
        total={total}
      />
    </div>
  );
}
