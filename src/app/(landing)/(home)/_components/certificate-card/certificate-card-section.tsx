"use client";

import { useRef } from "react";
import { Button } from "@/src/shared/ui/button/button";
import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import { ChevronLeftIcon } from "@/src/shared/ui/icons/chevron-left-icon";
import { ChevronRightIcon } from "@/src/shared/ui/icons/chevron-right-icon";
import CertificateCard from "./certificate-card";
import { CertificateCards } from "./certificate-card-constants";
import { ArrowLeftIcon } from "@/src/shared/ui/icons/arrow-left-icon";

export default function CertificateCardSection() {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) => {
    listRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-6 py-8 md:gap-8">
      {/* title */}
      <div className="flex items-start justify-between page-px md:px-8">
        <SectionTitle
          title="افتخارات و تاییدیه‌ها"
          description="اعتماد و اعتبار حاصل سال‌ها تجربه و گواهی بر تخصص و کیفیت ما"
          size="sm"
        />
        <div className="hidden md:block">
          <Button variant="primary" size="sm" icon={<ArrowLeftIcon />}>
            مشاهده بیشتر
          </Button>
        </div>
      </div>

      {/* cards */}
      <div
        ref={listRef}
        className="scrollbar-hide flex overflow-x-auto page-px"
      >
        {CertificateCards.map((card) => (
          <CertificateCard
            key={card.id}
            title={card.title}
            image={card.image}
          />
        ))}
      </div>

      {/* arrows */}
      <div className="hidden justify-end gap-2 page-px md:flex">
        <button
          type="button"
          onClick={() => scroll(-300)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full rounded-l-none border border-foreground"
        >
          <ChevronRightIcon className="text-sm text-foreground" />
        </button>
        <button
          type="button"
          onClick={() => scroll(300)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full rounded-r-none border border-foreground"
        >
          <ChevronLeftIcon className="text-sm text-foreground" />
        </button>
      </div>
    </section>
  );
}