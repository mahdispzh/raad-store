"use client";

import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { SearchIcon } from "@/src/shared/constants/icons/search-icon";
import { Caption, Text } from "@/src/shared/ui";
import { useEffect, useRef } from "react";
import { SadIcon } from "../../constants/icons";
import { SearchChip } from "./search-chip";
import { SearchChipsSkeleton } from "./search-chips-skeleton.ui";
import { SearchResultsSkeleton } from "./search-results-skeleton.ui";
import type { SearchInputProps } from "./search.types";
import { useSearch } from "./useSearch";

export function SearchInput({ open, onOpen, onClose }: SearchInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {
    value,
    setValue,
    recentSearches,
    popularSearches,
    liveResults,
    liveLoading,
    isPopularLoading,
    isRecentLoading,
    removeRecentItem,
    clearAllRecent,
    handleSearch,
  } = useSearch();

  const isTyping = value.length >= 1;

  // مدیریت اسکرول هنگام باز/بسته شدن پنل
  useEffect(() => {
    if (open) {
      // ذخیره موقعیت فعلی اسکرول
      const scrollY = window.scrollY;

      // غیرفعال کردن اسکرول
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // بازگردانی موقعیت اسکرول
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  return (
    <>
      <div ref={wrapperRef} className="relative z-50 w-full min-w-0">
        <div className="relative h-14 lg:h-[3vw]">
          {/* CLOSED SEARCH - حالت بسته */}
          <div
            className={`absolute inset-0 z-20 flex h-9 items-center rounded-full bg-accent px-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-11 lg:h-[3vw] ${
              open
                ? "pointer-events-none scale-[0.98] opacity-0"
                : "scale-100 opacity-100"
            }`}
          >
            <div className="ml-4 shrink-0">
              <SearchIcon size="sm" color="text-secondary" />
            </div>

            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={onOpen}
              placeholder="جستجو در همه کالاها"
              className="text-medium h-full flex-1 bg-transparent text-sm text-secondary outline-none placeholder:text-secondary"
            />

            {!!value && (
              <button
                onClick={() => setValue("")}
                className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
              >
                <CloseIcon size="xs" color="text-secondary" />
              </button>
            )}
          </div>

          {/* OPEN PANEL - حالت باز */}
          <div
            className={`absolute right-0 left-0 z-30 overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open
                ? "top-0 scale-100 p-5 opacity-100"
                : "pointer-events-none top-1 scale-[0.98] p-5 opacity-0"
            }`}
          >
            {/* SEARCH INPUT - ورودی داخل پنل */}
            <div className="mb-6 flex h-9 items-center rounded-full bg-accent px-6 md:h-11 lg:h-[3vw]">
              <div className="ml-4 shrink-0">
                <SearchIcon size="sm" color="text-secondary" />
              </div>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={onOpen}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && value.trim()) {
                    handleSearch(value.trim());
                    onClose();
                  }
                }}
                placeholder="جستجو در همه کالاها"
                className="text-medium h-full flex-1 bg-transparent text-sm text-secondary outline-none placeholder:text-secondary"
              />

              {!!value && (
                <button
                  onClick={() => setValue("")}
                  className="cursor-pointer opacity-70 transition-opacity hover:opacity-100"
                >
                  <CloseIcon size="xs" color="text-secondary" />
                </button>
              )}
            </div>

            {/* CONTENT - محتوای پنل */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {/* حالت تایپ کردن - نمایش نتایج زنده */}
              {isTyping ? (
                <div>
                  <div className="mb-6">
                    <Caption text="نتایج جستجو" size="xs" color="primary" />
                  </div>

                  {liveLoading ? (
                    <SearchResultsSkeleton />
                  ) : liveResults.length === 0 ? (
                    <div className="flex justify-center gap-2 py-8">
                      <SadIcon color="text-secondary" size="md" />
                      <Text
                        text="متأسفانه محصولی مطابق با جستجوی شما پیدا نکردیم."
                        color="secondary"
                        weight="regular"
                        size="md"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {liveResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            handleSearch(product.name);
                            onClose();
                          }}
                          className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-right transition-colors hover:bg-accent"
                        >
                          <SearchIcon size="xs" color="text-secondary" />
                          <span className="text-medium text-sm text-primary">
                            {product.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* جستجوهای اخیر */}
                  {isRecentLoading ? (
                    <div className="mb-10">
                      <div className="mb-6 flex items-center justify-between">
                        <Caption
                          text="جستجوهای اخیر"
                          size="xs"
                          color="primary"
                        />
                      </div>
                      <SearchChipsSkeleton variant="recent" count={3} />
                    </div>
                  ) : (
                    recentSearches.length > 0 && (
                      <div className="mb-10">
                        <div className="mb-6 flex items-center justify-between">
                          <Caption
                            text="جستجوهای اخیر"
                            size="xs"
                            color="primary"
                          />
                          <SearchChip
                            label="حذف همه"
                            variant="clear-all"
                            iconPosition="right"
                            onClick={clearAllRecent}
                          />
                        </div>

                        <div className="flex flex-wrap gap-4">
                          {recentSearches.map((item) => (
                            <SearchChip
                              key={item}
                              label={item}
                              variant="recent"
                              iconPosition="left"
                              onClick={() => {
                                setValue(item);
                                handleSearch(item);
                                onClose();
                              }}
                              onRemove={() => removeRecentItem(item)}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {/* جستجوهای پرطرفدار */}
                  <div>
                    <div className="mb-6">
                      <Caption
                        text="جستجوهای پرطرفدار"
                        size="xs"
                        color="primary"
                      />
                    </div>

                    {isPopularLoading ? (
                      <SearchChipsSkeleton variant="popular" count={5} />
                    ) : (
                      <div className="flex flex-wrap gap-4">
                        {popularSearches.map((item) => (
                          <SearchChip
                            key={item}
                            label={item}
                            variant="popular"
                            iconPosition="left"
                            onClick={() => {
                              setValue(item);
                              handleSearch(item);
                              onClose();
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-10 bg-black/5 backdrop-blur-[1px] transition-all"
        />
      )}
    </>
  );
}
