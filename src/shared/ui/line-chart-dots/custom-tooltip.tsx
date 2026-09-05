// _components/custom-tooltip.tsx
import { Text } from "@/src/shared/ui";
import { formatJalaliDate, formatPersianNumber } from "./line-chart-dots.utils";
import { TooltipItem } from "./line-chart-dots.types";

export function CustomTooltip({ 
  active, 
  payload, 
  label 
}: { 
  active?: boolean; 
  payload?: TooltipItem[]; 
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  
  const labels: Record<string, string> = { 
    income: "جمع درآمد", 
    count: "تعداد پرداخت" 
  };

  return (
    <div className="rounded-sm bg-pure-white px-3 py-2 shadow-modal">
      <Text text={label ? formatJalaliDate(label) : ""} size="sm" color="secondary" weight="regular" />
      {payload.map((item) => (
        <div key={item.dataKey} className="flex flex-row items-center gap-2 pt-1">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <Text text={labels[item.dataKey] ?? item.dataKey} size="sm" color="secondary" weight="regular" />
          <Text text={formatPersianNumber(Number(item.value ?? 0))} size="sm" color="primary" weight="bold" />
        </div>
      ))}
    </div>
  );
}