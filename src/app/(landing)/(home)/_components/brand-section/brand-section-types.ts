import type { StaticImageData } from "next/image";

export interface Brand {
  id: string;
  name: string;
  image: StaticImageData;
}