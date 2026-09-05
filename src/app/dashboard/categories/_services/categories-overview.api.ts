// src/app/dashboard/categories/_services/categories-overview.api.ts
import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export type CategoriesOverviewResponse = {
  summary: {
    totalCategories: number;
    rootCategories: number;
    childCategories: number;
    categoriesWithProducts: number;
    emptyCategories: number;
    totalProducts: number;
    averageProductsPerCategory: number;
    growth: {
      totalCategories: number;
      rootCategories: number;
      childCategories: number;
      categoriesWithProducts: number;
      emptyCategories: number;
      averageProductsPerCategory: number;
    };
  };
  report: {
    largestCategories: {
      id: number;
      name: string;
      image: string | null;
      _count: { products: number };
    }[];
    newestCategories: {
      id: number;
      name: string;
      slug: string;
      description: string | null;
      parent_id: number | null;
      created_at: string | null;
    }[];
  };
  charts: {
    categoriesLast30Days: { date: string; count: number }[];
    monthlyCategories: { month: string; count: number }[];
  };
};

export const getCategoriesOverview = () => {
  return fetcher<CategoriesOverviewResponse>(() =>
    apiClient.get("/protected/admin-overview/categories")
  );
};

export type CategoriesMonthlyChartResponse = {
  countByDay: { day: number; value: number }[];
  daysInMonth: number;
};

export const getCategoriesMonthlyChart = (month: string | number, year?: number) => {
  return fetcher<CategoriesMonthlyChartResponse>(() =>
    apiClient.get("/protected/admin-overview/categories/monthly", {
      params: year ? { month, year } : { month },
    })
  );
};