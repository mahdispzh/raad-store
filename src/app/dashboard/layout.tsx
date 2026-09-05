"use client";

import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";
import { NavbarDashboard } from "@/src/shared/components/navbar-dashboard/navbar-dashboard.ui";
import { SidebarDashboard } from "@/src/shared/components/sidebar-dashboard/sidebar-dashboard.constants";
import { Sidebar } from "@/src/shared/components/sidebar-dashboard/sidebar-dashboard.ui";
import { TopBar } from "@/src/shared/components/top-bar/top-bar.ui";
import { AdminGuard } from "@/src/shared/providers/admin-provider";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // اگر مسیر شامل invoice باشد، نوبار را نشان نده

  return (
    
    <AdminGuard>
      
      <DashboardContainer>
        <DashboardSidebar>
          <Sidebar />
        </DashboardSidebar>

        <DashboardMain>
          <TopBar />
          {children}
        </DashboardMain>
      </DashboardContainer>
          

    </AdminGuard>
  );
}