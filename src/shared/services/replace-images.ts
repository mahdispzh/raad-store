import { deleteImages } from "./delete-images";
import { uploadImages } from "./upload-images";

interface ReplaceImagesProps {
  oldImages: string[];
  newFiles: File[];
  folder: string;
}

export async function replaceImages({
  oldImages,
  newFiles,
  folder,
}: ReplaceImagesProps) {
  const uploaded = await uploadImages({
    files: newFiles,
    folder,
  });

  try {
    await deleteImages(oldImages);

    return uploaded;
  } catch (error) {
    await deleteImages(uploaded);

    throw error;
  }
}
