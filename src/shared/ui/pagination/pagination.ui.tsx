// pagination.ui.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Text } from "@/src/shared/ui/text/text.ui";
import { DoubleArrowIcon } from "@/src/shared/constants/icons/double-arrow-icon";
import { DropleftArrowIcon } from "@/src/shared/constants/icons/dropleft-arrow-icon";

function toPersianDigits(value: number | string): string {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(value).replace(/[0-9]/g, (d) => persian[Number(d)] ?? d);
}

function getPageList(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, "ellipsis", total];
  }
  if (current >= total - 2) {
    return [1, "ellipsis", total - 2, total - 1, total];
  }
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const [inputValue, setInputValue] = useState("");

  if (totalPages <= 1) return null;

  const pages = getPageList(page, totalPages);

  function goToInputPage() {
    const num = Number(inputValue);
    if (num >= 1 && num <= totalPages) {
      onPageChange(num);
    }
    setInputValue("");
  }

  const buttonBase =
    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xs border border-secondary/40 text-secondary disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="flex flex-row items-center justify-center gap-10 py-3">
      <div className="flex items-center gap-2">
        <Text text="صفحه" size="sm" weight="regular" color="secondary" align="center" />
        <input
          type="text"
          value={inputValue}
          placeholder={`مثلا ${toPersianDigits(4)}`}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goToInputPage()}
          className="h-9 w-16 text-light rounded-xs border border-secondary/40 text-center text-sm text-secondary outline-none placeholder:text-secondary/50"
        />
        <Text text={`از ${toPersianDigits(totalPages)}`} size="sm" weight="regular" color="secondary" align="center" />
      </div>
      <div className="flex items-center gap-1.5">
        {/* برو به اولین صفحه - فلش دوتایی به چپ */}
        <motion.button
          disabled={page === 1}
          onClick={() => onPageChange(1)}
          whileHover={page !== 1 ? { backgroundColor: "rgba(0,0,0,0.04)" } : {}}
          transition={{ duration: 0.15 }}
          className={buttonBase}
        >
          <DoubleArrowIcon size="2xs" color="text-secondary" />
        </motion.button>

        {/* صفحه قبلی - فلش تکی به چپ */}
        <motion.button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          whileHover={page !== 1 ? { backgroundColor: "rgba(0,0,0,0.04)" } : {}}
          transition={{ duration: 0.15 }}
          className={buttonBase}
        >
          <span className="inline-flex rotate-180">
            <DropleftArrowIcon size="2xs" color="text-secondary" />
          </span>
        </motion.button>

        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-1">
              <Text text="..." size="sm" weight="regular" color="secondary" align="center" />
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xs transition-colors duration-150 ${
                p === page
                  ? "bg-secondary"
                  : "border border-secondary/40 hover:bg-black/5"
              }`}
            >
              <Text
                text={toPersianDigits(p)}
                size="sm"
                weight="regular"
                color={p === page ? "accent" : "secondary"}
                align="center"
              />
            </button>
          ),
        )}

        {/* صفحه بعدی - فلش تکی به راست (چرخش فلش چپ) */}
        <motion.button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          whileHover={page !== totalPages ? { backgroundColor: "rgba(0,0,0,0.04)" } : {}}
          transition={{ duration: 0.15 }}
          className={buttonBase}
        >
          <DropleftArrowIcon size="2xs" color="text-secondary" />
        </motion.button>

        {/* برو به آخرین صفحه - فلش دوتایی به راست (چرخش فلش دوتایی چپ) */}
        <motion.button
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          whileHover={page !== totalPages ? { backgroundColor: "rgba(0,0,0,0.04)" } : {}}
          transition={{ duration: 0.15 }}
          className={buttonBase}
        >
          <span className="inline-flex rotate-180">
            <DoubleArrowIcon size="2xs" color="text-secondary" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}