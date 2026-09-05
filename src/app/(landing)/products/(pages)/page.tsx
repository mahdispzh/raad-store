/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getProductsListJsonLd,
  productsListMetadata,
} from "@/src/shared/lib/seo/metadata";
import type { Metadata } from "next";
import { Suspense } from "react";
import { LandingProducts } from "../_components/LandingProducts";
import { getColors } from "../_services/colors.server";
import { getPublicProducts } from "../_services/products.server";
import type { ProductItem } from "../_types";
import type { Color } from "../_types/landing-products.types";

export const metadata: Metadata = productsListMetadata;

export default async function Page() {
  // throw new Error("Test 500 Error");
  const colorsData = await getColors({ limit: 100 });
  const initialColors: Color[] = colorsData.data || [];

  const productsData = await getPublicProducts({ limit: 100 });
  const initialProducts: ProductItem[] = productsData.data.map((item: any) => ({
    ...item,
    brand: item.brands,
    category: item.categories,
  })) as ProductItem[];

  const jsonLd = getProductsListJsonLd(
    initialProducts.slice(0, 50).map((p: any) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
    })),
  );
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <Suspense
        fallback={<div className="p-8 text-center">در حال بارگذاری...</div>}
      >
        <LandingProducts
          initialColors={initialColors}
          initialProducts={initialProducts}
        />
      </Suspense>
    </>
  );
}
