import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

type Params = {
  params: Promise<{
    brandId: string;
  }>;
};

export async function GET(req: Request, context: Params) {
  const { brandId } = await context.params;

  const brand = await prisma.brands.findUnique({
    where: {
      id: Number(brandId),
    },
  });

  return NextResponse.json(brand);
}
