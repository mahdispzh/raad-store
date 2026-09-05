"use client";

import { getColors } from "@/src/app/dashboard/products/_services/color-api";
import { getSizes } from "@/src/app/dashboard/products/_services/size-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import { ProductFormValues, ProductVariant } from "../../_types/product.types";
import { VariantForm } from "./variant-form";
import { VariantList } from "./variant-list";

type ProductVariantsSectionProps = {
  control: Control<ProductFormValues>;
};

export function ProductVariantsSection({
  control,
}: ProductVariantsSectionProps) {
  const { setValue, getValues } = useFormContext<ProductFormValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "product_variants",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { data: colorsData } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
  const { data: sizesData } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
  });

  const colorOptions =
    colorsData?.data?.map((item) => ({ value: item.id, label: item.name })) ??
    [];
  const sizeOptions =
    sizesData?.data?.map((item) => ({ value: item.id, label: item.name })) ??
    [];

  const colorMap: Record<number, string> = {};
  colorsData?.data?.forEach((c) => (colorMap[c.id] = c.name));
  const sizeMap: Record<number, string> = {};
  sizesData?.data?.forEach((s) => (sizeMap[s.id] = s.name));

  const resetDraft = () => {
    setValue("variant_draft", {
      color_id: 0,
      size_id: 0,
      price: 0,
      stock: 0,
      sku: "",
    });
  };

  const handleEdit = (index: number) => {
    const variant = getValues(`product_variants.${index}`) as ProductVariant;
    setValue("variant_draft", { ...variant });
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    resetDraft();
  };

  const handleSave = () => {
    const draft = getValues("variant_draft") as ProductVariant;

    if (!draft?.color_id || !draft?.size_id) {
      alert("لطفاً رنگ و سایز را انتخاب کنید.");
      return;
    }
    if (draft.price < 0 || draft.stock < 0) {
      alert("قیمت و موجودی نباید منفی باشد.");
      return;
    }

    if (editingIndex !== null) {
      update(editingIndex, draft);
      setEditingIndex(null);
    } else {
      append(draft);
    }
    resetDraft();
  };

  const handleRemove = (index: number) => {
    remove(index);
    if (editingIndex === index) {
      setEditingIndex(null);
      resetDraft();
    }
  };

  if (!colorsData || !sizesData) {
    return <div className="py-4 text-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <VariantForm
        control={control}
        colorOptions={colorOptions}
        sizeOptions={sizeOptions}
        isEditing={editingIndex !== null}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />

      <VariantList
        variants={fields as ProductVariant[]}
        colorMap={colorMap}
        sizeMap={sizeMap}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
    </div>
  );
}
