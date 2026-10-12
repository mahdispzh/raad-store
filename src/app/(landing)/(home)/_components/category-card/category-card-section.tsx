"use client";

import { useRef } from "react";
import { SectionTitle } from "@/src/shared/components/section-title/section-title";
import CategoryCard from "./category-card";
import { CategoryCards } from "./category-card-constants";
import { ChevronRightIcon } from "@/src/shared/ui/icons/chevron-right-icon";
import { ChevronLeftIcon } from "@/src/shared/ui/icons/chevron-left-icon";



export default function CategoryCardSection() {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) => {
    listRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col gap-6 py-8">
      <div className="">
        <SectionTitle
          title="دسته‌بندی‌ها"
          description="محصولات و خدمات تخصصی برای تأمین، کنترل و توزیع مطمئن انرژی."
          size="sm"
        />
      </div>

      <div
        ref={listRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:px-16"
      >
        {CategoryCards.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>

      <div className="hidden justify-end gap-3 md:flex">
        <button
          type="button"
          onClick={() => scroll(300)}
          className="flex h-8 w-8 items-center justify-center rounded-full rounded-l-none border border-foreground"
        >
          <span className="rotate-180">
            <ChevronLeftIcon size="sm" color="text-foreground" />
          </span>
        </button>
        <button
          type="button"
          onClick={() => scroll(-300)}
          className="flex h-8 w-8 items-center justify-center rounded-full rounded-r-none border border-foreground"
        >
          <ChevronRightIcon size="sm" color="text-foreground" />
        </button>
      </div>
    </section>
  );
}