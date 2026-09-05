// src/app/(landing)/terms/_components/terms-accordion.tsx
"use client";

import { DropdownArrowIcon } from "@/src/shared/constants/icons/dropdown-arrow-icon";
import { Subtitle, Text } from "@/src/shared/ui";
import { useAccordion } from "../_hooks/use-accordion";
import type { FaqItem } from "../_types/terms.types";

interface TermsAccordionProps {
  faqs: FaqItem[];
}

export function TermsAccordion({ faqs }: TermsAccordionProps) {
  const { toggleItem, isItemOpen } = useAccordion();

  return (
    <div className="mt-6 w-full">
      {faqs.map((item) => {
        const isOpen = isItemOpen(item.id);

        return (
          <div key={item.id} className="border-b border-accent py-4 md:py-5">
            <button
              className="flex w-full cursor-pointer items-center justify-between"
              onClick={() => toggleItem(item.id)}
            >
              <Subtitle
                text={item.question}
                color={isOpen ? "danger" : "primary"}
                size="xl"
                weight="medium"
              />
              <div
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <DropdownArrowIcon size="sm" color="primary" />
              </div>
            </button>

            {isOpen && (
              <div className="pt-4 text-sm md:pt-5">
                {item.answer.map((rule, index) => (
                  <div key={index} className="mb-2 flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <Text
                      color="primary"
                      text={rule}
                      size="lg"
                      weight="regular"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}