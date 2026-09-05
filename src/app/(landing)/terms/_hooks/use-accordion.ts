// src/app/(landing)/terms/_hooks/use-accordion.ts
import { useState } from "react";

export const useAccordion = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isItemOpen = (id: number) => openItems.has(id);

  return { toggleItem, isItemOpen };
};