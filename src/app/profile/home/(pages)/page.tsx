// src/app/profile/home/(pages)/page.tsx
import { HomeBody } from "@/src/app/profile/home/_components/home-body";
import { OrderSummary } from "@/src/app/profile/home/_components/order-summary";

export default function Page() {
  return (
    <>
      <OrderSummary />
      <HomeBody />
    </>
  );
}