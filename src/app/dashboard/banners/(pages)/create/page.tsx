// src/app/dashboard/banners/create/page.tsx
"use client";

import { CloseIcon, ExitIcon } from "@/src/shared/constants/icons";
import { Caption, Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBanner } from "../../_hooks/useBanner";

const bannerSchema = z.object({
  alt: z.string().trim().min(1, "متن جایگزین الزامی است"),
  sortOrder: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z
      .number({
        error: (issue) =>
          issue.input === undefined
            ? "ترتیب نمایش الزامی است"
            : "ترتیب نمایش باید عدد باشد",
      })
      .min(0, "ترتیب نمایش باید صفر یا بزرگ‌تر باشد"),
  ),
});

type BannerFormValues = z.infer<typeof bannerSchema>;

export default function CreateBannersPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      alt: "",
      sortOrder: undefined,
    },
  });

  const { mutate, isPending } = useCreateBanner();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    const input = document.getElementById("banner-image") as HTMLInputElement;
    if (input) input.value = "";
  };

  const onSubmit = (data: BannerFormValues) => {
    if (!imageFile) {
      setErrorMessage("لطفاً یک تصویر برای بنر انتخاب کنید.");
      return;
    }

    setErrorMessage("");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("alt", data.alt.trim());
    formData.append("sort_order", String(data.sortOrder));
    formData.append("isActive", "true"); // ✅ همیشه فعال

    mutate(formData);
  };

  return (
    <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* آپلود تصویر */}
        <div>
          <div className="flex w-full flex-col gap-4">
            <label
              htmlFor="banner-image"
              className="flex h-50 w-full cursor-pointer flex-col items-center justify-center rounded-xs border-2 border-dashed border-gray transition"
            >
              <div className="rotate-90">
                <ExitIcon size="md" color="text-secondary" />
              </div>
              <Text
                text="تصویر بنر را بارگزاری کنید."
                weight="regular"
                size="md"
                color="secondary"
              />
              {!imagePreview ? (
                <Text
                  text="هنوز تصویری انتخاب نشده است"
                  color="secondary"
                  weight="light"
                />
              ) : (
                <Text
                  text="PNG, JPG, JPEG"
                  size="sm"
                  weight="light"
                  color="secondary"
                />
              )}
              <input
                id="banner-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* خطا */}
            {errorMessage && (
              <Caption text={errorMessage} size="xs" color="danger" />
            )}

            {/* پیش‌نمایش */}
            {imagePreview && (
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="پیش‌نمایش بنر"
                    width={100}
                    height={100}
                    className="h-25 w-25 rounded border border-gray object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-danger"
                  >
                    <CloseIcon size="2xs" color="text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alt */}
        <CustomInputRHF
          control={control}
          name="alt"
          label="متن جایگزین (Alt)"
          placeholder="توضیح کوتاه برای تصویر"
          required
        />

        {/* ترتیب نمایش */}
        <div>
          <CustomInputRHF
            control={control}
            name="sortOrder"
            label="ترتیب نمایش"
            type="number"
            placeholder="مثلاً: ۱"
            required
            min={0}
          />
          <p className="mt-1 text-xs text-gray-500">
            عدد کوچک‌تر = نمایش در ابتدا
          </p>
        </div>

        {/* ❌ بخش وضعیت حذف شده است */}

        {/* دکمه ارسال */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full rounded-sm py-2.5 text-white transition ${
            isPending
              ? "cursor-not-allowed bg-gray-400"
              : "hover:bg-primary-dark cursor-pointer bg-secondary"
          }`}
        >
          {isPending ? "در حال ثبت..." : "ثبت بنر"}
        </button>
      </form>
    </div>
  );
}
