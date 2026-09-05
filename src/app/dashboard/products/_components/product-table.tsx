// // _components/product-table.tsx
// "use client";

// import { ProductDeleteModal } from "@/src/app/dashboard/products/_components/product-delete-modal";
// import { useProducts } from "@/src/app/dashboard/products/_hooks/useProducts";
// import { Product } from "@/src/app/dashboard/products/_types/product.types";
// import { PlusEmptyIcon, TrashIcon } from "@/src/shared/constants/icons";
// import { ComposeIcon } from "@/src/shared/constants/icons/compose-icon";
// import { ColorPicker } from "@/src/shared/ui/color-picker/color-picker.ui";
// import {
//   DynamicTable,
//   TableActions,
//   TableColumn,
//   TableImage,
//   TablePrice,
//   TableText,
// } from "@/src/shared/ui/dynamic-table/dynamic-table.ui";
// import { Pagination } from "@/src/shared/ui/pagination/pagination.ui";
// import { SizePicker } from "@/src/shared/ui/size-picker/size-picker.ui";
// import { getProductStatus } from "@/src/shared/utils/getProductStatusByCount";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import { useDeleteProduct } from "../_hooks/useDeleteProduct";

// const LIMIT = 10;

// const FILTER_TO_PARAMS: Record<string, { sort?: string; discount?: string }> = {
//   all: {},
//   newest: { sort: "newest" },
//   best_selling: { sort: "popular" },
//   discounted: { discount: "true" },
// };

// type LastPicked = "color" | "size";

// export const ProductTable = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const page = Math.max(1, Number(searchParams.get("page")) || 1);
//   const filter = searchParams.get("filter") ?? "all";

//   const setPage = (newPage: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("page", String(newPage));
//     router.push(`?${params.toString()}`);
//   };

//   const setFilter = (newFilter: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("filter", newFilter);
//     params.set("page", "1");
//     router.push(`?${params.toString()}`);
//   };

//   const backendParams = FILTER_TO_PARAMS[filter] ?? {};
//   const { data } = useProducts(page, LIMIT, backendParams);
//   const products = data?.data ?? [];
//   const meta = data?.meta;
//   const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

//   const deleteMutation = useDeleteProduct();

//   const [selectedColorByProduct, setSelectedColorByProduct] = useState<
//     Record<number, number>
//   >({});
//   const [selectedSizeByProduct, setSelectedSizeByProduct] = useState<
//     Record<number, number>
//   >({});
//   const [lastPickedByProduct, setLastPickedByProduct] = useState<
//     Record<number, LastPicked>
//   >({});
//   const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

//   const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
//   const [deleteModal, setDeleteModal] = useState(false);

//   const visibleProducts = useMemo(() => {
//     if (filter === "in_stock") {
//       return products.filter((p) =>
//         p.product_variants?.some((v) => v.stock > 0),
//       );
//     }
//     if (filter === "out_of_stock") {
//       return products.filter(
//         (p) => !p.product_variants?.some((v) => v.stock > 0),
//       );
//     }
//     return products;
//   }, [products, filter]);

//   const getColorsOf = (product: Product) => {
//     const map = new Map<
//       number,
//       { id: number; name: string; hex_code: string }
//     >();
//     product.product_variants?.forEach((v) => map.set(v.color_id, v.colors));
//     return Array.from(map.values());
//   };

//   const getSizesOf = (product: Product) => {
//     const map = new Map<number, { id: number; name: string }>();
//     product.product_variants?.forEach((v) => map.set(v.size_id, v.sizes));
//     return Array.from(map.values());
//   };

//   const getSelectedVariant = (product: Product) => {
//     const variants = product.product_variants ?? [];
//     if (variants.length === 0) return null;

//     const colorId = selectedColorByProduct[product.id];
//     const sizeId = selectedSizeByProduct[product.id];
//     const lastPicked = lastPickedByProduct[product.id];

//     const exact = variants.find(
//       (v) => v.color_id === colorId && v.size_id === sizeId,
//     );
//     if (exact) return exact;

//     if (lastPicked === "size" && sizeId !== undefined) {
//       const bySize = variants.find((v) => v.size_id === sizeId);
//       if (bySize) return bySize;
//     }
//     if (lastPicked === "color" && colorId !== undefined) {
//       const byColor = variants.find((v) => v.color_id === colorId);
//       if (byColor) return byColor;
//     }

//     return (
//       variants.find((v) => v.color_id === colorId) ??
//       variants.find((v) => v.size_id === sizeId) ??
//       variants[0]
//     );
//   };

//   const handleColorSelect = (product: Product, hex: string) => {
//     const color = getColorsOf(product).find((c) => c.hex_code === hex);
//     if (!color) return;
//     setSelectedColorByProduct((prev) => ({ ...prev, [product.id]: color.id }));
//     setLastPickedByProduct((prev) => ({ ...prev, [product.id]: "color" }));
//   };

