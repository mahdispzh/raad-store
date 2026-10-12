"use client";

import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import { useState } from "react";
import ServiceCard from "./service-card";
import { ServiceTabs } from "./service-card-constants";
import { EngineeringIcon } from "@/src/shared/ui/icons/engineering-icon";
import { ExecutionSupportIcon } from "@/src/shared/ui/icons/execution-support-icon";

export default function ServiceCardSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex flex-col gap-6 px-4 py-8 md:gap-8 md:px-8">
      {/* title */}
      <SectionTitle
        title="خدمات راد"
        description="راهکارهای مهندسی‌شده برای تأمین، کنترل و مدیریت انرژی در پروژه‌های صنعتی"
        size="sm"
      />

      {/* tabs */}
      {ServiceTabs.map((tab, index) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveIndex(index)}
          className={`flex cursor-pointer items-center gap-2 border-b-2 py-4 text-sm md:rounded-md md:border md:px-6 md:py-3 ${
            activeIndex === index
              ? "border-foreground text-foreground md:bg-foreground md:text-primary"
              : "border-transparent text-grey md:border-foreground md:text-foreground"
          }`}
        >
          {index === 0 && (
            <EngineeringIcon className="hidden text-base md:block" />
          )}
          {index === 1 && (
            <ExecutionSupportIcon className="hidden text-base md:block" />
          )}
          {tab.label}
        </button>
      ))}

      {/* cards */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        {ServiceTabs[activeIndex]?.items.map((item) => (
          <ServiceCard
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
