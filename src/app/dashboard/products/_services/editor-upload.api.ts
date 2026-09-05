import { apiClient, fetcher } from "@/src/shared/api/fetcher";

export interface UploadImageResponse {
  url: string;
}

export const uploadEditorImage = (formData: FormData) => {
  return fetcher<UploadImageResponse>(() =>
    apiClient.post("/protected/upload-editor-image", formData),
  );
};
