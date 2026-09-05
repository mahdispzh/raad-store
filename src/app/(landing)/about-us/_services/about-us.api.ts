import { prisma } from "@/prisma/prisma";
import type { AboutApiResponse } from "../_types/about.types";

export async function getStoreInformation(): Promise<AboutApiResponse> {
  const data = (await prisma.store_information.findMany()).pop();
  return {
    data,
  };
}
