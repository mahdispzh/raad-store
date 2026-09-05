// src/app/(landing)/application/page.tsx

import type { Metadata } from "next";
import { ComingSoonSection } from "@/src/shared/components/soon-section/soon-section";
import { applicationMetadata } from "@/src/shared/lib/seo/metadata";

export const metadata: Metadata = applicationMetadata;

export default function ApplicationPage() {
  return <ComingSoonSection />;
}