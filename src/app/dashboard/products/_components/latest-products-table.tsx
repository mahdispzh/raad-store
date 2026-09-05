"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { CustomTable } from "@/src/shared/components/custom-table/custom-table.ui";
import type { TableColumn } from "@/src/shared/components/custom-table/table.types";
import { ProductStatusBadge } from "@/src/shared/ui/product-status-badge/product-status-badge.ui";
import { Text, AddButton } from "@/src/shared/ui";
import { EditPanelIcon, FactorIcon, PencilIcon, TimelineIcon, TrashIcon } from "@/src/shared/constants/icons";
import { StyledButton } from "@/src/shared/ui/styled-button/styled-button.ui"; // <-- import جدید

export type LatestProductRow = {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  status: "available" | "unavailable";
};

export function LatestProductsTable({ rows }: { rows: LatestProductRow[] }) {
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/dashboard/products/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    // TODO: وصل کردن به mutation واقعی حذف محصول
    console.log("delete product", id);
  };
const handleAddProduct = () => {
    router.push("/dashboard/products/create");
  };
  const columns: TableColumn<LatestProductRow>[] = [
    // ۱. عکس
    {
      key: "image",
      header: "عکس",
      align: "center",
      render: (row) =>
        row.image ? (
          <div className="mx-auto h-12 w-12 overflow-hidden rounded-xs">
            <Image
              src={row.image}
              alt={row.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <Text text="—" size="sm" color="secondary" align="center" />
        ),
    },
    // ۲. نام
    {
      key: "name",
      header: "نام",
      align: "center",
      render: (row) => (
        <Text text={row.name} size="sm" color="secondary" align="center" />
      ),
    },
    // ۳. قیمت
    {
      key: "price",
      header: "قیمت (تومان)",
      align: "center",
      render: (row) => (
        <Text
          text={row.price.toLocaleString("fa-IR")}
          size="sm"
          color="secondary"
          weight="medium"
          align="center"
        />
      ),
    },
    // ۴. موجودی
    {
      key: "stock",
      header: "موجودی",
      align: "center",
      render: (row) => (
        <Text
          text={row.stock > 0 ? `${row.stock.toLocaleString("fa-IR")} عدد` : "—"}
          size="sm"
          color="secondary"
          align="center"
        />
      ),
    },
    // ۵. وضعیت
    {
      key: "status",
      header: "وضعیت",
      align: "center",
      render: (row) => <ProductStatusBadge status={row.status} />,
    },
    // ۶. عملیات
    {
      key: "actions",
      header: "",
      align: "center",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          {/* دکمه ویرایش */}
          <StyledButton
            variant="icon"
            type="secondary"
            icon={<EditPanelIcon
 size="sm" color="text-secondary" />}
            action={() => handleEdit(row.id)}
          />
          {/* دکمه حذف */}
          <StyledButton
            variant="icon"
            type="secondary"
            icon={<TrashIcon size="sm" color="text-secondary" />}
            action={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
     <CustomTable
      title="آخرین محصولات"
      titleIcon={<TimelineIcon size="sm" color="text-secondary" />}
      columns={columns}
      rows={rows}
      showViewAll
      viewAllLabel="مشاهده همه"
      onViewAll={() => router.push("/dashboard/products/list")}
      // اضافه شد:
      showAddButton
      addButtonLabel="افزودن محصول"
      onAddClick={handleAddProduct}
    />
  );
}