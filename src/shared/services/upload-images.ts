import { deleteImage } from "./delete-image";
import { uploadImage } from "./upload-image";

interface UploadImagesParams {
  files: File[];
  folder: string;
}

export async function uploadImages({ files, folder }: UploadImagesParams) {
  const uploadedImages: string[] = [];

  try {
    for (const file of files) {
      const imageUrl = await uploadImage({
        file,
        folder,
      });

      uploadedImages.push(imageUrl);
    }

    return uploadedImages;
  } catch (error) {
    // Rollback

    for (const imageUrl of uploadedImages) {
      try {
        await deleteImage(imageUrl);
      } catch {}
    }

    throw error;
  }
}
