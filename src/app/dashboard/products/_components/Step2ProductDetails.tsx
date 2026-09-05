"use client";

import { getColors } from "@/src/app/dashboard/products/_services/color-api";
import { getSizes } from "@/src/app/dashboard/products/_services/size-api";
import {
  ErrorIcon,
  PencilIcon,
  SuccessOutlineIcon,
  TrashIcon,
} from "@/src/shared/constants/icons";
import { TomanIcon } from "@/src/shared/constants/icons/toman-icon";
import { Caption, Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { SelectRHF } from "@/src/shared/ui/extar-components/form-filds/custom-select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import { RichTextEditor } from "../../blogs/_components/rich-text-editor";
import { ProductFormValues, ProductVariant } from "../_types/product.types";

type Step2ProductDetailsProps = {
  control: Control<ProductFormValues>;
};

// ---------- کامپوننت کارت نمایش واریانت ----------
function VariantCard({
  variant,
  index,
  onEdit,
  onRemove,
  colorMap,
  sizeMap,
}: {
  variant: ProductVariant & { id?: number };
  index: number;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  colorMap: Record<number, string>;
  sizeMap: Record<number, string>;
}) {
  const colorName = colorMap[variant.color_id] || "نامشخص";
  const sizeName = sizeMap[variant.size_id] || "نامشخص";

  return (
    <div className="group relative flex w-[160px] flex-col gap-2 rounded-xs border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Caption text="سایز :" size="xs" />
          <Caption text={sizeName} size="xs" />
        </div>
        <div className="flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(index)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-blue-500 hover:bg-blue-50"
            title="ویرایش"
          >
            <PencilIcon size="sm" color="text-secondary" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-red-500 hover:bg-red-50"
            title="حذف"
          >
            <TrashIcon size="sm" color="text-secondary" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Caption text="رنگ :" size="xs" />
        <Caption text={colorName} size="xs" />
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-2">
        <span className="text-xs font-semibold text-gray-900">
          {variant.price?.toLocaleString()}
          <span className="mr-1 font-normal text-gray-400">تومان</span>
        </span>
        <span className="text-[11px] text-gray-500">
          موجودی: {variant.stock}
        </span>
      </div>
    </div>
  );
}

export function Step2ProductDetails({ control }: Step2ProductDetailsProps) {
  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "product_variants",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // ---------- محتوای توضیحات (ادیتور) ----------
  const description = watch("description") || "";

  // ---------- کوئری‌ها ----------
  const { data: colorsData } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
  const { data: sizesData } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
  });

  const colorOptions =
    colorsData?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) ?? [];
  const sizeOptions =
    sizesData?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) ?? [];

  const colorMap: Record<number, string> = {};
  colorsData?.data?.forEach((c) => (colorMap[c.id] = c.name));
  const sizeMap: Record<number, string> = {};
  sizesData?.data?.forEach((s) => (sizeMap[s.id] = s.name));

  // ---------- ریست کردن فرم پیش‌نویس ----------
  const resetDraft = () => {
    setValue("variant_draft", {
      color_id: 0,
      size_id: 0,
      price: 0,
      stock: 0,
      sku: "",
    });
  };

  // ---------- پر کردن فرم هنگام ویرایش ----------
  const handleEdit = (index: number) => {
    const variant = getValues(`product_variants.${index}`) as ProductVariant;
    setValue("variant_draft", { ...variant });
    setEditingIndex(index);
  };

  // ---------- انصراف از ویرایش ----------
  const handleCancelEdit = () => {
    setEditingIndex(null);
    resetDraft();
  };

  // ---------- افزودن یا ویرایش واریانت ----------
  const handleAddOrUpdate = () => {
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

  // ---------- حذف واریانت ----------
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
      {/* ---------- فرم افزودن/ویرایش واریانت ---------- */}
      <div className="rounded-sm border border-gray p-4">
        <div className="mb-2 flex items-center justify-between">
          <Text
            text={
              editingIndex !== null ? "ویرایش واریانت" : "افزودن واریانت جدید"
            }
            size="md"
            weight="bold"
          />
          <div className="flex items-center gap-2">
            {editingIndex !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="cursor-pointer"
              >
                <SuccessOutlineIcon size="md" color="text-success" />
              </button>
            )}
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition"
            >
              {editingIndex !== null ? (
                <ErrorIcon size="md" color="text-danger" />
              ) : (
                <SuccessOutlineIcon size="md" color="text-success" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <SelectRHF
            control={control}
            name="variant_draft.color_id"
            label="رنگ"
            options={colorOptions}
          />
          <SelectRHF
            control={control}
            name="variant_draft.size_id"
            label="سایز"
            options={sizeOptions}
          />
          <CustomInputRHF
            control={control}
            name="variant_draft.price"
            label="قیمت"
            type="number"
            icon={TomanIcon}
            required
          />
          <CustomInputRHF
            control={control}
            name="variant_draft.stock"
            label="موجودی"
            type="number"
            required
          />
        </div>
      </div>

      {/* ---------- لیست کارت‌های واریانت ---------- */}
      {fields.length > 0 && (
        <div>
          <Text text="واریانت‌های اضافه شده" size="md" weight="bold" />
          <div className="mt-2 flex flex-wrap gap-3">
            {fields.map((field, index) => {
              const variant = field as ProductVariant;
              return (
                <VariantCard
                  key={field.id}
                  variant={variant}
                  index={index}
                  onEdit={handleEdit}
                  onRemove={handleRemove}
                  colorMap={colorMap}
                  sizeMap={sizeMap}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- توضیحات محصول (ادیتور متن) ---------- */}
      <div>
        <div className="mb-2">
          <Text text="توضیحات کالا" size="md" weight="medium" />
        </div>
        <RichTextEditor
          value={description}
          onChange={(val) =>
            setValue("description", val, { shouldValidate: true })
          }
        />
        {errors.description && (
          <Text
            text={`${errors.description.message}`}
            size="sm"
            color="danger"
          />
        )}
      </div>
    </div>
  );
}
