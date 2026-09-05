"use client";

import { CameraIcon } from "@/src/shared/constants/icons/camera-icon";
import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { SpinnerIcon } from "@/src/shared/constants/icons/spinner-icon";
import React from "react";
import {
  getBackground,
  getBorderColor,
  sizeMap,
} from "./image-uploader.constants";
import type { ImageUploaderProps } from "./image-uploader.types";
import { useImageUploader } from "./useImageUploader";

export function ImageUploader({
  onImageUpload,
  initialState = "default",
  size = "small",
}: ImageUploaderProps) {
  const { state, imageUrl, fileRef, handleSelect, resetUploader } =
    useImageUploader(initialState, onImageUpload);

  const baseStyle: React.CSSProperties = {
    ...sizeMap[size],
    borderRadius: "10px",
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: getBorderColor(state),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: state === "success" ? "default" : "pointer",
    overflow: "hidden",
    position: "relative",
    transition: "all 0.2s",
    background: getBackground(state),
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Box */}
      <div
        onClick={() => state !== "success" && fileRef.current?.click()}
        style={baseStyle}
      >
        {/* Default */}
        {state === "default" && (
          <>
            <CameraIcon size={"md"} />
          </>
        )}

        {/* Loading */}
        {state === "loading" && (
          <>
            <SpinnerIcon size={"xs"} />
            <span style={{ fontSize: 10, color: "var(--color-primary)" }}>
              در حال بارگذاری
            </span>
          </>
        )}

        {/* Error */}
        {state === "error" && (
          <>
            <CloseIcon size={"xs"} />
            <span
              style={{
                fontSize: 10,
                color: "var(--color-danger)",
                textAlign: "center",
              }}
              className={"mt-2"}
            >
              فرمت عکس اشتباه است
            </span>
          </>
        )}

        {/* Success */}
        {state === "success" && imageUrl && (
          <img
            src={imageUrl}
            alt="upload"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      {/* Input فایل */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelect}
      />

      {/* استایل گلوبال برای انیمیشن اسپینر */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
