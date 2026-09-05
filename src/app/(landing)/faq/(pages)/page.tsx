// src/app/test/faq/page.tsx

import faqData from "@/src/shared/constants/texts/texts.json";
import { FaqMain } from "../_components/main";
import { faqMetadata, getFaqJsonLd } from "@/src/shared/lib/seo/metadata";

export const metadata = faqMetadata;

// FAQ Page - Server Component
export default function FaqPage() {
  const categories = faqData?.faq?.categories || [];
  
  // گرفتن JSON-LD از فایل seo.ts
  const faqJsonLd = getFaqJsonLd(categories);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* محتوای اصلی */}
      <FaqMain categories={categories} />
    </>
  );
}