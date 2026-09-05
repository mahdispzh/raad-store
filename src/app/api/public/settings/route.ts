import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET() {


  const settings = await prisma.settings.findMany({});


  return NextResponse.json({
    data: settings,
    
  });
}
