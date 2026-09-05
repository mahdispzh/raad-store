"use client";

import { Text } from "@/src/shared/ui";
import { Control, useFormContext } from "react-hook-form";
import { RichTextEditor } from "../../blogs/_components/rich-text-editor";
import { ProductFormValues } from "../_types/product.types";

type ProductDescriptionEditorProps = {
  control: Control<ProductFormValues>;
};

export function ProductDescriptionEditor({
  control,
}: ProductDescriptionEditorProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  const description = watch("description") || "";

  return (
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
        <Text text={`${errors.description.message}`} size="sm" color="danger" />
      )}
    </div>
  );
}
