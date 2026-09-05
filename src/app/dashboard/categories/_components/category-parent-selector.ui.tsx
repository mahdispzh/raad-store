// src/shared/components/category-parent-selector/category-parent-selector.ui.tsx
"use client";

import { Text } from "@/src/shared/ui";
import { SelectRHF } from "@/src/shared/ui/extar-components/form-filds/custom-select";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useCategoryLevels } from "../_hooks/useCategoryLevels";
import { Category } from "../_services/categories.api";

interface CategoryParentSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  categories: Category[] | undefined | null;
  isLoading?: boolean;
  parentIdValue: number | null;
  onChangeParentId: (val: number | null) => void;
}

export function CategoryParentSelector<T extends FieldValues>({
  control,
  name,
  categories,
  isLoading,
  parentIdValue,
  onChangeParentId,
}: CategoryParentSelectorProps<T>) {
  const { level1Options, level2Options, level3Options } =
    useCategoryLevels(categories);

  const selectedLevel1Value = level1Options.some(
    (o) => o.value === parentIdValue,
  )
    ? parentIdValue
    : null;

  const selectedLevel2Value = level2Options.some(
    (o) => o.value === parentIdValue,
  )
    ? parentIdValue
    : null;

  return (
    <div className="flex flex-col gap-4 rounded-sm border border-gray p-4">
      <Text
        text="دسته‌بندی والد (اختیاری) — این دسته‌بندی زیرشاخه‌ی کدام مورد است؟"
        size="md"
        weight="medium"
      />

      {/* سطح ۱: دسته‌های اصلی */}
      <div>
        <Text
          text="دسته‌های اصلی"
          size="sm"
          weight="medium"
          color="secondary"
        />
        <div className="mt-1">
          <SelectRHF
            control={control}
            name={name}
            label=""
            options={level1Options}
            loading={isLoading}
            placeholder="انتخاب از دسته‌های اصلی..."
            clearable
            value={selectedLevel1Value as any}
            onChange={onChangeParentId as any}
          />
        </div>
      </div>

      {/* سطح ۲: زیردسته‌ها */}
      <div>
        <Text text="زیردسته‌ها" size="sm" weight="medium" color="secondary" />
        <div className="mt-1">
          <SelectRHF
            control={control}
            name={name}
            label=""
            options={level2Options}
            loading={isLoading}
            placeholder="انتخاب از زیردسته‌ها..."
            clearable
            value={selectedLevel2Value as any}
            onChange={onChangeParentId as any}
          />
        </div>
      </div>

      {/* سطح ۳: فقط نمایشی، غیرقابل‌انتخاب چون بیشترین عمق مجازه */}
      {level3Options.length > 0 && (
        <div>
          <Text
            text="زیرِ‌زیردسته‌ها (این‌ها دیگر نمی‌توانند زیردسته‌ی جدید داشته باشند)"
            size="sm"
            weight="medium"
            color="secondary"
          />
          <div className="mt-1 flex flex-wrap gap-2">
            {level3Options.map((item) => (
              <span
                key={item.value}
                className="cursor-not-allowed rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500"
                title="حداکثر عمق مجاز پر شده است"
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {parentIdValue && (
        <Text
          text={`دسته‌بندی جدید به‌عنوان زیرشاخه‌ی «${
            [...level1Options, ...level2Options].find(
              (o) => o.value === parentIdValue,
            )?.label ?? ""
          }» ثبت خواهد شد.`}
          size="md"
          color="secondary"
        />
      )}
    </div>
  );
}
