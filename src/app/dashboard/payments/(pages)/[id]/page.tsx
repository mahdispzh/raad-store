// [id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";
import { PaymentDetail } from "../../_components/payment-detail.ui";
import { SideDetails } from "../../_components/side-details";

export default function PaymentDetailPage() {
  const params = useParams<{ id: string }>();
  const paymentId = params.id;

  return (
    <DashboardContainer>
      <DashboardSidebar>
                <div className="flex h-auto w-full flex-col gap-5 pt-10">

        <SideDetails paymentId={paymentId} />
        </div>
      </DashboardSidebar>

      <DashboardMain>
        <div className="flex h-auto w-full flex-col gap-5 pt-10">
          <PaymentDetail paymentId={paymentId} />
        </div>
      </DashboardMain>
    </DashboardContainer>
  );
}