//   const handleSizeSelect = (product: Product, sizeName: string) => {
//     const size = getSizesOf(product).find((s) => s.name === sizeName);
//     if (!size) return;
//     setSelectedSizeByProduct((prev) => ({ ...prev, [product.id]: size.id }));
//     setLastPickedByProduct((prev) => ({ ...prev, [product.id]: "size" }));
//   };

//   // ✅ به‌جای باز کردن مودال، می‌ره به صفحه‌ی ادیت
//   const handleEdit = (product: Product) => {
//     router.push(`/dashboard/products/${product.slug}/edit`);
//   };

//   const handleDeleteOne = (product: Product) => {
//     setSelectedSlug(product.slug);
//     setDeleteModal(true);
//   };

//   const handleBulkDelete = async () => {
//     if (selectedIds.size === 0) return;
//     const slugs = products
//       .filter((p) => selectedIds.has(p.id))
//       .map((p) => p.slug);
//     await Promise.all(slugs.map((slug) => deleteMutation.mutateAsync(slug)));
//     setSelectedIds(new Set());
//   };

//   const columns: TableColumn<Product>[] = [
//     {
//       key: "image",
//       header: "عکس",
//       render: (product) => {
//         const imageSrc =
//           product.images?.[0]?.trim() || "/images/placeholder.jpg";
//         return (
//           <div className={product.status === 0 ? "opacity-10 grayscale" : ""}>
//             <TableImage src={imageSrc} alt={product.name} slug={product.slug} />
//           </div>
//         );
//       },
//     },

//     {
//       key: "name",
//       header: "نام",
//       render: (product) => (
//         <div className="flex items-center gap-2">
//           <TableText
//             text={product.name}
//             color={product.status === 0 ? "danger" : "primary"}
//           />
//         </div>
//       ),
//     },
//     {
//       key: "colors",
//       header: "رنگ",
//       render: (product) => {
//         const colors = getColorsOf(product);
//         const selectedColorId = selectedColorByProduct[product.id];
//         const selectedColorHex =
//           colors.find((c) => c.id === selectedColorId)?.hex_code ?? "";

//         return (
//           <ColorPicker
//             colors={colors.map((c) => c.hex_code)}
//             selectedColor={selectedColorHex}
//             onColorSelect={(hex) => handleColorSelect(product, hex)}
//             visibleLimit={3}
//           />
//         );
//       },
//     },
//     {
//       key: "sizes",
//       header: "سایز",
//       render: (product) => {
//         const sizes = getSizesOf(product);
//         const selectedSizeId = selectedSizeByProduct[product.id];
//         const selectedSizeName =
//           sizes.find((s) => s.id === selectedSizeId)?.name ?? "";

//         return (
//           <SizePicker
//             sizes={sizes.map((s) => s.name)}
//             selectedSize={selectedSizeName}
//             onSizeSelect={(name) => handleSizeSelect(product, name)}
//             visibleLimit={3}
//           />
//         );
//       },
//     },
//     {
//       key: "price",
//       header: "قیمت",
//       render: (product) => (
//         <TablePrice price={getSelectedVariant(product)?.price ?? 0} />
//       ),
//     },
//     {
//       key: "stock",
//       header: "موجودی",
//       render: (product) => (
//         <TableText text={`${getSelectedVariant(product)?.stock ?? 0}`} />
//       ),
//     },

//     {
//       key: "status",
//       header: "وضعیت",
//       render: (product) => {
//         if (product.status === 0) {
//           return <TableText text=" حذف شده" color="danger" weight="medium" />;
//         }
//         const status = getProductStatus(
//           getSelectedVariant(product)?.stock ?? 0,
//         );
//         return (
//           <TableText
//             text={status.text}
//             color={status.color === "danger" ? "danger" : "success"}
//           />
//         );
//       },
//     },

//     {
//       key: "actions",
//       header: "عملیات",
//       render: (product) => {
//         if (product.status === 0) {
//           return null;
//         }

//         return (
//           <TableActions
//             actions={[
//               { icon: ComposeIcon, onClick: () => handleEdit(product) },
//               { icon: TrashIcon, onClick: () => handleDeleteOne(product) },
//             ]}
//           />
//         );
//       },
//     },
//   ];

