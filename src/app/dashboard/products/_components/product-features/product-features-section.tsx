"use client";

import { useState } from "react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import { ProductFeature, ProductFormValues } from "../../_types/product.types";
import { FeatureForm } from "./feature-form";
import { FeatureList } from "./feature-list";

type ProductFeaturesSectionProps = {
  control: Control<ProductFormValues>;
};

export function ProductFeaturesSection({
  control,
}: ProductFeaturesSectionProps) {
  const { setValue, getValues } = useFormContext<ProductFormValues>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "features",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const resetDraft = () => {
    setValue("feature_draft", { name: "", value: "" });
  };

  const handleEdit = (index: number) => {
    const feature = getValues(`features.${index}`) as ProductFeature;
    setValue("feature_draft", { ...feature });
    setEditingIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    resetDraft();
  };

  const handleSave = () => {
    const draft = getValues("feature_draft") as ProductFeature;

    if (!draft?.name?.trim() || !draft?.value?.trim()) {
      alert("لطفاً نام و مقدار ویژگی را وارد کنید.");
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

  return (
    <div className="flex flex-col gap-4">
      <FeatureForm
        control={control}
        isEditing={editingIndex !== null}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />

      <FeatureList
        features={fields as ProductFeature[]}
        onEdit={handleEdit}
        onRemove={handleRemove}
      />
    </div>
  );
}
