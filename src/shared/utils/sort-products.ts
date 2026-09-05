export type SortType =
  | "newest"
  | "price-low"
  | "price-high"
  | "popular"
  | "rating";

export const sortProducts = <T extends Record<string, any>>(
  products: T[],
  sortBy: SortType,
): T[] => {
  const sorted = [...products];

  switch (sortBy) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);

    case "popular":
      return sorted.sort((a, b) => (b.sales || 0) - (a.sales || 0));

    case "rating":
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    default:
      return sorted;
  }
};
