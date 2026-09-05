"use client";

import { CloseIcon, ExitIcon } from "@/src/shared/constants/icons";
import { Caption, Text } from "@/src/shared/ui";
import { CustomInputRHF } from "@/src/shared/ui/extar-components/form-filds/custom-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BrandFormValues, brandSchema } from "../../_components/brand.schema";
import { useCreateBrand } from "../../_hooks/useBrands";

export default function CreateBrandsPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useCreateBrand();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setErrorMessage("");

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

    const input = document.getElementById("brand-image") as HTMLInputElement;

    if (input) input.value = "";
  };

  const onSubmit = (data: BrandFormValues) => {
    if (!imageFile) {
      setErrorMessage("لطفاً یک تصویر برای برند انتخاب کنید.");
      return;
    }

    setErrorMessage("");

    const formData = new FormData();

    formData.append("name", data.name);

    formData.append("slug", data.name.toLowerCase().replace(/\s+/g, "-"));

    formData.append("image", imageFile);

    mutate(formData);
  };

  return (
    <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <label
          htmlFor="brand-image"
          className="flex h-50 w-full cursor-pointer flex-col items-center justify-center rounded-xs border-2 border-dashed border-gray"
        >
          <div className="rotate-90">
            <ExitIcon size="md" color="text-secondary" />
          </div>

          <Text
            text="تصویر برند را بارگذاری کنید."
            size="md"
            weight="regular"
            color="secondary"
          />

          {!imagePreview ? (
            <Text text="هنوز تصویری انتخاب نشده است" color="secondary" />
          ) : (
            <Text text="PNG, JPG, JPEG" size="sm" color="secondary" />
          )}

          <input
            id="brand-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {errorMessage && (
          <Caption text={errorMessage} size="xs" color="danger" />
        )}

        {imagePreview && (
          <div className="relative w-fit">
            <Image
              src={imagePreview}
              alt="brand"
              width={100}
              height={100}
              className="rounded border object-cover"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger"
            >
              <CloseIcon size="2xs" color="text-white" />
            </button>
          </div>
        )}

        <CustomInputRHF
          control={control}
          name="name"
          label="نام برند"
          placeholder="مثلاً نایک"
          required
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="flex h-11 w-36 items-center justify-center rounded-sm bg-primary text-white disabled:bg-gray-400"
          >
            <Text
              text={isPending ? "در حال ثبت..." : "ثبت برند"}
              color="white"
              size="md"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
