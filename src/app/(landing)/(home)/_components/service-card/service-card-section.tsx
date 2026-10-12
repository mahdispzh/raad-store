"use client";

import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import { useState } from "react";
import ServiceCard from "./service-card";
import { ServiceTabs } from "./service-card-constants";
import { EngineeringIcon } from "@/src/shared/ui/icons/engineering-icon";
import { ExecutionSupportIcon } from "@/src/shared/ui/icons/execution-support-icon";
import { Button } from "@/src/shared/ui/button/button";

export default function ServiceCardSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="flex flex-col gap-6 py-8 md:gap-8">
      {/* title */}
      <SectionTitle
        title="خدمات راد"
        description="راهکارهای مهندسی‌شده برای تأمین، کنترل و مدیریت انرژی در پروژه‌های صنعتی"
        size="sm"
      />

      {/* tabs: mobile */}
      <div className="flex gap-4 rounded-xl border border-border px-4 md:hidden">
        {ServiceTabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer border-b-2 py-4 text-sm ${
              activeIndex === index
                ? "border-foreground text-foreground"
                : "border-transparent text-grey"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* tabs: desktop */}
      <div className="hidden gap-3 md:flex">
        <Button
          variant={activeIndex === 0 ? "darkPrimary" : "outline"}
          onClick={() => setActiveIndex(0)}
        >
          <EngineeringIcon className="text-xl"/>
          مهندسی و ساخت
        </Button>
        <Button
          variant={activeIndex === 1 ? "darkPrimary" : "outline"}
          onClick={() => setActiveIndex(1)}
        >
          <ExecutionSupportIcon className="text-xl"/>
          اجرا و پشتیبانی
        </Button>
      </div>

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
