import { useMemo, useState } from "react";
import type {
  Color,
  Filters,
  ProductItemFromApi,
  SortType,
} from "../_types/landing-products.types";

interface UseLandingProductsLogicParams {
  initialCategoryId?: number;
  initialColors?: Color[];
  initialProducts?: ProductItemFromApi[];
}

export function useLandingProductsLogic({
  initialCategoryId,
  initialColors = [],
  initialProducts = [],
}: UseLandingProductsLogicParams) {
  const [tempPriceRange, setTempPriceRange] = useState({
    min: 0,
    max: 50000000,
  });
  const [tempSelectedColorIds, setTempSelectedColorIds] = useState<number[]>(
    [],
  );

  // فقط برای آکاردئون داخل سایدبار دسکتاپ (FiltersContainer)
  const [activeFilter, setActiveFilter] = useState<"price" | "color" | null>(
    null,
  );

  // فقط برای مودال موبایل/تبلت — کاملاً مستقل از آکاردئون دسکتاپ
  const [mobileFilterModal, setMobileFilterModal] = useState<
    "price" | "color" | null
  >(null);

  // فیلترهای اعمال‌شده
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    minPrice: 0,
    maxPrice: 50000000,
    colorIds: [],
    categoryId: initialCategoryId,
    sort: "likes",
  });

  const [colorsList] = useState<Color[]>(initialColors);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    result = result.filter((product) => {
      const price = product.product_variants?.[0]?.price ?? 0;
      return (
        price >= appliedFilters.minPrice && price <= appliedFilters.maxPrice
      );
    });

    if (appliedFilters.colorIds.length > 0) {
      result = result.filter((product) => {
        return product.product_variants?.some((variant) =>
          appliedFilters.colorIds.includes(variant.color_id),
        );
      });
    }

    if (appliedFilters.categoryId) {
      result = result.filter(
        (product) => product.category_id === appliedFilters.categoryId,
      );
    }

    switch (appliedFilters.sort) {
      case "likes":
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case "views":
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "sold":
        result.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime(),
        );
        break;
      default:
        break;
    }

    return result;
  }, [initialProducts, appliedFilters]);

  const updateTempColor = (id: number) => {
    setTempSelectedColorIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const applyFilters = () => {
    setAppliedFilters({
      ...appliedFilters,
      minPrice: tempPriceRange.min,
      maxPrice: tempPriceRange.max,
      colorIds: tempSelectedColorIds,
    });
    setActiveFilter(null);
    setMobileFilterModal(null);
  };

  const resetFilters = () => {
    setTempPriceRange({ min: 0, max: 50000000 });
    setTempSelectedColorIds([]);
    setActiveFilter(null);
    setMobileFilterModal(null);
    setAppliedFilters({
      minPrice: 0,
      maxPrice: 50000000,
      colorIds: [],
      categoryId: initialCategoryId,
      sort: "likes",
    });
  };

  const handleSort = (sortValue: string) => {
    const allowed: SortType[] = [
      "likes",
      "views",
      "sold",
      "newest",
      "discount",
    ];
    if (allowed.includes(sortValue as SortType)) {
      setAppliedFilters((prev) => ({ ...prev, sort: sortValue as SortType }));
    }
  };

  return {
    tempPriceRange,
    setTempPriceRange,
    tempSelectedColorIds,
    updateTempColor,
    activeFilter,
    setActiveFilter,
    mobileFilterModal,
    setMobileFilterModal,
    applyFilters,
    resetFilters,
    handleSort,
    isLoading: false,
    isError: false,
    error: null,
    finalProducts: filteredProducts,
    appliedSort: appliedFilters.sort,
    colorsList,
  };
}
