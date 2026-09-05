
// import { DashboardContainer } from "@/src/shared/components/dashboard-container";
// import { DashboardMain } from "@/src/shared/components/dashboard-main";
// import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";
// import {
//   DashboardMinusIcon,
//   DashboardPlusIcon,
//   DashboardRefreshIcon,
//   DashboardSuccessIcon,
//   DropleftArrowIcon,
//   ErrorIcon,
//   SuccessOutlineIcon,
// } from "@/src/shared/constants/icons";
// import texts from "@/src/shared/constants/texts/texts.json";
// import { LineChartDots } from "@/src/shared/ui";
// import { useRouter } from "next/navigation";
// import { ActionCard } from "../_components/action-card.ui";
// import InventoryCard from "../_components/inventory-card.ui";
// import { QuickCard } from "../_components/quick-card.ui";
// import SatisfactionCard from "../_components/satisfaction-card.ui";
// import StatusCard from "../_components/status-card.ui";
// import { useAdminOverview } from "../_hooks/useAdminOverview";
// import { useCategoriesOverview } from "../_hooks/useCategoriesOverview";
// import { useOrdersOverview } from "../_hooks/useOrdersOverview";
// import { calculateSatisfactionData } from "../_utils/satisfaction.utils";

// type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// // Helper function to get icon by name
// const getIcon = (iconName: string, size: IconSize = "lg") => {
//   const icons: Record<string, React.ReactNode> = {
//     DashboardMinusIcon: <DashboardMinusIcon color="text-primary" size={size} />,
//     ErrorIcon: <ErrorIcon color="text-danger" size={size} />,
//     DashboardRefreshIcon: (
//       <DashboardRefreshIcon color="text-warning" size={size} />
//     ),
//     SuccessOutlineIcon: <SuccessOutlineIcon color="text-success" size={size} />,
//     DashboardSuccessIcon: (
//       <DashboardSuccessIcon color="text-success" size={size} />
//     ),
//     DashboardPlusIcon: <DashboardPlusIcon color="text-primary" size={size} />,
//     DropleftArrowIcon: <DropleftArrowIcon color="text-primary" size={size} />,
//   };
//   return icons[iconName] || null;
// };

// // تبدیل عدد به فرمت فارسی
// const toPersianDigits = (num: number | undefined) => {
//   if (num === undefined) return "۰";
//   return num.toLocaleString("fa-IR");
// };

// // ✅ تابع کمکی برای تعیین مسیر دکمه‌های "افزودن" بر اساس id
// const getQuickAddRoute = (id: number): string => {
//   switch (id) {
//     case 1:
//       return "/dashboard/products";
//     case 2:
//       return "/dashboard/blogs";
//     case 3:
//       return "/dashboard/categories";
//     default:
//       return "/dashboard";
//   }
// };

// // Main dashboard page component
// export default function DashboardPage() {
//   const router = useRouter();
//   const { data, isLoading } = useAdminOverview();
//   console.log("chart :", data);
//   const chartData = {
//     charts: {
//       incomeLast30Days: data?.charts.productsLast30Days.map((item) => ({
//         date: item.date,
//         income: item.count,
//       })),

//       paymentsLast30Days: data?.charts.productsLast30Days.map((item) => ({
//         date: item.date,
//         count: 0,
//       })),

//       monthlyIncome: [],
//       monthlyPayments: [],
//     },
//   };
//   // گرفتن داده‌ی واقعی از API
//   const { data: overviewData, isLoading: isOverviewLoading } =
//     useAdminOverview();
//   const summary = overviewData?.summary;

//   // گرفتن داده‌ی دسته‌بندی‌ها
//   const { data: categoriesData, isLoading: isCategoriesLoading } =
//     useCategoriesOverview();
//   const categoriesSummary = categoriesData?.summary;

//   // گرفتن داده‌ی سفارش‌ها
//   const { data: ordersData, isLoading: isOrdersLoading } = useOrdersOverview();
//   const ordersSummary = ordersData?.summary;

//   // Transform quick items data
//   const quickItems = texts.dashboard.quickItems.map((item: any) => {
//     if (typeof item.value === "number" && item.valueUnit) {
//       return {
//         id: item.id,
//         label: item.label,
//         value: `${item.value} ${item.valueUnit}`,
//         isButton: true,
//         buttonIcon: item.buttonIcon
//           ? getIcon(item.buttonIcon, "xs")
//           : undefined,
//         onClick: () => router.push("/dashboard/factors"),
//       };
//     }

