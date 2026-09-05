import type { ReactNode } from "react";

export interface ListCardItem {
  id: number;
  name: string;
  count: number;
  image?: string;
  imageId?: number;
}

export interface ListCardProps {
  icon: React.ReactNode;
  title: string;
  unit?: string;
  items: {
    id: number;
    name: string;
    count: number;
    image: string;
    imageId?: number;
  }[];

  onButtonClick?: () => void;
}