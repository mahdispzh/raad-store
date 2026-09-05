// status-card.ui.tsx
"use client";
import { Subtitle, Text } from "@/src/shared/ui";
import texts from "../../../../shared/constants/texts/texts.json";
import { StatusCardProps } from "../_types/dashboard-home.types";

// Shipment status card component
export default function StatusCard({
  title = texts.dashboard.shipmentStatus.title,
  items,
  className = "",
}: StatusCardProps) {
  return (
    // Card container
    <div
      className={`bg-surface flex flex-col overflow-hidden rounded-sm bg-pure-white shadow-xl ${className}`}
    >
      {/* Card header */}
      <div
        dir="ltr"
        className="flex items-center justify-end border-b border-gray px-5 py-4"
      >
        <Text text={title} color="secondary" size="lg" weight="bold" />
      </div>

      {/* Status items row */}
      <div
        dir="ltr"
        className="flex flex-1 flex-row items-center justify-around py-6"
      >
        {items.map((item, index) => (
          <div key={index} className="flex flex-row text-right">
            {/* Value and label */}
            <div>
              <div className="flex flex-col items-end pr-2">
                <Subtitle
                  text={item.value}
                  color="primary"
                  size="4xl"
                  weight="bold"
                />
                <Text
                  text={item.label}
                  color="primary"
                  size="sm"
                  weight="medium"
                />
              </div>
            </div>
            {/* Status icon */}
            <div className="pt-2">{item.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