//     // ✅ آیتم‌های "افزودن" (محصول/بلاگ/دسته‌بندی) — مسیر بر اساس id تعیین می‌شود
//     if (item.buttonIcon && !item.value) {
//       return {
//         id: item.id,
//         label: item.label,
//         buttonIcon: getIcon(item.buttonIcon, "2xl"),
//         onClick: () => router.push(getQuickAddRoute(item.id)),
//       };
//     }

//     return {
//       id: item.id,
//       label: item.label,
//       value: item.value,
//       icon: item.icon ? getIcon(item.icon, "2xl") : undefined,
//       onClick: () => {},
//     };
//   });

//   const inventoryItems = [
//     {
//       value: toPersianDigits(summary?.totalStock),
//       label: "موجودی کل",
//       description: "",
//     },
//     {
//       value: toPersianDigits(summary?.outOfStockVariants),
//       label: "ناموجود",
//       description: "",
//     },
//     {
//       value: toPersianDigits(summary?.lowStockVariants),
//       label: "کم موجود",
//       description: "",
//     },
//   ];

//   const ordersItems = [
//     {
//       value: toPersianDigits(ordersSummary?.totalOrders),
//       label: "کل سفارش‌ها",
//       description: "",
//     },
//     {
//       value: toPersianDigits(ordersSummary?.todayOrders),
//       label: "سفارش‌های امروز",
//       description: "",
//     },
//     {
//       value: toPersianDigits(ordersSummary?.pendingOrders),
//       label: "در انتظار تایید",
//       description: "",
//     },
//   ];

//   const productsItems = [
//     {
//       value: toPersianDigits(ordersSummary?.preparingOrders),
//       label: "در حال آماده‌سازی",
//       description: "",
//     },
//     {
//       value: toPersianDigits(ordersSummary?.readyToShipOrders),
//       label: "آماده ارسال",
//       description: "",
//     },
//     {
//       value: toPersianDigits(ordersSummary?.shippedOrders),
//       label: "ارسال شده‌ها",
//       description: "",
//     },
//   ];

//   const statusItems = [
//     {
//       value: toPersianDigits(summary?.totalProducts),
//       label: "کل محصولات",
//       icon: getIcon("DashboardMinusIcon", "lg"),
//     },
//     {
//       value: toPersianDigits(summary?.activeProducts),
//       label: "محصولات فعال",
//       icon: getIcon("SuccessOutlineIcon", "lg"),
//     },
//     {
//       value: toPersianDigits(summary?.discountedProducts),
//       label: "محصولات دارای تخفیف",
//       icon: getIcon("DashboardRefreshIcon", "lg"),
//     },
//     {
//       value: toPersianDigits(categoriesSummary?.totalCategories),
//       label: "دسته‌بندی‌ها",
//       icon: getIcon("ErrorIcon", "lg"),
//     },
//     {
//       value: toPersianDigits(categoriesSummary?.categoriesWithProducts),
//       label: "دسته‌بندی‌های دارای محصول",
//       icon: getIcon("DashboardSuccessIcon", "lg"),
//     },
//   ];

//   const {
//     totalVotes,
//     satisfactionData,
//     overallPercentage,
//     fromTotalText,
//     formattedPercentage,
//   } = calculateSatisfactionData();

//   return (
//     <DashboardContainer>
//       {/* Sidebar section */}
//       <DashboardSidebar>
//         <div className="h-full">
//           <ActionCard />
//         </div>
//         <div className="aspect-square w-full">
//           <SatisfactionCard
//             chartPercentage={overallPercentage}
//             data={satisfactionData}
//             fromTotal={fromTotalText}
//             fromTotalValue={totalVotes}
//             title={texts.dashboard.customerSatisfaction.title}
//             total={formattedPercentage}
//           />
//         </div>
//       </DashboardSidebar>

//       {/* Main content section */}
//       <DashboardMain>
//         {/* Quick actions cards */}
//         <QuickCard items={quickItems} />

//         <div className="flex w-full flex-row gap-5">
//           {/* Inventory cards row */}
//           <div className="flex w-full flex-2 flex-col gap-4">
//             <InventoryCard
//               items={inventoryItems}
//               title={texts.dashboard.inventory.title}
//             />
//             <InventoryCard
//               items={ordersItems}
//               title={texts.dashboard.orders.title}
//             />
//             <InventoryCard
//               items={productsItems}
//               title={texts.dashboard.shipments.title}
//             />
//           </div>
//           <div className="w-full flex-5">
//             <LineChartDots
//               data={chartData}
//               isLoading={isLoading}
//               title="وضعیت محصول"
//               showLegend={true}
//               height={320}
//               className="mb-4"
//             />
//           </div>
//         </div>

//         {/* Shipment status card */}
//         <StatusCard items={statusItems} title={"وضعیت محصولات"} />
//       </DashboardMain>
//     </DashboardContainer>
//   );
// }