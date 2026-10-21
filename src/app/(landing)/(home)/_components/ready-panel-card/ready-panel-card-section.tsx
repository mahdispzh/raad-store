"use client";

import { Button } from "@/src/shared/ui/button/button";
import { ChevronLeftIcon } from "@/src/shared/ui/icons/chevron-left-icon";
import { ChevronRightIcon } from "@/src/shared/ui/icons/chevron-right-icon";
import Image from "next/image";
import { useRef } from "react";
import ReadyPanelCard from "./ready-panel-card";
import { ReadyPanelCards } from "./ready-panel-card-constants";
import readyPanelShape from "./ready-panel-card-shape.svg";

export default function ReadyPanelCardSection() {
  const listRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) => {
    listRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col gap-6 bg-primary py-8 md:min-h-[348px] md:flex-row md:items-center md:gap-0 md:bg-transparent md:py-0">
      {/* shape */}
      <Image
        src={readyPanelShape}
        alt=""
        className="absolute top-0 right-0 hidden md:block"
      />
      {/* text */}
      <div className="relative flex flex-col gap-4 px-4 md:w-72 md:shrink-0 md:items-center md:gap-6 md:px-8 md:text-center">
        <h2 className="text-3xl font-bold text-foreground">
          تابلو برق‌های آماده
        </h2>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-light text-foreground">
            تابلو برق موردنیازتان را با قیمت کمتر تهیه کنید.
          </p>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 text-sm font-light text-foreground md:hidden"
          >
            مشاهده همه
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="hidden md:block">
          <Button variant="dark" size="sm">
            مشاهده همه
          </Button>
        </div>
      </div>

      {/* cards */}
      <div className="relative flex flex-col gap-6 md:min-w-0 md:flex-1 md:py-6 page-px">
        <div
          ref={listRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:ps-0 md:pe-8"
        >
          {ReadyPanelCards.map((card) => (
            <ReadyPanelCard
              key={card.id}
              title={card.title}
              image={card.image}
            />
          ))}
        </div>

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
      </div>
    </section>
  );
}
