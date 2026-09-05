"use client";

import { ProductCard } from "@/src/shared/components/product-card/product-card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLandingProductsLogic } from "../_hooks/useLandingProductsLogic";
import type {
  Color,
  ProductItemFromApi,
} from "../_types/landing-products.types";
import { FiltersContainer } from "./filters-container";
import { FiltersModal } from "./filters-modal";
import { SortBar } from "./sort-bar";

interface LandingProductsProps {
  initialColors?: Color[];
  initialProducts?: ProductItemFromApi[];
}

export function LandingProducts({
  initialColors = [],
  initialProducts = [],
}: LandingProductsProps) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const logic = useLandingProductsLogic({
    ...(categoryId ? { initialCategoryId: Number(categoryId) } : {}),
    initialColors,
    initialProducts,
  });

  if (logic.isLoading)
    return (
      <div className="flex items-center justify-center p-6 md:p-[2vw]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-danger" />
      </div>
    );

  if (logic.isError)
    return (
      <div className="flex items-center justify-center p-6 text-red-500 md:p-[2vw]">
        خطا در دریافت محصولات: {logic.error?.message}
      </div>
    );

  if (logic.finalProducts.length === 0)
    return (
      <div className="flex items-center justify-center p-6 text-gray-500 md:p-[2vw]">
        محصولی یافت نشد.
      </div>
    );

  const sortOptions = [
    {
      label: "محبوب‌ترین",
      active: logic.appliedSort === "likes",
      onClick: () => logic.handleSort("likes"),
    },
    {
      label: "پرفروش‌ترین",
      active: logic.appliedSort === "sold",
      onClick: () => logic.handleSort("sold"),
    },
    {
      label: "جدیدترین",
      active: logic.appliedSort === "newest",
      onClick: () => logic.handleSort("newest"),
    },
    {
      label: "بیشترین تخفیف",
      active: logic.appliedSort === "discount",
      onClick: () => logic.handleSort("discount"),
    },
    {
      label: "پربازدیدترین",
      active: logic.appliedSort === "views",
      onClick: () => logic.handleSort("views"),
    },
  ];

  return (
    <div className="flex flex-col items-start gap-6 p-4 lg:flex-row lg:gap-[2vw] lg:p-[2vw]">
      <div className="hidden lg:sticky lg:top-35 lg:mt-2 lg:block lg:w-64 lg:shrink-0 lg:self-start xl:w-72">
        <FiltersContainer
          activeFilter={logic.activeFilter}
          applyFilters={logic.applyFilters}
          colors={logic.colorsList}
          resetFilters={logic.resetFilters}
          setActiveFilter={logic.setActiveFilter}
          setTempPriceRange={logic.setTempPriceRange}
          tempPriceRange={logic.tempPriceRange}
          tempSelectedColorIds={logic.tempSelectedColorIds}
          updateTempColor={logic.updateTempColor}
        />
      </div>

      <div className="mt-0 flex w-full min-w-0 flex-1 flex-col gap-6 lg:mt-2 lg:gap-10">
        <SortBar
          options={sortOptions}
          title="مرتب سازی:"
          onOpenPriceFilter={() => logic.setMobileFilterModal("price")}
          onOpenColorFilter={() => logic.setMobileFilterModal("color")}
        />
        <div className="grid w-full grid-cols-1 gap-4 rounded-sm border border-gray px-3 py-4 min-[480px]:grid-cols-2 min-[770px]:grid-cols-3 min-[1262px]:grid-cols-4 min-[1598px]:grid-cols-5 md:gap-6 md:px-4 md:py-6 lg:gap-[1.5vw] lg:px-[1.5vw] lg:py-[1.5vw]">
          {logic.finalProducts.map((product, index) => (
            <div
              key={product.id}
              className={`min-w-0 transition-all duration-700 ease-out ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } `}
              style={{
                transitionDelay: `${Math.min(index * 40, 400)}ms`,
              }}
            >
              <ProductCard
                id={product.id}
                imageSrc={product.images?.[0] || ""}
                isLiked={product.isLiked}
                price={product.product_variants?.[0]?.price ?? 0}
                rating={4.2}
                slug={product.slug}
                title={product.name}
              />
            </div>
          ))}
        </div>
      </div>

      {logic.mobileFilterModal && (
        <FiltersModal
          filterType={logic.mobileFilterModal}
          onClose={() => logic.setMobileFilterModal(null)}
          applyFilters={logic.applyFilters}
          resetFilters={logic.resetFilters}
          colors={logic.colorsList}
          tempPriceRange={logic.tempPriceRange}
          setTempPriceRange={logic.setTempPriceRange}
          tempSelectedColorIds={logic.tempSelectedColorIds}
          updateTempColor={logic.updateTempColor}
        />
      )}
    </div>
  );
}
