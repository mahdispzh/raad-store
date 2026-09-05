import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

type Params = {
  params: Promise<{
    categoryId: string;
  }>;
};

export async function GET(req: Request, context: Params) {
  const { categoryId } = await context.params;

  const category = await prisma.categories.findUnique({
    where: {
      id: Number(categoryId),
    },
  });

  return NextResponse.json(category);
}
