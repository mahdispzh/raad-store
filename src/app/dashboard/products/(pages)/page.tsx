import Link from "next/link";
import {
  getLatestProductsForTable,
  getProductsReport,
} from "@/src/app/api/protected/admin-overview/products/_lib/report";
import { getProductsSummary } from "@/src/app/api/protected/admin-overview/products/_lib/summary";
import { PieChartCard } from "@/src/shared/components/pie-chart/pie-chart.ui";
import { SummaryCard } from "@/src/shared/components/summary-card/summary-card.ui";
import {
  BoxIcon,
  DocumentIcon,
  SuccessOutlineIcon,
  ErrorIcon,
  TagIcon,
  InventoryIcon,
  DashboardMinusIcon,
  PlusIcon,
   // اگه اسم واقعی آیکون پلاس فرق داره اصلاح کن
} from "@/src/shared/constants/icons";
import { LatestProductsTable } from "../_components/latest-products-table";
import { ProductRankings } from "../_components/product-rankings";

interface Props {}

export default async function Page({}: Props) {
  const [summary, report, latestProducts] = await Promise.all([
    getProductsSummary(),
    getProductsReport(),
    getLatestProductsForTable(4),
  ]);

  // در صورت نیاز به لیست محصولات کم‌موجود جای دیگه‌ای از صفحه، این رو نگه دار
  const lowStockRows = report.lowStockProducts.map((item) => {
    const stock = Math.min(...item.product_variants.map((v) => v.stock));

    return {
      id: item.id,
      image: item.images?.[0] ?? "",
      name: item.name,
      stock,
      status: stock === 0 ? "ناموجود" : "کم موجود",
    };
  });

  return (
    <>
      <SummaryCard
        title="خلاصه وضعیت"
        titleIcon={<DocumentIcon size="sm" color="text-secondary" />}
        items={[
          {
            value: summary.totalProducts,
            label: "کل محصولات",
            icon: <BoxIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.activeProducts,
            label: "محصولات فعال",
            icon: <SuccessOutlineIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.inactiveProducts,
            label: "محصولات غیرفعال",
            icon: <ErrorIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.discountedProducts,
            label: "محصولات دارای تخفیف",
            icon: <TagIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.newProducts,
            label: "محصولات جدید",
            icon: <InventoryIcon size="sm" color="text-secondary" />,
          },
          {
            value: summary.outOfStockProducts,
            label: "محصول نا موجود   ",
            icon: <DashboardMinusIcon size="sm" color="text-secondary" />,
          },
        ]}
      />

      <div className="flex items-stretch gap-10">
        <div className="flex w-[60%]">
          <LatestProductsTable rows={latestProducts} />
        </div>

        <div className="flex w-[40%]">
          <PieChartCard
            icon={<BoxIcon size="sm" color="text-secondary" />}
            title="وضعیت محصولات"
            data={[
              {
                key: "active",
                label: "فعال",
                value: summary.activeProducts,
              },
              {
                key: "inactive",
                label: "غیرفعال",
                value: summary.inactiveProducts,
              },
              {
                key: "pending",
                label: "دارای تخفیف  ",
                value: summary.discountedProducts,
              },
              {
                key: "outOfStock",
                label: "ناموجود",
                value: summary.outOfStockProducts,
              },
            ]}
          />
        </div>
      </div>
      <ProductRankings />
    </>
  );
}
