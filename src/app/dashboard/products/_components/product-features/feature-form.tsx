"use client";

import { ErrorIcon, SuccessOutlineIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { Control } from "react-hook-form";
import { ProductFormValues } from "../../_types/product.types";

type FeatureFormProps = {
  control: Control<ProductFormValues>;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function FeatureForm({
  control,
  isEditing,
  onSave,
  onCancel,
}: FeatureFormProps) {
  return (
    <div className="rounded-sm border border-gray p-4">
      <div className="mb-2 flex items-center justify-between">
        <Text
          text={isEditing ? "ویرایش ویژگی" : "افزودن ویژگی جدید"}
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

      <div className="grid grid-cols-2 gap-3">
        <CustomInputRHF
          control={control}
          name="feature_draft.name"
          label="نام ویژگی (مثلاً: جنس)"
        />
        <CustomInputRHF
          control={control}
          name="feature_draft.value"
          label="مقدار ویژگی (مثلاً: چرم طبیعی)"
        />
      </div>
    </div>
  );
}
