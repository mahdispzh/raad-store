// src/app/(landing)/products/(pages)/[slug]/page.tsx

import {
  buildProductMetadata,
  getProductJsonLd,
} from "@/src/shared/lib/seo/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { LandingProduct } from "../../_components/LandingProduct";
import {
  getPublicProductBySlug,
  getSimilarProducts,
} from "../../_services/products.server";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

async function resolveSlug(params: PageProps["params"]) {
  const resolved = params instanceof Promise ? await params : params;
  return resolved.slug;
}

// ✅ cache می‌کنه که بین generateMetadata و خود صفحه، دو بار فچ نزنه
const getProduct = cache(async (slug: string) => {
  return getPublicProductBySlug(decodeURIComponent(slug));
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = await resolveSlug(params);
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "محصول یافت نشد",
      robots: { index: false, follow: false },
    };
  }

  return buildProductMetadata(product as any);
}

export default async function ProductPage({ params }: PageProps) {
  const slug = await resolveSlug(params);
  const product = await getProduct(slug);

  if (!product) {
    // ✅ 404 واقعی برمی‌گردونه به‌جای یه <div> با status 200
    notFound();
  }

  const similarProducts = product.category_id
    ? await getSimilarProducts(product.category_id, product.id)
    : [];

  // TODO: اگه سرویس دریافت نظرات/امتیاز محصول سمت سرور داری، اینجا صداش بزن
  // و ratingInfo رو به getProductJsonLd پاس بده تا ستاره امتیاز توی گوگل نشون داده بشه:
  // const { averageRating, reviewCount } = await getProductRating(product.id);
  const jsonLd = getProductJsonLd(
    product as any /*, { ratingValue: averageRating, reviewCount } */,
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingProduct
        initialProduct={product}
        productSlug={slug}
        similarProducts={similarProducts}
      />
    </>
  );
}
