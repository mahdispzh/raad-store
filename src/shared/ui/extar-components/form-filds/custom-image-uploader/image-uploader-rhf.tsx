"use client";

import { CloseIcon, ExitIcon } from "@/src/shared/constants/icons";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Caption } from "../../../caption/caption.ui";
import { Text } from "../../../text/text.ui";

interface ImageUploaderRHFProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  maxImages?: number;
}

export function ImageUploaderRHF<T extends FieldValues>({
  control,
  name,
  maxImages = 10,
}: ImageUploaderRHFProps<T>) {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newFiles = [...(value || []), ...fileArray];
      onChange(newFiles.slice(0, maxImages));
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...(value || [])];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const getImageSrc = (item: File | string) => {
    if (item instanceof File) {
      return URL.createObjectURL(item);
    }
    return item;
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <label className="flex h-50 w-full cursor-pointer flex-col items-center justify-center rounded-xs border-2 border-dashed border-gray">
        <div className="rotate-90">
          <ExitIcon size="md" color="text-secondary" />
        </div>
        <Text
          text="تصاویر را بارگزاری کنید."
          weight="regular"
          size="md"
          color="secondary"
        />
        {(value || []).length === 0 ? (
          <Caption
            text="هنوز تصویری انتخاب نشده است"
            color="secondary"
            weight="light"
            size="xs"
          />
        ) : (
          <Text
            text="PNG,JPG,JPEG"
            size="sm"
            weight="light"
            color="secondary"
          />
        )}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        {(value || []).map((item: File | string, index: number) => (
          <div key={index} className="relative">
            <img
              src={getImageSrc(item)}
              alt={`تصویر ${index + 1}`}
              className="h-25 w-20 rounded object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger"
            >
              <CloseIcon size="2xs" color="text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
