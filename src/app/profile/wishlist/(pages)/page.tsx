// app/profile/wishlist/page.tsx
"use client";

import { ProfilePageTitle } from "@/src/shared/components/profile-page-title";
import { WishlistBody } from "../_components/main";

export default function WishlistPage() {
  return (
    <>
      <ProfilePageTitle title={"لیست علاقه مندی ها"} />
      <WishlistBody />
    </>
  );
}