// src/app/dashboard/banners/[id]/edit/page.tsx
"use client";

import { CloseIcon, ExitIcon } from "@/src/shared/constants/icons";
import { Text } from "@/src/shared/ui";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useBanner, useUpdateBanner } from "../../../_hooks/useBanner";

export default function EditBannerPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data: banner, isLoading } = useBanner(id);
  const mutation = useUpdateBanner();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
  if (banner) {
    setAlt(banner.alt ?? "");
    setSortOrder(banner.sort_order ?? 0);
    setIsActive(banner.is_active ?? true);   // ✅ اصلاح شد
    setImagePreview(banner.image || null);
  }
}, [banner]);

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
      setImagePreview(banner?.image || null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    const input = document.getElementById("banner-image") as HTMLInputElement;
    if (input) input.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    if (alt.trim()) formData.append("alt", alt.trim());
    formData.append("sort_order", String(sortOrder));
    formData.append("isActive", String(isActive));

    mutation.mutate({ id, formData });
  };

  if (isLoading || !banner) {
    return (
      <div className="flex h-40 items-center justify-center">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="h-auto w-full rounded-xs bg-accent/50 p-6">
      <Text text="ویرایش بنر" size="lg" weight="bold" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
        <div>
          <label className="mb-1 block font-medium text-sm">
            متن جایگزین (Alt)
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="توضیح کوتاه برای تصویر"
            className="w-full rounded-sm border border-gray px-3 py-2.5 text-sm shadow-sm focus:border-primary focus:outline-none"
          />
        </div>

        {/* ترتیب نمایش */}
        <div>
          <label className="mb-1 block font-medium text-sm">ترتیب نمایش</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-full rounded-sm border border-gray px-3 py-2.5 text-sm shadow-sm focus:border-primary focus:outline-none"
            min={0}
          />
          <p className="mt-1 text-xs text-gray-500">
            عدد کوچک‌تر = نمایش در ابتدا
          </p>
        </div>

        {/* وضعیت فعال/غیرفعال */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="isActive" className="text-sm">فعال باشد</label>
        </div>

        {errorMessage && (
          <div className="text-sm text-danger">{errorMessage}</div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full rounded-sm py-2.5 text-white transition ${
            mutation.isPending
              ? "cursor-not-allowed bg-gray-400"
              : "hover:bg-primary-dark cursor-pointer bg-secondary"
          }`}
        >
          {mutation.isPending ? "در حال ثبت..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}