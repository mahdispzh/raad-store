// _types/image-uploader._types.ts
export type UploadState = "default" | "loading" | "success" | "error";
export type Size = "large" | "small";

export interface ImageUploaderProps {
  onImageUpload?: (file: File, imageUrl: string) => void;
  initialState?: UploadState;
  size?: Size;
}
