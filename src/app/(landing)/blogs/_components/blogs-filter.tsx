"use client";

import { BlogsFilterType } from "@/src/app/(landing)/blogs/_types/blogs-filter-type";
import {
  BookIcon,
  HistoryIcon,
  SaveEmptyIcon,
} from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";

type BlogFiltersProps = {
  activeFilter: BlogsFilterType;
  onChange: (filter: BlogsFilterType) => void;
};

const filters = [
  {
    key: "all",
    label: "همه بلاگ ها",
    icon: BookIcon,
  },
  {
    key: "saved",
    label: "نشان شده",
    icon: SaveEmptyIcon,
  },
  {
    key: "recent",
    label: "اخرین مطالعه ها",
    icon: HistoryIcon,
  },
] as const;

export function BlogFilters({ activeFilter, onChange }: BlogFiltersProps) {
  return (
    <div className="mt-6 flex items-center justify-start gap-2 overflow-x-auto px-1 sm:mt-11 sm:justify-center sm:gap-4 sm:overflow-visible sm:px-0">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key;

        const Icon = filter.icon;

        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onChange(filter.key)}
            className={`flex h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-4 whitespace-nowrap transition-all duration-200 sm:h-[45px] sm:w-[170px] sm:gap-2 sm:px-0 ${
              isActive
                ? "border-secondary bg-secondary"
                : "border-secondary bg-accent"
            } `}
          >
            <Icon
              size="sm"
              color={isActive ? "text-accent" : "text-secondary"}
            />

            <Text
              text={filter.label}
              size="sm"
              color={isActive ? "accent" : "secondary"}
            />
          </button>
        );
      })}
    </div>
  );
}
