// // _components/dashboard-sidebar-stats.ui.tsx
// "use client";

// import { Caption, DefaultButton, Subtitle, Text } from "@/src/shared/ui";
// import { useRouter } from "next/navigation";
// import { useOrdersSummary, usePaymentsSummary, useProductsSummary } from "../_hooks/useDashboardStats";

// function StatValue({
//   isLoading,
//   isError,
//   value,
//   color = "primary",
// }: {
//   isLoading: boolean;
//   isError: boolean;
//   value: string;
//   color?: "primary" | "danger";
// }) {
//   if (isLoading) {
//     return <div className="h-6 w-16 animate-pulse rounded bg-accent" />;
//   }
//   if (isError) {
//     return <Text text="خطا در دریافت" size="sm" color="danger" weight="regular" />;
//   }
//   return <Subtitle text={value} size="2xl" color={color} weight="bold" />;
// }

// export function DashboardSidebarStats() {
//   const router = useRouter();

//   const {
//     data: ordersSummary,
//     isLoading: isOrdersLoading,
//     isError: isOrdersError,
//   } = useOrdersSummary();

//   const {
//     data: paymentsSummary,
//     isLoading: isPaymentsLoading,
//     isError: isPaymentsError,
//   } = usePaymentsSummary();

//   const {
//     data: productsSummary,
//     isLoading: isProductsLoading,
//     isError: isProductsError,
//   } = useProductsSummary();

//   const isSalesLoading = isPaymentsLoading || isProductsLoading;
//   const isSalesError = isPaymentsError || isProductsError;

//   const totalSettledAmount = paymentsSummary?.totalIncome ?? 0;
//   const productsRunningLow = productsSummary?.lowStockVariants ?? 0;

//   const newOrders = ordersSummary?.pendingOrders ?? 0;
//   const inProgressOrders = ordersSummary
//     ? ordersSummary.confirmedOrders +
//       ordersSummary.preparingOrders +
//       ordersSummary.readyToShipOrders +
//       ordersSummary.shippedOrders
//     : 0;
//   const completedOrders = ordersSummary?.deliveredOrders ?? 0;

//   const orderStats = [
//     { label: "سفارشات جدید", value: newOrders.toLocaleString("fa-IR"), isDanger: true },
//     { label: "سفارشات در جریان", value: inProgressOrders.toLocaleString("fa-IR"), isDanger: false },
//     { label: "سفارشات پایان یافته", value: completedOrders.toLocaleString("fa-IR"), isDanger: false },
//   ];

//   return (
//     <div className="flex h-auto w-full flex-col gap-5 pt-16">
//       {/* کارت وضعیت فروش */}
//       <div className="flex h-auto w-full flex-col rounded-sm bg-pure-white shadow-xl">
//         <div className="border-b-2 border-accent px-4 py-4">
//           <Text text="وضعیت فروش" size="lg" color="secondary" weight="bold" />
//         </div>

//         <div className="flex flex-col gap-3 px-4 py-4">
//           <div className="flex flex-col items-start justify-between gap-1">
//             <div className="flex flex-row items-baseline gap-1">
//               <StatValue
//                 isLoading={isSalesLoading}
//                 isError={isSalesError}
//                 value={totalSettledAmount.toLocaleString("fa-IR")}
//                 color="danger"
//               />
//               {!isSalesLoading && !isSalesError && (
//                 <Text text="تومان" size="md" weight="bold" color="danger" />
//               )}
//             </div>
//             <Caption text="جمع کل مبالغ تسویه شده" size="xs" weight="regular" color="primary" />
//           </div>
//           <div className="flex flex-col items-start justify-between gap-1">
//             <StatValue
//               isLoading={isSalesLoading}
//               isError={isSalesError}
//               value={productsRunningLow.toLocaleString("fa-IR")}
//               color="primary"
//             />
//             <Caption text="محصولات در حال اتمام" size="xs" weight="regular" />
//           </div>
//         </div>

//         <div className="px-5 pb-4">
//           <div className="mb-4 h-0.5 bg-accent"></div>
//           <DefaultButton
//             label="لیست پرداخت‌ها"
//             style="outline"
//             type="secondary"
//             action={() => router.push("/dashboard/payments")}
//           />
//         </div>
//       </div>

//       {/* کارت وضعیت سفارشات */}
//       <div className="flex h-auto w-full flex-col rounded-sm bg-pure-white shadow-xl">
//         <div className="border-b-2 border-accent px-4 py-4">
//           <Text text="وضعیت سفارشات" size="lg" color="secondary" weight="bold" />
//         </div>

//         <div className="flex flex-col gap-2 px-4 py-4">
//           {orderStats.map((stat, index) => (
//             <div key={index} className="flex flex-row items-center justify-between">
//               <Text text={stat.label} size="sm" color="primary" weight="regular" />
//               <StatValue
//                 isLoading={isOrdersLoading}
//                 isError={isOrdersError}
//                 value={stat.value}
//                 color={stat.isDanger ? "danger" : "primary"}
//               />
//             </div>
//           ))}
//           <div className="h-0.5 bg-accent"></div>
//         </div>

//         <div className="px-5 pb-4">
//           <DefaultButton
//             label="لیست سفارشات"
//             style="outline"
//             type="secondary"
//             action={() => router.push("/dashboard/factors")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }