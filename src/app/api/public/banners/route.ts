import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET() {
  const banners = await prisma.banners.findMany({});
  return NextResponse.json({
    data: banners,
    
  });
}
