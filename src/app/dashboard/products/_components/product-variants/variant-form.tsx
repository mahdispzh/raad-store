"use client";

import { ErrorIcon, SuccessOutlineIcon } from "@/src/shared/constants/icons";
import { TomanIcon } from "@/src/shared/constants/icons/toman-icon";
import { Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { SelectRHF } from "@/src/shared/ui/extar-components/form-filds/custom-select";
import { Control } from "react-hook-form";
import { ProductFormValues } from "../../_types/product.types";

type Option = { value: number; label: string };

type VariantFormProps = {
  control: Control<ProductFormValues>;
  colorOptions: Option[];
  sizeOptions: Option[];
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function VariantForm({
  control,
  colorOptions,
  sizeOptions,
  isEditing,
  onSave,
  onCancel,
}: VariantFormProps) {
  return (
    <div className="rounded-sm border border-gray p-4">
      <div className="mb-2 flex items-center justify-between">
        <Text
          text={isEditing ? "ویرایش واریانت" : "افزودن واریانت جدید"}
          size="md"
          weight="bold"
        />
        <div className="flex items-center gap-2">
          {isEditing && (
            <button type="button" onClick={onCancel} title="انصراف">
              <ErrorIcon size="md" color="text-danger" />
            </button>
          )}
          <button
            type="button"
            onClick={onSave}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition"
            title="ذخیره"
          >
            <SuccessOutlineIcon size="md" color="text-success" />
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
  );
}
