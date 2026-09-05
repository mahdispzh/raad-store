"use client";

import React, { useMemo } from "react";
import { SelectProps } from "./select.types";
import { useSelect } from "./use-select";
import { SelectItem } from "./select-item";
import { MAX_VISIBLE_ITEMS, ITEM_HEIGHT } from "./select.constants";
import { ArrowIcon } from "@/src/shared/constants/icons/arrow-icon";

export const Select: React.FC<SelectProps> = ({
                                                label,
                                                placeholder,
                                                options,
                                                value,
                                                onChange,
                                                searchable,
                                                required,
                                                maxVisibleItems = MAX_VISIBLE_ITEMS,
                                              }) => {
  const { isOpen, toggle, close, search, setSearch, filteredOptions } =
    useSelect(options, searchable);

  // مقدار انتخاب شده بر اساس prop value
  const selectedOption = useMemo(
    () => options.find((o) => o.id === value),
    [options, value]
  );

  return (
    <div className="w-full relative">
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label className="block text-sm font-medium text-primary">{label}</label>
        )}
        <div
          className={`border border-gray rounded-sm p-3 h-[42px] flex items-center justify-between h-9 cursor-pointer`}
          onClick={toggle}
        >
          <span>{selectedOption ? selectedOption.name : placeholder || ""}</span>
          <ArrowIcon size="xs" color="primary" />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 border rounded bg-white shadow-md overflow-y-auto"
          style={{
            maxHeight: ITEM_HEIGHT * maxVisibleItems,
          }}
        >
          {searchable && (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو..."
              className="w-full px-3 py-2 border-b outline-none "
            />
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((item) => (
              <SelectItem
                key={item.id}
                item={item}
                onClick={(id) => {
                  onChange?.(id);
                  close();
                  setSearch(""); // بعد از انتخاب سرچ رو پاک کن
                }}
              />
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400">موردی یافت نشد</div>
          )}
        </div>
      )}
    </div>
  );
};
