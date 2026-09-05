import { BUCKET_NAME, s3 } from "@/s3";

export async function deleteImage(imageUrl: string) {
  const key = imageUrl.split(`${BUCKET_NAME}/`)[1];

  await s3.deleteObject({
    Bucket: BUCKET_NAME,
    Key: key,
  });
}
