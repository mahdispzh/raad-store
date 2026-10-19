"use client";

import { useState } from "react";
import { Button } from "@/src/shared/ui/button/button";
import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import { ChevronLeftIcon } from "@/src/shared/ui/icons/chevron-left-icon";
import FaqCard from "./faq-card";
import { FaqCards } from "./faq-card-constants";
import { ArrowLeftIcon } from "@/src/shared/ui/icons/arrow-left-icon";

export default function FaqCardSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="flex flex-col gap-6 py-8 md:gap-8">
      {/* title */}
      <div className="page-px flex items-end justify-between gap-4 md:items-start">
        <SectionTitle
          title="پرسش‌های متداول"
          description="پاسخ رایج‌ترین پرسش‌ها به همراه جواب‌های واضح"
          size="mobileSize"
        />
<Button
  variant="primary"
  size="mobileSize"
  icon={<ArrowLeftIcon />}
  className="shrink-0"
>
  مشاهده بیشتر
</Button>
      </div>

      {/* questions */}
      <div className="page-px flex flex-col gap-4">
        {FaqCards.map((card, index) => (
          <FaqCard
            key={card.id}
            question={card.question}
            answer={card.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}