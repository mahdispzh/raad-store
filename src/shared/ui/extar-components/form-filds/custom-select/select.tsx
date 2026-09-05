"use client";

import { DropdownArrowIcon } from "@/src/shared/constants/icons";
import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import React, { useMemo } from "react";
import { SelectItem } from "./select-item";
import { SELECT_SIZE_CLASSES } from "./select.constants";
import type { SelectProps } from "./select.types";
import { useSelect } from "./use-select";

// TODO: XIcon

const OPTIONS_ERROR_TEXT = "خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.";

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  searchable,
  required,
  size = "md",
  itemSize = "md",
  triggerHeight,
  error,
  loading,
  clearable,
  optionsError,
  optionsErrorMessage,
}) => {
  const { isOpen, toggle, close, search, setSearch, filteredOptions, ref } =
    useSelect(options, searchable);

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );

  const isOptionsInvalid =
    optionsError ||
    !Array.isArray(options) ||
    options.some((o) => !o?.label || o?.value === undefined);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null); // 🔥 مهم
  };

  const disabled = loading;

  return (
    <div className="flex w-full flex-col gap-2">
      <div ref={ref} className="relative flex flex-col gap-2">
        {/* LABEL */}
        {label && (
          <p
            className={`text-medium text-md ${
              error ? "text-danger" : "text-primary"
            }`}
          >
            {label} {required && "*"}
          </p>
        )}

        {/* TRIGGER */}
        <div
          onClick={() => !disabled && toggle()}
          className={`flex cursor-pointer items-center justify-between rounded-sm border ${
            SELECT_SIZE_CLASSES[size]
          } ${
            error ? "border-danger" : "border-gray"
          } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
          style={triggerHeight ? { height: triggerHeight } : undefined}
        >
          <span className="flex items-center gap-2">
            {loading ? (
              <span className="animate-pulse text-gray-400">
                در حال بارگذاری اطلاعات...
              </span>
            ) : isOptionsInvalid ? (
              <span className="text-danger">
                {optionsErrorMessage || OPTIONS_ERROR_TEXT}
              </span>
            ) : selectedOption ? (
              selectedOption.label
            ) : (
              placeholder
            )}
          </span>

          <div className="flex items-center gap-4">
            {clearable && selectedOption && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="flex h-6 w-6 cursor-pointer items-center justify-center bg-gray/20 text-gray-400 hover:text-danger"
              >
                <CloseIcon size={"xs"} />
              </button>
            )}

            <DropdownArrowIcon size="xs" color="text-primary" />
          </div>
        </div>

        {/* DROPDOWN */}
        {isOpen && (
          <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-[220px] w-full overflow-y-auto rounded-sm border border-gray bg-accent shadow-md">
            {searchable && (
              <input
                className="w-full border-b border-gray px-3 py-2 text-sm outline-none"
                placeholder="جستجو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            {loading ? (
              <div className="animate-pulse px-3 py-2 text-gray-400">
                در حال دریافت لیست...
              </div>
            ) : isOptionsInvalid ? (
              <div className="px-3 py-2 text-sm text-danger">
                {optionsErrorMessage || OPTIONS_ERROR_TEXT}
              </div>
            ) : filteredOptions.length ? (
              filteredOptions.map((item) => (
                <SelectItem
                  key={item.value}
                  item={item}
                  size={itemSize}
                  onClick={(val) => {
                    onChange?.(val ?? null); // 🔥 مهم
                    close();
                    setSearch("");
                  }}
                />
              ))
            ) : (
              <div className="px-3 py-2 text-gray-400">موردی یافت نشد</div>
            )}
          </div>
        )}
      </div>

      {/* ERROR FROM RHF ONLY */}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
};
