"use client";
import { v4 as uuid } from "uuid";

import { useEffect, useRef, useState } from "react";
import type {
  DynamicImageUploaderProps,
  ImageItem,
} from "./image-uploader.types";

export function useImageUploader({
  value,
  onChange,
  mode = "multiple",
  maxImages = 10,
  uploadFn,
}: DynamicImageUploaderProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const normalized = Array.isArray(value) ? value : value ? [value] : [];

  // فقط یکبار init
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    setImages(
      normalized.map((url) => ({
        id: uuid(),
        previewUrl: url,
        uploadedUrl: url,
        status: "done",
        progress: 100,
      })),
    );
  }, []);

  const emit = (items: ImageItem[]) => {
    const urls = items.filter((i) => i.uploadedUrl).map((i) => i.uploadedUrl!);

    if (mode === "single") {
      onChange?.(urls[0] ?? "");
    } else {
      onChange?.(urls);
    }
  };

  const openFilePicker = () => {
    fileRef.current?.click(); // 👈 مهم‌ترین fix
  };

  const upload = async (item: ImageItem) => {
    if (!item.file) return;

    setImages((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, status: "uploading", progress: 20 } : i,
      ),
    );

    try {
      const url = await uploadFn(item.file);

      setImages((prev) => {
        const updated = prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                uploadedUrl: url,
                status: "done",
                progress: 100,
              }
            : i,
        );

        emit(updated);
        return updated;
      });
    } catch {
      setImages((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "error" } : i)),
      );
    }
  };

  const handleAdd = async (files: FileList | null) => {
    if (!files?.length) return;

    const fileArr = Array.from(files);

    if (mode === "single") {
      const file = fileArr[0];

      const item: ImageItem = {
        id: uuid(),
        file,
        previewUrl: URL.createObjectURL(file),
        status: "uploading",
        progress: 0,
      };

      setImages([item]); // replace
      await upload(item);
      return;
    }

    const allowed = fileArr.slice(0, maxImages - images.length);

    const newItems: ImageItem[] = allowed.map((file) => ({
      id: uuid(),
      file,
      previewUrl: URL.createObjectURL(file),
      status: "uploading",
      progress: 0,
    }));

    setImages((prev) => [...prev, ...newItems]);

    for (const item of newItems) {
      await upload(item);
    }
  };

  const remove = (id: string) => {
    const next = images.filter((i) => i.id !== id);
    setImages(next);
    emit(next);
  };

  return {
    images,
    fileRef,
    openFilePicker,
    handleAdd,
    remove,
  };
}
