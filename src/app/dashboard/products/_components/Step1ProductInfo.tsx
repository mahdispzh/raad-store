"use client";

import { getBrands } from "@/src/app/dashboard/products/_services/brand-api";
import { getCategories } from "@/src/app/dashboard/products/_services/category-api";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { SelectRHF } from "@/src/shared/ui/extar-components/form-filds/custom-select";
import { useQuery } from "@tanstack/react-query";
import { Control } from "react-hook-form";
import { ProductFormValues } from "../../_types/product.types";

export function Step1ProductInfo({
  control,
}: {
  control: Control<ProductFormValues>;
}) {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: brandsData, isLoading: isBrandsLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  const categoryOptions =
    categoriesData?.data
      ?.filter((item) => item?.id !== undefined && item?.name?.trim())
      .map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? [];

  const brandOptions =
    brandsData?.data
      ?.filter((item) => item?.id !== undefined && item?.name?.trim())
      .map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? [];

  return (
    <div className="grid grid-cols-4 gap-4">
      <CustomInputRHF control={control} name="name" label="نام محصول" />
      <SelectRHF
        control={control}
        name="category_id"
        label="دسته بندی"
        options={categoryOptions}
        loading={isCategoriesLoading}
      />
      <SelectRHF
        control={control}
        name="brand_id"
        label="برند"
        options={brandOptions}
        loading={isBrandsLoading}
      />
      {/* ⬇️ جدید — فیلد تخفیف */}
      <CustomInputRHF
        control={control}
        name="discount"
        label="درصد تخفیف"
        type="number"
      />
    </div>
  );
}
