import type { StaticImageData } from "next/image";

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

export interface FooterPhone {
  id: string;
  label: string;
  number: string;
}

export interface FooterLogo {
  id: string;
  name: string;
  image: StaticImageData;
}