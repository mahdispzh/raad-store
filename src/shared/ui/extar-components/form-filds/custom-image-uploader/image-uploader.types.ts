export type ImageStatus = "idle" | "uploading" | "error" | "done";

export type ImageItem = {
  id: string;
  file?: File;
  previewUrl: string;
  uploadedUrl?: string;
  status: ImageStatus;
  progress: number;
};

export type UploaderMode = "single" | "multiple";

export type DynamicImageUploaderProps = {
  mode?: UploaderMode;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  maxImages?: number;
  uploadFn: (file: File) => Promise<string>;
};
