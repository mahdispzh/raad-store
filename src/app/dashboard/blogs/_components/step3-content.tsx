"use client";

import { DefaultButton, Text } from "@/src/shared/ui";
import { useFormContext } from "react-hook-form";
import { BlogFormValues } from "./blog.schema";
import { RichTextEditor } from "./rich-text-editor";

interface Step3ContentProps {
  onPrev?: () => void;
  onNext?: () => void;
  isSubmitting?: boolean;
  errors: any;
  standalone?: boolean;
}

export function Step3Content({
  onPrev,
  onNext,
  isSubmitting = false,
  errors,
  standalone = false,
}: Step3ContentProps) {
  const {
    setValue,
    watch,
    formState: { errors: formErrors },
  } = useFormContext<BlogFormValues>();
  const content = watch("content") || "";

  const fields = (
    <>
      <div className="mb-2">
        <Text text="متن بلاگ" size="md" weight="medium" />
      </div>

      <div className="min-h-0 flex-1">
        <RichTextEditor
          value={content}
          onChange={(val) => setValue("content", val, { shouldValidate: true })}
        />
        {formErrors.content && (
          <Text
            text={`${formErrors.content.message}`}
            size="sm"
            color="danger"
          />
        )}
      </div>
    </>
  );

  if (standalone) {
    return fields;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext?.();
      }}
      className="flex h-full flex-col px-6 pt-4 pb-6"
    >
      {fields}
      <div className="mt-4 flex items-center justify-between gap-3 pt-2">
        <DefaultButton
          type="primary"
          style="outline"
          label="مرحله قبل"
          action={onPrev}
          disabled={isSubmitting}
        />
        <DefaultButton
          type="primary"
          style="fill"
          label={isSubmitting ? "در حال ثبت..." : "ثبت نهایی"}
          action={onNext}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
