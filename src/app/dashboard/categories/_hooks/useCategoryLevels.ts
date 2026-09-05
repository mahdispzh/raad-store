// src/shared/hooks/useCategoryLevels.ts
"use client";

import { useMemo } from "react";
import { Category } from "../_services/categories.api";
import {
  CategoryWithDepth,
  computeCategoryDepths,
} from "../_utils/category-tree.utils";

export interface CategoryOption {
  value: number;
  label: string;
}

export interface UseCategoryLevelsResult {
  categoriesWithDepth: CategoryWithDepth[];
  level1Categories: CategoryWithDepth[];
  level2Categories: CategoryWithDepth[];
  level3Categories: CategoryWithDepth[];
  level1Options: CategoryOption[];
  level2Options: CategoryOption[];
  level3Options: CategoryOption[];
  // نگاشت id به مسیر کامل (مثلاً "شلوار > شلوار لی") — برای نمایش سریع در جدول لیست
  pathById: Map<number, string>;
  // نگاشت id به خود آیتم با عمقش — برای دسترسی سریع
  categoryById: Map<number, CategoryWithDepth>;
}

export function useCategoryLevels(
  categories: Category[] | undefined | null,
): UseCategoryLevelsResult {
  return useMemo(() => {
    const list = categories ?? [];
    const categoriesWithDepth = computeCategoryDepths(list);

    const isValid = (c: CategoryWithDepth) =>
      c.id !== undefined && !!c.name?.trim();

    const level1Categories = categoriesWithDepth.filter(
      (c) => c.depth === 1 && isValid(c),
    );
    const level2Categories = categoriesWithDepth.filter(
      (c) => c.depth === 2 && isValid(c),
    );
    const level3Categories = categoriesWithDepth.filter(
      (c) => c.depth === 3 && isValid(c),
    );

    const level1Options = level1Categories.map((c) => ({
      value: c.id,
      label: c.name,
    }));
    const level2Options = level2Categories.map((c) => ({
      value: c.id,
      label: c.path,
    }));
    const level3Options = level3Categories.map((c) => ({
      value: c.id,
      label: c.path,
    }));

    const pathById = new Map<number, string>();
    const categoryById = new Map<number, CategoryWithDepth>();
    categoriesWithDepth.forEach((c) => {
      pathById.set(c.id, c.path);
      categoryById.set(c.id, c);
    });

    return {
      categoriesWithDepth,
      level1Categories,
      level2Categories,
      level3Categories,
      level1Options,
      level2Options,
      level3Options,
      pathById,
      categoryById,
    };
  }, [categories]);
}
