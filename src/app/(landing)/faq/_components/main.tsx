// src/app/test/faq-client.tsx (Client Component)
"use client";

import { Subtitle } from "@/src/shared/ui";
import { useFaq } from "../_hooks/useFaq";
import type { CategoryWithItems } from "../_types/faq-types";
import { DynamicIcon } from "./dynamic-icon.ui";
import { FaqAccordion } from "./faq-accordion.ui";
import { FaqGrid } from "./faq-grid.ui";
interface FaqMainProps {
  categories: CategoryWithItems[];
}

export function FaqMain({ categories }: FaqMainProps) {
  // Get active category state from hook
  const { activeCategory, activeCategoryData, setActiveCategory } =
    useFaq(categories);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      {/* FAQ Grid */}
      <FaqGrid
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Active category title */}
      <div className="mt-10 flex flex-col items-center lg:mt-16">
        <div className="mb-5 flex items-center justify-center">
          <DynamicIcon
            type={activeCategoryData?.icon || "default"}
            size="2xl"
            color="text-secondary"
          />
        </div>
        <Subtitle
          text={activeCategoryData?.title || ""}
          color="primary"
          size="3xl"
          weight="medium"
        />
      </div>

      {/* FAQ List */}
      <FaqAccordion data={activeCategoryData?.items || []} />
    </div>
  );
}
