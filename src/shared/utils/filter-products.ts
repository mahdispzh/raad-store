export const filterProducts = <T extends Record<string, any>>(
  products: T[],
  search: string,
): T[] => {
  return products.filter((product) =>
    product.title?.toLowerCase().includes(search.toLowerCase()),
  );
};
