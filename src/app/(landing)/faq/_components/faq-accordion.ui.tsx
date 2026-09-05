"use client";

import { DropdownArrowIcon } from "@/src/shared/constants/icons/dropdown-arrow-icon";
import { Subtitle, Text } from "@/src/shared/ui";
import { useFaqAccordion } from "../_hooks/useFaq";
import type { FaqAccordionProps } from "../_types/faq-types";

// UI Component
export function FaqAccordion({ data }: FaqAccordionProps) {
  // Hook
  const { toggleItem, isItemOpen } = useFaqAccordion();

  // Render
  return (
    <div className="mt-6 w-full">
      {data.map((item) => {
        // Check if open
        const isOpen = isItemOpen(item.id);

        return (
          <div key={item.id} className="border-b border-accent py-5">
            {/* Button */}
            <button
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={() => toggleItem(item.id)}
            >
              {/* Question */}
              <Text
                text={item.question}
                color="primary"
                size="lg"
                weight="medium"
              />

              {/* Arrow Icon */}
              <div
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
              >
                <DropdownArrowIcon size="sm" color="text-primary" />
              </div>
            </button>

            {/* Answer */}
            {isOpen && (
              <div className="pt-5 text-sm">
                <Subtitle
                  color="secondary"
                  text={item.answer}
                  size="xl"
                  weight="regular"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
