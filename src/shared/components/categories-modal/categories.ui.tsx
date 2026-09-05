"use client";

import { DropleftArrowIcon } from "@/src/shared/constants/icons/dropleft-arrow-icon";
import { Caption, EmptyImage, Text } from "@/src/shared/ui";
import { StyledButton } from "@/src/shared/ui/styled-button/styled-button.ui";
import Link from "next/link";
import { CloseModalIcon } from "../../constants/icons";
import { CategoriesModalSkeleton } from "./categories-modal-skeleton.ui";
import { CategoriesModalProps } from "./categories.types";
import { useBreakpoint } from "./useBreakpoint";
import { useCategoriesModal } from "./useCategories";

export const CategoriesModal = ({
  isOpen,
  onClose,
  anchorRef,
}: CategoriesModalProps) => {
  const {
    mainCategories,
    selectedCategory,
    subCategories,
    selectedSubCategory,
    isLoading,
    error,
    position,
    modalRef,
    handleCategorySelect,
    handleSubCategorySelect,
    handleClose,
    handleViewAllProducts,
    getImageUrl,
    getCategoryDescription,
    truncateDescription,
  } = useCategoriesModal({
    isOpen,
    onClose,
    anchorRef,
  });

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === "desktop";
  const isMobile = breakpoint === "mobile";

  // اگر مودال باز نیست، چیزی نمایش نده
  if (!isOpen) return null;

  // فقط در دسکتاپ از موقعیت‌دهی وابسته به anchor استفاده می‌کنیم
  const desktopPositionStyle = isDesktop
    ? {
        top: position.top,
        left: position.left,
        transform: "translateX(-100%)",
        width: "45vw",
        maxWidth: "700px",
      }
    : undefined;

  const rootClassName = isDesktop
    ? "fixed z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-xs border border-gray bg-white shadow-lg"
    : "fixed inset-x-0 bottom-0 z-50 flex h-[85vh] h-[85dvh] w-full flex-col overflow-hidden rounded-xs border border-gray bg-white shadow-lg sm:inset-x-auto sm:right-0 sm:bottom-8 sm:h-[80vh] sm:w-[90vw] sm:max-w-md sm:rounded-xs";

  // Loading State
  if (isLoading) {
    return (
      <div
        ref={modalRef}
        className={rootClassName}
        style={desktopPositionStyle}
      >
        <CategoriesModalSkeleton />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        ref={modalRef}
        className={rootClassName}
        style={desktopPositionStyle}
      >
        <div className="flex items-center justify-center p-8">
          <div className="max-w-sm text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <Text text={error} size="md" color="danger" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={modalRef}
      className={rootClassName}
      style={desktopPositionStyle}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex flex-none items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-5 sm:py-2">
        <Text text="دسته‌بندی" size="lg" weight="bold" color="primary" />
        <StyledButton
          variant="icon"
          icon={<CloseModalIcon size="xs" color="text-primary" />}
          action={handleClose}
          size="md"
          type="primary"
          style="fill"
        />
      </div>

      {isMobile ? (
        /* ==================== حالت موبایل: لیست accordion ==================== */
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.mobile-cat-list::-webkit-scrollbar { display: none; }`}</style>

          {mainCategories.length === 0 ? (
            <div className="flex h-32 items-center justify-center">
              <Text text="دسته‌ای وجود ندارد" size="sm" color="gray" />
            </div>
          ) : (
            <div className="mobile-cat-list flex flex-col gap-1">
              {mainCategories.map((category) => {
                const isSelected = selectedCategory?.id === category.id;
                return (
                  <div key={category.id} className="flex flex-col">
                    {/* آیتم دسته اصلی */}
                    <div
                      onClick={() => handleCategorySelect(category)}
                      className={`flex cursor-pointer items-start gap-3 rounded-xs px-3 py-2 transition-colors ${
                        isSelected
                          ? "bg-accent/30 text-danger"
                          : "hover:bg-accent/30"
                      }`}
                    >
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xs">
                        {category.image ? (
                          <img
                            src={getImageUrl(category.image)}
                            alt={category.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (
                                e.currentTarget as HTMLImageElement
                              ).style.display = "none";
                            }}
                          />
                        ) : (
                          <EmptyImage />
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center gap-1">
                          <Text
                            text={category.name}
                            size="md"
                            weight={isSelected ? "bold" : "regular"}
                          />
                          {category.childrenCount > 0 && (
                            <Caption
                              text={`(${category.childrenCount})`}
                              size="xs"
                              weight="medium"
                              color="primary"
                            />
                          )}
                        </div>
                        <Caption
                          text={truncateDescription(category.description)}
                          size="xs"
                          weight="medium"
                          color="secondary"
                        />
                      </div>
                      <div
                        className={`mt-2 flex-shrink-0 transition-transform ${
                          isSelected ? "-rotate-90" : ""
                        }`}
                      >
                        <DropleftArrowIcon size="xs" color="text-primary" />
                      </div>
                    </div>

                    {/* زیردسته‌ها: دقیقاً زیر همین آیتم باز می‌شه */}
                    {isSelected && (
                      <div className="flex flex-col gap-1 border-r-2 border-danger/30 bg-gray-50 py-2 pr-3 pl-4">
                        {/* لینک مشاهده همه محصولات این دسته */}
                        <Link
                          href={`/products?categoryId=${selectedCategory.id}&category=${selectedCategory.slug}`}
                          onClick={handleViewAllProducts}
                          className="flex items-center gap-2 px-3 py-2"
                        >
                          <Text
                            text={`همه محصولات ${selectedCategory.name}`}
                            size="sm"
                            color="danger"
                            weight="medium"
                          />
                          {selectedCategory.productsCount > 0 && (
                            <Caption
                              text={`(${selectedCategory.productsCount})`}
                              size="xs"
                              weight="regular"
                              color="danger"
                            />
                          )}
                        </Link>

                        {subCategories && subCategories.length > 0 ? (
                          subCategories.map((sub) => (
                            <div
                              key={sub.id}
                              onClick={() => handleSubCategorySelect(sub)}
                              className={`flex cursor-pointer items-center justify-between rounded-xs px-3 py-2 transition-colors ${
                                selectedSubCategory?.id === sub.id
                                  ? "bg-accent/50 text-danger"
                                  : "hover:bg-accent/30"
                              }`}
                            >
                              <Link
                                href={`/products?categoryId=${sub.id}&category=${sub.slug}`}
                                className="flex w-full min-w-0 items-center justify-between gap-2"
                              >
                                <Text text={sub.name} size="sm" />
                                {sub.productsCount > 0 && (
                                  <span className="rounded-full bg-danger px-2 py-0.5 text-xs text-white">
                                    {sub.productsCount}
                                  </span>
                                )}
                              </Link>
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2">
                            <Text
                              text="زیردسته‌ای وجود ندارد"
                              size="sm"
                              color="gray"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* ==================== حالت تبلت/دسکتاپ: دو پنل کنار هم (بدون تغییر) ==================== */
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Main Categories */}
          <div
            className="w-2/5 overflow-y-auto border-l border-gray bg-white pt-6 pr-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              .w-2\\/5::-webkit-scrollbar { display: none; }
            `}</style>

            {mainCategories.length === 0 ? (
              <div className="flex h-32 items-center justify-center">
                <Text text="دسته‌ای وجود ندارد" size="sm" color="gray" />
              </div>
            ) : (
              mainCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`flex cursor-pointer items-start gap-3 px-3 py-2 transition-colors ${
                    selectedCategory?.id === category.id
                      ? "border-r-2 border-danger bg-accent/30 text-danger"
                      : "hover:bg-accent/30"
                  }`}
                >
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xs">
                    {category.image ? (
                      <img
                        src={getImageUrl(category.image)}
                        alt={category.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <EmptyImage />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center gap-1">
                      <Text
                        text={category.name}
                        size="md"
                        weight={
                          selectedCategory?.id === category.id
                            ? "bold"
                            : "regular"
                        }
                      />
                      {category.childrenCount > 0 && (
                        <Caption
                          text={`(${category.childrenCount})`}
                          size="xs"
                          weight="medium"
                          color="primary"
                        />
                      )}
                    </div>
                    <Caption
                      text={truncateDescription(category.description)}
                      size="xs"
                      weight="medium"
                      color="secondary"
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Panel - Sub Categories */}
          <div
            className="w-3/5 overflow-y-auto p-5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              .w-3\\/5::-webkit-scrollbar { display: none; }
            `}</style>

            {selectedCategory && (
              <div className="mb-4 flex items-center gap-2">
                <Link
                  href={`/products?categoryId=${selectedCategory.id}&category=${selectedCategory.slug}`}
                  onClick={handleViewAllProducts}
                  className="flex items-center gap-2"
                >
                  <Text
                    text={`همه محصولات ${selectedCategory.name}`}
                    size="lg"
                    color="danger"
                    weight="medium"
                  />
                  <DropleftArrowIcon size="sm" color="text-danger" />
                  {selectedCategory.productsCount > 0 && (
                    <Caption
                      text={`(${selectedCategory.productsCount})`}
                      size="xs"
                      weight="regular"
                      color="danger"
                    />
                  )}
                </Link>
              </div>
            )}

            {subCategories && subCategories.length > 0 ? (
              <div className="grid gap-1">
                {subCategories.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => handleSubCategorySelect(sub)}
                    className={`flex cursor-pointer items-center justify-between px-3 py-3 transition-colors ${
                      selectedSubCategory?.id === sub.id
                        ? "border-r-2 border-danger bg-accent/30 text-danger"
                        : "hover:border-r-2 hover:border-danger hover:bg-accent/30"
                    }`}
                  >
                    <Link
                      href={`/products?categoryId=${sub.id}&category=${sub.slug}`}
                    >
                      <div className="flex min-w-0 flex-1 flex-col">
                        <Text text={sub.name} size="md" />
                      </div>
                      {sub.productsCount > 0 && (
                        <span className="rounded-full bg-danger px-2 py-1 text-xs text-white">
                          {sub.productsCount}
                        </span>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                <Text text="زیردسته‌ای وجود ندارد" size="sm" color="gray" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
