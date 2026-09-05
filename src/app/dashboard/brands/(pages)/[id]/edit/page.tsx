// src/app/dashboard/brands/[id]/edit/page.tsx
"use client";

import { CloseIcon, ExitIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBrand, useUpdateBrand } from "../../../_hooks/useBrands";

interface BrandFormValues {
  name: string;
}

export default function EditBrandPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data: brand, isLoading } = useBrand(id);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormValues>({
    defaultValues: { name: "" },
  });

  // وقتی دیتای برند از سرور رسید، فرم رو باهاش پر کن
  useEffect(() => {
    if (brand) {
      reset({ name: brand.name });
      setImagePreview(brand.image || null);
    }
  }, [brand, reset]);

  const mutation = useUpdateBrand();

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
      setImagePreview(brand?.image || null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    const input = document.getElementById("brand-image") as HTMLInputElement;
    if (input) input.value = "";
  };

  const onSubmit = (data: BrandFormValues) => {
    setErrorMessage("");

    const formData = new FormData();
    formData.append("name", data.name.trim());
    const slug = data.name.trim().toLowerCase().replace(/\s+/g, "-");
    formData.append("slug", slug);

    // فقط اگه عکس جدیدی انتخاب شده، بفرست — وگرنه بک‌اند عکس قبلی رو نگه می‌داره
    if (imageFile) {
      formData.append("image", imageFile);
    }

    mutation.mutate({ id, formData });
  };

  if (isLoading || !brand) {
    return (
      <div className="flex h-40 items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
      <Text text="ویرایش برند" size="lg" weight="bold" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* آپلود تصویر */}
        <div>
          <div className="flex w-full flex-col gap-4">
            <label
              htmlFor="brand-image"
              className="flex h-50 w-full cursor-pointer flex-col items-center justify-center rounded-xs border-2 border-dashed border-gray transition"
            >
              <div className="rotate-90">
                <ExitIcon size="md" color="text-secondary" />
              </div>
              <Text
                text="تصویر برند را بارگزاری کنید."
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
                id="brand-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* پیش‌نمایش */}
            {imagePreview && (
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="پیش‌نمایش برند"
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

        {/* نام برند */}
        <div>
          <CustomInputRHF
            control={control}
            name="name"
            label="نام برند"
            placeholder="مثلاً: نایک"
          />
        </div>

        {/* خطا */}
        {errorMessage && (
          <div className="text-sm text-danger">{errorMessage}</div>
        )}

        {/* دکمه ارسال */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`flex h-11 w-35 items-center justify-center rounded-sm text-white transition ${
              mutation.isPending
                ? "cursor-not-allowed bg-gray-400"
                : "hover:bg-primary-dark cursor-pointer bg-secondary"
            }`}
          >
            <Text
              text={mutation.isPending ? "در حال ثبت..." : "ذخیره تغییرات"}
              size="sm"
              weight="medium"
              color="white"
            />
          </button>
        </div>
      </form>
    </div>
  );
}