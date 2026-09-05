import { S3 } from "@aws-sdk/client-s3";

export const BUCKET_NAME = process.env.PARSPACK_BUCKET_NAME!;
export const BUCKET_ENDPOINT = process.env.PARSPACK_ENDPOINT!;
export const REGION = process.env.PARSPACK_REGION || "default";

export const s3 = new S3({
  endpoint: BUCKET_ENDPOINT,
  region: REGION,
  credentials: {
    accessKeyId: process.env.PARSPACK_ACCESS_KEY!,
    secretAccessKey: process.env.PARSPACK_SECRET_KEY!,
  },
  forcePathStyle: true,
});
