import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET() {
  const store_information = await prisma.store_information.findMany({
  });


  return NextResponse.json({
    data: store_information,
   
  });
}
