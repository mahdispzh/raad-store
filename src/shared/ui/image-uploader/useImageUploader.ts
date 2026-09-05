// _hooks/use-image-uploader.ts
import { useEffect, useRef, useState } from "react";
import { UploadState } from "./image-uploader.types";

// هوک مدیریت منطق آپلود تصویر
export function useImageUploader(
  initialState: UploadState = "default",
  onImageUpload?: (file: File, imageUrl: string) => void,
) {
  const [state, setState] = useState<UploadState>(initialState);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setState("loading");

    setTimeout(() => {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setState("success");
      onImageUpload?.(file, url);
    }, 1200);
  };

  const resetUploader = () => {
    setState("default");
    setImageUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return {
    state,
    imageUrl,
    fileRef,
    handleSelect,
    resetUploader,
  };
}
