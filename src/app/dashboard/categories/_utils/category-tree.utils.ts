import { Category } from "../_services/categories.api";

export type CategoryWithDepth = Category & {
  depth: number;
  path: string;
};

export function computeCategoryDepths(
  categories: Category[],
): CategoryWithDepth[] {
  const map = new Map<number, Category>();
  categories.forEach((c) => map.set(c.id, c));

  const getDepthAndPath = (
    category: Category,
    visited = new Set<number>(),
  ): { depth: number; path: string } => {
    if (visited.has(category.id)) {
      return { depth: 1, path: category.name };
    }
    visited.add(category.id);

    if (!category.parent_id) {
      return { depth: 1, path: category.name };
    }

    const parent = map.get(category.parent_id);
    if (!parent) {
      return { depth: 1, path: category.name };
    }

    const parentResult = getDepthAndPath(parent, visited);
    return {
      depth: parentResult.depth + 1,
      path: `${parentResult.path} > ${category.name}`,
    };
  };

  return categories.map((c) => {
    const { depth, path } = getDepthAndPath(c);
    return { ...c, depth, path };
  });
}
