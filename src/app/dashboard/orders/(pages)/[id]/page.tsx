"use client";

import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";
import { useParams } from "next/navigation";
import { FactorsDetailTable } from "../../_components/factor-detail.ui";

export default function FactorDetailPage() {
  const params = useParams();
  const factorId = params.id as string;

  return (
    <DashboardContainer>
      <DashboardMain>
        <FactorsDetailTable factorId={factorId} />
      </DashboardMain>
    </DashboardContainer>
  );
}
