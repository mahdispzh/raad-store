import type { ReactNode } from "react";

export interface AssemblySectionProps {
  title: string;
  description: string;
  heading: string;
  text: string;
  image: string;
}

export interface AssemblySectionFeatureProps {
  icon: ReactNode;
  label: string;
}