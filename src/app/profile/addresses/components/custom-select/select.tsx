// select.tsx - نسخه اصلاح‌شده
"use client";

import React, { useMemo, useEffect } from "react";
import { useSelect } from "./use-select";
import { SelectItem } from "./select-item";
import { SELECT_SIZE_CLASSES } from "./select.constants";
import type { SelectProps } from "./select.types";
import { ArrowIcon } from "@/src/shared/constants/icons/arrow-icon";

export const Select: React.FC<SelectProps> = ({
  className = "",
  disabled = false,
  error,
  icon: Icon,
  itemSize = "md",
  label,
  onChange,
  options,
  placeholder = "انتخاب کنید",
  required = false,
  searchable = false,
  size = "md",
  triggerHeight,
  value,
}) => {
  const { isOpen, toggle, close, search, setSearch, filteredOptions, ref } =
    useSelect(options, searchable, disabled);

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  // وقتی disabled باشه، بسته میشه
  useEffect(() => {
    if (disabled) {
      close();
    }
  }, [disabled, close]);

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="w-full flex flex-col gap-2 relative" ref={ref}>
        {label && (
          <label className={`text-sm font-medium ${error ? "text-red-500" : "text-primary"}`}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Trigger */}
        <div
          onClick={toggle}
          className={`border ${
            error 
              ? "border-red-500 hover:border-red-500" 
              : disabled 
                ? "border-gray-300 bg-gray-50" 
                : "border-gray hover:border-primary/50"
          } rounded-sm flex items-center justify-between cursor-pointer transition-colors ${
            disabled ? "cursor-not-allowed opacity-60" : ""
          } ${SELECT_SIZE_CLASSES[size]}`}
          style={triggerHeight ? { height: triggerHeight } : undefined}
        >
          <span className={`flex-1 truncate ${!selectedOption ? "text-gray-400" : "text-primary"}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          
          <div className="flex items-center gap-2">
            {Icon && <Icon size="sm" color="text-secondary" />}
            <ArrowIcon 
              size="xs" 
              color="text-primary" 
            />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full top-full right-0 left-0 border border-gray bg-white rounded-sm shadow-lg max-h-50 flex flex-col mt-1 overflow-hidden">
            {searchable && (
              <div className="sticky top-0 bg-white border-b border-gray z-10">
                <input
                  className="w-full px-3 py-2 outline-none text-sm"
                  placeholder="جستجو..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item) => (
                  <SelectItem
                    key={item.value.toString()}
                    item={item}
                    size={itemSize}
                    isSelected={item.value === value}
                    onClick={(val) => {
                      onChange?.(val);
                      close();
                      setSearch("");
                    }}
                  />
                ))
              ) : (
                <div className="px-3 py-2 text-gray-400 text-sm text-center">
                  موردی یافت نشد
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};