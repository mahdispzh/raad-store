import { BUCKET_NAME, s3 } from "@/s3";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
interface UploadImageProps {
  file: File;
  folder: string;
  width?: number;
}
export async function uploadImage({
  file,
  folder,
  width = 1600,
}: UploadImageProps) {
  const imageId = uuid();

  const buffer = Buffer.from(await file.arrayBuffer());

  const webpBuffer = await sharp(buffer)
    .resize({
      width,
    })
    .webp({
      quality: 75,
    })
    .toBuffer();

  const key = `${folder}/${imageId}.webp`;

  await s3.putObject({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: webpBuffer,
    ContentType: "image/webp",
    ACL: "public-read",
  });

  return `${process.env.PARSPACK_ENDPOINT}/${BUCKET_NAME}/${key}`;
}
