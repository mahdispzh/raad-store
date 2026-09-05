// app/(main)/(profile)/recently-view/page.tsx
"use client";

import { ProfilePageTitle } from "@/src/shared/components/profile-page-title";
import { RecentlyViewedBody } from "../_components/main";

export default function RecentlyViewPage() {
  return (
    <>
      <ProfilePageTitle title="بازدیدهای اخیر" />
      <RecentlyViewedBody />
    </>
  );
}