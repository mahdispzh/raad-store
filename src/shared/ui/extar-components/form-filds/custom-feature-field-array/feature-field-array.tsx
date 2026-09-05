"use client";

import { useFieldArray } from "react-hook-form";

import { useFeatureFieldArray } from "./use-feature-field-array";

import { Select } from "@/src/app/dashboard/products/_components/custom-select";
import { AddButton } from "@/src/shared/ui/extar-components/form-filds/custom-feature-field-array/add-button.tsx";
import { FeatureChip } from "@/src/shared/ui/extar-components/form-filds/custom-feature-field-array/feature-chip";
import { CustomInput } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { FEATURE_FIELD_ARRAY_ERRORS } from "./feature-field-array.constants";

export function FeatureFieldArray({
  control,
  name,
  mode,
  firstField,
  secondField,
  selectField,
}: any) {
  const { fields, append, remove } = useFieldArray({ control, name });

  const {
    firstValue,
    secondValue,
    setFirstValue,
    setSecondValue,
    error,
    setError,
    reset,
  } = useFeatureFieldArray();

  const validate = () => {
    if (mode === "single") {
      if (!firstValue.trim()) {
        setError(FEATURE_FIELD_ARRAY_ERRORS.REQUIRED);
        return false;
      }
    }

    if (mode === "pair") {
      if (!firstValue.trim() || !secondValue.trim()) {
        setError(FEATURE_FIELD_ARRAY_ERRORS.BOTH_REQUIRED);
        return false;
      }
    }

    if (mode === "select-select") {
      if (!firstValue || !secondValue.trim()) {
        setError(FEATURE_FIELD_ARRAY_ERRORS.BOTH_REQUIRED);
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleAdd = () => {
    if (!validate()) return;

    if (mode === "single") {
      append({
        [firstField.name]: firstValue,
      });
    }

    if (mode === "pair") {
      append({
        [firstField.name]: firstValue,
        [secondField.name]: secondValue,
      });
    }

    if (mode === "select-select") {
      append({
        [firstField.name]: firstValue,
        [secondField.name]: secondValue,
      });
    }

    reset();
  };

  const isDisabled =
    mode === "single" ? !firstValue.trim() : !firstValue || !secondValue.trim();

  return (
    <div className="space-y-4">
      {/* INPUT AREA */}
      <div className="flex items-start gap-2">
        {/* SINGLE */}
        {mode === "single" && (
          <div className="w-full">
            <CustomInput
              value={firstValue}
              onChange={setFirstValue}
              label={firstField.label}
              error={error || undefined}
            />
          </div>
        )}

        {/* PAIR */}
        {mode === "pair" && (
          <>
            <div className="w-full">
              <CustomInput
                value={firstValue}
                onChange={setFirstValue}
                label={firstField.label}
                error={error || undefined}
              />
            </div>

            <div className="w-full">
              <CustomInput
                value={secondValue}
                onChange={setSecondValue}
                label={secondField.label}
                error={error || undefined}
              />
            </div>
          </>
        )}

        {/* SELECT + INPUT */}
        {mode === "select-select" && (
          <>
            <div className="w-full">
              <Select
                {...selectField}
                value={firstValue}
                onChange={setFirstValue}
                error={error || undefined}
                label={firstField.label}
              />
            </div>

            <div className="w-full">
              <CustomInput
                value={secondValue}
                onChange={setSecondValue}
                label={secondField.label}
                error={error || undefined}
              />
            </div>
          </>
        )}

        {/* ADD BUTTON */}
        <AddButton onClick={handleAdd} disabled={isDisabled} />
      </div>

      {/* ERROR INLINE (GLOBAL) */}
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* CHIP LIST */}
      <div className="flex flex-wrap gap-2">
        {fields.map((item: any, index: number) => (
          <FeatureChip
            key={item.id}
            values={Object.values(item).filter((v) => typeof v === "string")}
            onDelete={() => remove(index)}
          />
        ))}
      </div>
    </div>
  );
}
