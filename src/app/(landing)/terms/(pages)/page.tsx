// src/app/(landing)/terms/page.tsx
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Text, Title } from "@/src/shared/ui";
import { TermsData } from "../_types/terms.types";
import { TermsAccordion } from "../_components/main";
import { getTermsJsonLd, termsMetadata } from "@/src/shared/lib/seo/metadata";

export const metadata: Metadata = termsMetadata;

// دریافت دیتا در سرور
async function getTermsData(): Promise<TermsData> {
  const jsonPath = path.join(
    process.cwd(),
    "src/app/(landing)/terms/_constants/terms.json",
  );
  const jsonData = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(jsonData);
}

export default async function TermsPage() {
  const termsData = await getTermsData();
  const jsonLd = getTermsJsonLd(termsData);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-6">
        <Title text={termsData.title} variant="underlined" size="2xl" />
      </div>

      <div className="mb-8">
        <Text text={termsData.intro} size="lg" weight="regular" color="gray" />
      </div>

      {/* کلاینت کامپوننت برای بخش تعاملی */}
      <TermsAccordion faqs={termsData.faqs} />
    </div>
  );
}