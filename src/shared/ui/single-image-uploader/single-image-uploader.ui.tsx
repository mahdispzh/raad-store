// src/shared/ui/extar-components/image-uploader/image-uploader.ui.tsx
"use client";

import { CloseIcon, ExitIcon } from "@/src/shared/constants/icons";
import { Caption, Text } from "@/src/shared/ui";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageUploaderProps {
  /** id باید تو یه صفحه یکتا باشه (برای label/input) */
  id: string;
  /** فایل انتخاب‌شده — کنترل‌شده از بیرون (useState والد) */
  value: File | null;
  onChange: (file: File | null) => void;
  /** متن بالای dropzone */
  label?: string;
  /** متنی که وقتی عکسی انتخاب شده به‌جای placeholder نشون داده می‌شه */
  helperText?: string;
  /** خطای اعتبارسنجی (اختیاری) */
  error?: string;
  /** آدرس عکس فعلی از سرور — برای صفحه‌ی ویرایش، وقتی هنوز فایل جدیدی انتخاب نشده */
  existingImageUrl?: string | null;
}

export function SingleImageUploader({
  id,
  value,
  onChange,
  label = "تصویر را بارگذاری کنید.",
  helperText = "PNG, JPG, JPEG",
  error,
  existingImageUrl = null,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(existingImageUrl);

  useEffect(() => {
    if (!value) {
      setPreview(existingImageUrl);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(value);
  }, [value, existingImageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const removeImage = () => {
    onChange(null);
    setPreview(null);
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <label
        htmlFor={id}
        className="flex h-50 w-full cursor-pointer flex-col items-center justify-center rounded-xs border-2 border-dashed border-gray"
      >
        <div className="rotate-90">
          <ExitIcon size="md" color="text-secondary" />
        </div>

        <Text text={label} size="md" weight="regular" color="secondary" />

        {!preview ? (
          <Text text="هنوز تصویری انتخاب نشده است" color="secondary" />
        ) : (
          <Text text={helperText} size="sm" color="secondary" />
        )}

        <input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {error && <Caption text={error} size="xs" color="danger" />}

      {preview && (
        <div className="relative w-fit">
          <Image
            src={preview}
            alt="پیش‌نمایش تصویر"
            width={100}
            height={100}
            className="h-25 w-25 rounded border border-gray object-cover"
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
    </div>
  );
}
