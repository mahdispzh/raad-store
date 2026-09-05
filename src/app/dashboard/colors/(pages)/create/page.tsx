"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { hexToHslString, hexToRgbString } from "@/src/shared/utils/hex-color";
import { useRouter } from "next/navigation";
import { useCreateColor } from "../../_hooks/useColors";

import {
  createColorSchema,
  type CreateColorFormValues,
} from "../../_components/create-color.schema";

export default function CreateColorPage() {
  const router = useRouter();

  const mutation = useCreateColor();

  const { control, handleSubmit, watch, setValue } =
    useForm<CreateColorFormValues>({
      resolver: zodResolver(createColorSchema),
      defaultValues: {
        name: "",
        hexCode: "",
      },
    });

  const hexCode = watch("hexCode");

  const onSubmit = (data: CreateColorFormValues) => {
    mutation.mutate(
      {
        name: data.name.trim(),
        hexCode: data.hexCode.trim(),
      },
      {
        onSuccess: () => {
          router.push("/dashboard/colors");
        },
        onError: (error: any) => {
          if (error?.response?.status === 409) {
            alert("❌ این رنگ قبلاً ثبت شده است.");
          } else {
            alert("❌ خطا در ثبت رنگ.");
          }
        },
      },
    );
  };

  return (
    <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
      <Text text="افزودن رنگ جدید" size="lg" weight="bold" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <CustomInputRHF
          control={control}
          name="name"
          label="نام رنگ"
          placeholder="مثلاً: آبی سیر"
          required
        />

        <div>
          <Text text="کد رنگ (Hex)" size="sm" weight="medium" />

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={hexCode || "#000000"}
              onChange={(e) =>
                setValue("hexCode", e.target.value, {
                  shouldValidate: true,
                })
              }
              className="h-12 w-12 cursor-pointer rounded-xs"
            />

            <CustomInputRHF
              control={control}
              name="hexCode"
              placeholder="#000000"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`flex h-11 w-35 items-center justify-center rounded-sm text-white transition ${
              mutation.isPending
                ? "cursor-not-allowed bg-gray-400"
                : "hover:bg-primary-dark cursor-pointer bg-primary"
            }`}
          >
            <Text
              text={mutation.isPending ? "در حال ثبت..." : "ثبت رنگ"}
              size="md"
              weight="medium"
              color="white"
            />
          </button>
        </div>
      </form>

      <div className="mt-4 flex items-center gap-3 rounded-sm border border-gray p-3">
        <Text text="پیش‌نمایش :" size="sm" weight="medium" />

        <div
          className="h-11 w-11 rounded-xs border border-primary"
          style={{
            backgroundColor: hexCode || "#ffffff",
          }}
        />

        <div className="flex flex-col gap-1">
          {hexCode ? (
            <>
              <Text
                text={hexCode.toUpperCase()}
                size="sm"
                weight="regular"
                color="secondary"
              />

              <Text
                text={hexToRgbString(hexCode)}
                size="sm"
                weight="regular"
                color="secondary"
              />

              <Text
                text={hexToHslString(hexCode)}
                size="sm"
                weight="regular"
                color="secondary"
              />
            </>
          ) : (
            <Text
              text="هیچ رنگی انتخاب نشده است"
              size="sm"
              weight="regular"
              color="secondary"
            />
          )}
        </div>
      </div>
    </div>
  );
}
