"use client";

import { DropdownArrowIcon } from "@/src/shared/constants/icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text } from "../text/text.ui";
import { Props } from "./custom-select.type";

export function CustomSelect<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  className = "",
  optionClassName = "",
  disabled = false,
  searchable = false,
  searchPlaceholder = "جستجو...",
  transparent = false,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) return options;
    const term = search.trim().toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(term),
    );
  }, [options, search, searchable]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setSearch("");
    } else if (searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open, searchable]);

  return (
    <div
      ref={ref}
      className={`relative w-full ${disabled ? "pointer-events-none opacity-60" : ""}`}
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex h-11 w-full items-center justify-between ${
          open ? "rounded-t-sm" : "rounded-sm"
        } ${
          transparent ? "bg-transparent" : "bg-pure-white"
        } cursor-pointer gap-2 border border-gray px-3 text-right transition focus:border-secondary focus:ring-0 focus:outline-none active:border-secondary ${className}`}
      >
        <div className={`${selected?.className}`}>
          <Text size="sm" text={selected?.label ?? placeholder} />
        </div>
        <span
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <DropdownArrowIcon size="2xs" color="text-primary" />
        </span>
      </button>

      {open && (
        <div className="absolute z-50 max-h-72 w-full overflow-auto rounded-b-sm border border-gray bg-pure-white">
          {searchable && (
            <div className="sticky top-0 border-b border-gray bg-pure-white p-2">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="text-regular w-full rounded-sm border border-gray px-2 py-1 text-right text-sm outline-none focus:border-secondary"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="px-3 py-3 text-center">
              <Text text="موردی یافت نشد" size="sm" color="gray" />
            </div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`w-full cursor-pointer px-3 py-3 text-right transition ${
                  optionClassName
                } ${option.className ?? ""} ${
                  option.value === value ? "bg-accent" : "hover:bg-primary/3"
                }`}
              >
                <Text text={option.label} size="sm" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
