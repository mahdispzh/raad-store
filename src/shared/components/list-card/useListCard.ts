"use client";

import type { ListCardItem } from "./list-card.types";

export function useListCard(items: ListCardItem[]) {
  const hasItems = items.length > 0;

  return {
    items,
    hasItems,
  };
}