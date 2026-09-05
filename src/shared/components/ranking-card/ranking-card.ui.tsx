"use client";

import Image from "next/image";
import { DropdownArrowIcon, DropleftArrowIcon } from "../../constants/icons";
import { SliderButton, Text } from "../../ui";
import { StyledButton } from "../../ui/styled-button/styled-button.ui";
import { useRankingCard } from "./useRankingCard";
import type { RankingCardProps } from "./ranking-card.types";
import {
  DEFAULT_RANKING_ITEMS_PER_PAGE,
  DEFAULT_RANKING_UNIT,
} from "./ranking-card.constants";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react"; // ✅ اضافه شدن motion
import Link from "next/link";

export function RankingCard({
  icon,
  title,
  periodLabel,
  periodOptions,
  onPeriodChange,
  items,
  itemsPerPage = DEFAULT_RANKING_ITEMS_PER_PAGE,
  unit = DEFAULT_RANKING_UNIT,
}: RankingCardProps) {
  const {
    activeIndex,
    setActiveIndex,
    pageCount,
    currentItems,
    goNext,
    goPrev,
  } = useRankingCard(items, itemsPerPage);

  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const periodDropdownRef = useRef<HTMLDivElement>(null);

  // بستن منو با کلیک بیرون
  useEffect(() => {
    if (!isPeriodOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!periodDropdownRef.current?.contains(event.target as Node)) {
        setIsPeriodOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPeriodOpen]);

  const handleSelectPeriod = (value: string) => {
    onPeriodChange?.(value);
    setIsPeriodOpen(false);
  };

  const currentLabel =
    periodOptions?.find((opt) => opt.value === periodLabel)?.label || periodLabel;

  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-md bg-accent/50 p-[1.2vw]">
      {/* Header */}
      <div className="flex items-center justify-between gap-[1vw]">
        <div className="flex min-w-0 items-center gap-[0.5vw]">
          <div className="flex h-[2.3vw] w-[2.3vw] flex-shrink-0 items-center justify-center rounded-full bg-secondary/20">
            {icon}
          </div>
          <Text text={title} size="lg" color="secondary" weight="regular" />
        </div>

        {periodOptions && onPeriodChange ? (
          <div ref={periodDropdownRef} className="relative min-w-[120px]">
            <button
              type="button"
              onClick={() => setIsPeriodOpen((open) => !open)}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-xs border-1 border-secondary px-6 py-2 transition-colors hover:bg-secondary/5 w-full"
            >
              <Text
                text={currentLabel}
                size="sm"
                color="secondary"
                weight="regular"
              />
              <div
                className={`transition-transform duration-200 ${
                  isPeriodOpen ? "rotate-180" : ""
                }`}
              >
                <DropdownArrowIcon size="2xs" color="text-secondary" />
              </div>
            </button>

            <AnimatePresence>
              {isPeriodOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-full z-10 mt-0.5 max-h-60 w-full overflow-y-auto rounded-xs border border-secondary/20 bg-accent py-1  [&::-webkit-scrollbar]:hidden scrollbar-none"
                >
                  {periodOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectPeriod(opt.value)}
                      className={`flex w-full items-center justify-center px-4 py-2 text-start transition-colors hover:bg-secondary/10 ${
                        opt.value === periodLabel ? "bg-secondary/10" : ""
                      }`}
                    >
                      <Text
                        text={opt.label}
                        size="sm"
                        color="secondary"
                        weight={opt.value === periodLabel ? "regular" : "light"}
                      />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="rounded-xs border-1 border-secondary px-6 py-2">
            <Text
              text={periodLabel}
              size="sm"
              color="secondary"
              weight="regular"
            />
          </div>
        )}
      </div>

      {/* Products box - بدون تغییر */}
      <div className="mt-[1.2vw] rounded-sm bg-white p-[1vw]">
        <div
          className="grid gap-[0.8vw]"
          style={{ gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }}
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-[0.8vw]"
            >
         <Link
  href={item.href ?? "#"}
  className="relative aspect-square h-[12vw] w-full overflow-hidden rounded-sm bg-accent/40"
>
  <Image
    src={item.image}
    alt={item.name}
    fill
    className="object-cover transition-transform duration-300 hover:scale-105"
  />
</Link>
<div className="flex w-fit min-w-[5vw] items-center justify-center gap-1 whitespace-nowrap rounded-full bg-secondary px-[0.8vw] py-[0.5vw]">
  <Text
    text={`${item.count.toLocaleString("fa-IR")} ${unit}`}
    size="sm"
    color="white"
    weight="light"
  />
</div>
            </div>
          ))}
        </div>
        {pageCount > 1 && (
          <div className="mt-[1vw] flex items-center justify-center">
            <SliderButton
              count={pageCount}
              activeIndex={activeIndex}
              onChange={setActiveIndex}
            />
          </div>
        )}
      </div>

      {/* Navigation buttons - بدون تغییر */}
      {pageCount > 1 && (
        <div className="mt-[1vw] flex items-center justify-end gap-[0.6vw]">
          <div className="flex h-[2vw] w-[2vw] flex-shrink-0 items-center justify-center rounded-full border border-secondary">
            <div className="rotate-180">
              <StyledButton
                variant="icon"
                type="primary"
                icon={<DropleftArrowIcon size="xs" color="text-secondary" />}
                action={goPrev}
              />
            </div>
          </div>
          <div className="flex h-[2vw] w-[2vw] flex-shrink-0 items-center justify-center rounded-full border border-secondary">
            <StyledButton
              variant="icon"
              type="primary"
              icon={<DropleftArrowIcon size="xs" color="text-secondary" />}
              action={goNext}
            />
          </div>
        </div>
      )}
    </div>
  );
}