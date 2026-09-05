// src/app/(landing)/about-us/_hooks/useAboutData.ts
"use client";

import { useState } from "react";
import { AboutData } from "../_types/about.types";

export function useAboutData(initialData: AboutData) {
  const [data] = useState<AboutData>(initialData);

  return {
    contactUs: data.contactUs,
    aboutUs: data.aboutUs,
    socialMedia: data.socialMedia,
  };
}