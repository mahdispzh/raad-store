import { deleteImage } from "./delete-image";

export async function deleteImages(images: string[]) {
  await Promise.all(
    images.map(async (image) => {
      try {
        await deleteImage(image);
      } catch (error) {
        console.error(error);
      }
    }),
  );
}
