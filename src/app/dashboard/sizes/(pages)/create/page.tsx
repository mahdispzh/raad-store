"use client";

import { Caption, Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateSize } from "../../_hooks/useSizes";
interface SizeFormValues {
  name: string;
  sortOrder?: number;
}
export default function CreateSizesPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const { control, handleSubmit } = useForm<SizeFormValues>({
    defaultValues: {
      name: "",
      sortOrder: undefined,
    },
  });

  const { mutate, isPending, isLoadingSizes } = useCreateSize();

  const onSubmit = (data: SizeFormValues) => {
    if (!data.name.trim()) {
      setErrorMessage("لطفاً نام سایز را وارد کنید.");
      return;
    }

    setErrorMessage("");

    mutate({
      name: data.name.trim(),
      ...(data.sortOrder !== undefined && {
        sortOrder: data.sortOrder,
      }),
    });
  };

  if (isLoadingSizes) {
    return (
      <div className="flex h-40 items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
      <Text text="افزودن سایز جدید" size="lg" weight="bold" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {" "}
        {/* نام سایز */}
        <div className="flex flex-col gap-2">
          <CustomInputRHF
            control={control}
            name="name"
            label="نام سایز"
            placeholder="مثلاً: XL"
            required
          />
          {/* نمایش خطا */}
          {errorMessage && (
            <Caption text={errorMessage} color="danger" size="xs" />
          )}
        </div>
        <CustomInputRHF
          control={control}
          name="sortOrder"
          label="ترتیب نمایش"
          placeholder="اختیاری"
          type="number"
        />
        {/* دکمه ارسال */}
        <div className="flex w-full justify-end">
          <button
            type="submit"
            disabled={isPending}
            className={`flex h-11 w-35 items-center justify-center rounded-sm text-white transition ${
              isPending
                ? "cursor-not-allowed bg-gray-400"
                : "hover:bg-primary-dark cursor-pointer bg-primary"
            }`}
          >
            <Text
              text={isPending ? "در حال ثبت..." : "ثبت سایز"}
              size="md"
              weight="medium"
              color="white"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
