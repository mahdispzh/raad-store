// src/app/(landing)/page.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHomeJsonLd, homeMetadata } from "@/src/shared/lib/seo/metadata";
import type { Metadata } from "next";
import { HomeMain } from "../_components/main";
import {
  getBanners,
  getCategories,
  getPublicProducts,
} from "../_services/home.server";
import type {
  Category,
  ProductCardProps,
  Slide,
} from "../_types/landing.types";
import { transformProductToCard } from "../_utils/product-transformer";

// 👇 این خط همون چیزیه که کم بود
export const metadata: Metadata = homeMetadata;

export default async function Home() {
  const [
    bannersRes,
    categoriesRes,
    latestRes,
    popularRes,
    bestSellingRes,
    saleRes,
  ] = await Promise.all([
    getBanners(),
    getCategories(),
    getPublicProducts({ sort: "newest", limit: 10, inStock: true }),
    getPublicProducts({ sort: "views", limit: 10, inStock: true }),
    getPublicProducts({ sort: "sold", limit: 10, inStock: true }),
    getPublicProducts({ sort: "discount", limit: 10, inStock: true }),
  ]);

  const slides: Slide[] = (bannersRes.data || [])
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map((banner) => ({
      id: banner.id,
      image: banner.image,
      alt: banner.alt || "",
    }));

  const transformList = (data: any[]): ProductCardProps[] =>
    data.map(transformProductToCard).filter(Boolean) as ProductCardProps[];

  const categories: Category[] = categoriesRes.data || [];
  const latestProducts = transformList(latestRes.data || []);
  const popularProducts = transformList(popularRes.data || []);
  const bestSellingProducts = transformList(bestSellingRes.data || []);
  const saleProducts = transformList(saleRes.data || []);

  const jsonLd = getHomeJsonLd();

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <HomeMain
        bestSellingProducts={bestSellingProducts}
        categories={categories}
        latestProducts={latestProducts}
        popularProducts={popularProducts}
        saleProducts={saleProducts}
        slides={slides}
      />
    </>
  );
}
