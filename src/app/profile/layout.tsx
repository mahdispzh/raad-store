// app/profile/layout.tsx
"use client";
import { LogoutModal } from "@/src/shared/components/logout/logout-modal.ui";
import { logoutService } from "@/src/shared/components/logout/logout.api";
import { NavbarLanding } from "@/src/shared/components/navbar-landing/navbar-landing.ui";
import { ProfileContainer } from "@/src/shared/components/profile-container";
import { ProfileMain } from "@/src/shared/components/profile-main";
import { ProfileSidebar } from "@/src/shared/components/profile-sidebar";
import { Sidebar } from "@/src/shared/components/sidebar/sidebar.ui";
import { UserGuard } from "@/src/shared/providers/user-provider";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const hideSidebar = ["/profile/cart", "/profile/payment"].includes(pathname);

  const handleLogout = async () => {
    try {
      await logoutService.fullLogout();
      setIsLogoutModalOpen(false);
      router.replace("/");
    } finally {
    }
  };

  return (
    <UserGuard>
      {hideSidebar ? (
        children
      ) : (
        <>
          <NavbarLanding />

          <ProfileContainer>
            <ProfileSidebar>
              <Sidebar onLogoutClick={() => setIsLogoutModalOpen(true)} />
            </ProfileSidebar>

            <ProfileMain>{children}</ProfileMain>
          </ProfileContainer>

          <LogoutModal
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}
            onConfirm={handleLogout}
          />
        </>
      )}
    </UserGuard>
  );
}