//   return (
//     <>
//       <DynamicTable
//         columns={columns}
//         rows={visibleProducts}
//         selectAllLabel="انتخاب همه محصولات"
//         onSelectionChange={setSelectedIds}
//         actions={[
//           {
//             icon: <PlusEmptyIcon size="xs" />,
//             onClick: () => router.push("/dashboard/products/create"),
//           },
//           {
//             icon: <TrashIcon size="xs" color="text-secondary" />,
//             onClick: handleBulkDelete,
//           },
//         ]}
//         filterOptions={[
//           { label: "فیلتر ها", value: "all" },
//           { label: "موجود", value: "in_stock" },
//           { label: "ناموجود", value: "out_of_stock" },
//           { label: "پرفروش‌ترین", value: "best_selling" },
//           { label: "جدیدترین", value: "newest" },
//         ]}
//         filterValue={filter}
//         onFilterChange={(value) => setFilter(value)}
//       />

//       {meta && meta.total > 0 && (
//         <Pagination
//           page={page}
//           totalPages={totalPages}
//           onPageChange={setPage}
//         />
//       )}

//       {deleteModal && selectedSlug && (
//         <ProductDeleteModal
//           productSlug={selectedSlug}
//           onClose={() => setDeleteModal(false)}
//         />
//       )}
//     </>
//   );
// };
"use client";

import { ProductDeleteModal } from "@/src/app/dashboard/products/_components/product-delete-modal";
import { useProducts } from "@/src/app/dashboard/products/_hooks/useProducts";
import { Product } from "@/src/app/dashboard/products/_types/product.types";
import { PlusEmptyIcon, TrashIcon } from "@/src/shared/constants/icons";
import { ComposeIcon } from "@/src/shared/constants/icons/compose-icon";
import { ColorPicker } from "@/src/shared/ui/color-picker/color-picker.ui";
import {
  DynamicTable,
  TableActions,
  TableColumn,
  TableImage,
  TablePrice,
  TableText,
} from "@/src/shared/ui/dynamic-table/dynamic-table.ui";
import { Pagination } from "@/src/shared/ui/pagination/pagination.ui";
import { SizePicker } from "@/src/shared/ui/size-picker/size-picker.ui";
import { getProductStatus } from "@/src/shared/utils/getProductStatusByCount";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const LIMIT = 10;

const FILTER_TO_PARAMS: Record<string, { sort?: string; discount?: string }> = {
  all: {},
  newest: { sort: "newest" },
  best_selling: { sort: "popular" },
  discounted: { discount: "true" },
};

type LastPicked = "color" | "size";

