// app/api/check/services/route.ts

import { prisma } from "@/prisma/prisma";
import { s3 } from "@/s3";
import { HeadBucketCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET() {
  const database = {
    connected: false,
  };

  const storage = {
    connected: false,
  };

  try {
    await prisma.$connect();
    database.connected = true;
  } catch {
    database.connected = false;
  } finally {
    await prisma.$disconnect().catch(() => {});
  }

  try {
    await s3.send(
      new HeadBucketCommand({
        Bucket: process.env.PARSPACK_BUCKET_NAME!,
      }),
    );

    storage.connected = true;
  } catch {
    storage.connected = false;
  }

  return NextResponse.json({
    success: database.connected && storage.connected,
    database,
    storage,
  });
}
