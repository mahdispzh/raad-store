"use client";

import { useMemo, useState } from "react";
import type { RankingItem } from "./ranking-card.types";

export function useRankingCard(items: RankingItem[], itemsPerPage: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const currentItems = useMemo(() => {
    const start = activeIndex * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, activeIndex, itemsPerPage]);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % pageCount);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + pageCount) % pageCount);
  };

  return {
    activeIndex,
    setActiveIndex,
    pageCount,
    currentItems,
    goNext,
    goPrev,
  };
}