import { deleteImage } from "./delete-image";
import { uploadImage } from "./upload-image";

interface ReplaceImageProps {
  oldImage?: string | null;
  newFile: File;
  folder: string;
}

export async function replaceImage({
  oldImage,
  newFile,
  folder,
}: ReplaceImageProps) {
  const uploaded = await uploadImage({
    file: newFile,
    folder,
  });

  try {
    if (oldImage) {
      await deleteImage(oldImage);
    }

    return uploaded;
  } catch (error) {
    await deleteImage(uploaded);

    throw error;
  }
}
