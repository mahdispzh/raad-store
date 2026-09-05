"use client";

import { useImageUploader } from "./use-image-uploader";
import { ImageBox } from "./ImageBox";
import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { DynamicImageUploaderProps } from "./image-uploader.types";

export function DynamicImageUploader(
  props: DynamicImageUploaderProps
) {
  const {
    images,
    fileRef,
    openFilePicker,
    handleAdd,
    remove,
  } = useImageUploader(props);

  const isSingle = props.mode === "single";
  const maxImages = props.maxImages ?? Infinity;

  // 🔹 شرط نمایش Add Box
  const showAddBox =
    (isSingle && images.length === 0) || // single: فقط وقتی هیچ عکس انتخاب نشده
    (!isSingle && images.length < maxImages); // multiple: وقتی کمتر از max

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      {/* EXISTING IMAGES */}
      {images.map((img) => (
        <div key={img.id} style={{ position: "relative" }} >
          <ImageBox url={img.previewUrl} />

          <button
            className={"flex items-center justify-center"}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              remove(img.id);
            }}
            style={{
              position: "absolute",
              top: 4,
              right:0,
              background: "white",
              borderRadius: 20,
              border: "1px solid #ddd",
              width: 24,
              height: 24,
              cursor: "pointer",
            }}
          >
            <CloseIcon size="xs" />
          </button>
        </div>
      ))}

      {/* 🔹 ADD BOX */}
      {showAddBox && <ImageBox onClick={openFilePicker} />}

      {/* hidden select */}
      <input
        ref={fileRef}
        type="file"
        hidden
        accept="image/*"
        multiple={!isSingle}
        onChange={(e) => handleAdd(e.target.files)}
      />
    </div>
  );
}