export const ProductTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const filter = searchParams.get("filter") ?? "all";

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  const setFilter = (newFilter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", newFilter);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const backendParams = FILTER_TO_PARAMS[filter] ?? {};
  const { data } = useProducts(page, LIMIT, backendParams);
  const products = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const [selectedColorByProduct, setSelectedColorByProduct] = useState<
    Record<number, number>
  >({});
  const [selectedSizeByProduct, setSelectedSizeByProduct] = useState<
    Record<number, number>
  >({});
  const [lastPickedByProduct, setLastPickedByProduct] = useState<
    Record<number, LastPicked>
  >({});
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const [slugsToDelete, setSlugsToDelete] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const visibleProducts = useMemo(() => {
    if (filter === "in_stock") {
      return products.filter((p) =>
        p.product_variants?.some((v) => v.stock > 0),
      );
    }
    if (filter === "out_of_stock") {
      return products.filter(
        (p) => !p.product_variants?.some((v) => v.stock > 0),
      );
    }
    return products;
  }, [products, filter]);

  const getColorsOf = (product: Product) => {
    const map = new Map<
      number,
      { id: number; name: string; hex_code: string }
    >();
    product.product_variants?.forEach((v) => map.set(v.color_id, v.colors));
    return Array.from(map.values());
  };

  const getSizesOf = (product: Product) => {
    const map = new Map<number, { id: number; name: string }>();
    product.product_variants?.forEach((v) => map.set(v.size_id, v.sizes));
    return Array.from(map.values());
  };

  const getSelectedVariant = (product: Product) => {
    const variants = product.product_variants ?? [];
    if (variants.length === 0) return null;

    const colorId = selectedColorByProduct[product.id];
    const sizeId = selectedSizeByProduct[product.id];
    const lastPicked = lastPickedByProduct[product.id];

    const exact = variants.find(
      (v) => v.color_id === colorId && v.size_id === sizeId,
    );
    if (exact) return exact;

    if (lastPicked === "size" && sizeId !== undefined) {
      const bySize = variants.find((v) => v.size_id === sizeId);
      if (bySize) return bySize;
    }
    if (lastPicked === "color" && colorId !== undefined) {
      const byColor = variants.find((v) => v.color_id === colorId);
      if (byColor) return byColor;
    }

    return (
      variants.find((v) => v.color_id === colorId) ??
      variants.find((v) => v.size_id === sizeId) ??
      variants[0]
    );
  };

  const handleColorSelect = (product: Product, hex: string) => {
    const color = getColorsOf(product).find((c) => c.hex_code === hex);
    if (!color) return;
    setSelectedColorByProduct((prev) => ({ ...prev, [product.id]: color.id }));
    setLastPickedByProduct((prev) => ({ ...prev, [product.id]: "color" }));
  };

  const handleSizeSelect = (product: Product, sizeName: string) => {
    const size = getSizesOf(product).find((s) => s.name === sizeName);
    if (!size) return;
    setSelectedSizeByProduct((prev) => ({ ...prev, [product.id]: size.id }));
    setLastPickedByProduct((prev) => ({ ...prev, [product.id]: "size" }));
  };

  const handleEdit = (product: Product) => {
    router.push(`/dashboard/products/${product.slug}/edit`);
  };

  const handleDeleteOne = (product: Product) => {
    setSlugsToDelete([product.slug]);
    setDeleteModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    const slugs = products
      .filter((p) => selectedIds.has(p.id))
      .map((p) => p.slug);
    setSlugsToDelete(slugs);
    setDeleteModal(true);
  };

  const columns: TableColumn<Product>[] = [
    {
      key: "image",
      header: "عکس",
      render: (product) => {
        const imageSrc =
          product.images?.[0]?.trim() || "/images/placeholder.jpg";
        return (
          <div className={product.status === 0 ? "opacity-10 grayscale" : ""}>
            <TableImage src={imageSrc} alt={product.name} slug={product.slug} />
          </div>
        );
      },
    },
    {
      key: "name",
      header: "نام",
      render: (product) => (
        <div className="flex items-center gap-2">
          <TableText
            text={product.name}
            color={product.status === 0 ? "danger" : "primary"}
          />
        </div>
      ),
    },
    {
      key: "colors",
      header: "رنگ",
      render: (product) => {
        const colors = getColorsOf(product);
        const selectedColorId = selectedColorByProduct[product.id];
        const selectedColorHex =
          colors.find((c) => c.id === selectedColorId)?.hex_code ?? "";

        return (
          <ColorPicker
            colors={colors.map((c) => c.hex_code)}
            selectedColor={selectedColorHex}
            onColorSelect={(hex) => handleColorSelect(product, hex)}
            visibleLimit={3}
          />
        );
      },
    },
    {
      key: "sizes",
      header: "سایز",
      render: (product) => {
        const sizes = getSizesOf(product);
        const selectedSizeId = selectedSizeByProduct[product.id];
        const selectedSizeName =
          sizes.find((s) => s.id === selectedSizeId)?.name ?? "";

        return (
          <SizePicker
            sizes={sizes.map((s) => s.name)}
            selectedSize={selectedSizeName}
            onSizeSelect={(name) => handleSizeSelect(product, name)}
            visibleLimit={3}
          />
        );
      },
    },
    {
      key: "price",
      header: "قیمت",
      render: (product) => (
        <TablePrice price={getSelectedVariant(product)?.price ?? 0} />
      ),
    },
    {
      key: "stock",
      header: "موجودی",
      render: (product) => (
        <TableText text={`${getSelectedVariant(product)?.stock ?? 0}`} />
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      render: (product) => {
        if (product.status === 0) {
          return <TableText text=" حذف شده" color="danger" weight="medium" />;
        }
        const status = getProductStatus(
          getSelectedVariant(product)?.stock ?? 0,
        );
        return (
          <TableText
            text={status.text}
            color={status.color === "danger" ? "danger" : "success"}
          />
        );
      },
    },
    {
      key: "actions",
      header: "عملیات",
      render: (product) => {
        if (product.status === 0) {
          return null;
        }

        return (
          <TableActions
            actions={[
              { icon: ComposeIcon, onClick: () => handleEdit(product) },
              { icon: TrashIcon, onClick: () => handleDeleteOne(product) },
            ]}
          />
        );
      },
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        rows={visibleProducts}
        selectAllLabel="انتخاب همه محصولات"
        onSelectionChange={setSelectedIds}
        actions={[
          {
            icon: <PlusEmptyIcon size="xs" />,
            onClick: () => router.push("/dashboard/products/create"),
          },
          {
            icon: <TrashIcon size="xs" color="text-secondary" />,
            onClick: handleBulkDelete,
          },
        ]}
        filterOptions={[
          { label: "فیلتر ها", value: "all" },
          { label: "موجود", value: "in_stock" },
          { label: "ناموجود", value: "out_of_stock" },
          { label: "پرفروش‌ترین", value: "best_selling" },
          { label: "جدیدترین", value: "newest" },
        ]}
        filterValue={filter}
        onFilterChange={(value) => setFilter(value)}
      />

      {meta && meta.total > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {deleteModal && slugsToDelete.length > 0 && (
        <ProductDeleteModal
          productSlugs={slugsToDelete}
          onClose={() => {
            setDeleteModal(false);
            setSlugsToDelete([]);
          }}
          onSuccess={() => setSelectedIds(new Set())}
        />
      )}
    </>
  );
};
