// src/app/(landing)/tutorial/page.tsx

import type { Metadata } from "next";
import { ComingSoonSection } from "@/src/shared/components/soon-section/soon-section";
import { tutorialMetadata } from "@/src/shared/lib/seo/metadata";

export const metadata: Metadata = tutorialMetadata;

export default function TutorialPage() {
  return <ComingSoonSection />;
}