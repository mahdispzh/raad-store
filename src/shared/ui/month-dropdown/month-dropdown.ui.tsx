"use client";

import { motion, AnimatePresence } from "motion/react";
import { Text } from "../../ui";
import { DropdownArrowIcon } from "../../constants/icons";
import { useMonthDropdown } from "./useMonthDropdown";
import type { MonthDropdownProps } from "./month-dropdown.types";

export function MonthDropdown({ months, selectedMonth, onSelectMonth }: MonthDropdownProps) {
  const { dropdownRef, isOpen, toggle, select } = useMonthDropdown(onSelectMonth);

  return (
    <div ref={dropdownRef} className="relative min-w-[120px] w-[4vw]">
      <button
        type="button"
        onClick={toggle}
        className="cursor-pointer flex items-center justify-center gap-2 rounded-xs border-1 border-secondary py-2 px-6 w-full transition-colors hover:bg-secondary/5"
      >
        <Text text={selectedMonth} size="md" color="secondary" weight="regular" />
        <div className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          <DropdownArrowIcon size="2xs" color="text-secondary" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute mt-0.5 left-0 top-full z-10 max-h-60 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none backdrop-blur-md bg-accent/40 border border-secondary/20 rounded-xs py-1 text-white"
          >
            {months.map((month) => (
              <button
                key={month}
                type="button"
                onClick={() => select(month)}
                className={`flex justify-center w-full items-center px-4 py-2 text-start transition-colors hover:bg-secondary/10 ${
                  month === selectedMonth ? "bg-secondary/10" : ""
                }`}
              >
                <Text
                  text={month}
                  size="sm"
                  color="secondary"
                  weight={month === selectedMonth ? "regular" : "light"}
                />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}